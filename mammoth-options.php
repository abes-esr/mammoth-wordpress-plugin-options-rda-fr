<?php
/*
Plugin Name: Mammoth options pour site RDA-FR
Version: 1.0.0
Author: Abes
License: BSD 2-clause
*/

add_action( 'admin_footer', 'mammoth_options_load_javascript' );


function mammoth_options_load_javascript() {
    mammoth_options_load_script( 'mammoth-options' );
}

function mammoth_options_load_script( $name ) {
    $url = plugins_url( 'mammoth-options/' . $name . '.js' );
    echo '<script src="'. $url . '?v=1.0.0"></script>';
}
