const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('finalScore');
const highScoreElement = document.getElementById('highScore');
const finalHighScoreElement = document.getElementById('finalHighScore');
const gameOverScreen = document.getElementById('gameOver');
const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const soundToggle = document.getElementById('soundToggle');

// Sound elements
const jumpSound = document.getElementById('jumpSound');
const slideSound = document.getElementById('slideSound');
const collisionSound = document.getElementById('collisionSound');
const scoreSound = document.getElementById('scoreSound');
const backgroundMusic = document.getElementById('backgroundMusic');

// Game variables
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let gameSpeed = 5;
let isGameOver = false;
let isGameStarted = false;
let isSoundOn = true;
let animationFrameId;
let particles = [];

// Background elements
const clouds = [];
for (let i = 0; i < 5; i++) {
    clouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 2),
        width: 100 + Math.random() * 50,
        height: 50 + Math.random() * 30,
        speed: 0.5 + Math.random() * 0.5
    });
}

// Player properties
const player = {
    x: 50,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    speed: 5,
    isJumping: false,
    isSliding: false,
    jumpForce: 15,
    gravity: 0.8,
    velocity: 0,
    color: '#FF0000'
};

// Obstacle properties
const obstacles = [];
const obstacleWidth = 30;
const obstacleHeight = 50;
let obstacleTimer = 0;
const obstacleInterval = 1500;

// Track properties
const track = {
    y: canvas.height - 50,
    width: canvas.width,
    height: 50
};

// Controls
const keys = {
    ArrowUp: false,
    ArrowDown: false
};

// Sound toggle functionality
soundToggle.addEventListener('click', () => {
    isSoundOn = !isSoundOn;
    soundToggle.textContent = isSoundOn ? '🔊' : '🔇';
    if (isSoundOn) {
        backgroundMusic.play();
    } else {
        backgroundMusic.pause();
    }
});

// Event listeners
document.addEventListener('keydown', (e) => {
    if (!isGameStarted || isGameOver) return;
    
    if (e.key === 'ArrowUp' && !player.isJumping && !player.isSliding) {
        player.isJumping = true;
        player.velocity = -player.jumpForce;
        if (isSoundOn) jumpSound.play();
    }
    if (e.key === 'ArrowDown' && !player.isJumping && !player.isSliding) {
        player.isSliding = true;
        if (isSoundOn) slideSound.play();
        setTimeout(() => {
            player.isSliding = false;
        }, 1000);
    }
});

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    isGameStarted = true;
    if (isSoundOn) backgroundMusic.play();
    gameLoop();
});

restartButton.addEventListener('click', () => {
    gameOverScreen.style.display = 'none';
    resetGame();
    gameLoop();
});

function resetGame() {
    score = 0;
    gameSpeed = 5;
    isGameOver = false;
    obstacles.length = 0;
    player.y = canvas.height - 100;
    player.isJumping = false;
    player.isSliding = false;
    player.velocity = 0;
    scoreElement.textContent = `Score: ${score}`;
    if (isSoundOn) backgroundMusic.play();
}

function createParticles(x, y, count) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x,
            y,
            size: Math.random() * 5 + 2,
            speedX: (Math.random() - 0.5) * 8,
            speedY: (Math.random() - 0.5) * 8,
            life: 1
        });
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.02;
        
        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

function drawParticles() {
    particles.forEach(p => {
        ctx.fillStyle = `rgba(255, 215, 0, ${p.life})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Game loop
function gameLoop() {
    if (!isGameStarted) return;
    
    if (isGameOver) {
        gameOverScreen.style.display = 'block';
        finalScoreElement.textContent = score;
        finalHighScoreElement.textContent = highScore;
        if (isSoundOn) backgroundMusic.pause();
        return;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw clouds
    ctx.fillStyle = 'white';
    clouds.forEach(cloud => {
        cloud.x -= cloud.speed;
        if (cloud.x + cloud.width < 0) {
            cloud.x = canvas.width;
        }
        ctx.beginPath();
        ctx.arc(cloud.x + cloud.width/4, cloud.y + cloud.height/2, cloud.height/2, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.width/2, cloud.y + cloud.height/3, cloud.height/2, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.width*3/4, cloud.y + cloud.height/2, cloud.height/2, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw track
    ctx.fillStyle = '#333';
    ctx.fillRect(0, track.y, track.width, track.height);

    // Draw track lines
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, track.y + track.height/2);
        ctx.lineTo(i + 25, track.y + track.height/2);
        ctx.stroke();
    }

    // Update and draw player
    if (player.isJumping) {
        player.velocity += player.gravity;
        player.y += player.velocity;

        if (player.y > canvas.height - 100) {
            player.y = canvas.height - 100;
            player.isJumping = false;
            player.velocity = 0;
        }
    }

    // Draw player with shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.fillStyle = player.color;
    if (player.isSliding) {
        ctx.fillRect(player.x, player.y + 25, player.width, player.height - 25);
    } else {
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Update and draw obstacles
    obstacleTimer += 16;
    if (obstacleTimer >= obstacleInterval) {
        obstacles.push({
            x: canvas.width,
            y: canvas.height - 100,
            width: obstacleWidth,
            height: obstacleHeight,
            color: '#00FF00'
        });
        obstacleTimer = 0;
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        obstacle.x -= gameSpeed;

        // Draw obstacle with shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Check collision
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            isGameOver = true;
            if (isSoundOn) collisionSound.play();
            createParticles(obstacle.x + obstacle.width/2, obstacle.y + obstacle.height/2, 20);
        }

        // Remove obstacles that are off screen
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(i, 1);
            score++;
            scoreElement.textContent = `Score: ${score}`;
            scoreElement.classList.add('increase');
            setTimeout(() => scoreElement.classList.remove('increase'), 200);
            if (isSoundOn) scoreSound.play();
            createParticles(player.x + player.width/2, player.y, 10);
            
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore);
                highScoreElement.textContent = `High Score: ${highScore}`;
            }
        }
    }

    // Update and draw particles
    updateParticles();
    drawParticles();

    // Increase game speed over time
    if (score % 10 === 0 && score > 0) {
        gameSpeed = 5 + Math.floor(score / 10);
    }

    animationFrameId = requestAnimationFrame(gameLoop);
} 