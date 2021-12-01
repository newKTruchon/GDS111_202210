//this JS file will handle the key input controls 

//set vars up for the key input switches
var up = false //boolean data type: holds a value of EITHER true OR false
var down = false 
var left = false 
var right = false 

//add a keydown event listener using JQuery 
//pressing on a key will make a boolean variable of true and release will make a false 

//TRUE key binding 
$(document).keydown(function(e) {

    if(e.keyCode == 38) {

        up = true
    }

    if(e.keyCode == 40) {

        down = true
    }

    if(e.keyCode == 37) {

        left = true
    }

    if(e.keyCode == 39) {

        right = true
    }

})//end of keydown function!

//FALSE key binding 
$(document).keyup(function(e) {

    if(e.keyCode == 38) {

        up = false
    }

    if(e.keyCode == 40) {

        down = false
    }

    if(e.keyCode == 37) {

        left = false
    }

    if(e.keyCode == 39) {

        right = false
    }

})//end of keydown function!