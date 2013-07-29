<?php
// requires https://github.com/netdna/netdnarws-php
require_once( 'netdnarws-php/NetDNA.php' );

$config = json_decode( file_get_contents( './config.json' ), true );
$config = $config[ 'cdn' ];
$zone_id = $config[ 'zone_id' ];

function purgeCacheFileFromCDN( $id, $files = null ) {
	$api = new NetDNA( $config[ 'alias' ], $config[ 'consumer_key' ], $config[ 'consumer_secret' ] );
	$result = null;

	if ( empty( $files ) ) {
		$result = $api->delete( '/zones/pull.json/' . $id . '/cache' );
	} else if ( !is_array( $files ) ) {
		// Purge single file
		$params = array( 'file' => $files );
		$result = $api->delete( '/zones/pull.json/' . $id . '/cache', $params );
	} else if ( is_array( $files ) ) {
		// Purge multiple files
		$params = array();
		foreach ( $files as $k => $v ) $params[ $k ] = $v;
		$result = $api->delete( '/zones/pull.json/' . $id . '/cache', $params );
	}

	$result = json_decode( $result, true );
	if ( $result[ 'code' ] !== 200 ) {
		echo 'Error reported: ' . print_r( $result, true );
	} else {
		echo 'Done\n';
	}
}

$parts = preg_split( '/\?reload=?/', $_SERVER[ 'REQUEST_URI' ] );
if ( !$parts ) {
	header( '400 Bad Request' );
	echo $_SERVER[ 'REQUEST_URI' ] . ' is not a valid URI.';
	exit;
}

$file = $parts[ 0 ];

header( 'Content-Type: text/plain' );
echo "Attempting to purge: $zone_id: $file.\n";
purgeCacheFileFromCDN( $zone_id, $file );
