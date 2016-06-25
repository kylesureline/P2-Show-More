<?php
/*
Plugin Name: P2 Show More
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
function p2_show_more_link_scripts() {
 
	// Load jQuery if it isn't already
	wp_enqueue_script('jquery');
 
	// Load custom jQuery
	wp_enqueue_script( 'p2-show-more', plugin_dir_url( __FILE__ ) . 'p2-show-more.js', array('jquery'), '1.0', true );
 
}
add_action( 'wp_enqueue_scripts', 'p2_show_more_link_scripts' );