/**
 * Download FuckMyChars and call up()
 **/
(function( window, document, undefined ) {

  var stag;

  if( !window.FuckMyChars ) {
    stag = document.createElement( 'script' );
    stag.setAttribute( 'src', 'https://rawgithub.com/discom4rt/fuck-my-chars/master/js/fuck-my-chars.js' );
    stag.onload = function(){ FuckMyChars.up(); };
    document.body.appendChild( stag );
  } else {
    FuckMyChars.up();
  }

}( window, document ));