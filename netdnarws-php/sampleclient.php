<?php

require_once('NetDNA.php');

$api = new NetDNA("my_alias","consumer_key","consumer_secret");
try {
  echo  $api->get('/zones/pull.json');
} catch(CurlException $e) {
  print_r($e->getMessage());
  print_r($e->getHeaders());
} 
