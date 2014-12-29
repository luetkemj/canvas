<?php
/**
 * The template used for displaying page content
 */
?>

<?php the_title('<header class="entry-header"><h1 class="entry-title">', '</h1></header><!-- .entry-header -->'); ?><!--

--><article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content">
		<?php
		the_content();
		wp_link_pages(array(
			'before' => '<div class="page-links"><span class="page-links-title">'.__('Pages:', 'portra').'</span>',
			'after' => '</div>',
			'link_before' => '<span>',
			'link_after' => '</span>',
		));
		?>
	</div><!-- .entry-content -->
</article><!--

--><?php portra_formatted_gallery(); ?>
