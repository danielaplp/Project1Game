class Player {
    constructor(gameScreen, left, top, width, height, imgSrc){
        this.gameScreen = gameScreen;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height =height;
        this.directionX = 0;
        this.directionY = 0;
        this.gravity = 0.05
        this.element = document.createElement('img')
        this.element.src = imgSrc;

        this.element.style.position = "absolute"

        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`


        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`

        this.gameScreen.appendChild(this.element)


    }

   


    move(){
        //this.directionX = 0|| -1 || 1
        this.left += this.directionX
        this.top += Math.floor(this.directionY)

        //borderCollision
        if(this.left < 10){
            this.left = 10;
        }
        if(this.top < 10){
            this.top = 10;
        }

        //rigth side
        //

        if(this.left > this.gameScreen.offsetWidth - this.width -10){
            this.left = this.gameScreen.offsetWidth - this.width -10
        }

        //bottom side

        if(this.top > this.gameScreen.offsetHeight - this.height - 10){
            this.top = this.gameScreen.offsetHeight - this.height - 10
        }
    
        this.directionY += this.gravity

        this.updatePosition()
    }


    updatePosition(){
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
    }

    didCollide(obstacle){
        const playerRect = this.element.getBoundingClientRect()
        const obstacleRect = obstacle.element.getBoundingClientRect()

        // left: 50, top: 50, right: 150, bottom: 150

        if(playerRect.left < obstacleRect.right && 
           playerRect.right > obstacleRect.left &&
           playerRect.top < obstacleRect.bottom &&
           playerRect.bottom > obstacleRect.top
        ) {
            return true;
        } else {
            return false
        }




    }
}