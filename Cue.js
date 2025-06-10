const CUE_ORIGINAL = new Vector(970, 11);
const CUE_SHOT_ORIGINAL = new Vector(950, 11);
const MAX_POWER = 8500;

function Cue(position, onShoot){
    this.position = position;
    this.rotation = 0;
    this.origin = CUE_ORIGINAL.copy();
    this.power = 0; // how hard to hit
    this.onShoot = onShoot; // this is a function
    this.didShot = false;
}

// Cue Prototype has: update, draw, updateRotation, increasePower, shoot, positionAgain

Cue.prototype.update = function(){

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
    if (this.power > MAX_POWER){
        return; // set a cap on max power
    }
    this.power += 120;
    this.origin.x += 5;
}

Cue.prototype.shoot = function(){
    this.onShoot(this.power, this.rotation);
    this.power = 0;
    this.origin = CUE_SHOT_ORIGINAL.copy();
    this.didShot = true;
}

Cue.prototype.positionAgain = function(position){
    this.position = position.copy();
    this.origin = CUE_ORIGINAL.copy();
    this.didShot = false;
}