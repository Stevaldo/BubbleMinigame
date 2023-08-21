// Select all elements with class "box"
const boxElements = document.querySelectorAll('.box');

// Select the score element
const scoreElement = document.getElementById('score');

// Get and heart
const heartElements = document.querySelectorAll('.heart');

// Get level,restart and start
const levelElement = document.getElementById('level');
const restartElement = document.getElementById('restart');
const startElement = document.getElementById('start');

// Get Audio
const gameoverSound = document.getElementById('gameoverSound');
const levelupSound = document.getElementById('levelupSound');

let score = 0; // Initialize the score
let life = 3; // Initialize the life


  for (const box of boxElements) {
    box.style.backgroundColor = getRandomColor();
    // Add an event listener to detect when one iteration of the animation completes
    box.addEventListener('animationiteration', () => {
      if (life > 0) {
        life -= 1;
        heartElements[life].remove();
        gameoverSound.play();
      }

      if (life === 0) {
        levelElement.textContent = "Game Over";
        levelElement.style.opacity = 1;
        restartElement.style.display = 'inline-block';
      }
    });

    // Add a click event listener to each "box"
    box.addEventListener('click', () => {
      if (life > 0) {
        // Get the score from the clicked "box" using the data-score attribute
        const boxScore = parseInt(box.getAttribute('data-score'), 10);
        // Update the score
        score += boxScore;

        // Update the score displayed in the HTML
        scoreElement.textContent = score;

        // Check if the score
        checkScore();

        // Restart the animation by changing the animation-name property
        restartBoxAnimation(box);
      }
    });
  }

  
  // Function to restart the animation
  function restartBoxAnimation(box) {
    // Restart the animation by changing the animation-name property
    box.style.backgroundColor = getRandomColor();
    box.style.animationName = 'none'; // Set animation-name to 'none' to stop the animation
    void box.offsetWidth; // Trigger a reflow (essential for re-enabling the animation)
    box.style.animationName = 'bubbles';
    box.style.animationDirection = 'linear';
    box.style.animationIterationCount = 'infinite';
    
  }

// Get Random Color
function getRandomColor() {
    const letters = '0123456789ABCDEF'; // Hexadecimal digits
    let color = '#';

    // Generate six random hexadecimal digits
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

// Function to pause all animations
function pauseAnimations() {
    boxElements.forEach((box) => {
      box.style.animationPlayState = 'paused';
    });
  }

// Function to check and handle the score multiple of 100
function checkScore() {
    boxElements.forEach((box) => {
        if (score % 100 === 0 && score <= 100) {
            restartAndChangeDelay(2, '6s');
        }
        else if(score % 250 === 0 && score <= 250){
            restartAndChangeDelay(3, '5s');
        }
        else if(score % 500 === 0 && score <= 500){
            restartAndChangeDelay(4, '4s');
        }
        else if(score % 750 === 0 && score <= 750){
            restartAndChangeDelay(5, '3s');
        }
        else if(score % 1000 === 0 && score <= 1000){
            restartAndChangeDelay(6, '2s');
        }
    });
}


function restartAndChangeDelay(level,delay){
    levelupSound.play();
    levelElement.style.animationName = 'none'; // Set animation-name to 'none' to stop the animation
    void levelElement.offsetWidth; // Trigger a reflow (essential for re-enabling the animation)
    levelElement.textContent = 'Level ' + level;
    levelElement.style.animation = 'showLevel 3s';

    boxElements.forEach((box) => {
        box.style.animationDuration = delay;
        restartBoxAnimation(box);

        // Generate a random delay between 1 and 7 seconds (inclusive)
        const randomDelay = (Math.random() * 6) + 1; // Math.random() generates a value between 0 and 1

        // Set the animation delay for the box using JavaScript
        box.style.animationDelay = `${randomDelay}s`;
    });
}

function addHeart(){
   // Create a new heart element
   const newHeart = document.createElement('div');
   newHeart.classList.add('heart');
   newHeart.innerHTML = '<i class="fas fa-heart"></i>';

   // Append the new heart element to the existing container
   const heartContainer = document.querySelector('.life');
   heartContainer.appendChild(newHeart);
}

function restartGame(){
    restartElement.style.display = 'none';
    startElement.style.display = 'none';

    if(life === 0){
      for(i=0;i<3;i++)
      addHeart();
    }

    // Reset the score and life displayed on the page
    score = 0;
    life = 3;

    scoreElement.textContent = score;

    restartAndChangeDelay(1, '7s');
    levelElement.style.opacity = 0;
}
