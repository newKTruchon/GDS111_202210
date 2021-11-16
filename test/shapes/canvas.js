//Defines variable to access canvas properties by ID
var canvas = document.getElementById('canvas')

//more on canvas: https://www.w3schools.com/tags/ref_canvas.asp
//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes


//Define the drawing context of the canvas Element
var ctx = canvas.getContext('2d')

var galaxy = new Image()
//access attributes using the dot syntax object.attribute [everything is an object!]
galaxy.src = "images/galaxy.jpeg"

galaxy.onload = function () {

    //context.drawImage(img,x,y,width,height) : https://www.w3schools.com/tags/canvas_drawimage.asp
    ctx.drawImage(galaxy, 0, 0, 800, 600);



    //Draw rectangle

    //start with specific styles

    ctx.fillStyle = "rgb(0,0,255)"
    ctx.strokeStyle = "green"
    ctx.lineWidth = "5"

    //use fillRect / strokeRect once styles have been specified : https://www.w3schools.com/tags/canvas_rect.asp
    ctx.fillRect(30, 30, 100, 100);
    ctx.strokeRect(30, 30, 100, 100);

    //draw line
    //https://www.w3schools.com/tags/ref_canvas.asp

    ctx.moveTo(0, 0) //start position
    ctx.lineTo(800, 600) //end position
    ctx.stroke() //draws line

    ctx.moveTo(800, 0)
    ctx.lineTo(0, 600)
    ctx.stroke()

    //draw circle
    //ctx.arc(x,y,radius, startAngle, endAngle, isCounterClockwise)
    //https://www.w3schools.com/tags/canvas_arc.asp
    ctx.beginPath()
    ctx.arc(400, 300, 50, 0, (3 * Math.PI) / 2, false)
    ctx.lineTo(450, 250);
    ctx.closePath()
    ctx.fill()

    //draw shape
    //set up styling first
    ctx.fillStyle = "#55ddef"
    ctx.strokeStyle = "yellow"
    ctx.lineWidth = "2"


    ctx.beginPath()//begin for new shape
    ctx.moveTo(650, 100)//starting point
    ctx.lineTo(700, 140)
    ctx.lineTo(675, 200)
    ctx.lineTo(625, 200)
    ctx.lineTo(600, 140)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    //Draw an image to canvas
    //creates the instance of the image
    var mario = new Image()
    //links the source of the image file
    mario.src = 'images/mario.png'
    //callback function loads image and draws it to canvas
    mario.onload = function () {
        ctx.drawImage(mario, 600, 300, 40, 80)
    }


}
