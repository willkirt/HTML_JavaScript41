//Global variable dictionary
var c = document.querySelector('canvas');   //---------Select the canvas
var ctx = c.getContext('2d');   //---------------------Context to draw on
var timer = requestAnimationFrame(main);    //---------Creates a timer based on miliseconds
var velocity = -2;  //---------------------------------Max speed asteroids will be able to fly
var asteroids = new Array();    //---------------------An array to hold all the asteroids in game
var numAsteroids = 10;  //-----------------------------Total number of asteroids on the screen
var score = 0;  //-------------------------------------Holds the score for the current round
var highScore = 0;  //---------------------------------Holds the highest score of all rounds played in current session
var gameStates = [];    //-----------------------------An array of the various game states
var currentState = 0;   //-----------------------------Current active game state
var powerUpTimer = 0;   //-----------------------------Counts how long the power up has been active
var ship;   //-----------------------------------------Holds the players ship
var gameOver = true;    //-----------------------------Tells if the game is currently being played
var powerUpTime = false;    //-------------------------Tells if the power up is active for the player
var powerUpExist = false;   //-------------------------Tells if the power up is spawned
var bgMain = new Image();   //-------------------------Background image for the menu screen
var bgEnd = new Image();    //-------------------------Background image for the game over screen
var asterSprite = new Image();  //---------------------Image used for the asteroids
var shipSprite = new Image();   //---------------------Image used for the players ship
var shipPowerUpSprite = new Image();    //-------------Image used when the player collects the power up
var forceFieldSprite = new Image(); //-----------------image used for the force field power up

//Image souce block
bgMain.src = 'images/Asteroids_Background.jpg';
bgEnd.src = 'images/GameOver.jpg'
asterSprite.src = 'images/asteroid.png';
shipSprite.src = 'images/shipRed.png';
shipPowerUpSprite.src = 'images/shipPowerUp.png'
forceFieldSprite.src = 'images/powerUp.png';

//image loading block
forceFieldSprite.onload = function(){
    main();
}
shipSprite.onload = function(){
    main();
}
asterSprite.onload = function(){
    main();
}
bgMain.onload = function(){
    main();
}
bgEnd.onload = function(){
    main();
}

//Random function
function randomRange(high, low){
    return Math.random() * (high-low) + low;
}

//Draws and moves the various asteroids
function Asteroids(){
    this.radius = randomRange(5, 10);
    this.y = randomRange(0 + this.radius, c.height - this.radius);
    this.x = c.width;
    this.vx = randomRange(-.5, velocity);
    this.color = 'white';

    this.draw = function(){
        ctx.save();
        ctx.drawImage(asterSprite, this.x-this.radius, this.y-this.radius, this.radius*2, this.radius*2);
        ctx.restore();
    }

    this.move = function(){
        this.x += this.vx;

        if(this.x < 0 - this.radius){
            this.x = c.width - this.radius;
            this.y = randomRange(0 + this.radius, c.height - this.radius);
        }
    }

    this.destroyed = function(){
        this.x = c.width - this.radius;
        this.y = randomRange(0 + this.radius, c.height - this.radius);
    }
}

