module.exports = function( grunt ) {

"use strict";

var _ = require( "underscore" ),
	semver = require( "semver" );

grunt.loadNpmTasks( "grunt-clean" );
grunt.loadNpmTasks( "grunt-html" );
grunt.loadNpmTasks( "grunt-wordpress" );
grunt.loadNpmTasks( "grunt-jquery-content" );
grunt.loadNpmTasks( "grunt-check-modules" );

grunt.initConfig({
	clean: {
		folder: "dist/"
	},
	htmllint: {
		page: "page/**.html"
	},
	jshint: {
		options: {
			undef: true,
			node: true
		}
	},
	lint: {
		grunt: "grunt.js"
	},
	watch: {
		pages: {
			files: "pages/**/*",
			tasks: "deploy"
		}
	},
	"build-pages": {
		all: grunt.file.expandFiles( "pages/**" )
	},
	"build-resources": {
		all: grunt.file.expandFiles( "resources/**" )
	},
	wordpress: grunt.utils._.extend({
		dir: "dist/wordpress"
	}, grunt.file.readJSON( "config.json" ) )
});

grunt.registerTask( "default", "build-wordpress" );
grunt.registerTask( "build", "build-pages build-resources build-index" );
grunt.registerTask( "build-wordpress", "check-modules clean lint build" );


var rversion = /^(\d+)\.(\d+)(?:\.(\d+))?-?(.*)$/;
function getVersion( version ) {
	var match = rversion.exec( version );

	return match[ 1 ] + "." + match[ 2 ] + "." + ( match[ 3 ] || 0 ) +
		( match[ 4 ] ? "-" + match[ 4 ] : "" );
}

function sortVersion( a, b ) {
	return semver.compare( b.version, a.version ) || ( a.type < b.type ? -1 : 1 );
}

function organize( files ) {
	var result = {};

	files.forEach(function( file ) {
		var version = result[ file.version ] || ( result[ file.version ] = {} );
		version[ file.typePretty ] = file;
	});

	return result;
}

var prettyTypes = {
	"": "uncompressed",
	"min": "minified",
	"pack": "packed"
};

function parseFiles( files, regex ) {
	return files
		.map(function( filename ) {
			var type,
				matches = regex.exec( filename );

			if ( !matches ) {
				return null;
			}

			type = matches[ 3 ] || "";
			return {
				filename: matches[ 0 ],
				version: getVersion( matches[ 2 ] ),
				type: type,
				typePretty: prettyTypes[ type ]
			};
		})
		// Remove null values from filtering
		.filter( _.identity )
		.sort( sortVersion );
}

function listItem( prefix, version, files ) {
	var li = "<li>" + prefix + " " + version + " - ";

	Object.keys( files ).forEach(function( type, index ) {
		if ( index ) {
			li += " or ";
		}

		li += "<a href='/" + files[ type ].filename + "'>" + type + "</a> ";
	});
	li += "</li>";

	return li;
}

function getLatestStable( organized ) {
	return _.find( Object.keys( organized ), function( version ) {
		return version.indexOf( "-" ) === -1;
	});
}

var rjQueryVersion = /(jquery-(\d+\.\d+(?:\.\d+)?[^.]*)(?:\.(min|pack))?\.js)/;
var rjQueryMigrateVersion = /(jquery-migrate-(\d+\.\d+(?:\.\d+)?[^.]*)(?:\.min)?\.js)/;
grunt.registerTask( "build-index", function() {
	var mainIndex, projectIndex, latestStable, gitListing,
		files = grunt.file.expandFiles( "cdn/**.js" ),
		jQueryCoreFiles = parseFiles( files, rjQueryVersion ),
		jQueryMigrateFiles = parseFiles( files, rjQueryMigrateVersion ),
		jQuery2 = organize( jQueryCoreFiles.filter(function( match ) {
			return semver.satisfies( match.version, "2.x" );
		})),
		jQuery1 = organize( jQueryCoreFiles.filter(function( match ) {
			return semver.satisfies( match.version, "1.x" );
		})),
		jQueryMigrate = organize( jQueryMigrateFiles );

	mainIndex = "<script>{\"title\":\"jQuery CDN - Latest Versions\"}</script>\n";
	mainIndex += "<h2>jQuery Core</h2>";
	mainIndex += "<p>Showing the latest release in each major branch. <a href='/jquery/'>See all versions of jQuery Core</a>.</p>";

	latestStable = getLatestStable( jQuery2 );
	mainIndex += "<h3>jQuery 2.x - Latest Version (IE<9 not supported)</h3>";
	mainIndex += "<ul>";
	mainIndex += listItem( "jQuery Core", latestStable, jQuery2[ latestStable ] );
	mainIndex += "</ul>";

	latestStable = getLatestStable( jQuery1 );
	mainIndex += "<h3>jQuery 1.x - Latest Version</h3>";
	mainIndex += "<ul>";
	mainIndex += listItem( "jQuery Core", latestStable, jQuery1[ latestStable ] );
	mainIndex += "</ul>";

	gitListing = "<h3>jQuery - Live git versions</h3>";
	gitListing += "<p>UNSTABLE, NOT FOR PRODUCTION</p>";
	gitListing += "<ul>";
	gitListing += "<li><a href='/jquery-git2.js'>jQuery 2.x git build</a> - <a href='/jquery-git2.min.js'>minified</a></li>";
	gitListing += "<li><a href='/jquery-git1.js'>jQuery 1.x git build</a> - <a href='/jquery-git1.min.js'>minified</a></li>";
	gitListing += "<li><a href='/jquery-migrate-git.js'>jQuery Migrate git build</a> - <a href='/jquery-migrate-git.min.js'>minified</a></li>";
	gitListing += "</ul>";

	mainIndex += gitListing;

	latestStable = getLatestStable( jQueryMigrate );
	mainIndex += "<h3>jQuery Migrate - Latest Version</h3>";
	mainIndex += "<ul>";
	mainIndex += listItem( "jQuery Migrate", latestStable, jQueryMigrate[ latestStable ] );
	mainIndex += "</ul>";


	// Build /jquery/
	projectIndex = "<script>{\"title\":\"jQuery Core - All Versions\"}</script>\n";
	projectIndex += gitListing;

	projectIndex += "<h2>jQuery Core - All 2.x Versions</h2>";
	projectIndex += "<ul>";
	Object.keys( jQuery2 ).forEach(function( version ) {
		projectIndex += listItem( "jQuery Core", version, jQuery2[ version ] );
	});
	projectIndex += "</ul>";

	projectIndex += "<h2>jQuery Core - All 1.x Versions</h2>";
	projectIndex += "<ul>";
	Object.keys( jQuery1 ).forEach(function( version ) {
		projectIndex += listItem( "jQuery Core", version, jQuery1[ version ] );
	});
	projectIndex += "</ul>";

	projectIndex += "<h2>jQuery Migrate - All Versions</h2>";
	projectIndex += "<ul>";
	Object.keys( jQueryMigrate ).forEach(function( version ) {
		projectIndex += listItem( "jQuery Migrate", version, jQueryMigrate[ version ] );
	});
	projectIndex += "</ul>";
	grunt.file.write( "dist/wordpress/posts/page/jquery.html", projectIndex );

	grunt.file.write( "dist/wordpress/posts/page/index.html", mainIndex );
});

};
