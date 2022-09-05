let startBtn = document.querySelector("#start");
let stopBtn = document.querySelector("#stop");
let gameBox = document.querySelector("#game-box");
let radios = document.getElementsByName("level");
let finalScores = document.querySelector("tbody");


let time = 3000;
let game;
let mySound = new Audio('pop-1-35897.mp3');
let players =[];
let player;

radios.forEach(rd => {
    rd.addEventListener("change", function(){
        time = this.value
        if(game){
            clearInterval(game);
            startGame()
        }
    })
})

startBtn.addEventListener("click", function(){
    let newName = window.prompt("Please, enter your name");
    let newPlayer = {
        name: newName,
        score: 0,
    }
    players.push(newPlayer);
    player = newPlayer;
    stopBtn.removeAttribute("disabled")
    startBtn.setAttribute("disabled", true);
    startGame()
});

stopBtn.addEventListener("click", function(){
    clearInterval(game);
    game = undefined;
    document.querySelectorAll(".bubble").forEach(bubble => {
        gameBox.removeChild(bubble)
    });
    localStorage.setItem(player.name, player.score);
    if(players.length > 0){
        finalScores.innerHTML = ''
        players.sort((a, b) => b.score - a.score)
        players.forEach(pl => {
            createTd(pl.name, pl.score)
        })
    }
    startBtn.removeAttribute("disabled")
    stopBtn.setAttribute("disabled", true);
})

function createBubble(){
    let top = Math.floor(Math.random() * 200);
    let left = Math.floor(Math.random() * 600);
    let size = Math.random() * (200 - 20) + 20;
    var randomColor = Math.floor(Math.random()*16777215).toString(16);

    let bubble = document.createElement("div");
    bubble.classList.add("bubble")
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.borderRadius = "50%";
    bubble.style.backgroundColor = `#${randomColor}`;
    bubble.style.position = "absolute";
    bubble.style.top = `${top}px`;
    bubble.style.left = `${left}px`

    bubble.addEventListener("click", function(){
        gameBox.removeChild(this);
        if(time == 3000){
            player.score +=1;
        }else if(time == 2000){
            player.score+=2;
        }else if(time == 1000){
            player.score+=3
        };
        mySound.play()
    })
    gameBox.append(bubble);
}

function createTd(player, playerScore){
    let tr = document.createElement("tr");
    let name = document.createElement("td");
    name.innerText = player;
    let score = document.createElement("td");
    score.innerText = playerScore;
    tr.append(name);
    tr.append(score);
    finalScores.append(tr)

}

function startGame(){
    if(time != undefined){
        game = setInterval(function(){
            createBubble()
        }, time);
    }
}
