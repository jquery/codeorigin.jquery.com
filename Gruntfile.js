"use strict";

module.exports = function( grunt ) {

var _ = require( "lodash" ),
	semver = require( "semver" ),
	Handlebars = require( "handlebars" ),
	http = require( "http" );

grunt.loadNpmTasks( "grunt-jquery-content" );
grunt.loadNpmTasks( "grunt-sri" );

grunt.initConfig( {
	sri: {
		generate: {
			src: [
				"cdn/**/*.js",
				"cdn/**/*.css"
			],
			options: {
				algorithms: ["sha256"],
				dest: "resources/sri-directives.json"
			}
		}
	},

	wordpress: (function() {

		// This fails with "Cannot find module" if the file does not exist
		var config = require( "./config" );
		config.dir = "dist/wordpress";
		return config;
	})(),

	// This copies /resources/* to /dist/wordpress/resources/*,
	// This is flattened (subpaths not preserved) to just base filenames,
	// and then uploaded by "wordpress-deploy" to the web server.
	"build-resources": {
		all: "resources/**"
	}
} );

grunt.registerTask( "build-index", function() {
	var rversion = /^(\d+)\.(\d+)(?:\.(\d+))?-?(.*)$/;

	function normalizeVersion( version ) {
		var match = rversion.exec( version );

		return match[1] + "." + match[2] + "." + ( match[3] || 0 ) +
			( match[4] ? "-" + match[4] : "" );
	}

	function camelCase( str ) {
		return str.replace( /-([a-z])/g, function( $0, $1 ) {
			return $1.toUpperCase();
		} );
	}

	function getLatestStable( releases ) {
		return _.find( releases, function( release ) {
			return release.version.indexOf( "-" ) === -1;
		} );
	}

	function parseReleases( files, regex ) {
		return files
			.map( function( filename ) {
				var matches = regex.exec( filename );

				// matches[ 3 ] = "min" or "pack" or ""
				if ( !matches || matches[3] ) {
					return null;
				}

				return {
					filename: matches[0],
					version: normalizeVersion( matches[2] )
				};
			} )

			// Remove null values from filtering
			.filter( _.identity )
			.sort( function( a, b ) {
				return semver.compare( b.version, a.version );
			} );
	}

	function parseStableReleases() {
		return parseReleases.apply( null, arguments )
			.filter( function( release ) {

				// Filter out non-stable releases via this semver trick.
				return semver.satisfies( release.version, ">=0" )
			} )
	}

	function groupByMajor( releases ) {
		return _( releases )
			.groupBy( function( release ) {
				return semver.major( release.version );
			} )
			.map( function( group, key ) {
				return [key, group]
			} )
			.sortBy( function( group ) {
				return group[0];
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
				packFilename = release.filename.replace( ".js", ".pack.js" ),
				slimFilename = release.filename.replace( ".js", ".slim.js" ),
				slimMinFilename = release.filename.replace( ".js", ".slim.min.js" );

			if ( files.indexOf( "cdn/" + minFilename ) !== -1 ) {
				release.minified = minFilename;
			}
			if ( files.indexOf( "cdn/" + packFilename ) !== -1 ) {
				release.packed = packFilename;
			}
			if ( files.indexOf( "cdn/" + slimFilename ) !== -1 ) {
				release.slim = slimFilename;
			}
			if ( files.indexOf( "cdn/" + slimMinFilename ) !== -1 ) {
				release.slimMinified = slimMinFilename;
			}
		}

		coreReleasesGrouped.forEach( function( group ) {
			group[1].forEach( addTypes );
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
			index.jquery.push( [group[0], {
				latestStable: getLatestStable( group[1] ),
				all: group[1]
			}] );
		} );

		return index;
	}

	function getUiData() {
		var majorReleases = {},
			uiReleases = grunt.file.expand( {filter: "isDirectory"}, "cdn/ui/*" )
				.map( function( dir ) {
					var filename = dir.substring( 4 ) + "/jquery-ui.js";

					return {
						filename: filename,
						version: dir.substring( 7 ),
						minified: filename.replace( ".js", ".min.js" ),
						themes: grunt.file.expand( {filter: "isDirectory"}, dir + "/themes/*" )
							.map( function( themeDir ) {
								return themeDir.substring( dir.length + 8 );
							} )
					};
				} )
				.sort( function( a, b ) {
					return semver.compare( b.version, a.version );
				} );

		// Group by major release
		uiReleases.forEach( function( release ) {
			var major = /^\d+\.\d+/.exec( release.version )[0];
			if ( !majorReleases[major] ) {
				majorReleases[major] = [];
			}

			majorReleases[major].push( release );
		} );

		// Convert to array of major release groups
		return Object.keys( majorReleases ).map( function( major ) {
			var all = majorReleases[major],
				latestStable = getLatestStable( all );

			return {
				major: major,
				latestStable: latestStable,
				all: all.filter( function( release ) {
					return release !== latestStable;
				} )
			};
		} );
	}

	function getMobileData() {
		var files = grunt.file.expand( "cdn/mobile/*/*.css" ),
			releases = files.map( function( file ) {
				var version = /cdn\/mobile\/([^\/]+)/.exec( file )[1],
					filename = "mobile/" + version + "/jquery.mobile-" + version + ".js",
					mainCssFile = "cdn/" + filename.replace( ".js", ".css" );

				if ( file !== mainCssFile ) {
					return null;
				}

				return {
					filename: filename,
					version: normalizeVersion( version )
				};
			} )
			// Remove null values from filtering
				.filter( _.identity )
				.sort( function( a, b ) {
					return semver.compare( b.version, a.version );
				} );

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
			modes = ["svg-names", "plus-names"];

		function addTypes( release ) {
			release.minified = release.filename.replace( ".js", ".min.js" );

			modes.forEach( function( mode ) {
				var filename = release.filename.replace( "jquery.color", "jquery.color." + mode ),
					minFilename = filename.replace( ".js", ".min.js" );

				if ( files.indexOf( "cdn/" + filename ) !== -1 ) {
					release[camelCase( mode )] = {
						filename: filename,
						version: release.version,
						minified: minFilename
					};
				}
			} );
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

		releases.forEach( function( release ) {
			release.theme = release.filename.replace( ".js", ".css" );
		} );

		return {
			latestStable: getLatestStable( releases ),
			all: releases
		};
	}

	function getPepData() {
		var releases = grunt.file.expand( {filter: "isDirectory"}, "cdn/pep/*" )
			.map( function( dir ) {
				var filename = dir.substring( 4 ) + "/pep.js";

				return {
					filename: filename,
					version: dir.substring( 8 ),
					minified: filename.replace( ".js", ".min.js" )
				};
			} )
			.sort( function( a, b ) {
				return semver.compare( b.version, a.version );
			} );

		return {
			latestStable: getLatestStable( releases ),
			all: releases
		};
	}

	var sriHashes = require( "./resources/sri-directives.json" );

	function cdnSriLink( file, label ) {
		var sri = "sha256-" + sriHashes[ `@cdn/${ file }` ].hashes.sha256,
			cdnOrigin = grunt.config( "wordpress" ).cdn_origin || "https://code.jquery.com";
		return `<a
			class='open-sri-modal'
			href='${ cdnOrigin }/${ file }'
			data-hash='${ sri }'
		>${ label }</a>`;
	}

	function cdnLink( file, label ) {
		var cdnOrigin = grunt.config( "wordpress" ).cdn_origin;
		return `<a href='${ cdnOrigin }/${ file }'>${ label }</a>`;
	}

	Handlebars.registerHelper( "ifeq", function( v1, v2, options ) {
		if ( v1 === v2 ) {
			return options.fn( this );
		}
		return options.inverse( this );
	} );

	Handlebars.registerHelper( "cdnSriLink", function( file, label ) {
		return new Handlebars.SafeString( cdnSriLink( file, label ) );
	} );
	Handlebars.registerHelper( "cdnLink", function( file, label ) {
		return new Handlebars.SafeString( cdnLink( file, label ) );
	} );

	Handlebars.registerHelper( "concat2",function( p1, p2 ) {
		return `${ p1 }${ p2 }`;
	} );
	Handlebars.registerHelper( "concat3",function( p1, p2, p3 ) {
		return `${ p1 }${ p2 }${ p3 }`;
	} );
	Handlebars.registerHelper( "concat4",function( p1, p2, p3, p4 ) {
		return `${ p1 }${ p2 }${ p3 }${ p4 }`;
	} );
	Handlebars.registerHelper( "concat5",function( p1, p2, p3, p4, p5 ) {
		return `${ p1 }${ p2 }${ p3 }${ p4 }${ p5 }`;
	} );

	Handlebars.registerHelper( "release", function( prefix, release ) {
		var html = prefix + " " + release.version + " - " + cdnSriLink( release.filename, "uncompressed" );
		if ( release.minified ) {
			html += ", " + cdnSriLink( release.minified, "minified" );
		}
		if ( release.packed ) {
			html += ", " + cdnSriLink( release.packed, "packed" );
		}
		if ( release.slim ) {
			html += ", " + cdnSriLink( release.slim, "slim" );
		}
		if ( release.slimMinified ) {
			html += ", " + cdnSriLink( release.slimMinified, "slim minified" );
		}

		return new Handlebars.SafeString( html );
	} );

	Handlebars.registerHelper( "uiTheme", function( release ) {
		var url,
			cdnOrigin = grunt.config( "wordpress" ).cdn_origin;

		// TODO: link to minified theme if available
		if ( release.themes.indexOf( "smoothness" ) !== -1 ) {
			url = "smoothness/jquery-ui.css";
		} else {
			url = "base/jquery-ui.css";
		}

		return new Handlebars.SafeString(
			`<a href='${ cdnOrigin }/ui/${ release.version }/themes/${ url }'>theme</a>` );
	} );

	Handlebars.registerHelper( "include", (function() {
		var templates = {};
		return function( template ) {
			if ( !templates.hasOwnProperty( template ) ) {
				templates[template] = Handlebars.compile(
					grunt.file.read( "templates/" + template + ".hbs" ) );
			}

			return new Handlebars.SafeString( templates[template]( this ) );
		};
	})() );

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

	grunt.file.write( "dist/wordpress/resources/cdn.json",
		JSON.stringify( data, null, 2 ) );
} );

// The "grunt deploy" command is automatically invoked on git-commit by the server that
// will deploy the WordPress site.
// Task tree: "deploy" > "wordpress-deploy" > "build-wordpress" > "build".
grunt.registerTask( "build", ["sri:generate", "build-index", "build-resources"] );
grunt.registerTask( "deploy", ["wordpress-deploy"] );

};
