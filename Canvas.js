function Canvas2D(){
    this._canvas = document.getElementById("screen");
    this._canvasContext = this._canvas.getContext("2d");
}

// Canvas2D Prototype has: clear, drawImage
Canvas2D.prototype.clear = function(){
    this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
}

Canvas2D.prototype.drawImage = function(image, position, origin, rotation = 0){
    if (!position){
        position = new Vector();
    }
    if (!origin){
        origin = new Vector();
    }
    this._canvasContext.save();
    this._canvasContext.translate(position.x, position.y); // rely on the origin for positioning
    this._canvasContext.rotate(rotation);
    this._canvasContext.drawImage(image, -origin.x, -origin.y);
    this._canvasContext.restore();
}

let canvas = new Canvas2D();

