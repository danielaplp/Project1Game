
window.onload = function(){
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");

    let game = null;

    startButton.addEventListener("click", function() {
        startGame();
    });

    

    
    function startGame() {
        console.log("start game");
        game = new Game()

        game.start()   
     }

  


     function handleKeyDown(event){
        const key = event.key;
        const possibleKeys = [
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown"
        ]
      
        if(possibleKeys.includes(key)){
          // prevent default behavior
          event.preventDefault()
      
          switch(key){
            case "ArrowLeft":
              game.player.directionX  = -3;
              break;
            case "ArrowRight":
              game.player.directionX  = 3;
              break;
            case "ArrowDown":
              game.player.directionY  = 3;
              break;
            case "ArrowUp":
              game.player.directionY  = -3;
              break;
          }
        }
      }
      
      window.addEventListener('keydown', handleKeyDown)
      
      window.addEventListener('keyup', () => {
        game.player.directionX = 0;
        game.player.directionY = 0;
      }) 

      restartButton.addEventListener("click", function () {
    
        restartGame();
      });
    
     
      function restartGame() {
        location.reload();
      }
    


}

