var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d')
var timer = requestAnimationFrame(main)
var ship
var numAsteroids = 20
var asteroids = []
var gameOver = true
var gameStates = []
var currentState = 0
var score = 0
var highScore = 0
var powerup
var invincible = false

//IMAGE SPRITES FOR GAME
var shipSprite = new Image()
shipSprite.src = "images/shipsprite.png"
shipSprite.onload = function(){
   
}

var asteroidSprite = new Image()
asteroidSprite.src = "images/asteroidsprite.png"
asteroidSprite.onload = function(){
   
}

var starsBGSprite = new Image()
starsBGSprite.src = "images/starsbg.jpeg"
starsBGSprite.onload = function(){
  
}

var menuSprite = new Image()
menuSprite.src = "images/PHOTOSHOPBG.jpg"
menuSprite.onload = function(){
    
    /*Need this to get images to load properly
    Have it on the largest image to fire the request when it loads*/
    timer = requestAnimationFrame(main)
}


//utility functions
function randomRange(high, low){
    return Math.random() * (high-low) + low
}

function gameStart(){
    //For Loop to create the instances of Asteroids
    for(var i = 0; i < numAsteroids; i++){
        asteroids[i] = new Asteroid()
    }

    //Create an instance of the PlayerShip
    ship = new PlayerShip()
    //CREATE INSTANCE OF POWERUP
    powerup = new PowerUp()
    
}

//Constructor Function for Asteroid Class
function Asteroid(){
    this.radius = randomRange(15,2)
    this.x = randomRange(canvas.width - this.radius, this.radius) + canvas.width
    this.y = randomRange(canvas.height - this.radius, this.radius)
    this.vy = randomRange(10, 5)
    this.color = "white"

    this.drawAsteroid = function(){
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = this.color
        //ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true)
        //DRAW SPRITE FOR ASTEROIDS
        ctx.drawImage(asteroidSprite,this.x-this.radius,this.y-this.radius,this.radius*2,this.radius*2)
        ctx.closePath()
        ctx.fill()
        ctx.restore()

    }

}

//Constructor Function for PowerUp Class
function PowerUp(){
    this.radius = 10
    this.x = randomRange(canvas.width - this.radius, this.radius)// - canvas.width
    this.y = randomRange(canvas.height - this.radius, this.radius)
    this.vy = 4
    this.color = "green"

    this.drawPowerUp = function(){
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true)
        
        //ctx.drawImage(asteroidSprite,this.x-this.radius,this.y-this.radius,this.radius*2,this.radius*2)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
    }
}



//Setup Keyboard Event Handlers 
document.addEventListener("keydown", pressKeyDown)
document.addEventListener("keyup", pressKeyUp)

function pressKeyDown(e){
    if (!gameOver) {
        if (e.keyCode == 87) {
            ship.up = true
        }
        if (e.keyCode == 65) {
            ship.left = true
        }
        if (e.keyCode == 68) {
            ship.right = true
        }
        if (e.keyCode == 83) {
            ship.down = true
        }
    }

    if(gameOver){

        //checking for spacebar
        if(e.keyCode == 32){
            if(currentState == 2){
                //game over screen reatarts game
                currentState = 0
                //resets number of asteroids
                numAsteroids = 20
                //empties asteroids array
                asteroids = []
                //resets score
                score = 0
                gameStart()
                main()
            }
            else{
                //main screen starts game 
                gameStart()
                currentState = 1
                gameOver = false
                main()
                scoreTimer()
                console.log("space")

            }
            
        }
    }
    
}

function pressKeyUp(e){
    if(!gameOver){
        if (e.keyCode == 87) {
            ship.up = false
        }
        if (e.keyCode == 65) {
            ship.left = false
        }
        if (e.keyCode == 68) {
            ship.right = false
        }
        if (e.keyCode == 83) {
            ship.down = false
        } 
    }
    
}

//constructor function
function PlayerShip(){
    this.x = canvas.width/2
    this.y = canvas.height/2
    this.w = 20
    this.h = 20
    this.vx = 0
    this.vy = 0
    this.up = false
    this.down = false
    this.left = false
    this.right = false
    this.flamelength = 30

    this.drawShip = function(){
       ctx.save()
        ctx.translate(this.x, this.y)
        //ROTATES CONTEXT FOR SHIP (THIS CAN ALSO BE DONE BY CHANGING VALUES)
        ctx.rotate(90 * Math.PI / 180)
        //CHANGE FOR FLAME
        if(this.up || this.down || this.right){
            ctx.save()
            //Changes the drawing values to animate the flame
            if(this.flamelength == 30){
                this.flamelength = 20
                ctx.fillStyle = "yellow"
            }else{
                
                this.flamelength = 30
                ctx.fillStyle = "orange"
            }
            ctx.beginPath()
            ctx.moveTo(0, this.flamelength)
            ctx.lineTo(5,5)
            ctx.lineTo(-5,5)
            ctx.lineTo(0,this.flamelength)
            ctx.closePath()
            ctx.fill()
            ctx.restore()

        }
        ctx.fillStyle = "red"
        /*ctx.beginPath()
        ctx.moveTo(0, -10)
        ctx.lineTo(10, 10)
        ctx.lineTo(-10, 10)
        ctx.lineTo(0, -10)
        ctx.closePath()
        ctx.fill();*/
        //DRAW SPRITE FOR SHIP
        ctx.drawImage(shipSprite,-20,-20,40,40)
        if(invincible){
            
            ctx.beginPath()
            ctx.fillStyle = 'blue'
            ctx.globalAlpha = 0.5
            ctx.arc(0, 0, this.h, 0, 2 * Math.PI, true)
            //DRAW SPRITE FOR ASTEROIDS
            ctx.drawImage(asteroidSprite,this.x-this.radius,this.y-this.radius,this.radius*2,this.radius*2)
            ctx.closePath()
            ctx.fill()
            ctx.globalAlpha = 1.0
            
        }
        ctx.restore() 
    }

    this.move = function(){
        this.x += this.vx
        this.y += this.vy

        //bottom boundary of screen
        if(this.y > canvas.height - this.h/2){
            this.y = canvas.height - this.h/2
            this.vy = 0
        }
        //top boundary of screen
        if(this.y < this.h/2){
            this.y = this.h/2
            this.vy = 0
        }

        //right boundary of screen
        if(this.x > canvas.width - this.w/2){
            this.x = canvas.width - this.w/2
            this.vx = 0
        }
        //left boundary of screen
        if(this.x < this.w/2){
            this.x = this.w/2
            this.vx = 0
        }
    }
      
}

