<?php
/**
 * The template for displaying the footer
 *
 * Contains footer content and the closing of the #main and #page div elements.
 */
?>

		</div><!-- #main -->

		<footer id="colophon" class="site-footer" role="contentinfo">
			<div class="copyright">&#169; 2014</div>
			<div class="site-info">
				<?php do_action('portra_credits'); ?>
				<?php printf(__('<a href="%s">%s</a> by <a href="%s">%s</a>', 'portra'),
					'http://wpshower.com/themes/portra',
					'Portra',
					'http://wpshower.com/',
					'Wpshower'
				); ?>
			</div><!-- .site-info -->
		</footer><!-- #colophon -->
	</div><!-- #page -->

	<span id="infinite-loader">
		<span></span>
		<span></span>
		<span></span>
	</span>

	<?php wp_footer(); ?>

</body>
</html>
