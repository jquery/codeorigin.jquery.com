<?php

class CurlException extends Exception {
  
  private $curl_headers;

  public function __construct($message, $code = 0, Exception $previous = null, $headers = null) {
    parent::__construct($message, $code, $previous);
    $this->curl_headers = $headers;
  }

  public function getHeaders() {
    return $this->curl_headers;
  }

}

