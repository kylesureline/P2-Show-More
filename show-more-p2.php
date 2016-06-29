<?php
/*
Plugin Name: Show More for P2
Plugin URI: 
Description: Automatically minimizes posts and adds a more link to display them inline.
Version: 1.0
Author: Kyle Scheuerlein
Author URI: http://www.kylescheuerlein.com
License: GPL2
*/

/**
 * Don't activate if P2 isn't active
 */
function checkTheme() {
	$plugin = plugin_basename( __FILE__ );
	$plugin_data = plugin_basename( __FILE__, false );
	$theme = wp_get_theme();
	$requireTheme = "P2 Theme";
	if( 'p2' != $theme->name || 'p2' != $theme->parent_theme ) {
		deactivate_plugins( $plugin );
		wp_die( "<strong>".$plugin_data['Name']."</strong> requires the <strong> ".$requireTheme."</strong> or a child theme of it, and has been deactivated!<br /><br />Back to the WordPress <a href='".get_admin_url(null, 'plugins.php')."'>Plugins page</a>." );
	}
}
add_action( 'admin_init', 'checkTheme' );
/**
 * Enqueue JS
 */
function show_more_p2_link_scripts() {
 
	// Load jQuery if it isn't already
	wp_enqueue_script('jquery');
 
	// Load custom jQuery
	wp_enqueue_script( 'show-more-p2', plugin_dir_url( __FILE__ ) . 'show-more-p2.js', array('jquery'), '1.0', true );
 
}
add_action( 'wp_enqueue_scripts', 'show_more_p2_link_scripts' );
