// gamestates
var PLAY=1;
var END=0;
var gameState=1;
var sword,fruit ,monster,fruitGroup,enemyGroup, score,r,randomFruit;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var score=0;
function preload(){
  swordImage = loadImage("sword.png");
  monsterImage = loadImage("alien1.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png") 
} 
function setup() { 
  createCanvas(600,600);
  //creating sword
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
} 
function draw(){ 
  background("lightblue");
  if(gameState===PLAY){
    //Call fruits and Enemy function
    fruits();
    Enemy();
    // Move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    // Increase score if sword touching fruit
    if(sword.isTouching(fruitGroup)){ 
    fruitGroup.destroyEach();
    score=score+2;
    } 
sword.debug=true;
 if(enemyGroup.isTouching(sword)){ 
      gameState=END;
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitGroup.setVelocityXEach(0);
      enemyGroup.setVelocityXEach(0);
      // Change the animation of sword to gameover and reset its position
      sword.addImage(gameOverImage);
      sword.x=300;
      sword.y=300; } 
    
  } 
  drawSprites(); 
  //Display score
  text("Score : "+ score,300,30);
} 
function fruits(){ 
  if(World.frameCount%80===0){ 
        fruit=createSprite(600,200,20,20); 
        fruit.velocityX=-5;
        fruit.y=Math.round(random(100,300));
        fruit.scale=0.2; 
        fruit.debug=true; 
        fruitGroup.add(fruit);
        r=Math.round(random(1,4));
        if(r==1){
          fruit.addImage(fruit1);
        }else if (r==2){
          fruit.addImage(fruit2);
        }else if (r==3){
          fruit.addImage(fruit3);
        }else {
          fruit.addImage(fruit4);
        }
 }
}
      
function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(600,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-5;
    monster.setLifetime=1000;
    
    enemyGroup.add(monster);
  }
}