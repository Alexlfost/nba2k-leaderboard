const teams = [
    { name: "GetChucked", color: "#ff0000" },
    { name: "ChargedBeatle", color: "#00ff00" },
    { name: "Tacobell Nachos", color: "#0000ff" },
    { name: "qpak1", color: "#ffff00" },
    { name: "Whos Feisty", color: "#ff00ff" }
];

const matchups = [];

// Generate all possible matchups and initialize records
for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
        const matchup = {
            team1: teams[i],
            team2: teams[j],
            wins1: 0,
            wins2: 0,
        };
        matchups.push(matchup);
    }
}

// Function to update the win/loss records
function updateRecord(matchup, team) {
    if (team === 1) {
        matchup.wins1++;
    } else if (team === 2) {
        matchup.wins2++;
    }

    // Update the display
    const recordElement = document.getElementById(`record-${matchup.team1.name}-${matchup.team2.name}`);
    recordElement.textContent = `${matchup.wins1} - ${matchup.wins2}`;
}

// Create matchup boxes
const matchupsContainer = document.querySelector('.matchups');
matchups.forEach((matchup, index) => {
    const matchupBox = document.createElement('div');
    matchupBox.classList.add('matchup-box');

    const team1Name = document.createElement('div');
    team1Name.classList.add('team-name');
    team1Name.style.color = matchup.team1.color;
    team1Name.textContent = matchup.team1.name;

    const winButton1 = document.createElement('button');
    winButton1.classList.add('win-button');
    winButton1.style.backgroundColor = matchup.team1.color;
    winButton1.textContent = `Win ${matchup.team1.name}`;
    winButton1.addEventListener('click', () => {
        updateRecord(matchup, 1);
    });

    const winButton2 = document.createElement('button');
    winButton2.classList.add('win-button');
    winButton2.style.backgroundColor = matchup.team2.color;
    winButton2.textContent = `Win ${matchup.team2.name}`;
    winButton2.addEventListener('click', () => {
        updateRecord(matchup, 2);
    });

    const recordElement = document.createElement('div');
    recordElement.classList.add('record');
    recordElement.id = `record-${matchup.team1.name}-${matchup.team2.name}`;
    recordElement.textContent = '0 - 0';

    matchupBox.appendChild(team1Name);
    matchupBox.appendChild(winButton1);
    matchupBox.appendChild(recordElement);
    matchupBox.appendChild(winButton2);

    matchupsContainer.appendChild(matchupBox);
});
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Ball properties
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    dx: 5,
    dy: 5,
};

// Paddle properties
const paddleWidth = 15;
const paddleHeight = 100;
const playerPaddle = {
    x: 20,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    speed: 10,
};

// Game loop
function update() {
    // Move the ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collisions with top and bottom
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Ball collisions with paddles
    if (
        ball.x - ball.radius < playerPaddle.x + playerPaddle.width &&
        ball.x + ball.radius > playerPaddle.x &&
        ball.y > playerPaddle.y &&
        ball.y < playerPaddle.y + playerPaddle.height
    ) {
        ball.dx *= -1;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the Pong elements
    ctx.fillStyle = "#fff"; // White color
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillRect(
        playerPaddle.x,
        playerPaddle.y,
        playerPaddle.width,
        playerPaddle.height
    );

    // Request animation frame
    requestAnimationFrame(update);
}

// Start the game loop
update();