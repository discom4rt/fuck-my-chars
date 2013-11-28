(function( window, document, undefined ) {

var FuckMyChars = function() {
  var FUCKED_CLASS = 'fucked',
    FUCKED_REGEXP = new RegExp('\\b' + FUCKED_CLASS + '\\b'),
    SPACE_CHARS = /^\s+$/;

  /**
   * Retrieve all text nodes which are not
   * made of space characters.
   **/
  this.getTextNodes = function() {
    var walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      ),
      node = walker.nextNode(),
      textNodes = [];

    while(node) {

      if( !SPACE_CHARS.test( node.nodeValue ) ) {
        textNodes.push(node);
      }
        
      node = walker.nextNode();
    }

    return textNodes;
  };

  /**
   * Fuck up all the characters on the page by grabbing each
   * character and applying a set of random mutations to it.
   **/
  this.up = function() {
    var textNodes = this.getTextNodes(),
      self = this,
      i = textNodes.length,
      j,
      node,
      parent,
      tmpFrag,
      spans,
      span,
      spanRect;

    while( i-- ) {
      node = textNodes[i];
      parent = node.parentElement;

      if( FUCKED_REGEXP.test( parent.className ) ) {
        continue;
      }

      tmpFrag = document.createDocumentFragment();
      node.nodeValue.replace(/(.)/g, function( match ) {
        var tmpSpan = document.createElement('span');
        tmpSpan.className = FUCKED_CLASS;
        tmpSpan.setAttribute('style', 'display:inline;background:transparent;');
        tmpSpan.innerHTML = match;
        tmpFrag.appendChild(tmpSpan);
      });

      parent.replaceChild(tmpFrag, node);
      spans = parent.getElementsByClassName(FUCKED_CLASS);
      j = spans.length;

      while( j-- ) {
        span = spans[j];
        spanRect = span.getBoundingClientRect();
        span.style.left = spanRect.left + 'px';
        span.style.top = spanRect.top + 'px';
      }
    }

    spans = document.getElementsByClassName(FUCKED_CLASS);
    j = spans.length;

    while( j-- ) {
      span = spans[j];
      span.style.display = 'inline-block';
    }

    j = spans.length;
    while( j-- ) {
      this.randomlyMutate( spans[j] );
    }
  };

  /**
   * Randomly apply a mutation to the given element.
   **/
  this.randomlyMutate = function( element ) {
    var css = {},
      prop;

    applyRandomRotation( css );
    applyRandomPulsate( css );
    applyRandomColor( css );
    applyRandomFontSize( css );
    applyRandomBackgroundColor( css );

    for( prop in css ) {
      element.style[prop] = css[prop];
    }
  };

  var getChance = function() {
    return Math.floor(Math.random() * 2);
  };

  var applyRandomRotation = function( css ) {
    if( getChance() ) {
      spinTiming = Math.random() * 5;
      addAnimation(css, 'rotation', spinTiming);
    } else {
      removeAnimation(css, 'rotation');
    }
  };

  var applyRandomPulsate = function( css ) {
    if( getChance() ) {
      pulsateTiming = Math.random() * 5;
      addAnimation(css, 'pulsate', pulsateTiming);
    } else {
      removeAnimation(css, 'pulsate');
    }
  };

  var applyRandomColor = function( css ) {
    if( getChance() ) {
      color = 'rgb('+ (Math.floor(Math.random() * 256)) + ','
                    + (Math.floor(Math.random() * 256)) + ','
                    + (Math.floor(Math.random() * 256)) + ')';
      css['color'] = color;
    } else {
      css['color'] = 'inherit';
    }
  };

  var applyRandomFontSize = function( css ) {
    if( getChance() ) {
      fontSize = Math.ceil(Math.random() * 3);
      css['fontSize'] = fontSize + 'em';
    } else {
      css['fontSize'] = 'inherit';
    }
  };

  var applyRandomBackgroundColor = function( css ) {
    if( getChance() ) {
      bgColor = 'rgb('+ (Math.floor(Math.random() * 256)) + ','
                      + (Math.floor(Math.random() * 256)) + ','
                      + (Math.floor(Math.random() * 256)) + ')';
      css['backgroundColor'] = bgColor;
    } else {
      css['backgroundColor'] = 'inherit';
    }
  };

  var addAnimation = function( css, name, timing ) {
    var comma = css['animation'] && css['animation'].length > 0 && ',' || '';

    css['animation'] = (css['animation'] || '');
    css['mozAnimation'] = (css['mozAnimation'] || '');
    css['webkitAnimation'] = (css['webkitAnimation'] || '');

    css['animation'] += comma + name + ' ' + timing +'s infinite linear';
    css['mozAnimation'] += comma + name + ' ' + timing +'s infinite linear';
    css['webkitAnimation'] +=  comma + name + ' ' + timing +'s infinite linear';
  };

  var removeAnimation = function( css, name ) {
    var regex = new RegExp(name+'[^,]+(,|$)');

    if( !css['animation'] ) {
      return;
    }

    css['animation'] = css['animation'].replace(regex, '');
    css['mozAnimation'] = css['animation'].replace(regex, '');
    css['webkitAnimation'] = css['animation'].replace(regex, '');
  };
};

window.FuckMyChars = new FuckMyChars();

}( window, document ));
