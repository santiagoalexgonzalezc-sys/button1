const button = document.getElementById("btn");
const scoreText = document.getElementById("score");

let score = 0;

// Button position
let x = window.innerWidth / 2 - 70;
let y = window.innerHeight / 2 - 30;

// Mouse position
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Speed increases every click
let speed = 0.12;

// Place button initially
button.style.left = x + "px";
button.style.top = y + "px";

// Track mouse
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Increase score and speed
button.addEventListener("click", () => {
    score++;
    scoreText.textContent = `Score: ${score}`;

    // Make button faster
    speed += 0.02;

    // Small random dodge
    x += (Math.random() - 0.5) * 80;
    y += (Math.random() - 0.5) * 80;
});

function animate() {
    const btnCenterX = x + button.offsetWidth / 2;
    const btnCenterY = y + button.offsetHeight / 2;

    const dx = btnCenterX - mouseX;
    const dy = btnCenterY - mouseY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const dangerRadius = 250;

    if (distance < dangerRadius) {
        const strength = (dangerRadius - distance) / dangerRadius;

        const nx = dx / (distance || 1);
        const ny = dy / (distance || 1);

        x += nx * strength * speed * 40;
        y += ny * strength * speed * 40;
    }

    // Keep button on screen
    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;

    x = Math.max(0, Math.min(maxX, x));
    y = Math.max(0, Math.min(maxY, y));

    button.style.left = x + "px";
    button.style.top = y + "px";

    requestAnimationFrame(animate);
}

animate();

// Handle resize
window.addEventListener("resize", () => {
    x = Math.min(x, window.innerWidth - button.offsetWidth);
    y = Math.min(y, window.innerHeight - button.offsetHeight);
});
