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
          'label'       => __( 'Comic Category', 'theme-text-domain' ),
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
      array(
        'id'          => 'loop_starts_at',
        'label'       => __( 'Loop at', 'theme-text-domain' ),
        'desc'        => __( 'Select a page to begin looping at. Useful for skipping title page and front matter.', 'theme-text-domain' ),
        'type'        => 'post-select',
        'section'     => 'option_types',
        'condition'   => 'loop_on_off:is(on)'
      ),
      array(
        'id'          => 'loading_color',
        'label'       => __( 'loading_color', 'theme-text-domain' ),
        'desc'        => __( 'Choose a color for the loading animation', 'theme-text-domain' ),
        'std'         => '',
        'type'        => 'colorpicker',
        'section'     => 'option_types',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'min_max_step'=> '',
        'class'       => '',
        'condition'   => '',
        'operator'    => 'and'
      ),
      array(
        'id'          => 'page_padding',
        'label'       => __( 'Padding between pages', 'theme-text-domain' ),
        'desc'        => __( 'Select the number of pixels between pages.', 'theme-text-domain' ),
        'std'         => '20',
        'type'        => 'numeric-slider',
        'section'     => 'option_types',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'min_max_step'=> '0,100,1',
        'class'       => '',
        'condition'   => '',
        'operator'    => 'and'
      ),
      array(
        'id'          => 'max_height',
        'label'       => __( 'The maximum height of your pages in pixels.', 'theme-text-domain' ),
        'desc'        => __( 'Prevents pixelation of small images on large screens.', 'theme-text-domain' ),
        'std'         => '',
        'type'        => 'numeric-slider',
        'section'     => 'option_types',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'min_max_step'=> '0,2560,1',
        'class'       => '',
        'condition'   => '',
        'operator'    => 'and'
      ),
    )
  );
  

  // $category_select = ot_get_option( 'category_select');
// echo $category_select;

  // Populate the drop down select from posts belonging to this category (14)
  add_filter( 'ot_type_post_select_query', 'ic_ot_type_post_select_query_set_cat', 10, 2 );
  function ic_ot_type_post_select_query_set_cat( $query, $field_id ) {
      $category_select = ot_get_option( 'category_select');
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