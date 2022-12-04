<?php
/**
 * Usage:
 *
 *     $ php test/CodeoriginTest.php
 *
 *     $ php test/CodeoriginTest.php "http://localhost:4000"
 *
 *     $ php test/CodeoriginTest.php "http://code.jquery.com"
 *     $ php test/CodeoriginTest.php "https://code.jquery.com"
 */

require_once __DIR__ . '/Unit.php';
$server = @$argv[1] ?: 'http://localhost:4000';

Unit::start();

// Domain root

Unit::testHttp( $server, '/', [], [
	'status' => '301',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/',
] );

// Static assets

Unit::testHttp( $server, '/jquery-3.0.0.js', [], [
	'status' => '200',
	'server' => 'nginx',
	'content-type' => 'application/javascript; charset=utf-8',
	'content-length' => '263268',
	'last-modified' => 'Fri, 18 Oct 1991 12:00:00 GMT',
	'connection' => 'keep-alive',
	'vary' => 'Accept-Encoding',
	'etag' => '"28feccc0-40464"',
	'cache-control' => 'max-age=315360000, public',
	'access-control-allow-origin' => '*',
	'accept-ranges' => 'bytes',
] );

Unit::testHttp( $server, '/qunit/qunit-2.0.0.css', [], [
	'status' => '200',
	'server' => 'nginx',
	'content-type' => 'text/css',
	'content-length' => '7456',
	'last-modified' => 'Fri, 18 Oct 1991 12:00:00 GMT',
	'connection' => 'keep-alive',
	'vary' => 'Accept-Encoding',
	'etag' => '"28feccc0-1d20"',
	'cache-control' => 'max-age=315360000, public',
	'access-control-allow-origin' => '*',
	'accept-ranges' => 'bytes',
] );

Unit::testHttp( $server, '/ui/1.10.0/themes/base/images/ui-icons_222222_256x240.png', [], [
	'status' => '200',
	'server' => 'nginx',
	'content-type' => 'image/png',
	'content-length' => '4369',
	'last-modified' => 'Fri, 18 Oct 1991 12:00:00 GMT',
	'connection' => 'keep-alive',
	'etag' => '"28feccc0-1111"',
	'cache-control' => 'max-age=315360000, public',
	'access-control-allow-origin' => '*',
	'accept-ranges' => 'bytes',
] );

Unit::testHttp( $server, '/jquery-2.0.0.min.map', [], [
	'status' => '200',
	'server' => 'nginx',
	'content-type' => 'application/octet-stream',
	'content-length' => '126081',
	'last-modified' => 'Fri, 18 Oct 1991 12:00:00 GMT',
	'connection' => 'keep-alive',
	'etag' => '"28feccc0-1ec81"',
	'cache-control' => 'max-age=315360000, public',
	'access-control-allow-origin' => '*',
	'accept-ranges' => 'bytes',
] );

// Static asset

Unit::testHttp( $server, '/jquery-3.0.0.js', [
	"x-cdn-access: there-is-no-spoon"
], [
	'status' => '200',
	'server' => 'nginx',
	'content-type' => 'application/javascript; charset=utf-8',
	'content-length' => '263268',
	'last-modified' => 'Fri, 18 Oct 1991 12:00:00 GMT',
	'connection' => 'keep-alive',
	'vary' => 'Accept-Encoding',
	'etag' => '"28feccc0-40464"',
	'cache-control' => 'max-age=315360000, public',
	'access-control-allow-origin' => '*',
	'accept-ranges' => 'bytes',
] );

// Renamed files

Unit::testHttp( $server, '/jquery-git2.js', [], [
	'status' => '301',
	'server' => 'nginx',
	'location' => 'https://code.jquery.com/jquery-git.js',
] );

// Moved to releases, WordPress page

Unit::testHttp( $server, '/jquery/', [], [
	'status' => '301',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/jquery/',
] );

// Moved to releases, WordPress page without trailing slash

Unit::testHttp( $server, '/jquery', [], [
	'status' => '301',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/jquery/',
] );

// Moved to releases, root -git file

Unit::testHttp( $server, '/jquery-git.js', [], [
	'status' => '301',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/git/jquery-git.js',
] );

// Moved to releases, nested -git file

Unit::testHttp( $server, '/color/jquery.color-git.min.js', [], [
	'status' => '301',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/git/color/jquery.color-git.min.js',
] );

Unit::testHttp( $server, '/qunit/qunit-git.css', [], [
	'status' => '301',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/git/qunit/qunit-git.css',
] );

Unit::testHttp( $server, '/mobile/git/jquery.mobile-git.min.map', [], [
	'status' => '301',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/git/mobile/git/jquery.mobile-git.min.map',
] );

// Moved to releases, any file under /mobile/git

Unit::testHttp( $server, '/mobile/git/images/icons-png/power-black.png', [], [
	'status' => '301',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/git/mobile/git/images/icons-png/power-black.png',
] );

// Moved to releases, any file under /git (new-style URL)

Unit::testHttp( $server, '/git/qunit/qunit-git.css', [], [
	'status' => '301',
	'server' => 'nginx',
	'location' => 'https://releases.jquery.com/git/qunit/qunit-git.css',
] );

Unit::end();
