//CREATING THE GLOBAL VARIABLES//
var dog, happyDog, database, foodS, foodStock;

function preload(){
  //LOADING THE REQUIRED IMAGES//
  dogImg1 = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg1);
  dog.scale = 0.2;

  database = firebase.database();
  foodStock = database.ref('FOOD');
  foodStock.on("value",readStock)
}

function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg2);
  }
  drawSprites();

fill("white");
textSize(12);
text("Press Up Arrow to Feed the Dog",50,50);
text("Food LEFT: "+ foodS,50,100)
//fill
//stroke
  
}

function readStock(data){
  foodS = data.val();
  console.log(foodS);
}

function writeStock(x){

   if(x<=0){
     x=0;
   }
   else{
     x=x-1
   }

  database.ref("/").update({
     FOOD:x
  })
 }