var c = document.querySelector("canvas");
var ctx = c.getContext('2d');
var timer = requestAnimationFrame(main);
var gravity = 1;
var asteroids = new Array();
var numAsteroids = 10;
var gameOver = true;
var score = 0;
var highScore = 0;
var gameStates = [];
var currentState = 0;
var ship;
var bgMain = new Image();

bgMain.src = 'images/Asteroids_Background.jpg'
bgMain.onload = function(){
    main();
}

function randomRange(high, low){
    return Math.random() * (high-low) + low;
}

function Asteroids(){
    this.radius = randomRange(5, 10);
    this.x = randomRange(0 + this.radius, c.width - this.radius);
    this.y = 0;
    this.vy = randomRange(gravity,.5);
    this.color = 'white';

    this.draw = function(){
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle= this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI,true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    this.move = function(){
        this.y += this.vy;

        if(this.y > c.height - this.radius){
            this.y = 0 - this.radius;
            this.x = randomRange(0 + this.radius, c.width - this.radius);
        }
    }
}

function playerShip(){
    this.x = c.width/2;
    this.y = c.height/2;
    this.w = 0;
    this.h = 0;
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

        if(this.up == true || this.left == true || this.right == true || this.down == true){
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
            ctx.moveTo(0, this.flameLength);
            ctx.lineTo(5, 5);
            ctx.lineTo(-5, 5);
            ctx.moveTo(0, this.flameLength)
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.moveTo(0, -10);
        ctx.lineTo(10, 10);
        ctx.lineTo(-10,10);
        ctx.lineTo(0, -10);
        ctx.closePath()
        ctx.fill()
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

function GameStart(){
    for(var i = 0; i<numAsteroids; i++){
        asteroids[i] = new Asteroids()
    }
    //this creates an instance of the ship
    ship = new playerShip();
}


//adding event listeners
document.addEventListener('keydown', keyPressDown);
document.addEventListener('keyup', keyPressUp);

function keyPressDown(e){
    console.log('key down' + e.keyCode);
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
                gravity = 1;
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
    console.log(e.keyCode);
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
    ctx.drawImage(bgMain, 0, 0, c.width, c.height)
    ctx.save();
    ctx.font = "30px Arial";
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('Asteroid Avoidance',c.width/2, c.height/2 -30);
    ctx.font = '15px Arial';
    ctx.fillText('Press enter to start',c.width/2, c.height/2 +20);
    ctx.restore();
}

gameStates[1] = function(){
    //draws score to the HUD
    ctx.save();
    ctx.font = '15px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Score: '+ score.toString(),25, 25)
    ctx.restore();

    if(ship.up == true){
        ship.vy = -3;
    }
    else if(ship.down == true){
        ship.vy = 3;
    }
    else{
        ship.vy = .5;
    }
    if(ship.left == true){
        ship.vx = -3;
    }
    else if(ship.right == true){
        ship.vx = 3;
    }
    else{
        ship.vx = 0;
    }
//Draws the asteroids
    for(var i = 0; i<asteroids.length; i++){
        var dx = ship.x - asteroids[i].x;
        var dy = ship.y - asteroids[i].y;
        var dist = Math.sqrt((dx*dx)+(dy*dy));

        if(detectCollision(dist, (ship.h/2 + asteroids[i].radius))){
            console.log('Collision with asteroid ' + i);
            currentState = 2;
            gameOver = true;
            //adding event listeners
           // document.removeEventListener('keydown', keyPressDown);
            //document.removeEventListener('keyup', keyPressUp);
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
}

gameStates[2] = function(){
    if(score > highScore){
        highScore = score;
        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!',c.width/2, c.height/2 -30);
        ctx.font = '15px Arial';
        ctx.fillText('Your score was: '+ score.toString(),c.width/2, c.height/2 +20);
        ctx.fillText('Thats a new high score, Congrats!',c.width/2, c.height/2 +40);
        ctx.fillText('Press enter to play again.',c.width/2, c.height/2 +60);
        ctx.restore();
    }
    else{
        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!',c.width/2, c.height/2 -30);
        ctx.font = '15px Arial';
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
            gravity += .5
            numAsteroids += 3
        }
        console.log('Score: '+ score)
        setTimeout(scoreTimer, 1000);
    }
}

//scoreTimer();