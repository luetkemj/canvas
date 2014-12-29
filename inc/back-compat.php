<?php
/**
 * Portra back compat functionality.
 *
 * Prevents Portra from running on WordPress versions prior to 3.6,
 * since this theme is not meant to be backwards compatible and relies on
 * many new functions and markup changes introduced in 3.6.
 */

/**
 * Prevent switching to Portra on old versions of WordPress. Switches
 * to the default theme.
 *
 * @return void
 */
function portra_switch_theme() {
	switch_theme(WP_DEFAULT_THEME, WP_DEFAULT_THEME);
	unset($_GET['activated']);
	add_action('admin_notices', 'portra_upgrade_notice');
}
add_action('after_switch_theme', 'portra_switch_theme');

/**
 * Prints an update nag after an unsuccessful attempt to switch to
 * Portra on WordPress versions prior to 3.6.
 *
 * @return void
 */
function portra_upgrade_notice() {
	$message = sprintf(__('Portra requires at least WordPress version 3.6. You are running version %s. Please upgrade and try again.', 'portra'), $GLOBALS['wp_version']);
	printf('<div class="error"><p>%s</p></div>', $message);
}

/**
 * Prevents the Customizer from being loaded on WordPress versions prior to 3.6.
 *
 * @return void
 */
function portra_customize() {
	wp_die(sprintf(__('Portra requires at least WordPress version 3.6. You are running version %s. Please upgrade and try again.', 'portra'), $GLOBALS['wp_version']), '', array(
		'back_link' => true,
	));
}
add_action('load-customize.php', 'portra_customize');

/**
 * Prevents the Theme Preview from being loaded on WordPress versions prior to 3.6.
 *
 * @return void
 */
function portra_preview() {
	if (isset($_GET['preview'])) {
		wp_die(sprintf(__('Portra requires at least WordPress version 3.6. You are running version %s. Please upgrade and try again.', 'portra'), $GLOBALS['wp_version']));
	}
}
add_action('template_redirect', 'portra_preview');
