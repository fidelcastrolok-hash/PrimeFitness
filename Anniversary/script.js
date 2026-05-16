function updateCounter() {
  // January 15, 2025 (Month is 0 for January)
  const startDate = new Date(2025, 0, 15); 
  const now = new Date();
  
  // Calculate the difference in time
  const diffTime = Math.abs(now - startDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
  
  // Display the result
  document.getElementById("day-counter").innerText = `${diffDays} Days`;
}

updateCounter();

const estDate = document.querySelector('.footer-details p');
estDate.addEventListener('mouseover', () => {
    estDate.innerText = "One year & four months later...";
});
estDate.addEventListener('mouseout', () => {
    estDate.innerText = "EST. January 15, 2025";
});

function createPetal() {
    const footer = document.querySelector('.main-footer');
    const petal = document.createElement('div');
    
    petal.classList.add('petal');
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = Math.random() * 3 + 2 + 's'; // 2-5 seconds
    petal.style.opacity = Math.random();
    
    footer.appendChild(petal);
    
    // Remove petal after animation
    setTimeout(() => {
        petal.remove();
    }, 5000);
}

// Create a petal every 500ms
setInterval(createPetal, 500);

// This will work for both index.html and gallery.html
function updateCounter() {
  const startDate = new Date(2025, 0, 15); // Jan 15, 2025
  const now = new Date();
  const diffTime = Math.abs(now - startDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
  
  const counterElement = document.getElementById("day-counter");
  if(counterElement) {
    counterElement.innerText = `${diffDays} Days`;
  }
}
updateCounter();

window.addEventListener('scroll', function() {
  const scrollValue = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  // As you scroll down, opacity goes down and blur goes up
  heroContent.style.opacity = 1 - scrollValue / 500;
  heroContent.style.filter = `blur(${scrollValue / 50}px)`;
});

// Add this to your script.js
document.addEventListener('click', function (e) {
  if (e.target.closest('.back-to-top')) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MUSIC PLAYER LOGIC ---
    const music = document.getElementById('bg-music');
    const playBtn = document.getElementById('play-pause-btn');

    if (music && playBtn) {
        function toggleMusic() {
            if (music.paused) {
                music.play().then(() => {
                    playBtn.classList.add('paused');
                }).catch(err => console.log("Click the page to unlock audio."));
            } else {
                music.pause();
                playBtn.classList.remove('paused');
            }
        }

        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMusic();
        });

        // Starts music on the first click anywhere on the page
        document.addEventListener('click', () => {
            if (music.paused) {
                music.play().then(() => playBtn.classList.add('paused'));
            }
        }, { once: true });
    }

    // --- 2. VIDEO HOVER LOGIC ---
    const videoFrames = document.querySelectorAll('.video-frame');
    
    videoFrames.forEach(frame => {
        const video = frame.querySelector('video');
        if (video) {
            frame.addEventListener('mouseenter', () => {
                video.play();
            });
            frame.addEventListener('mouseleave', () => {
                video.pause();
            });
        }
    });
});

// This goes inside your DOMContentLoaded block
    const videoFrames = document.querySelectorAll('.video-frame');
    
    videoFrames.forEach(frame => {
        const video = frame.querySelector('video');
        if (video) {
            frame.addEventListener('mouseenter', () => {
                video.play();
            });
            frame.addEventListener('mouseleave', () => {
                video.pause();
                // This is the "Back to Beginning" command for the video
                video.currentTime = 0; 
            });
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('pin-overlay');
    const pinInput = document.getElementById('pin-input');
    const unlockBtn = document.getElementById('unlock-btn');

    // YOUR 6-DIGIT PIN: (her Bday + my Bday + our day)
    const SECRET_PIN = "281427"; 

    // --- THE MAGIC CHECK ---
    // This checks if the user already entered the pin during this visit
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        if (overlay) {
            overlay.style.display = 'none'; // Keep it hidden if already unlocked
        }
    }

    function handleUnlock() {
        if (pinInput.value === SECRET_PIN) {
            // Store the "Success" flag in the browser's session memory
            sessionStorage.setItem('isLoggedIn', 'true');
            
            // Lift the curtain
            overlay.classList.add('unlocked');
            
            // Optional: Start the music automatically now that it's unlocked
            const music = document.getElementById('bg-music');
            if (music) music.play();
        } else {
            alert("Incorrect code. Try again, love.");
            pinInput.value = '';
        }
    }

    if (unlockBtn) {
        unlockBtn.addEventListener('click', handleUnlock);
    }

    // Allow 'Enter' key to work too
    pinInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUnlock();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('pin-overlay');
    const pinInput = document.getElementById('pin-input');
    const unlockBtn = document.getElementById('unlock-btn');
    const errorMsg = document.getElementById('error-msg');

    // INSERT YOUR 6-DIGIT PIN HERE (e.g., "122415")
    const MASTER_PIN = "281427"; 

    // --- SESSION CHECK ---
    // If she already unlocked it on index.html, don't show it on gallery.html
    if (sessionStorage.getItem('isAuthorized') === 'true') {
        if (overlay) {
            overlay.style.display = 'none'; 
        }
    }

    function attemptAccess() {
        if (pinInput.value === MASTER_PIN) {
            // Save the "Pass" in the browser session
            sessionStorage.setItem('isAuthorized', 'true');
            
            // Perform the smooth reveal
            overlay.classList.add('unlocked');
            
            // Play background music if it exists on the page
            const music = document.getElementById('bg-music');
            if (music) music.play();
            
            console.log("Access Granted: Welcome to the Anniversary Gallery.");
        } else {
            errorMsg.style.display = 'block';
            pinInput.value = ''; // Reset input
        }
    }

    // Click trigger
    if (unlockBtn) {
        unlockBtn.addEventListener('click', attemptAccess);
    }

    // Keyboard 'Enter' trigger
    if (pinInput) {
        pinInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') attemptAccess();
        });
    }
});