// DEAL WITH ARITHMETIC GAME LOGIC

function Vector(x = 0,y = 0){
    this.x = x;
    this.y = y;
}

// Vector Prototype has: copy, addTo, multiply, length
// Also for collision: add, subtract, dot

Vector.prototype.copy = function(){
    return new Vector(this.x, this.y)
}

Vector.prototype.addTo = function(vector){
    this.x += vector.x;
    this.y += vector.y;
}

Vector.prototype.multiply = function(alpha){
    return new Vector(this.x * alpha, this.y * alpha);
}

Vector.prototype.length = function(){
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}

Vector.prototype.add = function(vector){
    return new Vector(this.x + vector.x, this.y + vector.y);
}

Vector.prototype.subtract = function(vector){
    return new Vector(this.x - vector.x, this.y - vector.y);
}

Vector.prototype.dot = function(vector){
    return this.x * vector.x + this.y * vector.y;
}

