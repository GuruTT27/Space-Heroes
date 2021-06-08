var bg,bgImage;
var ship,shipImage;

var bullet,bulletImage1,bulletImage2,bulletImage3,bulletImage4;
var bulletGroup;

var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5;
var obstaclesGroup;

var gameOver,gameOverImage;
var youLose,youLoseImage;

var wall;

var obstaclesHit = 0;
var asteroidsHit = 0;

function preload(){

 bgImage  = loadImage("images/background.png");

 shipImage = loadImage("images/spaceShip1.png");

 obstacle1 = loadImage("images/obstacle1.png");
 obstacle2 = loadImage("images/obstacle2.png");
 obstacle3 = loadImage("images/obstacle3.png");
 obstacle4 = loadImage("images/obstacle4.png");
 obstacle5 = loadImage("images/obstacle5.png");

 bulletImage1 = loadImage("images/bullet1.png");
 bulletImage2 = loadImage("images/bullet2.png");
 bulletImage3 = loadImage("images/bullet3.png");
 bulletImage4 = loadImage("images/bullet4.png");

 gameOverImage = loadImage("images/gameOver.png");

 youLoseImage = loadImage("images/youLose.png");

}

function setup(){
createCanvas(900,700);

bg = createSprite(450,350);
bg.addImage(bgImage);
bg.scale = 1.7;
bg.velocityX = -2;

ship = createSprite(100,400,50,50)
ship.addImage(shipImage);
ship.scale = 0.8;

wall = createSprite(10,350,10,700)

bulletGroup = createGroup();
obstaclesGroup = createGroup();

}

function draw(){
background(0);

if (bg.x < 300){

  bg.x = 550;

}

if(keyDown(UP_ARROW)){

 ship.y += -5;

}

if(keyDown(DOWN_ARROW)){

  ship.y += 5;
 
 }

 if(ship.y > 700){

  ship.y = 700;

 }

 if(ship.y < 0){

  ship.y = 0;

 }

 wall.shapeColor = 0;

 spawnObstacles();

 if(keyWentDown("SPACE")){

  bullet = createSprite(ship.x + 60,ship.y,5,5)
  bullet.addImage(bulletImage4);
  bullet.scale = 3;
  bullet.velocityX = 7;
  bullet.lifetime = 100 ;
  bulletGroup.add(bullet);

 }

  changeBulletImage();

 if(obstaclesGroup.isTouching(bulletGroup)){

        bulletGroup.get(0).destroy();
        obstaclesGroup.get(0).destroy();
        asteroidsHit += 1; 

 }

if(obstaclesGroup.isTouching(wall)){

       obstaclesHit = obstaclesHit +1;
       obstaclesGroup.get(0).destroy();
}

if(obstaclesHit === 10){

       reset();

}

if(obstaclesGroup.isTouching(ship)){

       obstaclesGroup.get(0).destroy();

}

drawSprites();

if(frameCount > 2880){

       obstaclesGroup.destroyEach();
       fill("white");
       textSize(20);
       text("Congratulations!!",350,350);
       text("You Win!!",350,400);
       text("Earth Is Saved!!",350,450);

 }

 if(frameCount < 720){

       fill("white");
       textSize(20);
       text("2 Minutes To Win",350,50);

 }

 if(frameCount > 720 && frameCount < 1440){

       fill("white");
       textSize(20);
       text("1 Minute And 30 Seconds To Win",300,50);

 }

 if(frameCount > 1440 && frameCount < 2180){

       fill("white");
       textSize(20);
       text("1 Minute To Win",350,50);

 }

 if(frameCount > 2180 && frameCount < 2880){

       fill("white");
       textSize(20);
       text("30 Seconds To Win",350,50);

 }

fill("white");
textSize(20)
text("Asteroids hit Earth: " + obstaclesHit,50,50);

text("Asteroids Destroyed: " + asteroidsHit,670,50);

}

function spawnObstacles(){

   if(frameCount % 50 === 0){

    obstacle = createSprite(950,random(10,650),20,20)
    obstacle.velocityX = -4;

    var rand = Math.round(random(1,5));

    switch(rand){

      case 1:obstacle.addImage(obstacle1);
      obstacle.scale = 0.4;
             break;
      case 2:obstacle.addImage(obstacle2);
             break;
      case 3:obstacle.addImage(obstacle3);
             break;
      case 4:obstacle.addImage(obstacle4);
             break;
      case 5:obstacle.addImage(obstacle5);
             break;
      default: break;

    }

    obstaclesGroup.add(obstacle);

   }

}

function changeBulletImage(){

       if(frameCount > 720){

              bullet.addImage(bulletImage3);
       
        }
       
        if(frameCount > 1440){
       
              bullet.addImage(bulletImage2);
       
        }
       
        if(frameCount > 2180){
       
              bullet.addImage(bulletImage1);
       
        }    

}

function reset(){

       gameOver = createSprite(450,300);
       gameOver.addImage(gameOverImage);

       youLose = createSprite(450,450);
       youLose.addImage(youLoseImage);

       bg.velocityX = 0;

       obstaclesGroup.destroyEach();
       bulletGroup.destroyEach();
       ship.destroy();

}