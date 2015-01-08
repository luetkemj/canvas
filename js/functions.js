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
		start_from: 1500,
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
		preload: function(){
			if ( index.count > 5 ){
				return;
			} else {
				loading.process();
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

							loading.preload();
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



$('a.ajax-popup-link').removeAttr('onclick');
$('a.ajax-popup-link').nivoLightbox();





})(jQuery);