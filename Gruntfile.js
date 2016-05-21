module.exports = function( grunt ) {

var _ = require( "lodash" ),
	semver = require( "semver" ),
	Handlebars = require( "handlebars" ),
	http = require( "http" );

grunt.loadNpmTasks( "grunt-jquery-content" );
grunt.loadNpmTasks( "grunt-sri" );

grunt.initConfig({
	wordpress: (function() {
		var config = require( "./config" );
		config.dir = "dist/wordpress";
		return config;
	})(),
	sri: {
		generate: {
			src: [
				"cdn/**/*.js",
				"cdn/**/*.css"
			],
			options: {
				algorithms: [ "sha256" ],
				dest: "dist/resources/sri-directives.json"
			}
		}
	}
});

grunt.registerTask( "build-index", function() {
	var rversion = /^(\d+)\.(\d+)(?:\.(\d+))?-?(.*)$/;

	function normalizeVersion( version ) {
		var match = rversion.exec( version );

		return match[ 1 ] + "." + match[ 2 ] + "." + ( match[ 3 ] || 0 ) +
			( match[ 4 ] ? "-" + match[ 4 ] : "" );
	}

	function camelCase( str ) {
		return str.replace( /-([a-z])/g, function( $0, $1 ) {
			return $1.toUpperCase();
		});
	}

	function getLatestStable( releases ) {
		return _.find( releases, function( release ) {
			return release.version.indexOf( "-" ) === -1;
		});
	}

	function parseReleases( files, regex ) {
		return files
			.map(function( filename ) {
				var matches = regex.exec( filename );

				// matches[ 3 ] = "min" or "pack" or ""
				if ( !matches || matches[ 3 ] ) {
					return null;
				}

				return {
					filename: matches[ 0 ],
					version: normalizeVersion( matches[ 2 ] )
				};
			})

			// Remove null values from filtering
			.filter( _.identity )
			.sort(function( a, b ) {
				return semver.compare( b.version, a.version );
			});
	}

	function parseStableReleases() {
	    return parseReleases.apply( null, arguments )
			.filter( function ( release ) {

				// Filter out non-stable releases via this semver trick.
				return semver.satisfies( release.version, ">=0" )
			} )
	}
	
	function groupByMajor( releases ) {
	    return _( releases )
			.groupBy( function( release ) {
				return semver.major( release.version );
			} )
			.map( function( group, key) {
				return [ key, group ]
			} )
			.sortBy( function( group ) {
				return group[ 0 ];
			} )
			.reverse()
			.value()
	}

	function getCoreData() {
		var files = grunt.file.expand( "cdn/*.js" ),
			coreReleases = parseStableReleases( files,
				/(jquery-(\d+\.\d+(?:\.\d+)?[^.]*)(?:\.(min|pack))?\.js)/ ),
			coreReleasesGrouped = groupByMajor( coreReleases ),
			migrateReleases = parseStableReleases( files,
				/(jquery-migrate-(\d+\.\d+(?:\.\d+)?[^.]*)(?:\.(min))?\.js)/ );

		function addTypes( release ) {
			var minFilename = release.filename.replace( ".js", ".min.js" ),
				packFilename = release.filename.replace( ".js", ".pack.js" );

			if ( files.indexOf( "cdn/" + minFilename ) !== -1 ) {
				release.minified = minFilename;
			}
			if ( files.indexOf( "cdn/" + packFilename ) !== -1 ) {
				release.packed = packFilename;
			}
		}

		coreReleasesGrouped.forEach( function( group ) {
			group[ 1 ].forEach( addTypes );
		} );
		migrateReleases.forEach( addTypes );

		var index = {
			jquery: [],
			migrate: {
				latestStable: getLatestStable( migrateReleases ),
				all: migrateReleases
			}
		};

		coreReleasesGrouped.forEach( function( group ) {
			index.jquery.push( [ group[ 0 ], {
				latestStable: getLatestStable( group[ 1 ] ),
				all: group[ 1 ]
			} ] );
		} );

		return index;
	}

	function getUiData() {
		var majorReleases = {},
			uiReleases = grunt.file.expand( { filter: "isDirectory" }, "cdn/ui/*" )
			.map(function( dir ) {
				var filename = dir.substring( 4 ) + "/jquery-ui.js";

				return {
					filename: filename,
					version: dir.substring( 7 ),
					minified: filename.replace( ".js", ".min.js" ),
					themes: grunt.file.expand( { filter: "isDirectory" }, dir + "/themes/*" )
						.map(function( themeDir ) {
							return themeDir.substring( dir.length + 8 );
						})
				};
			})
			.sort(function( a, b ) {
				return semver.compare( b.version, a.version );
			});

		// Group by major release
		uiReleases.forEach(function( release ) {
			var major = /^\d+\.\d+/.exec( release.version )[ 0 ];
			if ( !majorReleases[ major ] ) {
				majorReleases[ major ] = [];
			}

			majorReleases[ major ].push( release );
		});

		// Convert to array of major release groups
		return Object.keys( majorReleases ).map(function( major ) {
			var all = majorReleases[ major ],
				latestStable = getLatestStable( all );

			return {
				major: major,
				latestStable: latestStable,
				all: all.filter(function( release ) {
					return release !== latestStable;
				})
			};
		});
	}

	function getMobileData() {
		var files = grunt.file.expand( "cdn/mobile/*/*.css" ),
			releases = files.map(function( file ) {
				var version = /cdn\/mobile\/([^\/]+)/.exec( file )[ 1 ],
					filename = "mobile/" + version + "/jquery.mobile-" + version + ".js",
					mainCssFile = "cdn/" + filename.replace( ".js", ".css" );

				if ( file !== mainCssFile ) {
					return null;
				}

				return {
					filename: filename,
					version: normalizeVersion( version )
				};
			})
			// Remove null values from filtering
			.filter( _.identity )
			.sort(function( a, b ) {
				return semver.compare( b.version, a.version );
			});

		function addTypes( release ) {
			var minFilename = release.filename.replace( ".js", ".min.js" ),
				css = release.filename.replace( ".js", ".css" ),
				minCss = css.replace( ".css", ".min.css" ),
				structure = css.replace( "jquery.mobile", "jquery.mobile.structure" ),
				minStructure = structure.replace( ".css", ".min.css" );

			release.minified = minFilename;
			release.css = css;
			release.minifiedCss = minCss;

			if ( files.indexOf( "cdn/" + structure ) !== -1 ) {
				release.structure = structure;
				release.minifiedStructure = minStructure;
			}
		}

		releases.forEach( addTypes );

		return {
			latestStable: getLatestStable( releases ),
			all: releases
		};
	}

	function getColorData() {
		var files = grunt.file.expand( "cdn/color/*.js" ),
			releases = parseStableReleases( files,
				/(color\/jquery.color-(\d+\.\d+(?:\.\d+)?[^.]*)(?:\.(min))?\.js)/ ),
			modes = [ "svg-names", "plus-names" ];

		function addTypes( release ) {
			release.minified = release.filename.replace( ".js", ".min.js" );

			modes.forEach(function( mode ) {
				var filename = release.filename.replace( "jquery.color", "jquery.color." + mode ),
					minFilename = filename.replace( ".js", ".min.js" );

				if ( files.indexOf( "cdn/" + filename ) !== -1 ) {
					release[ camelCase( mode ) ] = {
						filename: filename,
						version: release.version,
						minified: minFilename
					};
				}
			});
		}

		releases.forEach( addTypes );

		return {
			latestStable: getLatestStable( releases ),
			all: releases
		};
	}

	function getQunitData() {
		var files = grunt.file.expand( "cdn/qunit/*.js" ),
			releases = parseStableReleases( files,
				/(qunit\/qunit-(\d+\.\d+\.\d+[^.]*)(?:\.(min))?\.js)/ );

		releases.forEach(function( release ) {
			release.theme = release.filename.replace( ".js", ".css" );
		});

		return {
			latestStable: getLatestStable( releases ),
			all: releases
		};
	}

	function getPepData() {
		var releases = grunt.file.expand( { filter: "isDirectory" }, "cdn/pep/*" )
			.map(function( dir ) {
				var filename = dir.substring( 4 ) + "/pep.js";

				return {
					filename: filename,
					version: dir.substring( 8 ),
					minified: filename.replace( ".js", ".min.js" )
				};
			})
			.sort(function( a, b ) {
				return semver.compare( b.version, a.version );
			});

		return {
			latestStable: getLatestStable( releases ),
			all: releases
		};
	}

	var sriHashes = require( "./dist/resources/sri-directives.json" );
	function href( file, label ) {
		var sri = "sha256-" + sriHashes[ "@cdn/" + file ][ "hashes" ][ "sha256" ];
		return "<a class='open-sri-modal' href='/" + file + "' data-hash='" + sri + "'>" + label + "</a>";
	}

	Handlebars.registerHelper( "release", function( prefix, release ) {
		var html = prefix + " " + release.version + " - " + href( release.filename, "uncompressed" );
		if ( release.minified ) {
			html += ", " + href( release.minified, "minified" );
		}
		if ( release.packed ) {
			html += ", " + href( release.packed, "packed" );
		}

		return new Handlebars.SafeString( html );
	});

	Handlebars.registerHelper( "uiTheme", function( release ) {
		var url;
		// TODO: link to minified theme if available
		if ( release.themes.indexOf( "smoothness" ) !== -1) {
			url = "smoothness/jquery-ui.css";
		} else {
			url = "base/jquery-ui.css";
		}

		return new Handlebars.SafeString(
			"<a href='/ui/" + release.version + "/themes/" + url + "'>theme</a>" );
	});

	Handlebars.registerHelper( "include", (function() {
		var templates = {};
		return function( template ) {
			if ( !templates.hasOwnProperty( template ) ) {
				templates[ template ] = Handlebars.compile(
					grunt.file.read( "templates/" + template + ".hbs" ) );
			}

			return new Handlebars.SafeString( templates[ template ]( this ) );
		};
	})());

	var data = getCoreData();
	data.ui = getUiData();
	data.mobile = getMobileData();
	data.color = getColorData();
	data.qunit = getQunitData();
	data.pep = getPepData();

	grunt.file.write( "dist/wordpress/posts/page/index.html",
		Handlebars.compile( grunt.file.read( "templates/index.hbs" ) )( data ) );

	grunt.file.write( "dist/wordpress/posts/page/jquery.html",
		Handlebars.compile( grunt.file.read( "templates/jquery.hbs" ) )( data ) );

	grunt.file.write( "dist/wordpress/posts/page/ui.html",
		Handlebars.compile( grunt.file.read( "templates/ui.hbs" ) )( data ) );

	grunt.file.write( "dist/wordpress/posts/page/mobile.html",
		Handlebars.compile( grunt.file.read( "templates/mobile.hbs" ) )( data ) );

	grunt.file.write( "dist/wordpress/posts/page/color.html",
		Handlebars.compile( grunt.file.read( "templates/color.hbs" ) )( data ) );

	grunt.file.write( "dist/wordpress/posts/page/qunit.html",
		Handlebars.compile( grunt.file.read( "templates/qunit.hbs" ) )( data ) );

	grunt.file.write( "dist/wordpress/posts/page/pep.html",
		Handlebars.compile( grunt.file.read( "templates/pep.hbs" ) )( data ) );
});

grunt.registerTask( "reload-listings", function() {
	var done = this.async(),
		host = "http://" + grunt.config( "wordpress" ).url,
		paths = [ "/", "/jquery/", "/ui/", "/mobile/", "/color/", "/qunit/", "/pep/" ],
		waiting = paths.length;

	paths.forEach(function( path ) {
		path = host + path;
		http.get( path + "?reload", function( response ) {
			if ( response.statusCode >= 400 ) {
				grunt.log.error( "Error reloading " + path );
				grunt.log.error( "Status code: " + response.statusCode );
				return done( false );
			}

			grunt.log.writeln( "Successfully reloaded " + path );
			if ( !--waiting ) {
				done();
			}
		}).on( "error", function( error ) {
			grunt.log.error( "Error loading " + path );
			grunt.log.error( error );
			done( false );
		});
	});
});

grunt.registerTask( "ensure-dist-resources", function() {
	grunt.file.mkdir( "dist/resources" );
});

grunt.registerTask( "sri-generate", [ "ensure-dist-resources", "sri:generate" ] );
grunt.registerTask( "build", [ "sri-generate", "build-index" ] );
grunt.registerTask( "deploy", [ "wordpress-deploy", "reload-listings" ] );

};
