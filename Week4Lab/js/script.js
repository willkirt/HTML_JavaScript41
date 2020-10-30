//JavaScript goes here

var c = document.querySelector('canvas');
var ctx = c.getContext('2d');

var mario = new Image();
mario.src = 'images/mario.png';

var x = 0;
var y = 0;

//Timer
var timer = requestAnimationFrame(main)

function main(){
    timer=requestAnimationFrame(main)
    ctx.clearRect(0, 0, 800, 600);
    ctx.drawImage(mario, x, 0, 200, 200);
    drawBox();
    if (x <700){
        x++;
    }
    else{
        x = 0;
    }


    /*
    //Example of lines
    ctx.moveTo(0,0);
    ctx.lineTo(800,600);
    ctx.stroke();

    ctx.moveTo(800,0);
    ctx.lineTo(0,600);
    ctx.stroke();

    //this draws a box
    ctx.fillStyle = 'purple';
    ctx.fillRect(c.width/4,c.height/4,c.width/2,c.height/2);

    //this draws a circle
    ctx.fillStyle = 'orange';
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(c.width/2,c.height/2, c.height/10, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.stroke();
    //draw some text
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'blue';
    ctx.font = '50px Arial';
    ctx.fillText("Week 4 Lab", c.width/2 -130, 50);
    ctx.strokeText("Week 4 Lab", c.width/2 -130, 50);

    ctx.drawImage(mario, x, 0, 200, 200);
    */
}

function drawBox(){
    ctx.fillStyle = 'purple';
    ctx.fillRect(x, c.height/2, 100, 50)
}

//main();