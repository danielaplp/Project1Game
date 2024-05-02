class Game {
    constructor(){
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");
        this.gameContainerScreen = document.getElementById("game-container");
        
        this.scoreSpan = document.getElementById('score');
        this.liveSpan = document.getElementById('live');
        this.player = new Player(this.gameScreen, 220, 320, 220, 200, "/images/diver.png");
        this.height = 400;
        this.width = 1000;
        this.obstacles = []
        this.enemies = []
        this.score = 0;
        this.live = 8;
        this.time = 40;
        this.gameOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = Math.floor(1000/60);
        this.gameScreen.style.position = "relative";
        this.timerIntervalId = 0; //cronometro
        this.backgroundMusic = new Audio("/audio/OST Jaws (1975) 24. The Shark Approaches.mp3");
    }


start(){
    this.gameScreen.style.width = `${this.width}px`
    this.gameScreen.style.height = `${this.height}px`
    this.startScreen.style.display = "none"
    this.gameScreen.style.display = "block"
    this.gameContainerScreen.style.display = "flex"
    this.backgroundMusic.play();

    this.startTimer(); //cronometro

    this.gameIntervalId = setInterval(() => {
        this.gameLoop()
    }, this.gameLoopFrequency)

}


//cronometro começo
startTimer() {
    const timeRemaining = document.getElementById("time");
    this.timerIntervalId = setInterval(() => {
        this.time--;
        timeRemaining.textContent = "" + this.time + "seconds";

        if (this.time <= 0) {
            clearInterval(this.timerIntervalId);
            timeRemaining.textContent = "Time is over!";
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
            this.score++;
            this.updateScoreDisplay();
            } else if(obstacle.top > this.height){
            
            obstacle.element.remove()
            this.obstacles.splice(i,1)
            i--
            this.live--;
            this.updateLivesDisplay();
        }

    }

    if(this.live <=0){
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
        this.live--;
        this.updateLivesDisplay();


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
    this.gameContainerScreen.style.display = "none"
    this.backgroundMusic.pause()
 }

 updateScoreDisplay(){
    this.scoreSpan.innerText = this.score;
    
 }

 updateLivesDisplay(){
    this.liveSpan.innerText = this.live;
 }

 pointAnimation(obstacle){
    const recycleImage = document.createElement('img')
    recycleImage.src = '../images/recycling2.png'
    recycleImage.style.position = 'absolute'
    recycleImage.style.width = '50px'
    recycleImage.style.top = `${obstacle.top +10}px`
    recycleImage.style.left = `${obstacle.left +10}px`

    recycleImage.classList.add('point-animation')
    this.gameScreen.appendChild(recycleImage)
    setTimeout(()=> {
        recycleImage.remove()
    }, 4000)
 }

}
