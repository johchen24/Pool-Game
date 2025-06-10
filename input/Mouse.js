function handleMouseMove(e){
    let x = e.pageX;
    let y = e.pageY;

    Mouse.position = new Vector(x, y);
}

function handleMouseDown(e){
    handleMouseMove(e);

    // 1: left button, 2: middle button(if present), 3: right button
    switch (e.which) {
        case 1: 
            if (!Mouse.left.down) {
                Mouse.left.pressed = true;
            }
            Mouse.left.down = true;
            break;
        case 2: 
            if (!Mouse.middle.down) {
                Mouse.middle.pressed = true;
            }
            Mouse.middle.down = true;
            break;
        case 3: 
            if (!Mouse.right.down) {
                Mouse.right.pressed = true;
            }
            Mouse.right.down = true;
            break;
        default:
            break;
    }
}

function handleMouseUp(e){
    handleMouseMove(e);

    switch(e.which){
        case 1:
            Mouse.left.down = false;
            break;
        case 2:
            Mouse.middle.down = false;
            break;
        case 3:
            Mouse.right.down = false;
            break;
        default:
            break;
    }
}

function MouseHandler(){
    this.left = new ButtonState();
    this.middle = new ButtonState();
    this.right = new ButtonState();

    this.position = new Vector();

    document.onmousemove = handleMouseMove;
    document.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
}

MouseHandler.prototype.reset = function(){
    this.left.pressed = false;
    this.middle.pressed = false;
    this.right.pressed = false;
}

let Mouse = new MouseHandler();