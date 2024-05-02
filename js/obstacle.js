class Obstacle {
        constructor(gameScreen) {
          this.gameScreen = gameScreen;
          this.left = Math.floor(Math.random() * 500 + 70);
          this.top = 0;
          this.width = 30;
          this.height = 60;
          this.element = document.createElement("img");
          this.imagesArray = ["../images/latinha.png", "../images/sacoplastico1.png", "../images/garrafa.png"] 
      
          this.element.src = this.imagesArray[Math.floor(Math.random() * this.imagesArray.length)]
          this.element.style.position = "absolute";
          this.element.style.width = `${this.width}px`;
          this.element.style.height = `${this.height}px`;
          this.element.style.left = `${this.left}px`;
          this.element.style.top = `${this.top}px`;
      
          this.gameScreen.appendChild(this.element);
        } 

    
        move() {
          // Move the obstacle down by 3px
          this.top += 1;
          // Update the obstacle's position on the screen
          this.updatePosition();
        }

        updatePosition() {
          // Update the obstacle's position based on the properties left and top
          this.element.style.left = `${this.left}px`;
          this.element.style.top = `${this.top}px`;
        }
      


   

}