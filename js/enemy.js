class Enemy {
    constructor(gameScreen) {
      this.gameScreen = gameScreen;
      this.left = Math.floor(Math.random() * 500 + 70);
      this.top = Math.floor(Math.random() * 400 + 100);
      this.width = 80;
      this.height = 100;
      this.element = document.createElement("img")
      this.element.src = "../images/Cartoon Shark.png"
      this.element.style.position = "absolute";
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      //this.element.style.left = `${this.left}px`;
      //this.element.style.top = `${this.top}px`;

      this.speed = 1
      this.velocityX = -this.speed;
      this.velocityY = 0;

      this.velocityX = Math.random() * 2 - 1;
      this.velocityY = Math.random() * 2 + 1;
  
      this.gameScreen.appendChild(this.element);

    

    } 


    move() {
      // Move the obstacle down by 1px
      //this.left -= 1;

      this.left -= this.velocityX;
      // Move o inimigo na direção vertical
      this.top += this.velocityY;




      // Update the obstacle's position on the screen
      this.updatePosition();
    }

    updatePosition() {
      // Update the obstacle's position based on the properties left and top
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }

}
  