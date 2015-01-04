// PLUGINS
/*
* Nivo Lightbox v1.2.0
* http://dev7studios.com/nivo-lightbox
*
* Copyright 2013, Dev7studios
* Free to use and abuse under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/
(function(e,t,n,r){function o(t,n){this.el=t;this.$el=e(this.el);this.options=e.extend({},s,n);this._defaults=s;this._name=i;this.init()}var i="nivoLightbox",s={effect:"fade",theme:"default",keyboardNav:true,clickOverlayToClose:true,onInit:function(){},beforeShowLightbox:function(){},afterShowLightbox:function(e){},beforeHideLightbox:function(){},afterHideLightbox:function(){},onPrev:function(e){},onNext:function(e){},errorMessage:"The requested content cannot be loaded. Please try again later."};o.prototype={init:function(){var t=this;if(!e("html").hasClass("nivo-lightbox-notouch"))e("html").addClass("nivo-lightbox-notouch");if("ontouchstart"in n)e("html").removeClass("nivo-lightbox-notouch");this.$el.on("click",function(e){t.showLightbox(e)});if(this.options.keyboardNav){e("body").off("keyup").on("keyup",function(n){var r=n.keyCode?n.keyCode:n.which;if(r==27)t.destructLightbox();if(r==37)e(".nivo-lightbox-prev").trigger("click");if(r==39)e(".nivo-lightbox-next").trigger("click")})}this.options.onInit.call(this)},showLightbox:function(t){var n=this,r=this.$el;var i=this.checkContent(r);if(!i)return;t.preventDefault();this.options.beforeShowLightbox.call(this);var s=this.constructLightbox();if(!s)return;var o=s.find(".nivo-lightbox-content");if(!o)return;e("body").addClass("nivo-lightbox-body-effect-"+this.options.effect);this.processContent(o,r);if(this.$el.attr("data-lightbox-gallery")){var u=e('[data-lightbox-gallery="'+this.$el.attr("data-lightbox-gallery")+'"]');e(".nivo-lightbox-nav").show();e(".nivo-lightbox-prev").off("click").on("click",function(t){t.preventDefault();var i=u.index(r);r=u.eq(i-1);if(!e(r).length)r=u.last();n.processContent(o,r);n.options.onPrev.call(this,[r])});e(".nivo-lightbox-next").off("click").on("click",function(t){t.preventDefault();var i=u.index(r);r=u.eq(i+1);if(!e(r).length)r=u.first();n.processContent(o,r);n.options.onNext.call(this,[r])})}setTimeout(function(){s.addClass("nivo-lightbox-open");n.options.afterShowLightbox.call(this,[s])},1)},checkContent:function(e){var t=this,n=e.attr("href"),r=n.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);if(n.match(/\.(jpeg|jpg|gif|png)$/i)!==null){return true}else if(r){return true}else if(e.attr("data-lightbox-type")=="ajax"){return true}else if(n.substring(0,1)=="#"&&e.attr("data-lightbox-type")=="inline"){return true}else if(e.attr("data-lightbox-type")=="iframe"){return true}return false},processContent:function(n,r){var i=this,s=r.attr("href"),o=s.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);n.html("").addClass("nivo-lightbox-loading");if(this.isHidpi()&&r.attr("data-lightbox-hidpi")){s=r.attr("data-lightbox-hidpi")}if(s.match(/\.(jpeg|jpg|gif|png)$/i)!==null){var u=e("<img>",{src:s});u.one("load",function(){var r=e('<div class="nivo-lightbox-image" />');r.append(u);n.html(r).removeClass("nivo-lightbox-loading");r.css({"line-height":e(".nivo-lightbox-content").height()+"px",height:e(".nivo-lightbox-content").height()+"px"});e(t).resize(function(){r.css({"line-height":e(".nivo-lightbox-content").height()+"px",height:e(".nivo-lightbox-content").height()+"px"})})}).each(function(){if(this.complete)e(this).load()});u.error(function(){var t=e('<div class="nivo-lightbox-error"><p>'+i.options.errorMessage+"</p></div>");n.html(t).removeClass("nivo-lightbox-loading")})}else if(o){var a="",f="nivo-lightbox-video";if(o[1]=="youtube"){a="http://www.youtube.com/embed/"+o[4];f="nivo-lightbox-youtube"}if(o[1]=="youtu"){a="http://www.youtube.com/embed/"+o[3];f="nivo-lightbox-youtube"}if(o[1]=="vimeo"){a="http://player.vimeo.com/video/"+o[3];f="nivo-lightbox-vimeo"}if(a){var l=e("<iframe>",{src:a,"class":f,frameborder:0,vspace:0,hspace:0,scrolling:"auto"});n.html(l);l.load(function(){n.removeClass("nivo-lightbox-loading")})}}else if(r.attr("data-lightbox-type")=="ajax"){e.ajax({url:s,cache:false,success:function(r){var i=e('<div class="nivo-lightbox-ajax" />');i.append(r);n.html(i).removeClass("nivo-lightbox-loading");if(i.outerHeight()<n.height()){i.css({position:"relative",top:"50%","margin-top":-(i.outerHeight()/2)+"px"})}e(t).resize(function(){if(i.outerHeight()<n.height()){i.css({position:"relative",top:"50%","margin-top":-(i.outerHeight()/2)+"px"})}})},error:function(){var t=e('<div class="nivo-lightbox-error"><p>'+i.options.errorMessage+"</p></div>");n.html(t).removeClass("nivo-lightbox-loading")}})}else if(s.substring(0,1)=="#"&&r.attr("data-lightbox-type")=="inline"){if(e(s).length){var c=e('<div class="nivo-lightbox-inline" />');c.append(e(s).clone().show());n.html(c).removeClass("nivo-lightbox-loading");if(c.outerHeight()<n.height()){c.css({position:"relative",top:"50%","margin-top":-(c.outerHeight()/2)+"px"})}e(t).resize(function(){if(c.outerHeight()<n.height()){c.css({position:"relative",top:"50%","margin-top":-(c.outerHeight()/2)+"px"})}})}else{var h=e('<div class="nivo-lightbox-error"><p>'+i.options.errorMessage+"</p></div>");n.html(h).removeClass("nivo-lightbox-loading")}}else if(r.attr("data-lightbox-type")=="iframe"){var p=e("<iframe>",{src:s,"class":"nivo-lightbox-item",frameborder:0,vspace:0,hspace:0,scrolling:"auto"});n.html(p);p.load(function(){n.removeClass("nivo-lightbox-loading")})}else{return false}if(r.attr("title")){var d=e("<span>",{"class":"nivo-lightbox-title"});d.text(r.attr("title"));e(".nivo-lightbox-title-wrap").html(d)}else{e(".nivo-lightbox-title-wrap").html("")}},constructLightbox:function(){if(e(".nivo-lightbox-overlay").length)return e(".nivo-lightbox-overlay");var t=e("<div>",{"class":"nivo-lightbox-overlay nivo-lightbox-theme-"+this.options.theme+" nivo-lightbox-effect-"+this.options.effect});var n=e("<div>",{"class":"nivo-lightbox-wrap"});var r=e("<div>",{"class":"nivo-lightbox-content"});var i=e('<a href="#" class="nivo-lightbox-nav nivo-lightbox-prev">Previous</a><a href="#" class="nivo-lightbox-nav nivo-lightbox-next">Next</a>');var s=e('<a href="#" class="nivo-lightbox-close" title="Close">Close</a>');var o=e("<div>",{"class":"nivo-lightbox-title-wrap"});var u=0;if(u)t.addClass("nivo-lightbox-ie");n.append(r);n.append(o);t.append(n);t.append(i);t.append(s);e("body").append(t);var a=this;if(a.options.clickOverlayToClose){t.on("click",function(t){if(t.target===this||e(t.target).hasClass("nivo-lightbox-content")||e(t.target).hasClass("nivo-lightbox-image")){a.destructLightbox()}})}s.on("click",function(e){e.preventDefault();a.destructLightbox()});return t},destructLightbox:function(){var t=this;this.options.beforeHideLightbox.call(this);e(".nivo-lightbox-overlay").removeClass("nivo-lightbox-open");e(".nivo-lightbox-nav").hide();e("body").removeClass("nivo-lightbox-body-effect-"+t.options.effect);var n=0;if(n){e(".nivo-lightbox-overlay iframe").attr("src"," ");e(".nivo-lightbox-overlay iframe").remove()}e(".nivo-lightbox-prev").off("click");e(".nivo-lightbox-next").off("click");e(".nivo-lightbox-content").empty();this.options.afterHideLightbox.call(this)},isHidpi:function(){var e="(-webkit-min-device-pixel-ratio: 1.5),                              (min--moz-device-pixel-ratio: 1.5),                              (-o-min-device-pixel-ratio: 3/2),                              (min-resolution: 1.5dppx)";if(t.devicePixelRatio>1)return true;if(t.matchMedia&&t.matchMedia(e).matches)return true;return false}};e.fn[i]=function(t){return this.each(function(){if(!e.data(this,i)){e.data(this,i,new o(this,t))}})}})(jQuery,window,document)




/**
 * Theme functions file
 *
 * Contains handlers for navigation, accessibility, header sizing
 * footer widgets and Featured Content slider
 *
 */
