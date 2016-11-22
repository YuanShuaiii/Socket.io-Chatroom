;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-nimingshuo" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M728.685599 428.012144m-34.737152 0a33.946 33.946 0 1 0 69.474304 0 33.946 33.946 0 1 0-69.474304 0Z"  ></path>'+
      ''+
      '<path d="M512.000512 64.188928c-246.019183 0-445.456445 199.436238-445.456445 445.454398 0 90.705861 27.114544 175.075411 73.674976 245.455341L66.351686 913.469628c-5.212722 11.175527-3.232624 24.385387 5.028527 33.540907 5.92699 6.568602 14.259772 10.134825 22.798239 10.134825 3.363607 0 6.758937-0.553609 10.051937-1.694595l180.535773-62.594617c66.529229 39.535435 144.228869 62.241576 227.234351 62.241576 246.017136 0 445.454398-199.437262 445.454398-445.455421S758.017648 64.188928 512.000512 64.188928zM802.914184 532.959358c-57.156768 31.152511-183.986361 49.377594-239.237733 49.377594-71.131037 0-178.140213-21.084201-237.2034-49.377594-56.935734-27.276227-96.212272-62.486146-96.212272-125.619022s52.731992-100.398618 114.312512-114.313535c47.63081-10.763135 164.327626-19.337417 219.102137-19.337417s168.612209 4.76349 219.101113 19.337417c60.656475 17.508769 114.313535 51.18066 114.313535 114.313535S858.349751 502.746242 802.914184 532.959358z"  ></path>'+
      ''+
      '<path d="M460.063629 428.012144m-34.737152 0a33.946 33.946 0 1 0 69.474304 0 33.946 33.946 0 1 0-69.474304 0Z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
