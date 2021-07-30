var spacebg
var backgroundImg
var endzone
var endzone2
var endzone3
var shoot
var score = 0
var pos1,pos2
var spaceship, spaceship_img
var laserImg,laser,laserSound, laserGroup
var blast
var blastImage
var asteroid, asteroid1, asteroid2, asteroid3
var asteroid_img1, asteroid_img2, asteroid_img3
var explosionSound, explosionImage
var asteroidsGroup;
var canvas
var instructions = 0;
var play = 1;
var end = 2;
var gameState = instructions;

//CURRENT TICKET #13504824

function preload(){
  backgroundImg = loadImage("images/space1.gif")
  spaceship_img = loadImage("images/spaceship.png")
  laserImg = loadImage("images/laser.png")
  asteroid_img1 = loadImage("images/as1.png")
  asteroid_img2 = loadImage("images/as2.png")
  asteroid_img3 = loadImage("images/as3.png")
  blastImage = loadImage("images/blast.png")
  explosionImage = loadImage("images/blast.png")
  explosionSound = loadSound("sounds/explosion.mp3")
  laserSound = loadSound("sounds/laser sound.mp3")

}

function setup(){
  canvas = createCanvas(1350,625);
  spacebg = createSprite(500,100,1350,625)
  spacebg.addImage(backgroundImg)
  spacebg.velocityX = -1

  endzone = createSprite(-30,310,10,620)
  endzone.visible = false;

  endzone2 = createSprite(675,-25,1300,10)
  endzone2.visible = false;

  endzone3 = createSprite(675,655,1300,10)
  endzone3.visible = false;
  
  spaceship = createSprite(100,350,200,200)
  spaceship.addImage(spaceship_img);
  spaceship.scale = 0.3
  
  laserGroup = new Group;
  asteroidsGroup = new Group;
  
  
}


function draw(){

  if(gameState === play){

    if(spacebg.x<400){
      spacebg.x = 500 
    }

    if(keyDown("space")) {
      
      laser = createSprite(spaceship.x+50,spaceship.y);
      laser.addImage(laserImg);
      laser.velocityX = 20; 
      laser.scale = 0.7;
      laserGroup.add(laser);
      laserSound.play();

    } 


    if(keyDown(UP_ARROW)){
      spaceship.y = spaceship.y-10
    }
  
    if(keyDown(DOWN_ARROW)){
      spaceship.y = spaceship.y+10
  
    }
  
    if(keyDown(RIGHT_ARROW)){
      spaceship.x = spaceship.x+5
  
    }
  
    if(keyDown(LEFT_ARROW)){
      spaceship.x = spaceship.x-5
  
    }

    if(asteroidsGroup.isTouching(spaceship)) {
      asteroidsGroup.destroyEach();
      var blast = createSprite(spaceship.x,spaceship.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      explosionSound.play();
      spaceship.destroy();
      gameState = end;
    
    }

    if(asteroidsGroup.isTouching(endzone)){
      asteroidsGroup.destroyEach();
      gameState = end;
  
    }

    if(asteroidsGroup.isTouching(laserGroup)) {
      asteroidsGroup.destroyEach();
      var blast = createSprite(laser.x+50, laser.y);
      blast.addImage(blastImage);
      blast.scale = 0.4
      blast.lifetime = 25
      laserGroup.destroyEach();
      explosionSound.play();
      score = score+1
    }

    if(spaceship.isTouching(endzone)){
      blast = createSprite(spaceship.x+40, spaceship.y);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      blast.scale = 0.7
      explosionSound.play();
      spaceship.destroy();
      gameState = end;

    }
  
    if(spaceship.isTouching(endzone2)){
      blast = createSprite(spaceship.x+40, spaceship.y);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      blast.scale = 0.7
      explosionSound.play();
      spaceship.destroy();
      gameState = end;

    }
  
    if(spaceship.isTouching(endzone3)){
      blast = createSprite(spaceship.x+40, spaceship.y);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      blast.scale = 0.7
      explosionSound.play();
      spaceship.destroy();
      gameState = end;

    }

      asteroids();
      drawSprites();

      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("Score : " + score,50,60)

  }
  else if(gameState === end){

    spacebg.velocityY = 0;
    stroke("yellow");
    fill("yellow");
    textSize(40);
    text("Game Over!",400,200);
    text("The asteroids have destroyed Earth",400,300);
    text("Your final score: "+score,400,400);
  }

  if(gameState === instructions){
    background(0);
    stroke("yellow");
    fill("yellow");
    textSize(50);
    text(">FINAL DEFENSE<",420,100);
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("A cosmic event has distrupted the orbit of some asteroids.",305,200);
    text(" They are headed straight towards Earth.",400,250);
    text("  You are Earth's final defense.",445,300);
    text("  Destroy the asteroids.",460,350);
    text(" You cannot let the asteroids pass you",385,400)
    text("  Press 'space' to shoot.",455,450);
    text("  Use arrows to move.",455,500);
    text("  Press 's' to start game.",455,550);
    textSize(40)
    text(" Good Luck...",485,600)

    if(keyDown("s")) {
      gameState = play;
    } 
    
  }

}

function asteroids(){
if(frameCount % 180 === 0)
{
  var asteroid = createSprite(1200,700,50,50)
  asteroid.y = Math.round(random(10,600))
  

  var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: asteroid.addImage(asteroid_img1);
              break;
      case 2: asteroid.addImage(asteroid_img2);
              break;
      case 3: asteroid.addImage(asteroid_img3);
              break;
      
      default: break;
    }

    asteroid.scale = 0.3
    asteroid.velocityX = -20
    asteroid.lifetime = 250;
    asteroidsGroup.add(asteroid)

  }
}