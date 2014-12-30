<?php
/**
 * Initialize the custom Theme Options.
 */
add_action( 'admin_init', 'custom_theme_options' );

/**
 * Build the custom settings & update OptionTree.
 *
 * @return    void
 * @since     2.0
 */
function custom_theme_options() {
  
  /**
   * Get a copy of the saved settings array. 
   */
  $saved_settings = get_option( ot_settings_id(), array() );
  
  /**
   * Custom settings array that will eventually be 
   * passes to the OptionTree Settings API Class.
   */
  $custom_settings = array( 
    'contextual_help' => array( 
      'content'       => array( 
        array(
          'id'        => 'option_types_help',
          'title'     => __( 'Option Types', 'theme-text-domain' ),
          'content'   => '<p>' . __( 'Help content goes here!', 'theme-text-domain' ) . '</p>'
        )
      ),
      'sidebar'       => '<p>' . __( 'Sidebar content goes here!', 'theme-text-domain' ) . '</p>'
    ),
    'sections'        => array( 
      array(
        'id'          => 'option_types',
        'title'       => __( 'Option Types', 'theme-text-domain' )
      )
    ),
    'settings'        => array( 
      array(
          'id'          => 'category_select',
          'label'       => __( 'Category Select', 'theme-text-domain' ),
          'desc'        => __( 'Select the category used for your comic.', 'theme-text-domain' ),
          'type'        => 'category-select',
          'section'     => 'option_types',
      ),
      array(
        'id'          => 'loop_on_off',
        'label'       => __( 'Loop', 'theme-text-domain' ),
        'desc'        => sprintf( __( 'Turn infinite looping on or off.', 'theme-text-domain' )),
        'std'         => 'off',
        'type'        => 'on-off',
        'section'     => 'option_types',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'min_max_step'=> '',
        'class'       => '',
        'condition'   => '',
        'operator'    => 'and'
      ),
      // array(
      //   'id'          => 'loop_starts_at',
      //   'label'       => __( 'Loop at', 'theme-text-domain' ),
      //   'desc'        => sprintf( __( 'Select a page to begin looping at. Useful for skipping title page and front matter.', 'theme-text-domain' ) ),
      //   'std'         => '',
      //   'type'        => 'custom-post-type-select',
      //   'section'     => 'option_types',
      //   'rows'        => '',
      //   'post_type'   => 'post',
      //   'taxonomy'    => '',
      //   'min_max_step'=> '',
      //   'class'       => '',
      //   'condition'   => 'loop_on_off:is(on)',
      //   'operator'    => 'and'
      // ),

      array(
        'id'          => 'loop_starts_at',
        'label'       => __( 'Loop at', 'theme-text-domain' ),
        'desc'        => __( 'Select a page to begin looping at. Useful for skipping title page and front matter.', 'theme-text-domain' ),
        'type'        => 'post-select',
        'section'     => 'option_types',
      ),
    )
  );
  

  $category_select = ot_get_option( 'category_select');
// echo $category_select;

  // Populate the drop down select from posts belonging to this category (14)
  add_filter( 'ot_type_post_select_query', 'ic_ot_type_post_select_query_set_cat', 10, 2 );
  function ic_ot_type_post_select_query_set_cat( $query, $field_id ) {
      if( 'loop_starts_at' == $field_id ) {
          return array_merge( $query, array( 'cat' => $category_select ) );
      }       
  }

  /* allow settings to be filtered before saving */
  $custom_settings = apply_filters( ot_settings_id() . '_args', $custom_settings );
  
  /* settings are not the same update the DB */
  if ( $saved_settings !== $custom_settings ) {
    update_option( ot_settings_id(), $custom_settings ); 
  }
  
}