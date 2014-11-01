// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var score; //need to define as number, so define as 0 to start - 0 is a number so this defines score as a number
var x;
var y;
var player;
var player2;
var gamewidth;
var gameheight;
var gap;

gamewidth = 1000;
gameheight = 800;
// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(gamewidth, gameheight, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("Bman","assets/flappy_batman.png"); //load an image file & name it
game.load.image("Sman","assets/flappy_superman.png");
game.load.image("THOR","assets/thorlittle.png");
game.load.audio("score","assets/point.ogg"); //load a sound file & name it
game.load.image("Pipe", "assets/pipe2-body.png"); //pipe body image
game.load.image("PipeEnd","assets/pipe2-end.png"); //pipe end image
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#FF0000"); //sets the background colour of the stage
    game.add.text(300, 380,
        "Welcome to OUR AWESOME game!", {font: "30px Calibri", fill: "#FFFF00"}
    );
    game.add.text(15, 15, "Created by NP & JM", {
        font: "18px Calibri",
        fill: "#FFFFFF"
    });
    game.add.text(gamewidth - 20, 10, score);
    game.add.text(gamewidth - 40, gameheight - 20, "V1.0", {font: "12px Calibri", fill: "#FFFFFF"}); //adds text to the stage
    //game.add.sprite(350, 260, "Bman"); //load the player img file and place it on the screen
    //game.add.sprite(250, 270, "Sman");
    //game.add.sprite(300, 260, "THOR");
    game.input.onDown.add(clickHandler);//define the event when input is a click - calls named function detailed outside this function
    //game.input.oncontextmenu.add(rightClickHandler)//for right click mouse input - defines new function
    //game.canvas.oncontextmenu = function (e) { e.preventDefault(); }//(doesn't work yet) should prevent right click menu from coming up
    game.input
        .keyboard
        .addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler); //define the event when spacebar is depressed
    //game.add.audio("score"); //add the "score" sound to the game, not needed since already preloaded
    score = 0;
    //alert(score); shows score in alert box at beginning
    var x = 150;
    var y = 200;
    player = game.add.sprite(x, y, "THOR");
    //player2 = game.add.sprite(x, y, "Bman");
    game.input
        .keyboard
        .addKey(Phaser.Keyboard.LEFT)
        .onDown.add(moveLeft);
    game.input
        .keyboard
        .addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(moveRight);
    game.input
        .keyboard
        .addKey(Phaser.Keyboard.UP)
        .onDown.add(moveUp);
    game.input
        .keyboard
        .addKey(Phaser.Keyboard.DOWN)
        .onDown.add(moveDown);
    //game.input
       // .keyboard
        //.addKey(Phaser.Keyboard.A)
        //.onDown.add(moveLeft2);
    //game.input
       // .keyboard
        //.addKey(Phaser.Keyboard.D)
        //.onDown.add(moveRight2);
    //game.input
        //.keyboard
       // .addKey(Phaser.Keyboard.W)
       // .onDown.add(moveUp2);
    //game.input
       // .keyboard
        //.addKey(Phaser.Keyboard.S)
       // .onDown.add(moveDown2);

    //for(var countrow = 0; countrow <=13; countrow=countrow+2){ //count++ = count +1
    //game.add.sprite(50*countrow,0,"Pipe");
    //for(var countcolumn = 0; countcolumn <=13; countcolumn=countcolumn+2){
    //game.add.sprite(50*countrow,50*countcolumn,"Pipe"); //for each row, add a column - do a loop within a loop to generate a grid pattern
    //}
    //}
    //for (var countcol = 0; countcol <=Math.random()*13; countcol = countcol + 3)
    //for (var countr = 0; countr <=Math.random()*8; countr++){
    //game.add.sprite(50*countcol,countr,"Pipe");
    //game.add.sprite(countcol,50*countr,"Pipe");
    //}
    var gap = Math.floor(Math.random() * 12) + 1;
    for (var counttop = 0; counttop <= gap; counttop++) {
        game.add.sprite(100, counttop * 50, "Pipe");
        game.add.sprite(98, (gap + 1) * 50, "PipeEnd");
    }
    for (var countbot = gap + 4; countbot <= 16; countbot++) {
        game.add.sprite(100, countbot * 50, "Pipe");
        game.add.sprite(98, (gap + 4) * 50, "PipeEnd");
    }


    var gap = Math.floor(Math.random() * 12) + 1;
    for (var counttop = 0; counttop <= gap; counttop++) {
        game.add.sprite(300, counttop * 50, "Pipe");
        game.add.sprite(298, (gap + 1) * 50, "PipeEnd");
        for (var countbot = gap + 4; countbot <= 16; countbot++) {
            game.add.sprite(300, countbot * 50, "Pipe");
            game.add.sprite(298, (gap + 4) * 50, "PipeEnd");
        }

    }

    var gap = Math.floor(Math.random() * 12) + 1;
    for (var counttop = 0; counttop <= gap; counttop++) {
        game.add.sprite(500, counttop * 50, "Pipe");
        game.add.sprite(498, (gap + 1) * 50, "PipeEnd");
        for (var countbot = gap + 4; countbot <= 16; countbot++) {
            game.add.sprite(500, countbot * 50, "Pipe");
            game.add.sprite(498, (gap + 4) * 50, "PipeEnd");
        }

    }

    var gap = Math.floor(Math.random() * 12) + 1;
    for (var counttop = 0; counttop <= gap; counttop++) {
        game.add.sprite(700, counttop * 50, "Pipe");
        game.add.sprite(698, (gap + 1) * 50, "PipeEnd");
        for (var countbot = gap + 4; countbot <= 16; countbot++) {
            game.add.sprite(700, countbot * 50, "Pipe");
            game.add.sprite(698, (gap + 4) * 50, "PipeEnd");
        }

    }

    var gap = Math.floor(Math.random() * 12) + 1;
    for (var counttop = 0; counttop <= gap; counttop++) {
        game.add.sprite(900, counttop * 50, "Pipe");
        game.add.sprite(898, (gap + 1) * 50, "PipeEnd");
        for (var countbot = gap + 4; countbot <= 16; countbot++) {
            game.add.sprite(900, countbot * 50, "Pipe");
            game.add.sprite(898, (gap + 4) * 50, "PipeEnd");
        }

    }

}


