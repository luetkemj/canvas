/*!
ICanHaz.js version 0.10.2 -- by @HenrikJoreteg
More info at: http://icanhazjs.com
*/
(function(){var r,v=Object.prototype.toString;Array.isArray=Array.isArray||function(a){return"[object Array]"==v.call(a)};var s=String.prototype.trim,l;if(s)l=function(a){return null==a?"":s.call(a)};else{var n,p;/\S/.test("\u00a0")?(n=/^[\s\xA0]+/,p=/[\s\xA0]+$/):(n=/^\s+/,p=/\s+$/);l=function(a){return null==a?"":a.toString().replace(n,"").replace(p,"")}}var w={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},t={},u=function(){};u.prototype={otag:"{{",ctag:"}}",pragmas:{},buffer:[],pragmas_implemented:{"IMPLICIT-ITERATOR":!0},
context:{},render:function(a,c,b,d){d||(this.context=c,this.buffer=[]);if(this.includes("",a)){a=this.render_pragmas(a);var e=this.render_section(a,c,b);!1===e&&(e=this.render_tags(a,c,b,d));if(d)return e;this.sendLines(e)}else{if(d)return a;this.send(a)}},send:function(a){""!==a&&this.buffer.push(a)},sendLines:function(a){if(a){a=a.split("\n");for(var c=0;c<a.length;c++)this.send(a[c])}},render_pragmas:function(a){if(!this.includes("%",a))return a;var c=this,b=this.getCachedRegex("render_pragmas",
function(a,b){return RegExp(a+"%([\\w-]+) ?([\\w]+=[\\w]+)?"+b,"g")});return a.replace(b,function(a,b,g){if(!c.pragmas_implemented[b])throw{message:"This implementation of mustache doesn't understand the '"+b+"' pragma"};c.pragmas[b]={};g&&(a=g.split("="),c.pragmas[b][a[0]]=a[1]);return""})},render_partial:function(a,c,b){a=l(a);if(!b||void 0===b[a])throw{message:"unknown_partial '"+a+"'"};return!c||"object"!=typeof c[a]?this.render(b[a],c,b,!0):this.render(b[a],c[a],b,!0)},render_section:function(a,
c,b){if(!this.includes("#",a)&&!this.includes("^",a))return!1;var d=this,e=this.getCachedRegex("render_section",function(a,b){return RegExp("^([\\s\\S]*?)"+a+"(\\^|\\#)\\s*(.+)\\s*"+b+"\n*([\\s\\S]*?)"+a+"\\/\\s*\\3\\s*"+b+"\\s*([\\s\\S]*)$","g")});return a.replace(e,function(a,e,j,f,k,m){a=e?d.render_tags(e,c,b,!0):"";m=m?d.render(m,c,b,!0):"";var q;f=d.find(f,c);"^"===j?q=!f||Array.isArray(f)&&0===f.length?d.render(k,c,b,!0):"":"#"===j&&(q=Array.isArray(f)?d.map(f,function(a){return d.render(k,
d.create_context(a),b,!0)}).join(""):d.is_object(f)?d.render(k,d.create_context(f),b,!0):"function"==typeof f?f.call(c,k,function(a){return d.render(a,c,b,!0)}):f?d.render(k,c,b,!0):"");return a+q+m})},render_tags:function(a,c,b,d){var e=this,g=function(){return e.getCachedRegex("render_tags",function(a,b){return RegExp(a+"(=|!|>|&|\\{|%)?([^#\\^]+?)\\1?"+b+"+","g")})},h=g(),j=function(a,d,f){switch(d){case "!":return"";case "=":return e.set_delimiters(f),h=g(),"";case ">":return e.render_partial(f,
c,b);case "{":case "&":return e.find(f,c);default:return a=e.find(f,c),String(a).replace(/&(?!\w+;)|[<>"']/g,function(a){return w[a]||a})}};a=a.split("\n");for(var f=0;f<a.length;f++)a[f]=a[f].replace(h,j,this),d||this.send(a[f]);if(d)return a.join("\n")},set_delimiters:function(a){a=a.split(" ");this.otag=this.escape_regex(a[0]);this.ctag=this.escape_regex(a[1])},escape_regex:function(a){arguments.callee.sRE||(arguments.callee.sRE=RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)","g"));
return a.replace(arguments.callee.sRE,"\\$1")},find:function(a,c){a=l(a);var b;if(a.match(/([a-z_]+)\./ig)){var d=this.walk_context(a,c);(!1===d||0===d||d)&&(b=d)}else!1===c[a]||0===c[a]||c[a]?b=c[a]:(!1===this.context[a]||0===this.context[a]||this.context[a])&&(b=this.context[a]);return"function"==typeof b?b.apply(c):void 0!==b?b:""},walk_context:function(a,c){for(var b=a.split("."),d=void 0!=c[b[0]]?c:this.context,e=d[b.shift()];void 0!=e&&0<b.length;)d=e,e=e[b.shift()];return"function"==typeof e?
e.apply(d):e},includes:function(a,c){return-1!=c.indexOf(this.otag+a)},create_context:function(a){if(this.is_object(a))return a;var c=".";this.pragmas["IMPLICIT-ITERATOR"]&&(c=this.pragmas["IMPLICIT-ITERATOR"].iterator);var b={};b[c]=a;return b},is_object:function(a){return a&&"object"==typeof a},map:function(a,c){if("function"==typeof a.map)return a.map(c);for(var b=[],d=a.length,e=0;e<d;e++)b.push(c(a[e]));return b},getCachedRegex:function(a,c){var b=t[this.otag];b||(b=t[this.otag]={});var d=b[this.ctag];
d||(d=b[this.ctag]={});(b=d[a])||(b=d[a]=c(this.otag,this.ctag));return b}};r={name:"mustache.js",version:"0.4.0",to_html:function(a,c,b,d){var e=new u;d&&(e.send=d);e.render(a,c||{},b);if(!d)return e.buffer.join("\n")}};(function(){function a(a){return"".trim?a.trim():a.replace(/^\s+/,"").replace(/\s+$/,"")}var c={VERSION:"0.10.2",templates:{},$:"undefined"!==typeof window?window.jQuery||window.Zepto||null:null,addTemplate:function(b,d){if("object"===typeof b)for(var e in b)this.addTemplate(e,b[e]);
else c[b]?console.error("Invalid name: "+b+"."):c.templates[b]?console.error('Template "'+b+'  " exists'):(c.templates[b]=d,c[b]=function(d,e){d=d||{};var j=r.to_html(c.templates[b],d,c.templates);return c.$&&!e?c.$(a(j)):j})},clearAll:function(){for(var a in c.templates)delete c[a];c.templates={}},refresh:function(){c.clearAll();c.grabTemplates()},grabTemplates:function(){var b,d,e=document.getElementsByTagName("script"),g,h=[];b=0;for(d=e.length;b<d;b++)if((g=e[b])&&g.innerHTML&&g.id&&("text/html"===
g.type||"text/x-icanhaz"===g.type))c.addTemplate(g.id,a(g.innerHTML)),h.unshift(g);b=0;for(d=h.length;b<d;b++)h[b].parentNode.removeChild(h[b])}};"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(exports=module.exports=c),exports.ich=c):this.ich=c;"undefined"!==typeof document&&(c.$?c.$(function(){c.grabTemplates()}):document.addEventListener("DOMContentLoaded",function(){c.grabTemplates()},!0))})()})();
/*
 * Bones Scripts File
 * Author: Eddie Machado
 *
 * This file should contain any js scripts you want to add to the site.
 * Instead of calling it in the header or throwing it inside wp_head()
 * this file will be called automatically in the footer so as not to
 * slow the page load.
 *
 * There are a lot of example functions and tools in here. If you don't
 * need any of it, just remove it. They are meant to be helpers and are
 * not required. It's your world baby, you can do whatever you want.
*/


/*
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
*/
function updateViewportDimensions() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y }
}
// setting the viewport width
var viewport = updateViewportDimensions();


/*
 * Throttle Resize-triggered Events
 * Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
 * ( source: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed )
*/
var waitForFinalEvent = (function () {
	var timers = {};
	return function (callback, ms, uniqueId) {
		if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
		if (timers[uniqueId]) { clearTimeout (timers[uniqueId]); }
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();

// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
var timeToWaitForLast = 100;


/*
 * Here's an example so you can see how we're using the above function
 *
 * This is commented out so it won't work, but you can copy it and
 * remove the comments.
 *
 *
 *
 * If we want to only do it on a certain page, we can setup checks so we do it
 * as efficient as possible.
 *
 * if( typeof is_home === "undefined" ) var is_home = $('body').hasClass('home');
 *
 * This once checks to see if you're on the home page based on the body class
 * We can then use that check to perform actions on the home page only
 *
 * When the window is resized, we perform this function
 * $(window).resize(function () {
 *
 *    // if we're on the home page, we wait the set amount (in function above) then fire the function
 *    if( is_home ) { waitForFinalEvent( function() {
 *
 *      // if we're above or equal to 768 fire this off
 *      if( viewport.width >= 768 ) {
 *        console.log('On home page and window sized to 768 width or more.');
 *      } else {
 *        // otherwise, let's do this instead
 *        console.log('Not on home page, or window sized to less than 768.');
 *      }
 *
 *    }, timeToWaitForLast, "your-function-identifier-string"); }
 * });
 *
 * Pretty cool huh? You can create functions like this to conditionally load
 * content and other stuff dependent on the viewport.
 * Remember that mobile devices and javascript aren't the best of friends.
 * Keep it light and always make sure the larger viewports are doing the heavy lifting.
 *
*/

/*
 * We're going to swap out the gravatars.
 * In the functions.php file, you can see we're not loading the gravatar
 * images on mobile to save bandwidth. Once we hit an acceptable viewport
 * then we can swap out those images since they are located in a data attribute.
*/
function loadGravatars() {
  // set the viewport using the function above
  viewport = updateViewportDimensions();
  // if the viewport is tablet or larger, we load in the gravatars
  if (viewport.width >= 768) {
  jQuery('.comment img[data-gravatar]').each(function(){
    jQuery(this).attr('src',jQuery(this).attr('data-gravatar'));
  });
	}
} // end function


/*
 * Put all your regular jQuery in here.
*/
jQuery(document).ready(function($) {

  /*
   * Let's fire off the gravatar function
   * You can remove this if you don't need it
  */
  loadGravatars();






$.ajax({
    type: "GET",
    url: 'http://canvas.dev/wp-json/posts/?_jsonp=?',
    dataType: 'jsonp',
}).success( function(response){




    console.log(response);  
    var tracker = 0;

    // $(window).scroll(function() {
    //    if($(window).scrollTop() + $(window).height() == $(document).height()) {
                    
    //       var user = ich.user(response[tracker]);
    //       $('#main').append( $(user).hide().fadeIn(2000) );

    //       tracker = tracker + 1;
          
    //       if ( tracker >= response.length ){
    //         $(this).html('nope').off();
    //       }

    //    }
    // });



// var item = $('.canvas article');
// var canvas = $('.canvas .frame');

// var canvasWidth;

// item.scroll(function() {
//    if(item.scrollLeft() + item.width() == canvas.width()) {
//     var user = ich.user(response[tracker]);
//     $('#main').append( $(user).hide().fadeIn(2000) );
    
//     tracker = tracker + 1;
    
//     if ( tracker >= response.length ){
//       $(this).html('nope').off();
//     }

// console.log('blam');

//    }
// });




});

// console.log( $('#filmstrip-wrapper').width() );
$(window).load(function(){

    var width = 0;

    $( '#filmstrip-wrapper img' ).each(function(){
        width = width + $(this).width();
    });

    $('#filmstrip-wrapper').width( width );

});

$('#filmstrip-viewport').scroll( function() {
    // if(  $('#filmstrip-viewport').scrollLeft() + $('#filmstrip-viewport').width() == $('#filmstrip-wrapper').width()  ) {
      console.log( $('#filmstrip-viewport').scrollLeft() );
      console.log( $('#filmstrip-wrapper').width() );
    // }
});



// some dev notes that I need for devving stuff and whatnot...
// look to filmstrip for some clues https://github.com/luetkemj/filmstrip

// init: 
//   get json object of all posts (or whatever I'm using for this)
//   set vars for 
//     canvas width
//     content width

//   start appending posts
//     as each appends determine it's width and add that to the content width
//     once content width > canvas width stop appending posts
//     when you scroll append new item but find it's width and add that to the canvas width so you can keep scrolling
//     incorporate a some sort of throttle such that you can't accidentally load a hundred posts or something crazy.







}); /* end of as page load scripts */