//Main Screen
gameStates[0] = function(){
    
    ctx.save()
    ctx.drawImage(menuSprite ,0,0, canvas.width, canvas.height)
    ctx.font = "30px Arial"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.fillText("Asteroid Avoider", canvas.width/2, canvas.height/2-30)
    ctx.font = "15px Arial"
    ctx.fillText("Press Space to Start", canvas.width/2, canvas.height/2 + 20)
    ctx.restore()

}

//Game Screen
gameStates[1] = function(){
    
    
    ctx.save()
    ctx.drawImage(starsBGSprite ,0,0, canvas.width, canvas.height)
    //code for displaying score
    ctx.font = "15px Arial"
    ctx.fillStyle = "white"
    ctx.fillText("Score: " + score.toString(), canvas.width - 150, 30)
    ctx.restore()

    //Vertical 
    if(ship.right){
        ship.vx = 10
    }else{
        ship.vx = -3
    }
    
    //Horizontal Movement
    if(ship.up){
        ship.vy = -3
    }else if(ship.down){
        ship.vy = 3
    }else{
        ship.vy = 0
    }

    //Loops through all asteroids and can check their position
    for(var i = 0; i < asteroids.length; i++){
        var dX = ship.x - asteroids[i].x
        var dY = ship.y - asteroids[i].y
        var distance = Math.sqrt((dX*dX)+(dY*dY))

        if(detectCollision(distance, (ship.h/2 + asteroids[i].radius))&&!invincible){
            console.log("hit asteroid")
            gameOver = true
            currentState = 2
            main()
            
        }


        if(asteroids[i].x < asteroids[i].radius){
            asteroids[i].x = randomRange(canvas.width - asteroids[i].radius, asteroids[i].radius) + canvas.width
            asteroids[i].y = randomRange(canvas.height - asteroids[i].radius, asteroids[i].radius) 
        }
        if(!gameOver){
            asteroids[i].x -= asteroids[i].vy
            asteroids[i].drawAsteroid()
        }
    }
    
    //DETECT COLLISION WITH POWERUP
    var dX = ship.x - powerup.x
    var dY = ship.y - powerup.y
    var distance = Math.sqrt((dX*dX)+(dY*dY))
    if(detectCollision(distance, ship.h/2+powerup.radius)){
        powerup.x = 10000
        invincible = true
        setTimeout(function(){invincible=false}, 5000)
    }
    if(!gameOver){
        ship.move()
        powerup.x -= powerup.vy
        ship.drawShip()
        //DRAWS POWERUP
        powerup.drawPowerUp()
    }

    while(asteroids.length < numAsteroids){
        asteroids.push(new Asteroid())
    }
}

//Game Over
gameStates[2] = function(){
    if(score > highScore){
        //set a new high score
        highScore = score
        ctx.save()
        //DRAW BG IMAGE
        ctx.drawImage(menuSprite ,0,0, canvas.width, canvas.height)
        ctx.font = "30px Arial"
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.fillText("Game Over, your high score score was: " + score.toString() , canvas.width/2, canvas.height/2-60)
        ctx.fillText("Your new high score is: " + highScore.toString() , canvas.width/2, canvas.height/2-30)
        ctx.fillText("New Record", canvas.width/2, canvas.height/2)
        ctx.font = "15px Arial"
        ctx.fillText("Press Space to Play Again", canvas.width/2, canvas.height/2 + 20)
        ctx.restore()

    }else{
        //keep same score new high score
        ctx.save()
        //DRAW BG IMAGE
        ctx.drawImage(menuSprite ,0,0, canvas.width, canvas.height)
        ctx.font = "30px Arial"
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.fillText("Game Over, your score was: " + score.toString() , canvas.width/2, canvas.height/2-60)
        ctx.fillText("Your high score is: " + highScore.toString() , canvas.width/2, canvas.height/2-30)
        ctx.font = "15px Arial"
        ctx.fillText("Press Space to Play Again", canvas.width/2, canvas.height/2 + 20)
        ctx.restore()
    }
    
   
}

function main(){
    //clear canvas 
    //shipY-=1
    ctx.clearRect(0,0,canvas.width, canvas.height)
    

    gameStates[currentState]()

    if(!gameOver){
        timer = requestAnimationFrame(main)
    }
    
}

function detectCollision(distance, calcDistance){
    return distance < calcDistance
}

//Timer for Score
function scoreTimer(){
    if(!gameOver){
        score++
        //using modulus  that returns remainder of a decimal
        //checks to see if remainder is divisble by 5
        if(score % 5 == 0){
            numAsteroids += 5
            console.log(numAsteroids)
        }
        if(score % 10 == 0){
            powerup.x = randomRange(canvas.width - powerup.radius, powerup.radius) + canvas.width
        }

        setTimeout(scoreTimer, 1000)
    }

}

