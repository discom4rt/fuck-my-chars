/**
 * Download FuckMyChars and call up()
 **/
(function( window, document, undefined ) {

  var loading = false,
   ctag;

  if( !window.FuckMyChars ) {

    if( loading ) {
      return;
    }

    loading = true;
    ctag = document.createElement( 'link' );
    ctag.setAttribute('href', 'http://discom4rt.github.io/fuck-my-chars/css/fuck-my-chars.css');
    ctag.setAttribute('rel', 'stylesheet');
    ctag.setAttribute('type', 'text/css');
    ctag.onload = function() {
      loadScript();
    };
    document.getElementsByTagName('head')[0].appendChild(ctag);
  } else {
    FuckMyChars.up();
  }

  function loadScript() {
    var stag = document.createElement( 'script' );
    stag.setAttribute( 'src', 'http://discom4rt.github.io/fuck-my-chars/js/fuck-my-chars.js' );
    stag.onload = function() {
      loading = false;
      FuckMyChars.up();
    };
    document.body.appendChild( stag );
  }

}( window, document ));