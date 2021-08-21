<?php
/**
 * Usage:
 *
 *     $ export CDN_ACCESS_KEY=xxx
 *     $ php test/static-strict.php
 *
 *     $ export CDN_ACCESS_KEY=xxx
 *     $ php test/static-strict.php "localhost:4000"
 */

require_once __DIR__ . '/Unit.php';
$server = @$argv[1] ?: 'localhost:4000';
$key = getenv( 'CDN_ACCESS_KEY' );
if ( !$key ) {
	print "Must set CDN_ACCESS_KEY\n";
	exit( 1 );
}

Unit::start();

// Domain root

Unit::testHttp( $server, '/', [], [
	'status' => '301 Moved Permanently',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/',
] );

// Static asset with key

Unit::testHttp( $server, '/jquery-3.0.0.js', [
	"x-cdn-access: $key"
], [
	'status' => '200 OK',
	'server' => 'nginx',
	'content-type' => 'application/javascript; charset=utf-8',
	'content-length' => '263268',
	'last-modified' => 'Fri, 18 Oct 1991 12:00:00 GMT',
	'connection' => 'keep-alive',
	'vary' => 'Accept-Encoding, x-cdn-access',
	'etag' => '"28feccc0-40464"',
	'expires' => 'Thu, 31 Dec 2037 23:55:55 GMT',
	'cache-control' => 'max-age=315360000, public, no-transform',
	'access-control-allow-origin' => '*',
	'accept-ranges' => 'bytes',
] );

// Static asset without key

Unit::testHttp( $server, '/jquery-3.0.0.js', [], [
	'status' => '301 Moved Permanently',
	'server' => 'nginx',
	'location' => 'https://code.jquery.com/jquery-3.0.0.js',
	'vary' => 'x-cdn-access',
	'cache-control' => 'max-age=300, public, no-transform',
	'access-control-allow-origin' => '*',
] );

// Renamed file

Unit::testHttp( $server, '/jquery-git2.js', [], [
	'status' => '301 Moved Permanently',
	'server' => 'nginx',
	'location' => 'https://code.jquery.com/jquery-git.js',
] );

// Moved to releases, WordPress page

Unit::testHttp( $server, '/jquery/', [], [
	'status' => '301 Moved Permanently',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/jquery/',
] );

// Moved to releases, any file under /git (new-style URL)

Unit::testHttp( $server, '/git/qunit/qunit-git.css', [], [
	'status' => '301 Moved Permanently',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/git/qunit/qunit-git.css',
] );

Unit::end();
