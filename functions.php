<?php
/**
 * Required: set 'ot_theme_mode' filter to true.
 */
add_filter( 'ot_theme_mode', '__return_true' );

/**
 * Required: include OptionTree.
 */
require( trailingslashit( get_template_directory() ) . 'option-tree/ot-loader.php' );

/**
 * Theme Options
 */
require( trailingslashit( get_template_directory() ) . 'inc/theme-options.php' );




/**
 * Portra functions and definitions
 *
 * Set up the theme and provides some helper functions, which are used in the
 * theme as custom template tags. Others are attached to action and filter
 * hooks in WordPress to change core functionality.
 *
 * When using a child theme you can override certain functions (those wrapped
 * in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before
 * the parent theme's file, so the child theme functions would be used.
 *
 * @link http://codex.wordpress.org/Theme_Development
 * @link http://codex.wordpress.org/Child_Themes
 *
 * Functions that are not pluggable (not wrapped in function_exists()) are
 * instead attached to a filter or action hook.
 *
 * For more information on hooks, actions, and filters,
 * @link http://codex.wordpress.org/Plugin_API
 */

/**
 * Set up the content width value based on the theme's design.
 */
if (!isset($content_width)) {
	$content_width = 1200;
}

/**
 * Portra only works in WordPress 3.6 or later.
 */
if (version_compare($GLOBALS['wp_version'], '3.6', '<')) {
	require get_template_directory().'/inc/back-compat.php';
}

if (!function_exists('portra_setup')):
	/**
	 * Portra setup.
	 *
	 * Set up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support post thumbnails.
	 */
	function portra_setup() {
		/*
		 * Make Portra available for translation.
		 *
		 * Translations can be added to the /languages/ directory.
		 * If you're building a theme based on Portra, use a find and
		 * replace to change 'portra' to the name of your theme in all
		 * template files.
		 */
		load_theme_textdomain('portra', get_template_directory().'/languages');

		// Add RSS feed links to <head> for posts and comments.
		add_theme_support('automatic-feed-links');

		// Enable support for Post Thumbnails, and declare two sizes.
		add_theme_support('post-thumbnails');
		set_post_thumbnail_size(1920, 1280);

		// This theme uses wp_nav_menu() in two locations.
		register_nav_menus(array(
			'primary' => __('Top main menu', 'portra'),
			'secondary' => __('Top right menu', 'portra'),
		));

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support('html5', array(
			'search-form', 'comment-form', 'comment-list',
		));

		// This theme uses its own gallery styles.
		add_filter('use_default_gallery_style', '__return_false');
	}
endif;
add_action('after_setup_theme', 'portra_setup');

/**
 * Register Google font for Portra.
 *
 * @return string
 */
function portra_font_url() {
	$font_url = '';
	/*
	 * Translators: If there are characters in your language that are not supported
	 * by Lato, translate this to 'off'. Do not translate into your own language.
	 */
	if ('off' !== _x('on', 'Muli font: on or off', 'portra')) {
		$font_url = add_query_arg('family', urlencode('Muli:400'), "//fonts.googleapis.com/css");
	}

	return $font_url;
}

/**
 * Enqueue scripts and styles for the front end.
 *
 * @return void
 */
function portra_scripts() {
	// Add Lato font, used in the main stylesheet.
	wp_enqueue_style('portra-font', portra_font_url(), array(), null);

	// Load our main stylesheet.
	wp_enqueue_style('portra-style', get_stylesheet_uri());
	// Custom styles
	$css = is_admin_bar_showing() ? 'html {
	height: -moz-calc(100% - 32px);
	height: -webkit-calc(100% - 32px);
	height: calc(100% - 32px);
}

@media (max-width: 782px) {
	html {
		height: -moz-calc(100% - 46px);
		height: -webkit-calc(100% - 46px);
		height: calc(100% - 46px);
	}
}' : 'html {
	height: 100%;
}';
	wp_add_inline_style('portra-style', $css);

	if (is_singular() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}

	if ( is_home() ){
		wp_enqueue_style('nivo-lightbox-style', get_template_directory_uri().'/js/Nivo-Lightbox-master/themes/default/default.css');
		wp_enqueue_script('nivo-lightbox', get_template_directory_uri().'/js/Nivo-Lightbox-master/nivo-lightbox.min.js', array('jquery'), '20150104', true);
	}
	
	wp_enqueue_script('portra-script', get_template_directory_uri().'/js/functions.js', array('jquery'), '20140321', true);
}
add_action('wp_enqueue_scripts', 'portra_scripts');

