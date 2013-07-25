module.exports = function( grunt ) {

"use strict";

var _ = require( "underscore" ),
	semver = require( "semver" ),
	Handlebars = require( "handlebars" );

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

function getLatestStable( organized ) {
	return _.find( Object.keys( organized ), function( version ) {
		return version.indexOf( "-" ) === -1;
	});
}

var rjQueryVersion = /(jquery-(\d+\.\d+(?:\.\d+)?[^.]*)(?:\.(min|pack))?\.js)/;
var rjQueryMigrateVersion = /(jquery-migrate-(\d+\.\d+(?:\.\d+)?[^.]*)(?:\.min)?\.js)/;
grunt.registerTask( "build-index", function() {
	var files = grunt.file.expandFiles( "cdn/**.js" ),
		jQueryCoreFiles = parseFiles( files, rjQueryVersion ),
		jQueryMigrateFiles = parseFiles( files, rjQueryMigrateVersion ),
		jQuery2 = organize( jQueryCoreFiles.filter(function( match ) {
			return semver.satisfies( match.version, "2.x" );
		})),
		jQuery1 = organize( jQueryCoreFiles.filter(function( match ) {
			return semver.satisfies( match.version, "1.x" );
		})),
		jQueryMigrate = organize( jQueryMigrateFiles ),
		data = {
			jquery2: {
				latestStable: jQuery2[ getLatestStable( jQuery2 ) ],
				all: jQuery2
			},
			jquery1: {
				latestStable: jQuery1[ getLatestStable( jQuery1 ) ],
				all: jQuery1
			},
			migrate: {
				latestStable: jQueryMigrate[ getLatestStable( jQueryMigrate ) ],
				all: jQueryMigrate
			}
		};

	Handlebars.registerHelper( "listItem", function( prefix, files ) {
		var li = "<li>";
		Object.keys( files ).forEach(function( type, index ) {
			if ( !index ) {
				li += prefix + " " + files[ type ].version + " - ";
			} else {
				li += " or ";
			}

			li += "<a href='/" + files[ type ].filename + "'>" + type + "</a> ";
		});
		li += "</li>";

		return new Handlebars.SafeString( li );
	});

	Handlebars.registerHelper( "include", (function() {
		var templates = {};
		return function( template ) {
			if ( !templates.hasOwnProperty( template ) ) {
				templates[ template ] = Handlebars.compile(
					grunt.file.read( "templates/" + template + ".hbs" ) );
			}

			return new Handlebars.SafeString( templates[ template ]() );
		};
	})());

	grunt.file.write( "dist/wordpress/posts/page/index.html",
		Handlebars.compile( grunt.file.read( "templates/index.hbs" ) )( data ) );

	grunt.file.write( "dist/wordpress/posts/page/jquery.html",
		Handlebars.compile( grunt.file.read( "templates/jquery.hbs" ) )( data ) );
});

};
