# NetDNA REST Web Services PHP Client
====================================

## Installation

```shell
$ wget https://github.com/netdna/netdnarws-php/zipball/master
$ unzip master
$ cd netdna-netdnarws-php-*
```

## Usage
```php
<?php

require_once('NetDNA.php');

$api = new NetDNA("my_alias","consumer_key","consumer_secret");

// get account information
echo  $api->get('/account.json');

// delete a file from the cache
$params = array('file' => '/robots.txt');
echo $api->delete('/zones/pull.json/6055/cache', $params);

?>
```

## Methods

It has support for `GET`, `POST`, `PUT` and `DELETE` OAuth signed requests.

