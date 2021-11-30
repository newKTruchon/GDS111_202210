//JS file to create a ship in the HTML canvas
function Ship() {

    //the 'this' keyword references the current object you are inside of (in the code block) EVERYTHING in Javascript is an object SO when we say 'this' we are talking about Ship() 

    this.x = 100 //x-axis coord start position
    this.y = 100 //y-axis coord start position
    this.color = "black" //outline color
    this.fillStyle = "orange" //interior color 

    //velocity variable for the x and y axis 
    this.vx = 0 
    this.vy = 0

    //acceleration variables for the x and y axis
    this.ax = 1
    this.ay = 1

    //function "move" that will add velocity to the position of the ship
    this.move = function() {

        this.x += this.vx //adds velocity value to x coord point
        this.y += this.vy //adds velocity value to y coord point 

    }//Ship.move()

    this.draw = function() {

        //save the current state of the canvas
        context.save()

        //move the point of origin 0,0 to the ship's x and y coords
        context.translate(this.x, this.y)

        //DRAW THE SHIP
        context.lineStyle = this.color 
        context.fillStyle = this.fillStyle 

        context.beginPath()

        //draw the triangle! (ship)
        context.moveTo(25,0) //relative to 100, 100 NOT 0,0
        context.lineTo(-25, 25)
        context.lineTo(-25,-25)

        context.closePath()

        context.stroke()
        context.fill()
        context.restore()


    }//Ship.draw()

}//Ship()