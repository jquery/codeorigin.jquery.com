<?php
/**
 * This file is executed from Nginx using fastcgi.
 *
 * The file must be compatible with PHP 5.4 and later.
 *
 * See also jquery::wp::jquery in jquery/infrastructure [private].
 *
 * Test Plan:
 *
 *     $ REQUEST_URI="/example" php purge.php
 *
 */
require_once __DIR__ . '/netdnarws-php/NetDNA.php';

$configFile = __DIR__ . '/config.json';

if ( !isset( $_SERVER[ 'REQUEST_URI' ] )
	|| !is_readable( $configFile )
	|| !function_exists( 'curl_init' )
) {
	http_response_code( 500 );
	echo "Context error.\n";
	exit;
}

$config = json_decode( file_get_contents( $configFile ), true );
$cdnConfig = $config[ 'cdn' ];
$zoneId = $cdnConfig[ 'zone_id' ];
$consumerKey = $cdnConfig[ 'consumer_key' ];
$consumerSecret = $cdnConfig[ 'consumer_secret' ];
if ( !$zoneId
	|| !$consumerKey
	|| !$consumerSecret
) {
	http_response_code( 500 );
	echo "Configuration error.\n";
	exit;
}

$parts = explode( '?reload', $_SERVER[ 'REQUEST_URI' ], 2 );
$file = $parts ? $parts[ 0 ] : null;
if ( !$file ) {
	http_response_code( 400 );
	echo "Bad Request: Invalid REQUEST_URI.\n";
	exit;
}

header( 'Content-Type: text/plain' );
echo "Attempting to purge:\n\t$file\n\n";

$api = new NetDNA( 'jquery', $consumerKey, $consumerSecret );
$result = $api->delete(
	'/zones/pull.json/' . $zoneId . '/cache',
	array( 'file' => $file )
);
$result = json_decode( $result, true );

if ( $result[ 'code' ] !== 200 ) {
	echo 'Error reported: ' . print_r( $result, true );
} else {
	echo "Done\n";
}
