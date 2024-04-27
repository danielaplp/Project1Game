class SymbolRecycling {
    constructor(gameScreen) {
      this.gameScreen = gameScreen;
      this.left = Math.floor(Math.random() * 500 + 70);
      this.top = 0;
      this.width = 80;
      this.height = 100;
      this.element = document.createElement("img");
    
      this.element.src = "../images/recycling symbol.jpg"
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