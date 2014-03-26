<?php
require_once("OAuth.php");
require_once("CurlException.php");
/** 
 * NetDNA REST Client Library
 * 
 * @copyright 2012
 * @author Karlo Espiritu
 * @version 1.0 2012-09-21
*/
class NetDNA {
	
	public $alias;

	public $key;

	public $secret;
	
	public $netdnarws_url = 'https://rws.netdna.com';
	
	
	public function __construct($alias, $key, $secret, $options=null) {
		$this->alias  = $alias;
		$this->key    = $key;
		$this->secret = $secret;
		$consumer = new OAuthConsumer($key, $secret, NULL);
		
	}

	private function execute($selected_call, $method_type, $params) {
		$consumer = new OAuthConsumer($this->key, $this->secret, NULL);

		// the endpoint for your request
		$endpoint = "$this->netdnarws_url/$this->alias$selected_call"; 
		
		//parse endpoint before creating OAuth request
		$parsed = parse_url($endpoint);
		if (array_key_exists("parsed", $parsed))
		{
		    parse_str($parsed['query'], $params);
		}

		//generate a request from your consumer
		$req_req = OAuthRequest::from_consumer_and_token($consumer, NULL, $method_type, $endpoint, $params);

		//sign your OAuth request using hmac_sha1
		$sig_method = new OAuthSignatureMethod_HMAC_SHA1();
		$req_req->sign_request($sig_method, $consumer, NULL);

		// create curl resource 
		$ch = curl_init(); 
		
		// set url 
		curl_setopt($ch, CURLOPT_URL, $req_req); 
		
		//return the transfer as a string
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER , FALSE);
		
		// set curl timeout
		curl_setopt($ch, CURLOPT_TIMEOUT, 60); 

		// set curl custom request type if not standard
		if ($method_type != "GET" && $method_type != "POST") {
		    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method_type);
		}


		if ($method_type == "POST" || $method_type == "PUT" || $method_type == "DELETE") {
		    $query_str = OAuthUtil::build_http_query($params);
		    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Expect:', 'Content-Length: ' . strlen($query_str)));
		    curl_setopt($ch, CURLOPT_POSTFIELDS,  $query_str);
		}

		// retrieve headers
		curl_setopt($ch, CURLOPT_HEADER, 1);
		curl_setopt($ch, CURLINFO_HEADER_OUT, 1);
		
		//set user agent
		curl_setopt($ch, CURLOPT_USERAGENT, 'PHP NetDNA API Client');

		// make call
		$result = curl_exec($ch);
		$headers = curl_getinfo($ch);
		$curl_error = curl_error($ch);

		// close curl resource to free up system resources 
		curl_close($ch);

		// $json_output contains the output string 
		$json_output = substr($result, $headers['header_size']);

		// catch errors
		if(!empty($curl_error) || empty($json_output)) { 
			throw new CurlException("CURL ERROR: $curl_error, Output: $json_output", $headers['http_code'], null, $headers);
		}

		return $json_output;
	}
	
	public function get($selected_call, $params = array()){
		 
		return $this->execute($selected_call, 'GET', $params);
	}
	
	public function post($selected_call, $params = array()){
		return $this->execute($selected_call, 'POST', $params);
	}
	
	public function put($selected_call, $params = array()){
		return $this->execute($selected_call, 'PUT', $params);
	}
	
	public function delete($selected_call, $params = array()){
		return $this->execute($selected_call, 'DELETE', $params);
	}
	
	
}
