<script id="user" type="text/html">
  <article id="post-{{ID}}" <?php post_class( 'cf' ); ?> role="article">

    <section class="entry-content cf">
      <img src="{{image}}" />
      {{content}}
    </section>

    <footer class="article-footer cf">
      <p class="footer-comment-count">
        <a href="{{meta.links.replies}}">View Comments</a>
      </p>
      <?php printf( '<p class="footer-category">' . __('filed under', 'bonestheme' ) . ': %1$s</p>' , get_the_category_list(', ') ); ?>

      <?php the_tags( '<p class="footer-tags tags"><span class="tags-title">' . __( 'Tags:', 'bonestheme' ) . '</span> ', ', ', '</p>' ); ?>
    </footer>

  </article>
</script>