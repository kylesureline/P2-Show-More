<?php
/*
Plugin Name: Show More for P2
Plugin URI: https://wordpress.org/plugins/show-more-p2/
Description: Automatically minimizes posts and adds a more link to display them inline.
Version: 1.3.3
Author: Kyle Scheuerlein
Author URI: http://www.kylescheuerlein.com
License: GPL2
*/

/**
 * Don't activate if P2 isn't active
 */
function show_more_p2_check_theme() {
	$plugin = plugin_basename( __FILE__ );
	$plugin_data = plugin_basename( __FILE__, false );
	$theme = wp_get_theme();
	if( 'P2' == $theme->name || 'P2' == $theme->parent_theme ) {
		// do nothing
	}
	else {
		deactivate_plugins( $plugin );
		wp_die( "<strong>Show More for P2</strong> requires the <strong>P2 Theme</strong> or a child theme of it, and has been deactivated!<br /><br />Back to the WordPress <a href='".get_admin_url(null, 'plugins.php')."'>Plugins page</a>." );
	}
}
add_action( 'admin_init', 'show_more_p2_check_theme' );
/**
 * Enqueue JS
 */
function show_more_p2_link_scripts() {
 
	// Load jQuery if it isn't already
	wp_enqueue_script('jquery');
 
	// Load custom jQuery
	wp_enqueue_script( 'show-more-p2', plugin_dir_url( __FILE__ ) . 'show-more-p2.js', array('jquery'), '1.3.3', true );
 
}
add_action( 'wp_enqueue_scripts', 'show_more_p2_link_scripts' );
