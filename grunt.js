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
				var type,
					matches = regex.exec( filename );

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

	function getCoreData() {
		var files = grunt.file.expandFiles( "cdn/*.js" ),
			coreReleases = parseReleases( files,
				/(jquery-(\d+\.\d+(?:\.\d+)?[^.]*)(?:\.(min|pack))?\.js)/ ),
			jquery2Releases = coreReleases.filter(function( match ) {
				return semver.satisfies( match.version, "2.x" );
			}),
			jquery1Releases = coreReleases.filter(function( match ) {
				return semver.satisfies( match.version, "1.x" );
			}),
			migrateReleases = parseReleases( files,
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

		jquery1Releases.forEach( addTypes );
		jquery2Releases.forEach( addTypes );
		migrateReleases.forEach( addTypes );

		return {
			jquery2: {
				latestStable: getLatestStable( jquery2Releases ),
				all: jquery2Releases
			},
			jquery1: {
				latestStable: getLatestStable( jquery1Releases ),
				all: jquery1Releases
			},
			migrate: {
				latestStable: getLatestStable( migrateReleases ),
				all: migrateReleases
			}
		};
	}

	function getUiData() {
		var majorReleases = {},
			uiReleases = grunt.file.expandDirs( "cdn/ui/*" )
			.map(function( dir ) {
				var version,
					filename = dir.substring( 4 ) + "jquery-ui.js";

				version = dir.substring( 7 );
				version = version.substring( 0, version.length - 1 );

				return {
					filename: filename,
					version: version,
					minified: filename.replace( ".js", ".min.js" ),
					themes: grunt.file.expandDirs( dir + "themes/*" ).map(function( themeDir ) {
						var theme = themeDir.substring( dir.length + 7 );
						return theme.substring( 0, theme.length - 1 );
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

	function getColorData() {
		var files = grunt.file.expandFiles( "cdn/color/*.js" ),
			releases = parseReleases( files,
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

	function getMobileData() {
		var files = grunt.file.expandFiles( "cdn/mobile/*/*.css" ),
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

	function getQunitData() {
		var files = grunt.file.expandFiles( "cdn/qunit/*.js" ),
			releases = parseReleases( files,
				/(qunit\/qunit-(\d+\.\d+\.\d+[^.]*)(?:\.(min))?\.js)/ );

		releases.forEach(function( release ) {
			release.theme = release.filename.replace( ".js", ".css" );
		});

		return {
			latestStable: getLatestStable( releases ),
			all: releases
		};
	}

	Handlebars.registerHelper( "release", function( prefix, release ) {
		var html = prefix + " " + release.version + " - " +
			"<a href='/" + release.filename + "'>uncompressed</a>";

		if ( release.minified ) {
			html += ", <a href='/" + release.minified + "'>minified</a>";
		}
		if ( release.packed ) {
			html += ", <a href='/" + release.packed + "'>packed</a>";
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
	data.ui = getUiData(),
	data.color = getColorData();
	data.mobile = getMobileData();
	data.qunit = getQunitData();

	grunt.file.write( "dist/wordpress/posts/page/index.html",
		Handlebars.compile( grunt.file.read( "templates/index.hbs" ) )( data ) );

	grunt.file.write( "dist/wordpress/posts/page/jquery.html",
		Handlebars.compile( grunt.file.read( "templates/jquery.hbs" ) )( data ) );

	grunt.file.write( "dist/wordpress/posts/page/ui.html",
		Handlebars.compile( grunt.file.read( "templates/ui.hbs" ) )( data ) );

	grunt.file.write( "dist/wordpress/posts/page/color.html",
		Handlebars.compile( grunt.file.read( "templates/color.hbs" ) )( data ) );

	grunt.file.write( "dist/wordpress/posts/page/mobile.html",
		Handlebars.compile( grunt.file.read( "templates/mobile.hbs" ) )( data ) );

	grunt.file.write( "dist/wordpress/posts/page/qunit.html",
		Handlebars.compile( grunt.file.read( "templates/qunit.hbs" ) )( data ) );
});

};
