<?php
/**
 * Custom template tags for Portra
 */

if (!function_exists('portra_paging_nav')):
	/**
	 * Display navigation to next/previous set of posts when applicable.
	 *
	 * @return void
	 */
	function portra_paging_nav() {
		// Don't print empty markup if there's only one page.
		if ($GLOBALS['wp_query']->max_num_pages < 2) {
			return;
		}
		?>

		<nav class="navigation paging-navigation" role="navigation">
			<?php next_posts_link(); ?>
		</nav><!-- .navigation -->

		<?php
	}
endif;



if (!function_exists('ic_paging_nav')):
	/**
	 * Display navigation to next/previous set of posts when applicable.
	 *
	 * @return void
	 */
	function ic_paging_nav() {
		// get theme options

		$loop_on_off = ( ot_get_option( 'loop_on_off' ) ) ? ot_get_option( 'loop_on_off' ) : 'on' ;
		$loop_starts_at = ( ot_get_option( 'loop_starts_at' ) ) ? ot_get_option( 'loop_starts_at' ) : 1 ;

		// $loop_on_off = ot_get_option( 'loop_on_off' );
		// $loop_starts_at = ot_get_option( 'loop_starts_at' );

		$loop_starts_at_page = $GLOBALS['wpdb']->get_results( "SELECT
														    *
														FROM (
														    SELECT
														        ID as id
														    , post_date
														    , post_title
														    , @rownum := @rownum + 1 AS position
														    FROM
														        wp_posts
														    , (SELECT @rownum := 0) AS rownum
														    WHERE
														        post_type = 'post'
														    AND post_status = 'publish'
														    ORDER BY
														        post_date ASC
														) as post_position
														WHERE
														    id = $loop_starts_at", OBJECT );




		// Don't print empty markup if there's only one page.
		if ($GLOBALS['wp_query']->max_num_pages < 2) {
			return;
		}
		?>

		<nav class="navigation paging-navigation" role="navigation">
			<?php

			if ( ($loop_on_off == 'on') && ($GLOBALS['wp_query']->max_num_pages == get_query_var('paged')) ) {
				echo '<a href="'. home_url() .'/?paged='.$loop_starts_at_page[0]->position.'">&infin;</a>';
			} else {
				next_posts_link();
			}

			?>
		</nav><!-- .navigation -->

		<?php
	}
endif;

















if (!function_exists('portra_post_nav')):
	/**
	 * Display navigation to next/previous post when applicable.
	 *
	 * @return void
	 */
	function portra_post_nav() {
		// Don't print empty markup if there's nowhere to navigate.
		$previous = (is_attachment()) ? get_post(get_post()->post_parent) : get_adjacent_post(false, '', true);
		$next = get_adjacent_post(false, '', false);

		if (!$next && !$previous) {
			return;
		}

		?>
		<nav class="navigation post-navigation" role="navigation">
			<h1 class="screen-reader-text"><?php _e('Post navigation', 'portra'); ?></h1>

			<div class="nav-links">
				<?php
				if (is_attachment()):
					previous_post_link('%link', __('<span class="meta-nav">Published In</span>%title', 'portra'));
				else:
					previous_post_link('%link', __('<span class="meta-nav">Previous Post</span>%title', 'portra'));
					next_post_link('%link', __('<span class="meta-nav">Next Post</span>%title', 'portra'));
				endif;
				?>
			</div>
			<!-- .nav-links -->
		</nav><!-- .navigation -->
	<?php
	}
endif;

if (!function_exists('portra_posted_on')):
	/**
	 * Print HTML with meta information for the current post-date/time and author.
	 *
	 * @return void
	 */
	function portra_posted_on() {
		if (is_sticky() && is_home() && !is_paged()) {
			echo '<span class="featured-post">'.__('Sticky', 'portra').'</span>';
		}

		// Set up and print post meta information.
		printf('<span class="entry-date"><a href="%1$s" rel="bookmark"><time class="entry-date" datetime="%2$s">%3$s</time></a></span> <span class="byline"><span class="author vcard"><a class="url fn n" href="%4$s" rel="author">%5$s</a></span></span>',
			esc_url(get_permalink()),
			esc_attr(get_the_date('c')),
			esc_html(get_the_date()),
			esc_url(get_author_posts_url(get_the_author_meta('ID'))),
			get_the_author()
		);
	}
endif;

/**
 * Returns image tag
 */
function portra_image_tag($thumbnail_id, $size = 'post-thumbnail') {
	$meta = wp_get_attachment_metadata($thumbnail_id);
	if ($meta === false || $meta === '') {
		return sprintf(
			'<img src="%s" width="%s" height="%s" alt="" />',
			wpShower::defaultImage(),
			wpShower::$default_image_width,
			wpShower::$default_image_height
		);
	}

	$src = wp_get_attachment_image_src($thumbnail_id, $size);
	$size_available = isset($meta['sizes'][$size]);
	return sprintf(
		'<img src="%s" width="%s" height="%s" alt="" />',
		$src[0],
		$size_available ? $meta['sizes'][$size]['width'] : $meta['width'],
		$size_available ? $meta['sizes'][$size]['height'] : $meta['height']
	);
}

/*
 * Formatted item gallery
 */
function portra_formatted_gallery() {
	$galleries = wpShower::getGalleries();
	$attachments = array();
	foreach ($galleries as $gallery) {
		foreach ($gallery as $attachment_id) {
			$attachments[] = $attachment_id;
		}
	}
	if (empty($attachments)) {
		$thumbnail = get_post_thumbnail_id();
		if ($thumbnail != '') {
			$attachments[] = $thumbnail;
		}
	}
	?><!--

	--><ul class="gallery gallery-animated">
	<?php foreach ($attachments as $attachment):
		$image = get_post($attachment);
		if ($image == null) continue;
	?><!--
		--><li class="gallery-item">
			<?php echo portra_image_tag($attachment) ?>
		<?php if (trim($image->post_excerpt) != ''): ?>
			<?php echo $image->post_excerpt; ?>
		<?php endif; ?>
		</li><!--
	--><?php endforeach; ?><!--
	--></ul><!--

	--><?php
}
