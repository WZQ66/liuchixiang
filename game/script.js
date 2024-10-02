const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreboard = document.getElementById('scoreboard');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');

const playerImg = new Image();
playerImg.src = 'XXX.png';

const objectImg = new Image();
objectImg.src = 'YYY.png';

let playerX = canvas.width / 2 - 25; // 假设XXX.png宽度为50
let playerY = canvas.height - 100; // 假设XXX.png高度为50，底部对齐
let score = 0;
let fallingObjectX;
let fallingObjectSpeed = 2;
let fallingObjectY = -50; // 初始位置在屏幕上方
let objectInterval;

playerImg.onload = () => {
    startGame();
};

function startGame() {
    score = 0;
    updateScoreboard();
    spawnFallingObject();
    objectInterval = setInterval(spawnFallingObject, 2000 + Math.random() * 3000);

    document.addEventListener('keydown', handleKeydown);
    leftButton.addEventListener('click', () => movePlayer(-10));
    rightButton.addEventListener('click', () => movePlayer(10));
}

function spawnFallingObject() {
    fallingObjectX = Math.random() * (canvas.width - objectImg.width);
    fallingObjectY = -50;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 画玩家
    ctx.drawImage(playerImg, playerX, playerY);

    // 画下落物体
    if (fallingObjectY < canvas.height) {
        ctx.drawImage(objectImg, fallingObjectX, fallingObjectY);
        fallingObjectY += fallingObjectSpeed;

        // 检查碰撞
        if (collisionDetection()) {
            clearInterval(objectInterval);
            score += 10;
            updateScoreboard();
            spawnFallingObject();
        }
    } else {
        clearInterval(objectInterval);
        alert('游戏结束，你的分数：' + score);
        startGame()
        window.history.back()
    }

    requestAnimationFrame(draw);
}

function collisionDetection() {
    const playerRect = {
        x: playerX,
        y: playerY,
        width: playerImg.width,
        height: playerImg.height
    };

    const objectRect = {
        x: fallingObjectX,
        y: fallingObjectY,
        width: objectImg.width,
        height: objectImg.height
    };

    return !(
        playerRect.x > objectRect.x + objectRect.width ||
        playerRect.x + playerRect.width < objectRect.x ||
        playerRect.y > objectRect.y + objectRect.height ||
        playerRect.y + playerRect.height < objectRect.y
    );
}

function movePlayer(dx) {
    playerX += dx;
    if (playerX < 0) playerX = 0;
    if (playerX + playerImg.width > canvas.width) playerX = canvas.width - playerImg.width;
}

function handleKeydown(e) {
    if (e.key === 'ArrowLeft') movePlayer(-10);
    if (e.key === 'ArrowRight') movePlayer(10);
}

function updateScoreboard() {
    scoreboard.textContent = '分数: ' + score;
}

draw();