// function clickHandler (event) {
//    alert(event.x + ":" + event.y);
//this function is called outside the function create section; this defines response to click event
//the event.x part shows the mouse click co-ordinates on the alert

function clickHandler (event) {
   //game.add.sprite(event.x, event.y, "THOR");
    //wherever you click (mouse down click) a Thor appears in those coordinates
    game.sound.play("score");
}
function spaceHandler (eventspace) {
    //alert ("jump");
    //game.sound.play("score"); //define the spaceHandler function - when space pressed, play the "score" sound
    //game.add.sprite(Math.random()*620,Math.random()*340,"Bman");//adds sprite in a random location within the frame
    score = score +1;
    alert(score);

}
function moveLeft (event) {
    if (player.x <= 0)
    {player.x = gamewidth;}
    else {player.x += -20;}  //this is a short way of writing player.x = player.x -20;
}
function moveRight (event) {
    if (player.x >= gamewidth)
    {player.x = 0;}
    else {player.x += +20;}
}
function moveUp (event) {
    if (player.y <= 0)
    {player.y = gameheight;}
    else {player.y += -20;}
}
function moveDown (event) {
    if (player.y >= gameheight)
    {player.y = 0;}
    else {player.y += +20;}
}
function moveLeft2 (event) {
    if (player2.x <= 0)
    {player2.x = gamewidth;}
    else {player2.x += -20;}  //this is a short way of writing player.x = player.x -20;
}
function moveRight2 (event) {
    if (player2.x >= gamewidth)
    {player2.x = 0;}
    else {player2.x += +20;}
}
function moveUp2 (event) {
    if (player2.y <= 0)
    {player2.y = gameheight;}
    else {player2.y += -20;}
}
function moveDown2 (event) {
    if (player2.y >= gameheight)
    {player2.y = 0;}
    else {player2.y += +20;}
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    
}