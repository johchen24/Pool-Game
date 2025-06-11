function Cue(position, onShoot){
    this.position = position;
    this.rotation = 0;
    this.origin = CONSTANTS.cueOrigin.copy();
    this.power = 0; // how hard to hit
    this.onShoot = onShoot; // this is a function
    this.didShot = false;
}

// Cue Prototype has: update, draw, updateRotation, increasePower, shoot, positionAgain

Cue.prototype.update = function(){

    if(this.didShot){
        return; // prevent shooting again before ball stops
    }

    if(Mouse.left.down){
        this.increasePower();
    } else if (this.power > 0){
        this.shoot();
    }
    this.updateRotation();
}

Cue.prototype.draw = function(){
    canvas.drawImage(sprites.cue, this.position, this.origin, this.rotation);
}

Cue.prototype.updateRotation = function(){
    let opp = Mouse.position.y - this.position.y;
    let adj = Mouse.position.x - this.position.x;

    this.rotation = Math.atan2(opp, adj);
}

Cue.prototype.increasePower = function(){
    if (this.power > CONSTANTS.maxPower){
        return; // set a cap on max power
    }
    this.power += CONSTANTS.powerIncrease;
    this.origin.x += CONSTANTS.originXIncrease;
}

Cue.prototype.shoot = function(){
    this.onShoot(this.power, this.rotation);
    this.power = 0;
    this.origin = CONSTANTS.cueShotOrigin.copy();
    this.didShot = true;
}

Cue.prototype.positionAgain = function(position){
    this.position = position.copy();
    this.origin = CONSTANTS.cueOrigin.copy();
    this.didShot = false;
}