var castle, castleImage;
var wizard, wizardImage;
var goblin, goblinGroup, goblinImage;
var ogre, ogreGroup, ogreImage;
var dragon, dragonGroup, dragonImage;
var rand;
var star, starImage, starGroup;
var livesSprite, lives3Image, lives2Image, lives1Image;
var lives = 3;
var score = 0;



function preload(){
  wizardImage = loadImage("wizard2.png");

  castleImage = loadImage("castle.jpg");

  goblinImage = loadImage("goblin.png");

  ogreImage = loadImage("ogre6.png");

  dragonImage = loadImage("dragon2.png")

  starImage = loadImage("star.png")

  lives3Image = loadImage("heart_3.png")
  lives2Image = loadImage("heart_2.png")
  lives1Image = loadImage("heart_1.png")

}

function setup(){

  createCanvas(windowWidth, windowHeight);

  /*castle = createSprite(windowWidth/2+40, windowHeight/2, 20, 20);
  castle.addImage(castleImage);
  castle.scale = 3*/

  wizard = createSprite(windowWidth/2+300, windowHeight/2+300, 20, 20);
  wizard.addImage(wizardImage);
  wizard.scale = 0.8;

  livesSprite = createSprite(110, 50, 50, 20);
    livesSprite.addImage(lives3Image);
    livesSprite.scale = 0.3

  ogreGroup = createGroup();

  goblinGroup = createGroup();

  dragonGroup = createGroup();

  starGroup = createGroup();


}

function draw(){
  background(castleImage)




  if(keyDown("UP_ARROW")){
    wizard.y = wizard.y - 20;
  }

  if(keyDown("DOWN_ARROW")){
    wizard.y = wizard.y + 20;
  }

  if(keyWentDown("space")){
    spawnStars();

  }

  if(dragonGroup.isTouching(wizard)){
    dragonGroup.destroyEach();
    ogreGroup.destroyEach();
    goblinGroup.destroyEach();
    lives = lives - 1;
  }

  if(ogreGroup.isTouching(wizard)){
    ogreGroup.destroyEach();
    dragonGroup.destroyEach();
    goblinGroup.destroyEach();
    lives = lives - 1;
  }

  if(goblinGroup.isTouching(wizard)){
    goblinGroup.destroyEach();
    dragonGroup.destroyEach();
    ogreGroup.destroyEach();
    lives = lives - 1;
  }
  
  if(lives === 2){
    livesSprite.addImage(lives2Image);
  }

  if(lives === 1){
    livesSprite.addImage(lives1Image);
  }

  if(lives === 0){
    livesSprite.addImage(lives3Image);
    livesSprite.visible = false;
    wizard.destroy();
    goblinGroup.setVelocityXEach(0);
    ogreGroup.setVelocityXEach(0);
    dragonGroup.setVelocityXEach(0);
    textSize(32)
    text("Refresh Page to Start Again!", width/2, height/2)
  }

  

  for (var i = 0; i < goblinGroup.length; i++) {
    if (goblinGroup.get(i).isTouching(starGroup)) {
        goblinGroup.get(i).destroy();
        score = score + 3
        
    }    

    }

    for (var i = 0; i < ogreGroup.length; i++) {
      if (ogreGroup.get(i).isTouching(starGroup)) {
          ogreGroup.get(i).destroy();
          score = score + 5
          
      }    
  
      }

      for (var i = 0; i < dragonGroup.length; i++) {
        if (dragonGroup.get(i).isTouching(starGroup)) {
            dragonGroup.get(i).destroy();

            score = score + 8
        }    
    
        }

        /*if(score === 50){
          goblinGroup.setVelocityEach(0);
          ogreGroup.setVelocityEach(0);
          dragonGroup.setVelocityEach(0);
        }*/

  rand = Math.round(random(1, 2));

  /*switch(rand){
    case 1: spawnDragons();
            break;
    case 2: spawnOgres();
            break;
    default: break;
  }*/
  

  

  drawSprites();

  spawnOgres();

  spawnDragons();

  spawnGoblins()

  fill("black")
  textSize(25)
  text("Use Arrow Keys to move up and down", windowWidth/2, windowHeight/2-500 )
  text("Score:"+score, 70 ,120)
  text("Use Spacebar to shoot Stars", windowWidth/2+600, windowHeight/2-500);

  
}

function spawnOgres(){
  if(frameCount%110 === 0 ){
    ogre = createSprite(-70, Math.round(random(height-100, height-700)), 20, 20)
    ogre.addImage(ogreImage);
    ogre.scale = 0.15;
    ogre.velocityX= Math.round(random(7, 18));

    ogre.lifetime = width/ogre.velocityX+70;

    ogreGroup.add(ogre);

    ogre.setCollider("rectangle", 0, 0, 400, 900)

    //ogre.debug = true;

  }
}

function spawnDragons(){
  if(frameCount%120 === 0 ){
    dragon = createSprite(-125, Math.round(random(height-600, height-1000)), 20, 20)
    dragon.addImage(dragonImage);
    dragon.scale = 0.4;
    dragon.velocityX= Math.round(random(8, 15));

    dragon.lifetime = width/dragon.velocityX+120;

    dragon.setCollider("rectangle", 0, 0, 250, 300)

    dragonGroup.add(dragon);

    //dragon.debug = true;


  }
}

function spawnGoblins(){
  if(frameCount%75 === 0){
    goblin = createSprite(-70 , Math.round(random(height-100, height-500, 20, 20)))
    goblin.addImage(goblinImage);
    goblin.scale = 0.15;
    goblin.velocityX = Math.round(random(5, 15));

    goblin.lifetime = width/goblin.velocityX+70;

    //goblin.debug = true;

    goblinGroup.add(goblin);
  }
}

function spawnStars(){
  star = createSprite(wizard.x, wizard.y, 20, 20);
  star.addImage(starImage);
  star.scale = 0.2
  star.velocityX = -15;
  star.lifetime = width/star.velocityX;

  starGroup.add(star);


}