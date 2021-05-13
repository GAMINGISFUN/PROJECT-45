class Game {
    constructor(){
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      rocket1 = createSprite(200,200);
      rocket1.addImage("rocket1" ,rocket1_img);
      rocket2 = createSprite(600,200);
      rocket2.addImage("rocket2" ,rocket2_img);
      rockets = [rocket1, rocket2];
    }
  
    play(){
      form.hide();
      
      Player.getPlayerInfo();  
      player.getCarsAtEnd();  
  
      
      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
        
        
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 175 ;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = x + 200;
          //use data form the database to display the cars in y direction
          y = displayHeight - allPlayers[plr].distance;
          rockets[index-1].x = x;
          rockets[index-1].y = y;
         // console.log(index, player.index)
  
         
          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
            rockets[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = rockets[index-1].y;
          }
        }
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
  
      if(player.distance > 3860){
        gameState = 2;
        player.rank = player.rank +1;
        Player.updateRoacketsAtEnd(player.rank);
      }
     
      drawSprites();
    }
  
    end(){
    console.log("Game Ended");
    console.log(player.rank);
  
    }
  }