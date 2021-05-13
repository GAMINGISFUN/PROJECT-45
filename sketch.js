var canvas;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var universe, rockets, rocket1, rocket2, rocket1_img, rocket2_img;

function preload(){
universe = loadImage("./image/bg.jpg");
rocket1_img = loadImage("./imges/dowmload.jpg");
rocket2_img = loadImage("./imges/dowmload.jpg");
}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}