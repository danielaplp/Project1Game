class Game {
    constructor(){
        this.startScreen = document.getElementById("game-intro")
        this.gameScreen = document.getElementById("game-screen")
        this.gameEndScreen = document.getElementById("game-end")
        this.scoreSpan = document.getElementById('score')
        this.player = new Player(this.gameScreen, 200, 300, 150, 120, "/images/diver.png");
        this.height = 400;
        this.width = 800;
        this.obstacles = []
        this.enemies = []
        this.score = 0;
        this.lives = 10;
        this.time = 40;
        this.gameOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = Math.floor(1000/60)
        this.gameScreen.style.position = "relative";
        this.timerIntervalId = 0; //cronometro
    }


start(){
    this.gameScreen.style.width = `${this.width}px`
    this.gameScreen.style.height = `${this.height}px`
    this.startScreen.style.display = "none"
    this.gameScreen.style.display = "block"

    this.startTimer(); //cronometro

    this.gameIntervalId = setInterval(() => {
        this.gameLoop()
    }, this.gameLoopFrequency)

}

//cronometro começo
startTimer() {
    const tempoRestante = document.getElementById("tempo-restante");
    this.timerIntervalId = setInterval(() => {
        this.time--;
        tempoRestante.textContent = "Tempo restante: " + this.time + " segundos";

        if (this.time <= 0) {
            clearInterval(this.timerIntervalId);
            tempoRestante.textContent = "Tempo esgotado!";
            this.endGame(); 
        }
    }, 1000); 
}

//cronometro fim

 gameLoop(){
    
    //console.log("gameLoop")
    this.update()
    if(this.gameOver){
        clearInterval(this.gameIntervalId)
    }   
 }

 update(){
    this.player.move()

    for(let i=0; i < this.obstacles.length; i++){
        const obstacle = this.obstacles[i]

        obstacle.move();

        if(this.player.didCollide(obstacle)){
            obstacle.element.remove()

            //adicionar imagem
        this.pointAnimation(obstacle)

           /*  obstacle.element.src
            const newImage = document.createElement("img")
            newImage.src = obstacle.element.src
            this.leftScreen.appendChild(newImage)*/
            
            this.obstacles.splice(i,1);
            i--;
            //this.lives++
            this.score++;
            this.updateScoreDisplay();
            //this.addSymbol();
            } else if(obstacle.top > this.height){
            
            obstacle.element.remove()
            this.obstacles.splice(i,1)
            i--
            this.lives--;
        }

    }

    if(this.lives <=0){
        this.endGame();
        return;
    }

    if(Math.random() > 0.98 && this.obstacles.length < 1){
        this.obstacles.push(new Obstacle(this.gameScreen))
    }

//começo do enemy


//console.log(this.enemies.length)
for(let i=0; i < this.enemies.length; i++){
    const enemy = this.enemies[i]

    enemy.move()

    
    if(this.player.didCollide(enemy)){
        console.log('collided')
        enemy.element.remove()
    
        this.enemies.splice(i,1)
        i--;
        this.lives--;


    } 
}


if(Math.random() > 0.98 && this.enemies.length < 1){
    this.enemies.push(new Enemy(this.gameScreen, this.player))
}   

 }
 
 endGame(){
    this.player.element.remove()
    this.obstacles.forEach(obstacle => obstacle.element.remove())
    this.obstacles = []
    this.enemies.forEach(enemy => enemy.element.remove())
    this.enemies = []
    this.gameOver = true
    this.gameScreen.style.display = "none"
    this.gameEndScreen.style.display = "block"
 }

 updateScoreDisplay(){
    this.scoreSpan.innerText = this.score
 }

 pointAnimation(obstacle){
    const recycleImage = document.createElement('img')
    recycleImage.src = '../images/recycling symbol.jpg'
    recycleImage.style.position = 'absolute'
    recycleImage.style.width = '50px'
    recycleImage.style.top = `${obstacle.top +20}px`
    recycleImage.style.left = `${obstacle.left +20}px`

    recycleImage.classList.add('point-animation')
    this.gameScreen.appendChild(recycleImage)
    setTimeout(()=> {
        recycleImage.remove()
    }, 4000)
 }

}
