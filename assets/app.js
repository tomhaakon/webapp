/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// 
// any CSS you import will output into a single css file (app.css in this case)

// css import
import './styles/app.css';
import './styles/navbar-top.css';
import './styles/croppie.css';

// javascript import

require('bootstrap');


require ('./croppie');
//import 'croppie-test';
require('./kocropper/main.js');



$(document).ready(function() {
        $('[data-toggle="popover"]').popover();
});

