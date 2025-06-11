function Ball(position, color){
    this.position = position;
    this.velocity = new Vector();
    this.isMoving = false;
    this.sprite = getBallByColor(color);
    this.color = color;
    this.visible = true;
}

// Ball Prototype has update, draw, shoot, collide, handleBallInPocket
Ball.prototype.update = function(delta){

    if(!this.visible){
        return;
    }

    this.position.addTo(this.velocity.multiply(delta));

    this.velocity = this.velocity.multiply(1 - CONSTANTS.frictionEnergyLoss); // friction

    if (this.velocity.length() < CONSTANTS.minVelocityLength){
        this.velocity = new Vector();
        this.isMoving = false;
    }
}

Ball.prototype.draw = function(){
    if(!this.visible){
        return;
    }
    canvas.drawImage(this.sprite, this.position, CONSTANTS.ballOrigin)
}

Ball.prototype.shoot = function(power, rotation){
    this.velocity = new Vector(power * Math.cos(rotation), power * Math.sin(rotation))
    this.isMoving = true;
}

// Elastic collision with physics
Ball.prototype.collideWithBall = function(ball){
    if (!this.visible || !ball.visible){
        return; // ball not in game anymore
    }

    // Step 1: find a normal vector
    const n = this.position.subtract(ball.position);

    // Step 2: find distance
    const dist = n.length();

    if (dist > CONSTANTS.ballDiameter){
        return; // no collision
    }

    // Find minimum translation distance
    const minTransDist = n.multiply((CONSTANTS.ballDiameter - dist) / dist);

    // Push-pull balls apart
    this.position = this.position.add(minTransDist.multiply(1/2));
    ball.position = ball.position.subtract(minTransDist.multiply(1/2));

    // Step 3: find unit normal vector
    const uNormal = n.multiply(1/n.length());

    // Step 4: find unit tangent vector
    const uTangent = new Vector(-uNormal.y, uNormal.x);

    // Step 5: resolve velocity into normal and tangential components
    const v1n = uNormal.dot(this.velocity);
    const v1t = uTangent.dot(this.velocity);
    const v2n = uNormal.dot(ball.velocity);
    const v2t = uTangent.dot(ball.velocity);

    // Step 6: find new normal velocities (easy since our mass are equal)
    let v1nPrime = v2n;
    let v2nPrime = v1n;

    // Step 7: convert scalar normal and tangential velocities into vectors
    v1nPrime = uNormal.multiply(v1nPrime);
    const v1tPrime = uTangent.multiply(v1t);
    v2nPrime = uNormal.multiply(v2nPrime);
    const v2tPrime = uTangent.multiply(v2t);

    // Step 8: update velocity
    this.velocity = v1nPrime.add(v1tPrime);
    ball.velocity = v2nPrime.add(v2tPrime);

    this.isMoving = true;
    ball.isMoving = true;
}

Ball.prototype.collideWithTable = function(table){
    if(!this.isMoving || !this.visible){
        return;
    }

    let collided = false;
    if(this.position.y <= table.TopY + CONSTANTS.ballRadius){
        this.position.y = table.TopY + CONSTANTS.ballRadius;
        this.velocity = new Vector(this.velocity.x, -this.velocity.y);
        collided = true;
    }

    if(this.position.x >= table.RightX - CONSTANTS.ballRadius){
        this.position.x = table.RightX - CONSTANTS.ballRadius
        this.velocity = new Vector(-this.velocity.x, this.velocity.y);
        collided = true;
    }

    if(this.position.y >= table.BottomY - CONSTANTS.ballRadius){
        this.position.y = table.BottomY - CONSTANTS.ballRadius
        this.velocity = new Vector(this.velocity.x, -this.velocity.y);
        collided = true;
    }

    if(this.position.x <= table.LeftX + CONSTANTS.ballRadius){
        this.position.x = table.LeftX + CONSTANTS.ballRadius
        this.velocity = new Vector(-this.velocity.x, this.velocity.y);
        collided = true;
    }

    if(collided){
        this.velocity = this.velocity.multiply(1- CONSTANTS.collisionEnergyLoss);
    }
    
}

Ball.prototype.handleBallInPocket = function(){

    if (!this.visible){
        return;
    }
    let inPocket = CONSTANTS.pockets.some(p => {return this.position.distFrom(p) < CONSTANTS.pocketRadius});

    if (!inPocket){
        return;
    }

    this.visible = false;
    this.isMoving = false;
}