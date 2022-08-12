<?php

function jq_req( $url, array $reqHeaders = [] ) {
	print "# $url\n";
	$ch = curl_init( $url );
	$resp = [ 'headers' => [], 'body' => null ];
	curl_setopt_array( $ch, [
		CURLOPT_HTTPHEADER => $reqHeaders,
		CURLOPT_RETURNTRANSFER => 1,
		CURLOPT_FOLLOWLOCATION => 0,
		CURLOPT_HEADERFUNCTION => function( $ch, $header ) use ( &$resp ) {
			$caseInsensitiveHeaders = [
				'connection'
			];
			$len = strlen( $header );
			if ( preg_match( "/^(HTTP\/(?:1\.[01]|2)) (\d{3} .*)/", $header, $m ) ) {
				$resp['headers'] = [];
				$resp['headers']['status'] = trim( $m[2] );
			} else {
				$parts = explode( ':', $header, 2 );
				if ( count( $parts ) === 2 ) {
					$name = strtolower( $parts[0] );
					$val = trim( $parts[1] );
					if ( in_array( $name, $caseInsensitiveHeaders ) ) {
						$val = strtolower( $val );
					}
					if ( isset( $resp['headers'][$name] ) ) {
						$resp['headers'][$name] .= ", $val";
					} else {
						$resp['headers'][$name] = $val;
					}
				}
			}
			return $len;
		},
	] );
	try {
		$ret = curl_exec( $ch );
		if ( $ret === false ) {
			throw new Exception( curl_error( $ch ) );
		}
		$resp['body'] = $ret;
		return $resp;
	} finally {
		curl_close( $ch );
	}
}

class Unit {
	static $i = 0;
	static $pass = true;

	public static function start() {
		error_reporting( E_ALL );
		print "TAP version 13\n";
	}

	public static function test( $name, $actual, $expected ) {
		$num = ++self::$i;
		if ( $actual === $expected ) {
			print "ok $num $name\n";
		} else {
			self::$pass = false;
			print "not ok $num $name\n  ---\n  actual:   "
				. json_encode( $actual, JSON_UNESCAPED_SLASHES ) . "\n  expected: "
				. json_encode( $expected, JSON_UNESCAPED_SLASHES ) . "\n";
		}
	}

	public static function testHttp( $server, $path, array $reqHeaders, array $expectHeaders, $expectBody = null ) {
		try {
			$resp = jq_req( "http://{$server}{$path}", $reqHeaders );
			foreach ( $expectHeaders as $key => $val ) {
				self::test( "GET $path > header $key", @$resp['headers'][$key], $val );
			}
		} catch ( Exception $e ) {
			self::test( "GET $path > error", $e->getMessage(), null );
		}
	}

	public static function end() {
		print '1..' . self::$i . "\n";
		if ( !self::$pass ) {
			exit( 1 );
		}
	}
}
