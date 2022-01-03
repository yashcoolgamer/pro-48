var boy,boy_animation,brick_img,brick,bg,bgimg;
var bricksGroup,window_img,windowsGroup,invisibleGround;
var PLAY=1
var END=0;
var gameState=PLAY;
var life=3;
var lifeSprite,lifeImg,lifeGroup,gameOver,castle;
function preload(){
 boy_animation=loadAnimation("assets/boy1.png","assets/boy2.png","assets/boy3.png","assets/boy4.png")
brick_img=loadImage("assets/brick2.png")
bgimg=loadImage("assets/background2.jpg")
window_img=loadImage("assets/window.jpg");
lifeImg=loadImage("assets/gamelife.png");
gameOver=loadImage("assets/lostimage.jpeg");



}

function setup() {
  createCanvas(windowWidth,windowHeight);
 bg=createSprite(windowWidth/2,windowHeight/2,windowHeight,windowHeight)
 bg.addImage(bgimg)

 bg.scale=3
 bg.velocityX=-3
  boy= createSprite(100, height-150, 50, 50);
    boy.addAnimation("running",boy_animation)
  invisibleGround=createSprite(windowWidth/2,windowHeight-75,windowWidth,10)
  invisibleGround.visible=false
 bricksGroup=new Group();
 windowsGroup=new Group();
 lifeGroup=new Group()
 var x=width-300  //420
 for(var i=0;i<life;i++){
      
  lifeSprite=createSprite(x,100,10,10)

  lifeSprite.addImage(lifeImg)
  lifeSprite.scale=0.1
  x+=70
  lifeGroup.add(lifeSprite)

}

}

function draw() {
  background(255,255,255);  
  if(gameState===PLAY){
    var x=windowWidth-200

    if(bg.x<0){
      bg.x=bg.width/2
    }
    if (keyDown("space")&& boy.y >= 515){
      boy.velocityY=-8
    }
    boy.velocityY+=0.2

    console.log(boy.y)

    boy.overlap(bricksGroup,function(player,obstacle){
      life--;
      obstacle.remove();
      lifeGroup.destroyEach()
      for(var i=0;i<life;i++){
      
        lifeSprite=createSprite(x,100,10,10)
      
        lifeSprite.addImage(lifeImg)
        lifeSprite.scale=0.1
        x+=70
        lifeGroup.add(lifeSprite)
      
      }
    })
if(life===0){
  gameState=END
  
}

  
    
   // if(keyDown("space") && boy.y >= 159) {
     // boy.velocityY = -12;
   // }
    spwanbricks();
    spwanWindows();
  }
  
  else if(gameState===END){
    bg.velocityX=0
    windowsGroup.destroyEach()
    bricksGroup.destroyEach()
    windowsGroup.setVelocityXEach(0)
    bricksGroup.setVelocityXEach(0)
    bg.addImage(gameOver)
    boy.remove()
    //bg.scale=
    finish();

  }
 



  boy.collide(invisibleGround)
  drawSprites();
}
function windowResized(){
  resizeCanvas(windowWidth,windowHeight)
}

function spwanbricks() {
 
    //write code here to spawn the clouds
    if (frameCount % 120 === 0) {
      var brick = createSprite(600,120,40,10);
      brick.y = Math.round(random(windowHeight-200,windowHeight-100));
      brick.addImage(brick_img);
      brick.scale = 0.2;
      brick.velocityX = -3;
      
       //assign lifetime to the variable
      brick.lifetime = 800;
      
      //adjust the depth
      //cloud.depth = trex.depth;
      //trex.depth = trex.depth + 1;
      
      //add each cloud to the group
      bricksGroup.add(brick);
    }
    
  } 

  
function spwanWindows() {
 
  //write code here to spawn the clouds
  if (frameCount % 240 === 0) {
    var castleWindow = createSprite(windowWidth,windowWidth/8,50,50);
    //brick.y = Math.round(random(windowHeight-200,windowHeight-100));
    castleWindow.addImage(window_img);
    castleWindow.scale = 0.5;
    castleWindow.velocityX = -3;
    
     //assign lifetime to the variable
     castleWindow.lifetime = 800;
    
    //adjust the depth
     boy.depth = castleWindow.depth+1;
    
    
    //add each cloud to the group
    windowsGroup.add(castleWindow);
  }
  
} 
function finish(){
  swal(
   {
    title:'Game Over!!!',
    text:'Thanks for playing!!',
    imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png`",
      imageSize: "150x150",
      confirmButtonText: "Play Again"

   },
   function(isConfirm){
     if(isConfirm){
       location.reload();
     }
   }
  


  )
}