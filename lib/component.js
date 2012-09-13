/*
	anvil.component - Adds component support to anvil
	version:	0.0.1
	author:		Alex Robson <alex@sharplearningcurve.com> (http://sharplearningcurve.com)
	copyright:	2011 - 2012
	license:	Dual licensed
				MIT (http://www.opensource.org/licenses/mit-license)
				GPL (http://www.opensource.org/licenses/gpl-license)
*/
var path = require( "path" );

module.exports = function( _, anvil ) {

	return anvil.plugin( {
		name: "anvil.component",
		activity: "identify",
		
		run: function( done ) {
			anvil.fs.getFiles( "./components", "./components", function( files, directories ) {
				anvil.log.event( "found " + directories.length + " components" );
				var componentsBase = path.resolve( "./components" ),
					metadata = [];
				_.each( directories, function( directory ) {
					var relativePath = directory.replace( componentsBase, "" );
						componentPath = anvil.fs.buildPath( [ directory, "component.json" ] ),
						component = require( componentPath ),
						componentName = path.basename( directory ).replace( /component[-]/, "" );
					var files = [];
					if( component.main ) {
						files.push( component.main );
					}
					if( component.styles ) {
						files = files.concat( component.styles );
					}
					if( component.scripts ) {
						files = files.concat( component.scripts );
					}
					var data = _.map( files, function( file ) {
						file = anvil.fs.buildPath( [ directory, file ] );
						var data = anvil.fs.buildFileData(
								path.dirname( file ),
								anvil.fs.buildPath( [ anvil.config.working, "src", "ext", componentName ] ),
								file );
						data.relativePath = anvil.fs.buildPath( [ "ext", relativePath ] ).replace( /component[-]/, "" );
						return data;
					} );
					metadata = metadata.concat( data );
				} );
				metadata = _.uniq( metadata, false, function( x ) { return x.fullPath; } );
				anvil.project.files = anvil.project.files.concat( metadata );
				done();
			}, [], 0 );
		}
	} );
};