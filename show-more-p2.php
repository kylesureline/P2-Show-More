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
 * Enqueue JS
 */
function show_more_p2_link_scripts() {
 
	// Load jQuery if it isn't already
	wp_enqueue_script('jquery');
 
	// Load custom jQuery
	wp_enqueue_script( 'show-more-p2', plugin_dir_url( __FILE__ ) . 'show-more-p2.js', array('jquery'), '1.0', true );
 
}
add_action( 'wp_enqueue_scripts', 'show_more_p2_link_scripts' );
