<?php
require_once( 'netdnarws-php/NetDNA.php' );

$config = json_decode( file_get_contents( './config.json' ), true );
// On jq-wp hosts, Puppet provisions config.json with cdn credentials.
// See also jquery::wp::jquery#codeorigin in jquery/infrastucture [private].
$config = $config[ 'cdn' ];
$zone_id = $config[ 'zone_id' ];

$parts = preg_split( '/\?reload=?/', $_SERVER[ 'REQUEST_URI' ] );
if ( !$parts ) {
	header( '400 Bad Request' );
	echo $_SERVER[ 'REQUEST_URI' ] . ' is not a valid URI.';
	exit;
}

$file = $parts[ 0 ];

header( 'Content-Type: text/plain' );
echo "Attempting to purge: $zone_id: $file.\n";

$api = new NetDNA(
	$config[ 'alias' ],
	$config[ 'consumer_key' ],
	$config[ 'consumer_secret' ]
);
$result = $api->delete(
	'/zones/pull.json/' . $zone_id . '/cache',
	array( 'file' => $file )
);
$result = json_decode( $result, true );

if ( $result[ 'code' ] !== 200 ) {
	echo 'Error reported: ' . print_r( $result, true );
} else {
	echo "Done\n";
}
