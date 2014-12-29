<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme and one
 * of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query,
 * e.g., it puts together the home page when no home.php file exists.
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 */

// support comments on index 
$withcomments = 1;

get_header(); ?>

<div id="main-content" class="main-content">
	<?php
	if (have_posts()):
		// Start the Loop.
		while (have_posts()): the_post();
	?><!--

	--><div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		<a class="image_link">
			<?php echo portra_image_tag(get_post_thumbnail_id()); ?>
		</a>
		<?php if (get_the_title() != ''): ?>
		<div>
			<?php the_title(); ?>

			| <a href="#post-comments-<?php the_ID(); ?>" class="open-popup-link"><?php comments_number('0 comments', '1 comment', '% comments', '', 'comments disabled'); ?></a> 
		</div>
		
		<div id="post-comments-<?php the_ID(); ?>" class="mfp-hide comment-popup">
			<?php comments_template(); ?>
		</div>

		<?php endif; ?>
	</div><!--

	--><?php
		endwhile;
		// portra_paging_nav();
		ic_paging_nav();
	else:
		// If no content, include the "No posts found" template.
		get_template_part('content', 'none');
	endif;
	?>
</div><!-- #main-content -->

<?php
get_footer();
