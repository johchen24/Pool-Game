// FOR INITIALIZATION AND ASSETS IN GAME

let sprites = {}; // keys: background, cue
let assetsLoading = 0;


function assetsLoadingLoops(callback){
    if(assetsLoading){
        requestAnimationFrame(assetsLoadingLoops.bind(this,callback))
    } else {
        callback();
    }
}

function loadAssets(callback){

    function loadSprite(fileName){
        assetsLoading++;
        let spriteIm = new Image();
        spriteIm.src = "./assets/sprites/" + fileName;

        spriteIm.onload = function(){
            assetsLoading--;
        }

        return spriteIm;
    }

    sprites.background = loadSprite('spr_background4.png');
    sprites.cue = loadSprite("spr_stick.png");
    sprites.whiteBall = loadSprite("spr_ball2.png");
    sprites.redBall = loadSprite("spr_redBall2.png");
    sprites.yellowBall = loadSprite("spr_yellowBall2.png");
    sprites.blackBall = loadSprite("spr_blackBall2.png");

    assetsLoadingLoops(callback);
}

function getBallByColor(color){
    switch(color){
        case COLOR.RED:
            return sprites.redBall;
        case COLOR.YELLOW:
            return sprites.yellowBall;
        case COLOR.BLACK:
            return sprites.blackBall;
        case COLOR.WHITE:
            return sprites.whiteBall;
    }
}