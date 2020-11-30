window.onload = function(){
    var c = document.querySelector('canvas');
    var ctx = c.getContext('2d');

    function gameObject(){
        this.x = 0
        this.y = 0
        this.w = 0
        this.h = 0
    
        this.drawPentagon = function(){       
        //draw a pentagon
            ctx.save()
            ctx.strokeStyle= '#00ffff';
            ctx.fillStyle= '#ff00ff';
            ctx.lineWidth= 5;
            ctx.beginPath();
            ctx.moveTo(557, 308);
            ctx.lineTo(667,284);
            ctx.lineTo(724,380);
            ctx.lineTo(650,464);
            ctx.lineTo(548,420);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore()
        }

        this.drawStar = function(){
            //draw a star
            ctx.save()
            ctx.strokeStyle = 'rgb(32,32,32)';
            ctx.fillStyle= '#ffff00';
            ctx.lineWidth= 5
            ctx.beginPath();
            ctx.moveTo(635,496);
            ctx.lineTo(668,554);
            ctx.lineTo(733,567);
            ctx.lineTo(687,616);
            ctx.lineTo(696,681);
            ctx.lineTo(636,653);
            ctx.lineTo(576,681);
            ctx.lineTo(583,616);
            ctx.lineTo(538,567);
            ctx.lineTo(604,554);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore()
        }

        this.drawSquare = function(){
            //draw a square
            ctx.save()
            ctx.strokeStyle= 'black';
            ctx.fillStyle= 'yellow';
            ctx.lineWidth= 10;
            ctx.strokeRect(85, 302, 99, 99);
            ctx.fillRect(85, 302, 99, 99);
            ctx.restore()
        }

        this.drawLine = function(){
            //draw a line
            ctx.save()
            ctx.strokeStyle='rgb(255,0,0)';
            ctx.lineWidth= 5;
            ctx.beginPath();
            ctx.moveTo(86, 682);
            ctx.lineTo(278,550);
            ctx.closePath();
            ctx.stroke();
            ctx.restore()
        }

        this.drawCircle = function(){
            //draw a circle
            ctx.save()
            ctx.strokeStyle= 'red';
            ctx.fillStyle= '#ffff00';
            ctx.lineWidth= 5;
            ctx.moveTo(385, 441);
            ctx.beginPath();
            ctx.arc(385, 441, 67, 0, 2*Math.PI)
            ctx.fill();
            ctx.stroke();
            ctx.restore
        }
    }

    var pentagon = new gameObject();
    var star = new gameObject();
    var square = new gameObject();
    var line = new gameObject();
    var circle = new gameObject();

    function draw(){
        pentagon.drawPentagon();
        star.drawStar();
        square.drawSquare();
        line.drawLine();
        circle.drawCircle();
    }

    draw()
}