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
 *     $ STRIKETRACKER_TOKEN='*' STRIKETRACKER_ACCOUNT='*' PURGE_URI='/example' php purge.php
 */

if ( !function_exists( 'curl_init' ) ) {
	http_response_code( 500 );
	echo "Context error.\n";
	exit;
}

// Use a map to validate values and as indirection to ensure trivial bugs
// can't result in a user-supplied string getting used.
$purgeHostnames = [
	'code' => 'code.jquery.com',
	'releases' => 'releases.jquery.com',
];

// Highwinds StrikeTracker
$striketrackerUrl = getenv( 'STRIKETRACKER_URL' ) ?: 'https://striketracker.highwinds.com';
$striketrackerToken = getenv( 'STRIKETRACKER_TOKEN' ) ?: false;
$striketrackerAccountHash = getenv( 'STRIKETRACKER_ACCOUNT' ) ?: false;

// The purge script is generally not called from a purgable site, so the current request
// is unlikely to be on the purgable site itself (e.g. some origin server instead of the
// public hostname). As such, take the target site as input. This also allows the same
// script to be used for multiple sites.
$purgeSite = getenv( 'PURGE_SITE' ) ?: @$_GET['site'] ?: 'releases';
$striketrackerPurgeHostname = @$purgeHostnames[$purgeSite] ?: false;

$purgeUri = getenv( 'PURGE_URI' ) ?: @$_GET['uri'] ?: false;

if ( !$striketrackerUrl
	|| !$striketrackerToken
	|| !$striketrackerAccountHash
	|| !$striketrackerPurgeHostname
	|| !$purgeUri
) {

	http_response_code( 400 );
	echo "Configuration error.\n";
	exit;
}

// The StrikeTracker Purge API is protocol-sensitive.
// HTTP and HTTPS need to be purged separately, or
// we can use a protocol-relative file url, which Highwinds
// supports as short-cut for purging both.
$file = "//{$striketrackerPurgeHostname}/" . ltrim( $purgeUri, '/' );

/**
 * Make an HTTP POST request, submitting JSON data, and receiving JSON data.
 *
 * @param string $url
 * @param array $headers
 * @param array $postData Data to be serialised using JSON as post body
 * @return array|false HTTP response body decoded as JSON, or boolean false
 */
function jq_request_post_json( $url, array $headers, array $postData ) {
	$ch = curl_init( $url );
	curl_setopt_array( $ch, array(
		CURLOPT_HTTPHEADER => $headers,
		CURLOPT_POSTFIELDS =>  json_encode( $postData ),
		CURLOPT_RETURNTRANSFER => true,
	) );
	$response = curl_exec( $ch );
	curl_close( $ch );
	return $response ? json_decode( $response ) : false;
}

header( 'Content-Type: text/plain' );
header( 'Cache-Control: private, no-cache, must-revalidate' );
header( 'X-Content-Type-Options: nosniff' );
echo "Attempting to purge:\n{$file}\n\n";

$result = jq_request_post_json(
	// url
	"{$striketrackerUrl}/api/accounts/{$striketrackerAccountHash}/purge",
	// headers
	array(
		"Authorization: Bearer {$striketrackerToken}",
		"Content-Type: application/json",
	),
	// post body (will be encoded as JSON)
	array(
		'list' => array(
			array( 'url' => $file, 'purgeAllDynamic' => true ),
		),
	)
);

// Successful responses contain an 'id' that identifies the purge.
// Errors should contain an 'error' string and 'code' number.
if ( !$result || !isset( $result->id ) || isset( $result->error ) || isset( $result->code ) ) {
	echo "Purge may have failed.\n\n";
	if ( isset( $result->code ) ) {
		echo "Error code: " . $result->code . "\n";
	}
	if ( isset( $result->error ) ) {
		echo "Error message: " . $result->error . "\n";
	}
} else {
	echo "Done!\n";
}
