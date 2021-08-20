<?php
/**
 * Usage:
 *
 *     $ php test/cfp-php.php
 *     $ php test/cfp-php.php "localhost:4000"
 *     $ TEST_SERVER="localhost:4000" php test/cfp-php.php
 */

$server = getenv( 'TEST_SERVER' ) ?: @$argv[1] ?: 'localhost:4000';

Unit::start();

// Domain root

Unit::testHttp( $server, '/', [
	'status' => '301 Moved Permanently',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/',
] );

// Static assets

Unit::testHttp( $server, '/jquery-3.0.0.js', [
	'status' => '200 OK',
	'server' => 'nginx',
	'content-type' => 'application/javascript; charset=utf-8',
	'content-length' => '263268',
	'last-modified' => 'Fri, 18 Oct 1991 12:00:00 GMT',
	'connection' => 'keep-alive',
	'vary' => 'Accept-Encoding',
	'etag' => '"28feccc0-40464"',
	'expires' => 'Thu, 31 Dec 2037 23:55:55 GMT',
	'cache-control' => 'max-age=315360000, public',
	'access-control-allow-origin' => '*',
	'accept-ranges' => 'bytes',
] );

Unit::testHttp( $server, '/qunit/qunit-2.0.0.css', [
	'status' => '200 OK',
	'server' => 'nginx',
	'content-type' => 'text/css',
	'content-length' => '7456',
	'last-modified' => 'Fri, 18 Oct 1991 12:00:00 GMT',
	'connection' => 'keep-alive',
	'vary' => 'Accept-Encoding',
	'etag' => '"28feccc0-1d20"',
	'expires' => 'Thu, 31 Dec 2037 23:55:55 GMT',
	'cache-control' => 'max-age=315360000, public',
	'access-control-allow-origin' => '*',
	'accept-ranges' => 'bytes',
] );

Unit::testHttp( $server, '/ui/1.10.0/themes/base/images/ui-icons_222222_256x240.png', [
	'status' => '200 OK',
	'server' => 'nginx',
	'content-type' => 'image/png',
	'content-length' => '4369',
	'last-modified' => 'Fri, 18 Oct 1991 12:00:00 GMT',
	'connection' => 'keep-alive',
	'etag' => '"28feccc0-1111"',
	'expires' => 'Thu, 31 Dec 2037 23:55:55 GMT',
	'cache-control' => 'max-age=315360000, public',
	'access-control-allow-origin' => '*',
	'accept-ranges' => 'bytes',
] );

Unit::testHttp( $server, '/jquery-2.0.0.min.map', [
	'status' => '200 OK',
	'server' => 'nginx',
	'content-type' => 'application/octet-stream',
	'content-length' => '126081',
	'last-modified' => 'Fri, 18 Oct 1991 12:00:00 GMT',
	'connection' => 'keep-alive',
	'etag' => '"28feccc0-1ec81"',
	'expires' => 'Thu, 31 Dec 2037 23:55:55 GMT',
	'cache-control' => 'max-age=315360000, public',
	'access-control-allow-origin' => '*',
	'accept-ranges' => 'bytes',
] );

// Renamed files

Unit::testHttp( $server, '/jquery-git2.js', [
	'status' => '301 Moved Permanently',
	'server' => 'nginx',
	'location' => 'https://code.jquery.com/jquery-git.js',
] );

// Moved to releases, WordPress page

Unit::testHttp( $server, '/jquery/', [
	'status' => '301 Moved Permanently',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/jquery/',
] );

// Moved to releases, WordPress page without trailing slash

Unit::testHttp( $server, '/jquery', [
	'status' => '301 Moved Permanently',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/jquery/',
] );

// Moved to releases, root -git file

Unit::testHttp( $server, '/jquery-git.js', [
	'status' => '301 Moved Permanently',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/git/jquery-git.js',
] );

// Moved to releases, nested -git file

Unit::testHttp( $server, '/color/jquery.color-git.min.js', [
	'status' => '301 Moved Permanently',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/git/color/jquery.color-git.min.js',
] );

Unit::testHttp( $server, '/qunit/qunit-git.css', [
	'status' => '301 Moved Permanently',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/git/qunit/qunit-git.css',
] );

Unit::testHttp( $server, '/mobile/git/jquery.mobile-git.min.map', [
	'status' => '301 Moved Permanently',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/git/mobile/git/jquery.mobile-git.min.map',
] );

// Moved to releases, any file under /mobile/git

Unit::testHttp( $server, '/mobile/git/images/icons-png/power-black.png', [
	'status' => '301 Moved Permanently',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/git/mobile/git/images/icons-png/power-black.png',
] );

// Moved to releases, any file under /git (new-style URL)

Unit::testHttp( $server, '/git/qunit/qunit-git.css', [
	'status' => '301 Moved Permanently',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/git/qunit/qunit-git.css',
] );

Unit::end();

function jq_req( $url ) {
	print "# $url\n";
	$ch = curl_init( $url );
	$resp = [ 'headers' => [], 'body' => null ];
	curl_setopt_array( $ch, [
		CURLOPT_RETURNTRANSFER => 1,
		CURLOPT_FOLLOWLOCATION => 0,
		CURLOPT_HEADERFUNCTION => function( $ch, $header ) use ( &$resp ) {
			$len = strlen( $header );
			if ( preg_match( "/^(HTTP\/(?:1\.[01]|2)) (\d{3} .*)/", $header, $m ) ) {
				$resp['headers'] = [];
				$resp['headers']['status'] = trim( $m[2] );
			} else {
				$parts = explode( ':', $header, 2 );
				if ( count( $parts ) === 2 ) {
					$name = strtolower( $parts[0] );
					$val = trim( $parts[1] );
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

	public static function testHttp( $server, $path, array $expectHeaders, $expectBody = null ) {
		try {
			$resp = jq_req( "http://{$server}{$path}" );
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
