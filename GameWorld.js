// GAMEWORLD CONTAINS ALL OBJECTS OF THE GAME
const DELTA = 1/150; // how much to update on each iteration


function GameWorld(){
    this.balls = [ // non-white balls
        [new Vector(1022, 413), COLOR.YELLOW],
        [new Vector(1056, 393), COLOR.YELLOW],
        [new Vector(1056, 433), COLOR.RED],
        [new Vector(1090, 374), COLOR.RED],
        [new Vector(1090, 413), COLOR.BLACK],
        [new Vector(1090, 452), COLOR.YELLOW],
        [new Vector(1126, 354), COLOR.YELLOW],
        [new Vector(1126, 393), COLOR.RED],
        [new Vector(1126, 433), COLOR.YELLOW],
        [new Vector(1126, 472), COLOR.RED],
        [new Vector(1162, 335), COLOR.RED],
        [new Vector(1162, 374), COLOR.RED],
        [new Vector(1162, 413), COLOR.YELLOW],
        [new Vector(1162, 452), COLOR.RED],
        [new Vector(1162, 491), COLOR.YELLOW],
        [new Vector(413,413), COLOR.WHITE],
    ].map(b => new Ball(b[0], b[1]));

    this.whiteBall = this.balls[this.balls.length - 1];
    this.cue = new Cue(
        new Vector(413, 413),
        this.whiteBall.shoot.bind(this.whiteBall));
}

// GameWorld Prototype has: update, draw, ballsMoving, handleCollisions

GameWorld.prototype.handleCollisions = function(){
    for (let i = 0; i < this.balls.length; i++){
        for(let j = i + 1; j < this.balls.length; j++){
            const first = this.balls[i];
            const second = this.balls[j];
            first.collide(second);
        }
    }
}

GameWorld.prototype.update = function(){

    this.handleCollisions();

    this.cue.update();
    
    for (let i = 0; i < this.balls.length; i++){
        this.balls[i].update(DELTA);
    }

    if (!this.ballsMoving() && this.cue.didShot){
        this.cue.positionAgain(this.whiteBall.position);
    }
}

GameWorld.prototype.draw = function(){
    canvas.drawImage(sprites.background, {x:0, y:9});

    for (let i = 0; i < this.balls.length; i++){
        this.balls[i].draw();
    }
    this.cue.draw();
}

GameWorld.prototype.ballsMoving = function(){
    let moving = false;
    for (let i = 0; i < this.balls.length; i++){
        if(this.balls[i].isMoving){
            moving = true;
            break;
        }
    }
    return moving;
}