if (!function_exists('portra_the_attached_image')):
	/**
	 * Print the attached image with a link to the next attached image.
	 *
	 * @return void
	 */
	function portra_the_attached_image() {
		$post = get_post();
		/**
		 * Filter the default Portra attachment size.
		 *
		 * @param array $dimensions {
		 *     An array of height and width dimensions.
		 *
		 * @type int $height Height of the image in pixels. Default 810.
		 * @type int $width Width of the image in pixels. Default 810.
		 * }
		 */
		$attachment_size = apply_filters('portra_attachment_size', array(810, 810));
		$next_attachment_url = wp_get_attachment_url();

		/*
		 * Grab the IDs of all the image attachments in a gallery so we can get the URL
		 * of the next adjacent image in a gallery, or the first image (if we're
		 * looking at the last image in a gallery), or, in a gallery of one, just the
		 * link to that image file.
		 */
		$attachment_ids = get_posts(array(
			'post_parent' => $post->post_parent,
			'fields' => 'ids',
			'numberposts' => -1,
			'post_status' => 'inherit',
			'post_type' => 'attachment',
			'post_mime_type' => 'image',
			'order' => 'ASC',
			'orderby' => 'menu_order ID',
		));

		// If there is more than 1 attachment in a gallery...
		if (count($attachment_ids) > 1) {
			foreach ($attachment_ids as $attachment_id) {
				if ($attachment_id == $post->ID) {
					$next_id = current($attachment_ids);
					break;
				}
			}

			// get the URL of the next image attachment...
			if ($next_id) {
				$next_attachment_url = get_attachment_link($next_id);
			}

			// or get the URL of the first image attachment.
			else {
				$next_attachment_url = get_attachment_link(array_shift($attachment_ids));
			}
		}

		printf('<a href="%1$s" rel="attachment">%2$s</a>',
			esc_url($next_attachment_url),
			wp_get_attachment_image($post->ID, $attachment_size)
		);
	}
endif;

/**
 * Extend the default WordPress body classes.
 *
 * @param array $classes A list of existing body class values.
 * @return array The filtered body class list.
 */
function portra_body_classes($classes) {
	if (is_archive() || is_search()) {
		$classes[] = 'home';
	}

	return $classes;
}
add_filter('body_class', 'portra_body_classes');

/**
 * Extend the default WordPress post classes.
 *
 * Adds a post class to denote:
 * Non-password protected page with a post thumbnail.
 *
 * @param array $classes A list of existing post class values.
 * @return array The filtered post class list.
 */
function portra_post_classes($classes) {
	if (!post_password_required() && has_post_thumbnail()) {
		$classes[] = 'has-post-thumbnail';
	}

	return $classes;
}
add_filter('post_class', 'portra_post_classes');

/**
 * Create a nicely formatted and more specific title element text for output
 * in head of document, based on current view.
 *
 * @param string $title Default title text for current view.
 * @param string $sep Optional separator.
 * @return string The filtered title.
 */
function portra_wp_title($title, $sep) {
	global $paged, $page;

	if (is_feed()) {
		return $title;
	}

	// Add the site name.
	$title .= get_bloginfo('name');

	// Add the site description for the home/front page.
	$site_description = get_bloginfo('description', 'display');
	if ($site_description && (is_home() || is_front_page())) {
		$title = "$title $sep $site_description";
	}

	// Add a page number if necessary.
	if ($paged >= 2 || $page >= 2) {
		$title = "$title $sep ".sprintf(__('Page %s', 'portra'), max($paged, $page));
	}

	return $title;
}
add_filter('wp_title', 'portra_wp_title', 10, 2);

// Custom template tags for this theme.
require get_template_directory().'/inc/template-tags.php';

class wpShower {
	private static $default_image = 'images/featured.png';
	public static $default_image_width = 950;
	public static $default_image_height = 633;
	private static $galleries = array();

	public static function catchGallery($output) {
		$preg = preg_match('/\[gallery(.*?)ids="(.*?)"\]/', $output, $match);
		if ($preg && empty(wpShower::$galleries) && trim($match[2]) != '') {
			wpShower::$galleries[] = explode(',', $match[2]);
			$output = str_replace($match[0], '', $output);
		}
		return $output;
	}

	public static function defaultImage() {
		return get_stylesheet_directory_uri().'/'.self::$default_image;
	}

	public static function getGalleries() {
		$results = self::$galleries;
		self::$galleries = array();
		return $results;
	}

	/**
	 * Function to get the content earlier than it needs to be printed; shortcodes are catched this way
	 */
	public static function filteredContent($content = null) {
		if ($content === null) {
			$content = get_the_content(__('Read More', 'portra'));
		}
		$content = apply_filters('the_content', $content);
		$content = str_replace('<p></p>', '', $content); // TODO: fix it (youtube embed adds empty paragraphs?)
		$content = str_replace(']]>', ']]&gt;', $content);
		return trim($content);
	}
}

/**
 * Removes first gallery from post content
 */
add_filter('the_content', array('wpShower', 'catchGallery'), 1, 1);


// Add option page support
if( function_exists('acf_add_options_page') ) {	
	acf_add_options_page();
}


// query setup for index home
function set_order_home($query) {
$category_select = ot_get_option( 'category_select');
	
if ($query->is_home() AND $query->is_main_query()) {
$query->set('order', 'ASC');
$query->set('posts_per_page', 1);
$query->set('cat', $category_select);
	}
}

add_action('pre_get_posts', 'set_order_home');





// Add datatype to popup comments
apply_filters ( 'comments_popup_link_attributes', $attributes  );

add_filter( 'comments_popup_link_attributes' , 'make_popup');

function make_popup($attributes) {
 
  $attributes = 'data-lightbox-type="iframe"';
 
  return $attributes;
 
}








