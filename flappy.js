// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var score; //need to define as number, so define as 0 to start - 0 is a number so this defines score as a number
var x;
var y;
var player;
var gamewidth;
var gameheight;
var gap;
var pipe;


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
        "Welcome to OUR AWESOME game!", {font: "30px Calibri", fill: "#FFFF00"} );
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.input
        .keyboard
        .addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(player_jump); //define the event when spacebar is depressed
    //game.add.audio("score"); //add the "score" sound to the game, not needed since already preloaded

    //score = 0;
    //game.add.text(gamewidth - 20, 10, score);
    //alert(score); shows score in alert box at beginning
    //var x = 150;
    // var y = 200;

    pipes = game.add.group();
    generate_pipes();




    var x = 50;
    var y = 350;
    player = game.add.sprite(x, y, "THOR");
    game.physics.arcade.enable(player);
    player.anchor.setTo(0.5,0.5);
    player.checkWorldBounds = true;
    //player.body.velocity.y = -100;
    //player.body.velocity.x=150;
    player.body.gravity.y=500;





}

function player_jump() {
    //the smaller the number the higher it jumps
    player.body.velocity.y = -250;
}

function add_pipe_part(x, y, pipe_part) {
    var pipe = pipes.create(x, y, pipe_part);
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;
}

function generate_pipes(){
    var pipe_offset = 1000;
    var gapStart = Math.floor(Math.random()*12)+1;
    var gapSize = 3;
    for (var counttop = 0; counttop < gapStart; counttop++) {
        add_pipe_part(pipe_offset, counttop * 50, "Pipe");
        add_pipe_part(pipe_offset-2, (gapStart) * 50, "PipeEnd");
    }
    for (var countbot = gapStart + gapSize+1; countbot <= 16; countbot++) {
        add_pipe_part(pipe_offset, countbot * 50, "Pipe");
        add_pipe_part(pipe_offset-2, (gapStart + 4) * 50, "PipeEnd");
    }
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    
}