//Draws and moves the players ship
function playerShip(){
    this.x = 0;
    this.y = c.height/2;
    this.w = 36;
    this.h = 18;
    this.vx = 0;
    this.vy = 0;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.flameLength = 30;

    this.draw = function(){
        ctx.save();
        ctx.translate(this.x, this.y);

        if(this.up == true || this.right == true || this.down == true){
            ctx.save();
            if(this.flameLength == 30){
                this.flameLength = 10;
            }
            else if(this.flameLength == 10){
                this.flameLength = 15;
            }
            else if(this.flameLength == 15){
                this.flameLength = 20;
            }
            else if(this.flameLength == 20){
                this.flameLength = 25;
            }
            else{
                this.flameLength = 30;
            }
            ctx.beginPath();
            ctx.fillStyle = 'orange';
            ctx.moveTo(0-this.flameLength, 0);
            ctx.lineTo(5, 5);
            ctx.lineTo(5, -5);
            ctx.moveTo(0-this.flameLength, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
        if(powerUpTime == false){
            ctx.drawImage(shipSprite, -10, -10, 36, 18);
        }
        else{
            ctx.drawImage(shipPowerUpSprite, -10, -10, 41, 22);
        }
        ctx.restore();
    }

    this.move = function(){
        this.x += this.vx;
        this.y += this.vy;

        if(this.y > c.height - 10){
            this.y = c.height - 10;
            this.vy = 0;
        }
        if(this.y < 0 + 10){
            this.y = 0 + 10;
            this.vy = 0;
        }
        if(this.x > c.width - 10){
            this.x = c.width - 10;
            this.vx = 0;
        }
        if(this.x < 0 + 10){
            this.x = 0 + 10;
            this.vx = 0;
        }
    }
}

//Draws and moves the power up item
function powerUp(){
    this.radius = 20;
    this.y = randomRange(0 + this.radius, c.height - this.radius);
    this.x = c.width;
    this.vx = -2;

    this.draw = function(){
        ctx.save();
        ctx.drawImage(forceFieldSprite, this.x-this.radius, this.y-this.radius, this.radius*2, this.radius*2);
        ctx.restore();
    }

    this.move = function(){
        this.x += this.vx;

        if(this.x < 0 - this.radius){
            powerUpExist = false;
            this.x = c.width - this.radius;
            this.y = randomRange(0 + this.radius, c.height - this.radius);
        }
    }

    this.collect = function(){
        powerUpExist = false;
        this.x = c.width - this.radius;
        this.y = randomRange(0 + this.radius, c.height - this.radius);
    }
}

//Creates an array of asteroids, the players ship, and the power up.
function GameStart(){
    for(var i = 0; i<numAsteroids; i++){
        asteroids[i] = new Asteroids()
    }

    ship = new playerShip();
    forceField = new powerUp();
}



//adding event listeners
document.addEventListener('keydown', keyPressDown);
document.addEventListener('keyup', keyPressUp);

function keyPressDown(e){
    if(gameOver == false){
        if(e.keyCode === 38){
            ship.up = true;
        }
        if(e.keyCode === 37){
            ship.left = true;
        }
        if(e.keyCode === 39){
            ship.right = true;
        }
        if(e.keyCode === 40){
            ship.down = true;
        }
    }
    if(gameOver == true){
        if(e.keyCode === 13){
            if(currentState == 2 ){
                currentState = 0;
                score = 0;
                velocity = -2;
                numAsteroids = 10;
                asteroids = [];
                GameStart();
                main();
            }
            else{
                GameStart();
                currentState = 1;
                gameOver = false;
                main();
                scoreTimer();
            }
        
        }
    }
}

function keyPressUp(e){
    if(e.keyCode === 38){
        ship.up = false;
    }
    if(e.keyCode === 37){
        ship.left = false;
    }
    if(e.keyCode === 39){
        ship.right = false;
    }
    if(e.keyCode === 40){
        ship.down = false;
    }
}

//Game state 
gameStates[0] = function(){
    ctx.drawImage(bgMain, 0, 0, c.width, c.height);
    ctx.save();
    ctx.font = "30px Share Tech Mono";
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('Asteroid Avoidance',c.width/2, c.height/2 -30);
    ctx.font = '15px Share Tech Mono';
    ctx.fillText('Press enter to start',c.width/2, c.height/2 +20);
    ctx.restore();
}

gameStates[1] = function(){
    //draws score to the HUD
    ctx.save();
    ctx.font = '15px Share Tech Mono';
    ctx.fillStyle = 'white';
    ctx.fillText('Score: '+ score.toString(),25, 25)
    ctx.restore();

//Sets directional velocity of the ship based on keys pressed.    
    if(ship.up == true){
        ship.vy = -3;
    }
    else if(ship.down == true){
        ship.vy = 3;
    }
    else{
        ship.vy = 0;
    }
    if(ship.left == true){
        ship.vx = -3;
    }
    else if(ship.right == true){
        ship.vx = 3;
    }
    else{
        ship.vx = -1;
    }

//Draws the asteroids
    for(var i = 0; i<asteroids.length; i++){
        var dx = ship.x - asteroids[i].x;
        var dy = ship.y - asteroids[i].y;
        var dist = Math.sqrt((dx*dx)+(dy*dy));

        if(powerUpTime == false){
            if(detectCollision(dist, (ship.h/2 + asteroids[i].radius))){
                currentState = 2;
                gameOver = true;
            }
        }
        else{
            if(detectCollision(dist, (ship.h/2 + asteroids[i].radius))){
                asteroids[i].destroyed();
            }
        }

        if(gameOver == false){
            asteroids[i].draw();
            asteroids[i].move();
        }
    }

    ship.draw();
    if(gameOver == false){
        ship.move();
    }

    while(asteroids.length <numAsteroids){
        asteroids.push(new Asteroids());
    }

//Draws the power up.
    if(score % 10 == 0 && score > 1){
        powerUpExist = true;
    }

    var dx = ship.x - forceField.x;
    var dy = ship.y - forceField.y;
    var dist = Math.sqrt((dx*dx)+(dy*dy));

    if(detectCollision(dist, (ship.h/2 + forceField.radius))){
        forceField.collect();
        powerUpTime = true;
    }

    if(powerUpExist == true){
        forceField.draw();
        forceField.move();
    }
}

gameStates[2] = function(){
    ctx.drawImage(bgEnd, 0, 0, c.width, c.height);
    if(score > highScore){
        highScore = score;
        ctx.save();
        ctx.font = "30px Share Tech Mono";
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!',c.width/2, c.height/2 -30);
        ctx.font = '15px Share Tech Mono';
        ctx.fillText('Your score was: '+ score.toString(),c.width/2, c.height/2 +20);
        ctx.fillText('Thats a new high score, Congrats!',c.width/2, c.height/2 +40);
        ctx.fillText('Press enter to play again.',c.width/2, c.height/2 +60);
        ctx.restore();
    }
    else{
        ctx.save();
        ctx.font = "30px Share Tech Mono";
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!',c.width/2, c.height/2 -30);
        ctx.font = '15px Share Tech Mono';
        ctx.fillText('Your score was: '+ score.toString(),c.width/2, c.height/2 +20);
        ctx.fillText('Your high score was: '+ highScore.toString(),c.width/2, c.height/2 +40);
        ctx.fillText('Press enter to play again.',c.width/2, c.height/2 +60);
        ctx.restore();
    }
    
}

function main(){
    ctx.clearRect(0, 0, c.width, c.height);
    if(gameOver == false){
        timer = requestAnimationFrame(main); 
    }
        gameStates[currentState]();

}

function detectCollision(distance, calcDistance){
    return distance < calcDistance;
}

function scoreTimer(){
    if(gameOver == false){
        score++;
        if(score % 5 == 0){
            velocity -= .5
            numAsteroids += 5
        }
        console.log('Score: '+ score)
        setTimeout(scoreTimer, 1000);
    }

    if(powerUpTime == true){
        powerUpTimer++;
        if(powerUpTimer % 5 == 0){
            powerUpTime = false;
        }
    }
}

