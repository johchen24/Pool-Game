const CONSTANTS = {
    ballsParams: [
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
        [new Vector(413,413), COLOR.WHITE]
    ],
    delta: 1/150, // how much to update on each frame

    // for ball
    ballOrigin: new Vector(25, 25),
    ballDiameter: 38,
    ballRadius: 19,
    minVelocityLength: 10,


    // for cue
    cueOrigin: new Vector(970, 11),
    cueShotOrigin: new Vector(950, 11),
    maxPower: 9000,
    powerIncrease: 120,
    originXIncrease: 5,
    collisionEnergyLoss: 0.01,
    frictionEnergyLoss: 0.019,

    // for table
    pocketRadius: 46,
    pockets: [
        new Vector(750, 32),
        new Vector(750, 794),
        new Vector(62, 62),
        new Vector(1435, 62),
        new Vector(62, 762),
        new Vector(1435, 762)
    ]
}