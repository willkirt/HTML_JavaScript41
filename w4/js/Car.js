

function randomRange(high, low){
    return Math.round(Math.random()*(high - low) + low);
}

function GameObject(){
    this.x = 50;
    this.y = 200;
    this.w = 50;
    this.h = 50;
    this.color = 'purple';

    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }
}