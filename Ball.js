const BALL_ORIGINAL = new Vector(25, 25);

function Ball(position, color){
    this.position = position;
    this.velocity = new Vector();
    this.isMoving = false;
    this.sprite = getBallByColor(color);
}

// Ball Prototype has update, draw, shoot
Ball.prototype.update = function(delta){
    this.position.addTo(this.velocity.multiply(delta));

    this.velocity = this.velocity.multiply(0.98); // friction

    if (this.velocity.length() < 5){
        this.velocity = new Vector();
        this.isMoving = false;
    }
}

Ball.prototype.draw = function(){
    canvas.drawImage(this.sprite, this.position, BALL_ORIGINAL)
}

Ball.prototype.shoot = function(power, rotation){
    this.velocity = new Vector(power * Math.cos(rotation), power * Math.sin(rotation))
    this.isMoving = true;
}