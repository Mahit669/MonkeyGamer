

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var ground,invisibleGround;
var survivalTime=0
var GameState
var PLAY,END;
var end;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500);
  
  PLAY = 1;
  GameState=PLAY;
  END=0;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  monkey=createSprite(70,370,50,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(240,400,1000,10);
  ground.x=width/2;
  
  invisibleGround = createSprite(240,405,1000,10);
  invisibleGround.x = ground.width/2
  
}


function draw() {
 background("white");
  
  if(GameState===PLAY){
    
     if(ground.x<0){
       ground.x=ground.width/2;
     }
    
     if(invisibleGround.x<0){
       invisibleGround.x=invisibleGround.width/2;
     }
    invisibleGround.velocityX=-5;
    
    if(keyDown("space")&&monkey.isTouching(ground)){
       monkey.velocityY = -20;
     }    
    
    score = Math.round(frameCount/5);
    survivalTime = Math.round(frameCount/frameRate);
    ground.velocityX = -(5 + 2 + score / 100);
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    }
    
    
    Food();
    Obstacles();
    
     if(obstaclesGroup.isTouching(monkey)){
       GameState=END;
     }
    
   }
      
  else if(GameState === END){
    
   ground.velocityX=0;
  invisibleGround.velocityX=0;
   obstaclesGroup.setVelocityEach(0);
   FoodGroup.setVelocityEach(0);
         
   FoodGroup.setLifetimeEach(-1);
  obstaclesGroup.setLifetimeEach(-1);
    
    
    
    
  }
  
  monkey.velocityY = monkey.velocityY+0.9;
  
  monkey.collide(invisibleGround);
  
  stroke("black");
  textSize(20);
  fill("orange");
  text("Score:"+ score,400,50);
  
  
  stroke("black");
  textSize(20);
  fill("red");
  text("Survival time:"+ score,100,50)
  
  
  
 drawSprites();
  
}

function Food(){
  
   if(frameCount % 30 === 0){
     var banana = createSprite(500,10,10,20)
     banana.addImage("banana", bananaImage);
     banana.velocityX = -(5 + 2 + score/100)
     banana.y=Math.round(random(120,200));
     banana.scale=0.1;
     FoodGroup.add(banana);
     FoodGroup.setLifetimeEach(100);
     banana.setCollider("rectangle",0,0,400,400);
   }
  
}
  
  function Obstacles(){
    
     if(frameCount % 300 === 0){
     var obstacle = createSprite(500,360,23,32);
     obstacle.addImage("obstacle", obstaceImage);
     obstacle.velocityX = -(5 + 2 + score/100)
     obstacle.scale=0.2;
     obstaclesGroup.add(obstacle);
     obstaclesGroup.setLifetimeEach(100);
     obstacle.setCollider("circle",0,0,200);
       
   }
  }




