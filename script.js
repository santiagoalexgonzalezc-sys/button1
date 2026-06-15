const playScreen = document.getElementById("playScreen");
const modeScreen = document.getElementById("modeScreen");
const gameScreen = document.getElementById("gameScreen");

const playBtn = document.getElementById("playBtn");
const difficultyBtns = document.querySelectorAll(".difficulty");

const button = document.getElementById("btn");
const scoreText = document.getElementById("score");

let score = 0;
let gameStarted = false;

let speed = 0.04;

let x = window.innerWidth / 2 - 75;
let y = window.innerHeight / 2 - 30;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Play button
playBtn.addEventListener("click", () => {
    playScreen.classList.add("hidden");
    modeScreen.classList.remove("hidden");
});

// Difficulty selection
difficultyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        speed = parseFloat(btn.dataset.speed);

        modeScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");

        startGame();
    });
});

function startGame() {
    gameStarted = true;

    x = window.innerWidth / 2 - 75;
    y = window.innerHeight / 2 - 30;

    button.style.left = x + "px";
    button.style.top = y + "px";
}

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

button.addEventListener("click", () => {
    score++;
    scoreText.textContent = `Score: ${score}`;

    // Gets faster every click
    speed += 0.015;

    // Small dodge
    x += (Math.random() - 0.5) * 100;
    y += (Math.random() - 0.5) * 100;
});

function animate() {
    if (gameStarted) {

        const centerX = x + button.offsetWidth / 2;
        const centerY = y + button.offsetHeight / 2;

        const dx = centerX - mouseX;
        const dy = centerY - mouseY;

        const distance = Math.sqrt(dx * dx + dy * dy);

        const dangerRadius = 250;

        if (distance < dangerRadius) {

            const strength =
                (dangerRadius - distance) / dangerRadius;

            const nx = dx / (distance || 1);
            const ny = dy / (distance || 1);

            x += nx * strength * speed * 40;
            y += ny * strength * speed * 40;
        }

        const maxX =
            window.innerWidth - button.offsetWidth;

        const maxY =
            window.innerHeight - button.offsetHeight;

        x = Math.max(0, Math.min(maxX, x));
        y = Math.max(0, Math.min(maxY, y));

        button.style.left = x + "px";
        button.style.top = y + "px";
    }

    requestAnimationFrame(animate);
}

animate();
