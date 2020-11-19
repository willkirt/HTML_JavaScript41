window.onload = function(){
    var c = document.querySelector('canvas');
    var ctx = c.getContext('2d');
    var deg = 25;
    var x = 10;
    var timer = requestAnimationFrame(draw);

    function draw(){
        ctx.clearRect(0,0,c.width,c.height);
        ctx.save();
        ctx.fillStyle = 'blue';
        ctx.translate(c.width/2, c.height/2);
        ctx.rotate(deg += 1 * Math.PI/180);
        ctx.fillRect(-100, -100, 200, 200);
        ctx.restore();
        ctx.fillRect(x += 1, 10, 10, 10);

        //draw a line
        ctx.save();
        ctx.strokeStyle = 'green';
        ctx.moveTo(20,20);
        ctx.lineTo(200,200)
        ctx.stroke();
        ctx.restore();

        timer = requestAnimationFrame(draw);
    }

    draw();
}