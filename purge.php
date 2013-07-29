<?php
//requires https://github.com/netdna/netdnarws-php
require_once('netdnarws-php/NetDNA.php');

$config = json_decode(file_get_contents('./config.json'), true);
$config = $config["cdn"];

//place your alias, key, secret into this constructor
$api = new NetDNA($config["alias"], $config["consumer_key"], $config["consumer_secret"]);

function purgeCacheFileFromCDN($id, $files = null) {

    global $api;
    //3 options for purge
    $result = null;
    
    if ($files == null){
        $result = $api->delete('/zones/pull.json/'.$id.'/cache');
    } else if (!is_array($files)){
        //Purge single file
        $params = array('file'=>$files);
        $result = $api->delete('/zones/pull.json/'.$id.'/cache',$params);
    } else if (is_array($files)){
        //Purge multiple files
        $params = array();
        foreach ($files as $k=>$v) $params[$k] = $v;
        $result = $api->delete('/zones/pull.json/'.$id.'/cache',$params);
    }

    $result = json_decode($result,true);
    if ($result['code'] != 200) {
        echo 'Error reported: '.print_r( $result, 1 );
    } else {
        echo "Done\n";
    }

}

//set zone id that you want to purge
$zone_id = $config["zone_id"];

$parts = preg_split( "/\?reload=?/", $_SERVER["REQUEST_URI"] );
if ( !$parts ) {
  header("400 Bad Request");
  echo $_SERVER["REQUEST_URI"]." is not a valid URI";
  exit;
}

$file = $parts[0];

header( "Content-Type: text/plain" );
echo "Attempting to purge: ".$zone_id.": ".$file."\n";
purgeCacheFileFromCDN( $zone_id, $file );
