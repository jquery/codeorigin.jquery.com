<?php

function purgeCacheFileFromCDN($urlToPurge, $mediaType) {

  $request_params = (object) array(
    'MediaPath' => $urlToPurge,
    'MediaType' => $mediaType, // MediaType 8=small 3=large
  );
  $data = json_encode( $request_params );

  //## setup the connection and call.
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, 'https://api.edgecast.com/v2/mcc/customers/1257/edge/purge');
  curl_setopt($ch, CURLOPT_PORT, 443);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch, CURLINFO_HEADER_OUT, 1);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_FORBID_REUSE, 1);
  curl_setopt($ch, CURLOPT_FRESH_CONNECT, 1);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
  curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
  curl_setopt($ch, CURLOPT_TIMEOUT, 45);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Authorization: tok:d1eceb00-7b0b-499f-a9e2-c79379502e88',
    'Content-Type: application/json',
    'Accept: application/json',
    'Content-length: '.strlen($data)
  ));
  $head = curl_exec($ch);
  $httpCode = curl_getinfo($ch);
  curl_close($ch);

  if ($httpCode['http_code'] != 200) {
    echo 'Error reported: '.print_r( array( $head, $httpCode ), 1 );
  } else {
    echo "Done\n";
  }
}

// set by nginx
$domain = strtolower( $_SERVER["CDN_HOSTNAME"] );

$type = $domain == "content.jquery.com" ? 3 : 8;

$parts = preg_split( "/\?reload=?/", $_SERVER["REQUEST_URI"] );
if ( !$parts ) {
  header("400 Bad Request");
  echo $_SERVER["REQUEST_URI"]." is not a valid URI";
  exit;
}

$url = "http://$domain" . $parts[ 0 ];

header( "Content-Type: text/plain" );

echo "Attempting to purge: $url ";
purgeCacheFileFromCDN( $url, $type );