var _tablet_width = 950;
var _window = jQuery(window);
var _document = jQuery(document);
var _body = jQuery('body');

function fullHeight(el) {
	return el.height() + parseInt(el.css('padding-top')) + parseInt(el.css('padding-bottom'))
		+ parseInt(el.css('border-top-width')) + parseInt(el.css('border-bottom-width'));
}

(function($) {
	// Footer & header hacks for single pages
	var fixed = {
		header: false,
		footer: false,
		page: false,
		container: false,
		init: function() {
			this.header = $('#masthead');
			this.footer = $('#colophon');
			if (this.header.length == 1 && this.footer.length == 1) {
				this.page = $('#page');
				this.container = $('.hentry');
				_window.on('ready load resize', fixed.process);
			}
		},
		process: function() {
			if (_window.width() > _tablet_width) {
				fixed.updateScroll();
				_window.on('scroll.fixed', fixed.updateScroll);
			}
			else {
				_window.off('scroll.fixed');
			}
		},
		updateScroll: function() {
			var admin_bar = 0;
			if ($('#wpadminbar').length == 1) {
				admin_bar = $('#wpadminbar').height();
			}

			var top = _window.scrollTop();
			var header_height = fullHeight(fixed.header);
			if (top <= header_height + admin_bar) {
				fixed.header.css({
					top: admin_bar - top
				});
			}
			else {
				fixed.header.css({
					top: -1 * header_height - admin_bar
				});
			}

			var from_top = top + _window.height() - admin_bar;
			var page_height = fullHeight(fixed.page);
			if (fixed.container.length == 1) {
				var container_height = fullHeight(fixed.container) + header_height;
				if (page_height < container_height) {
					page_height = container_height;
				}
			}
			var footer_height = fullHeight(fixed.footer);
			if (page_height - from_top < footer_height) {
				fixed.footer.css({
					bottom: -1 * (page_height - from_top)
				});
			}
			else {
				fixed.footer.css({
					bottom: -1 * footer_height
				});
			}
		}
	};
	fixed.init();

	// index gallery
	var index = {
		el: false,
		images: [],
		count: 0,
		first_image: false,
		init: function() {
			this.el = $('body.home .main-content');
			if (this.el.length == 1) {
				this.update();
				if (this.count != 0) {
					this.first_image = $(this.images[0]);
					_window.on('ready load resize', index.process);
				}
			}
		},
		update: function() {
			index.images = index.el.find('a img');
			index.count = index.images.length;
		},
		process: function() {
			var height = index.first_image.height();
			var padding = parseInt(index.first_image.parents('.post').css('padding-right'));
			index.images.each(function() {
				var image = $(this);
				if (_window.width() > _tablet_width) {
					var ratio = image.attr('width') / image.attr('height');
					var width = Math.round(height * ratio);
					image.css('width', width + 'px');
					image.parents('.post').css('width', width + padding + 'px');
				}
			});
		}
	};
	index.init();

	// single page gallery
	var gallery = {
		duration: 300,
		el: false,
		images: [],
		count: 0,
		first_image: false,
		init: function() {
			this.el = $('.gallery-animated');
			if (this.el.length == 1) {
				this.update();
				if (this.count != 0) {
					this.first_image = $(this.images[0]);
					_window.on('ready load resize', gallery.process);
				}
			}
		},
		update: function() {
			gallery.images = gallery.el.find('img');
			gallery.count = gallery.images.length;
		},
		process: function() {
			var height = gallery.first_image.height();
			var padding = parseInt(gallery.first_image.parent().css('padding-right'));
			gallery.images.each(function() {
				var image = $(this);
				image.off('click');
				if (_window.width() > _tablet_width) {
					var ratio = image.attr('width') / image.attr('height');
					var width = Math.round(height * ratio);
					image.css('width', width + 'px');
					image.parent().css('width', width + padding + 'px');
					image.on('click', function(event) {
						event.preventDefault();
						gallery.move(image);
					});
				}
			});
		},
		move: function(image) {
			var scroll = _window.scrollLeft();
			var window_width = _window.width();
			var offset = gallery.offset(image, window_width);
			var index = image.parent().index();
			if (offset == scroll) { // current image clicked
				if (index != gallery.count - 1) { // not last image clicked
					offset = gallery.offset($(gallery.images[index + 1]), window_width);
				} else {
					offset = gallery.offset(gallery.first_image, window_width);
				}
			}
			if (offset != scroll) {
				$('html, body').stop().animate({ scrollLeft: offset }, gallery.duration);
			}
		},
		offset: function(image, window_width) {
			var offset = image.offset().left;
			var width = image.width();
			if (width < window_width) {
				offset -= Math.round((window_width - width) / 2);
			}
			return offset;
		}
	};
	gallery.init();

	// Infinite loading for index page
	var loading = {
		start_from: 500,
		el: false,
		nav: false,
		loader: false,
		enabled: true,
		ajax: false,
		init: function() {
			this.el = $('.paging-navigation a');
			if (this.el.length == 1) {
				this.nav = this.el.parent();
				this.loader = $('#infinite-loader');
				_window.on('ready load resize scroll.loading', loading.process);
			}
		},
		process: function() {
			if (loading.enabled && !loading.ajax) {
				var ajax = false;
				if (_window.width() > _tablet_width) {
					if (_window.scrollLeft() > _document.width() - _window.width() - loading.start_from) {
						ajax = true;
					}
				}
				else {
					if (_window.scrollTop() > _document.height() - _window.height() - loading.start_from) {
						ajax = true;
					}
				}
				if (ajax) {
					loading.loader.addClass('active');
					loading.ajax = true;
					$.ajax({
						type: 'GET',
						url: loading.el.attr('href'),
						dataType: 'html',
						success: function(response) {
							var html = $(response);
							var next_link = html.find('.paging-navigation a');
							var items = html.find('#main-content .hentry');
							items.each(function() {
								$(this).insertBefore(loading.nav);
							});

							// $('.open-popup-link').magnificPopup({
  					// 			type:'inline',
							// });
					$('a.ajax-popup-link').removeAttr('onclick');
					$('a.ajax-popup-link').nivoLightbox();

							index.update();
							index.process();
							if (next_link.length == 1) {
								loading.el.attr('href', next_link.attr('href'));
								loading.ajax = false;
							}
							else {
								_window.off('scroll.loading');
							}
							loading.loader.removeClass('active');
						}
					});
				}
			}
		}
	};
	loading.init();

	// load animations
	var load_effect = {
		duration: 300,
		els: [],
		loader: $('#infinite-loader'),
		init: function() {
			var els = $('.nav-menu > li');
			if (els.length != 0) {
				els.each(function() {
					load_effect.els.push($(this));
				});
			}
			$('a').on('click', function(e) {
				e.preventDefault();
				load_effect.loader.show();
				var href = $(this).attr('href');
				$('.site').css('opacity', 0);
				setTimeout(function() {
					window.location = href;
				}, load_effect.duration);
			});
			_window.on('ready pageshow', function() {
				load_effect.loader.show();
				$('.site').css('opacity', 1);
				setTimeout(function() {
					load_effect.loader.hide();
					if (load_effect.els.length != 0) {
						load_effect.process();
					}
				}, load_effect.duration);
			});
		},
		process: function() {
			$(load_effect.els[0]).animate(
				{ opacity: 1 },
				load_effect.duration,
				function() {
					load_effect.els.shift();
					if (load_effect.els.length != 0) {
						load_effect.process();
					}
				}
			);
		}
	};
	// load_effect.init();

	/**
	 * Menus for desktop view
	 */
	function updateMenuItem(li) {
		var ul = li.find('> ul');
		if (!ul.hasClass('submenu-visible')) {
			var parent = li.parent();
			parent.find('li').removeClass('submenu-active');
			li.addClass('submenu-active');
			parent.find('ul').removeClass('submenu-visible');
			ul.addClass('submenu-visible');
		}
		else {
			li.removeClass('submenu-active');
			ul.removeClass('submenu-visible');
			ul.find('ul').removeClass('submenu-visible');
		}
	}

	$('.site-navigation > div > ul > li').on('hover', function() {
		var li = $(this);
		updateMenuItem(li);
	});

	$('.site-navigation > div > ul > li > a').on('touchstart', function(e) {
		if (_window.width() > _tablet_width) {
			e.preventDefault();
			var li = $(this).parent();
			updateMenuItem(li);
		}
	});

	// removes visible submenus on safari for bfcache (when back button is clicked)
	_window.bind('pageshow', function(e) {
		if (e.originalEvent.persisted) {
			$('.submenu-visible').removeClass('submenu-visible');
			$('.submenu-active').removeClass('submenu-active');
		}
	});

	// Enable menu toggle for small screens.
	(function() {
		var nav = $('#primary-navigation');
		if (!nav) {
			return;
		}

		var button = $('.menu-toggle');
		if (!button) {
			return;
		}

		// Hide button if menu is missing or empty.
		var menu = nav.find('.nav-menu');
		if (!menu || !menu.children().length) {
			button.addClass('hidden');
			return;
		}

		$('.menu-toggle').on('click', function() {
			loading.enabled = false;
			_body.addClass('toggled-on');
		});

		$('#navigation-close').on('click', function() {
			_body.removeClass('toggled-on');
			loading.enabled = true;
		});
	})();



// $('.open-popup-link').magnificPopup({
//   type:'inline',
// });

// $('.ajax-popup-link').magnificPopup({
//   type: 'ajax'
// });

$('a.ajax-popup-link').removeAttr('onclick');
$('a.ajax-popup-link').nivoLightbox();


})(jQuery);