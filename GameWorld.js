// GAMEWORLD CONTAINS ALL OBJECTS OF THE GAME

function GameWorld(){
    this.balls = CONSTANTS.ballsParams.map(b => new Ball(...b));

    this.whiteBall = this.balls.find(b => b.color === COLOR.WHITE);
    this.cue = new Cue(
        new Vector(413, 413),
        this.whiteBall.shoot.bind(this.whiteBall));

    this.table = { // table border
        TopY: 57,
        RightX: 1443,
        BottomY: 768,
        LeftX: 57
    }
}

// GameWorld Prototype has: update, draw, ballsMoving, handleCollisions

GameWorld.prototype.handleCollisions = function(){
    for (let i = 0; i < this.balls.length; i++){
        this.balls[i].collideWithTable(this.table);

        for(let j = i + 1; j < this.balls.length; j++){
            const first = this.balls[i];
            const second = this.balls[j];
            first.collideWithBall(second);
        }
    }
}

GameWorld.prototype.update = function(){

    this.handleCollisions();

    this.cue.update();
    
    for (let i = 0; i < this.balls.length; i++){
        this.balls[i].update(CONSTANTS.delta);
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