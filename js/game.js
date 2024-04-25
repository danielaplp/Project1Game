class Game {
    // code to be added
    constructor(){
        this.startScreen = document.getElementById("game-intro")
        this.gameScreen = document.getElementById("game-screen")
        this.gameEndScreen = document.getElementById("game-end")
        this.player = new Player(this.gameScreen, 200, 300, 150, 120, "../images/—Pngtree—diver wearing diving cylinder clipart_6030927.png");
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
        this.timerIntervalId = null; //cronometro
    }


start(){
    //para mudar ou passar um valor
    this.gameScreen.style.width = `${this.width}px`
    this.gameScreen.style.height = `${this.height}px`
    //para esconder tela
    this.startScreen.style.display = "none"
    //para mostrar uma tela
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
            this.endGame(); // Termina o jogo quando o tempo acaba
        }
    }, 1000); // 1000 milissegundos = 1 segundo
}

//cronometro fim

 gameLoop(){
    
    console.log("gameLoop")
    //checa se é verdade e para p jogo
    this.update()
    if(this.gameOver){
        clearInterval(this.gameIntervalId)
    }   
 }

 //atualizar o uptade

 update(){
    this.player.move()

    for(let i=0; i < this.obstacles.length; i++){
        const obstacle = this.obstacles[i]

        //mobing the obstacle
        obstacle.move()

        //check the collision
        if(this.player.didCollide(obstacle)){
            //remove the html element
            obstacle.element.remove()
            
           /*  obstacle.element.src
            const newImage = document.createElement("img")
            newImage.src = obstacle.element.src
            this.leftScreen.appendChild(newImage)
 */
            //remove from the array
            this.obstacles.splice(i,1)
            this.lives++
            //para atualizar a quantidade de obstaculos no array
            i--
        } else if(obstacle.top > this.height){
            
            obstacle.element.remove()
            this.obstacles.splice(i,1)

            this.score ++
            //para atualizar a quantidade de obstaculos no array
            i--

        }


    }

    //console.log(this.lives)
    //console.log(this.score)


    if(Math.random() > 0.98 && this.obstacles.length < 1){
        this.obstacles.push(new Obstacle(this.gameScreen))
    }


//aqui começa o enemy


for(let i=0; i < this.enemies.length; i++){
    const enemy = this.enemies[i]


    enemy.move()

    
    if(this.player.didCollide(enemy)){
        
        enemy.element.remove()
        

        this.enemies.splice(i,1)
        this.lives--
        
        i--
    } else if(enemy.top > this.height){
        
       enemy.element.remove()
        this.enemies.splice(i,1)

        this.score ++
        
        i--

    }


}

if(this.lives === 0){
    this.endGame()
}



if(Math.random() > 0.98 && this.enemies.length < 1){
    this.enemies.push(new Enemy(this.gameScreen))
}   

 }

 endGame(){
    //remove elements from the dom

    this.player.element.remove()
    this.obstacles.forEach(obstacle => obstacle.element.remove())
    this.obstacles = []

    //stop the engine
    this.gameOver = true

    //para esconder a tela do jogo quando acaba

    this.gameScreen.style.display = "none"

    //para mostrar a tela de game over

    this.gameEndScreen.style.display = "block"

  
 }

}
