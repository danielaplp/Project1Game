class Enemy {
    constructor(gameScreen, player) {
      this.gameScreen = gameScreen;
      this.player = player

      this.left = Math.floor(Math.random() * 500 + 70);
      this.top = this.player.top + 300
      this.width = 80;
      this.height = 100;
      this.element = document.createElement("img")
      this.element.src = "../images/Cartoon Shark.png"
      this.element.style.position = "absolute";
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
      this.velocityX = 1
      this.velocityY = 1;

/*       this.velocityX = Math.random() * 1 - 1;
      this.velocityY = Math.random() * 1 + 1; */
  
      this.gameScreen.appendChild(this.element);

    

    } 


    move() {
      if(this.top > this.player.top ) {
        this.top -= this.velocityY;
      } else {
        this.top += this.velocityY;
      }

      if(this.left > this.player.left ) {
        this.left -= this.velocityX;
      } else {
        this.left += this.velocityX;
      }
      // Move the obstacle down by 1px
      //this.left -= 1;
    
      // Move o inimigo na direção vertical





      // Update the obstacle's position on the screen
      this.updatePosition();
    }

    updatePosition() {
      // Update the obstacle's position based on the properties left and top
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }

}
  