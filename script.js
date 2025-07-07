let cover = document.getElementById("cover");
let clickHere = document.getElementsByClassName("clickHere")[0];
let letterSheet = document.getElementById("letterSheet");
let letter = document.getElementById("letter");
let shadowLetter = document.getElementById("shadowLetter");

// Heart animation variables
let heartsContainer;
let heartInterval;
const heartEmojis = ['❤️', '💖', '💓', '💕', '💞'];

function createHeartsContainer() {
  heartsContainer = document.createElement('div');
  heartsContainer.className = 'hearts-container';
  document.body.appendChild(heartsContainer);
}

function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  
  // Random horizontal position
  heart.style.left = Math.random() * 100 + '%';
  
  // Random animation duration between 3-6 seconds
  const duration = 3 + Math.random() * 3;
  heart.style.animationDuration = duration + 's';
  
  heartsContainer.appendChild(heart);
  
  // Remove heart after animation completes
  setTimeout(() => {
    if (heart.parentNode) {
      heart.parentNode.removeChild(heart);
    }
  }, duration * 1000);
}

function startHeartAnimation() {
  createHeartsContainer();
  
  // Create hearts at intervals
  heartInterval = setInterval(() => {
    createHeart();
  }, 800); // Create a new heart every 800ms
}

function openLetter() {
  cover.classList.add("open");
  
  // Start heart animation when letter opens
  setTimeout(() => {
    startHeartAnimation();
  }, 1000);
  
  setTimeout(() => {
    letterSheet.style.zIndex = "2";
    clickHere.style.display = "none";
    letter.style.animationIterationCount = "1";
    shadowLetter.style.animationIterationCount = "1";
    letterSheet.classList.add("zoomIn");
  }, 1500);
}

