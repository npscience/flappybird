// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var score; //need to define as number, so define as 0 to start - 0 is a number so this defines score as a number
var x;
var y;
var player;
var gamewidth;
var gameheight;
var gap;
var pipes;


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
    //start screen, then progress to game with a click
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
    game.time.events.loop(1.75*Phaser.Timer.SECOND,generate_pipes); //generate pipes every 1.75 seconds




    var x = 50;
    var y = 350;
    player = game.add.sprite(x, y, "THOR");
    game.physics.arcade.enable(player);
    player.anchor.setTo(0.5,0.5);
    player.checkWorldBounds = true;
    //player.body.velocity.y = -100;
    //player.body.velocity.x=150;
    player.body.gravity.y=500;

    //game.physics.checkCollision(player,pipes)

//add scoring in (i.e. at regular intervals = to interval of pipes, starting from the time it takes for the first pipe to come along


}

function player_jump() {
    //the smaller (more negative) the number the higher it jumps
    player.body.velocity.y = -300; //+= -300 means that velocity increases with each spacebar hit, i.e. starts with slow jump then gets to be bigger jump as you continue mashing
}

function add_pipe_part(x, y, pipe_part) {
//grouped pipes into one object each so that player can interact with the whole pipe
    var pipe = pipes.create(x, y, pipe_part);
    game.physics.arcade.enable(pipes);
    pipe.body.velocity.x = -200;
}

function generate_pipes(){
//randomly generates pipe with a gap coming in from the right
    var pipe_offset = 1000; //value is the furthest right of your frame, could call in gamewidth! NB: pipe size is 50
    var gapStart = Math.floor(Math.random()*12)+1;
    var gapSize = 4;
    for (var counttop = 0; counttop < gapStart; counttop++) {//top of pipe, before gap
        add_pipe_part(pipe_offset, counttop * 50, "Pipe");
        add_pipe_part(pipe_offset-2, (gapStart) * 50, "PipeEnd");
    }
    for (var countbot = gapStart + gapSize+1; countbot <= 16; countbot++) {//bottom of pipe, after gap
        add_pipe_part(pipe_offset, countbot * 50, "Pipe");
        add_pipe_part(pipe_offset-2, (gapStart+gapSize+1) * 50, "PipeEnd");
    }
}

function game_over(){
    //TO DO: stop game, add GAME OVER screen with text and score, then option to reload on click of mouse
    location.reload(); //when game over, just reload from beginning




    //game.add.text(300, 380,
        //"GAME OVER!", {font: "70px Calibri", fill: "#FFFFFF"} );
    //alert("GAME OVER");
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade.overlap(player,pipes,game_over);



    //when player hits the pipes --> function game over
    //checkCollision.down = false (game_over);

    //game over methods: hit pipes, outofbounds
}