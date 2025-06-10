const BALL_ORIGINAL = new Vector(25, 25);
const BALL_DIAMETER = 38;

function Ball(position, color){
    this.position = position;
    this.velocity = new Vector();
    this.isMoving = false;
    this.sprite = getBallByColor(color);
}

// Ball Prototype has update, draw, shoot, collide
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

// elastic collision with physics knowledge
Ball.prototype.collide = function(ball){
    // Step 1: find a normal vector
    const n = this.position.subtract(ball.position);

    // Step 2: find distance
    const dist = n.length();

    if (dist > BALL_DIAMETER){
        return; // no collision
    }

    // Find minimum translation distance
    const minTransDist = n.multiply((BALL_DIAMETER - dist) / dist);

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

    this.moving = true;
    ball.moving = true;
}