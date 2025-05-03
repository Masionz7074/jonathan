// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const okayButton = document.getElementById('okayButton');
    const jumpscareAudio = document.getElementById('jumpscareAudio');
    const backgroundAudio = document.getElementById('backgroundAudio');
    const menuIcon = document.getElementById('menuIcon');
    const sidebar = document.getElementById('sidebar');
    const backgroundContainer = document.querySelector('.background-container'); // Get the animation container

    // --- Jumpscare Button Functionality ---
    okayButton.addEventListener('click', function() {
        jumpscareAudio.currentTime = 0;
        jumpscareAudio.play().catch(e => {
            console.error("Error playing jumpscare audio:", e);
        });
    });

    // --- Background Music Playback ---
    // Attempt to play background music immediately.
    // Browsers might block this until user interaction.
    const playBackgroundMusic = () => {
        backgroundAudio.play().catch(e => {
            console.warn("Background audio autoplay blocked:", e);
            // No user control provided, so it will just remain silent if blocked.
        });
    };

    playBackgroundMusic(); // Try playing on load

    // --- Sidebar Toggle Functionality ---
    menuIcon.addEventListener('click', function() {
        document.body.classList.toggle('sidebar-open'); // Toggle the class on the body
    });

    // Optional: Close sidebar by clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnMenuIcon = menuIcon.contains(event.target);

        if (document.body.classList.contains('sidebar-open') && !isClickInsideSidebar && !isClickOnMenuIcon) {
            document.body.classList.remove('sidebar-open');
        }
    });


    // --- Moving Star Generation ---
    const createMovingStar = () => {
        const star = document.createElement('div');
        star.classList.add('moving-star');

        // Random size (smaller than meteors)
        const size = Math.random() * 2 + 1; // size between 1px and 3px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Random start position (coming from top-left area)
        const startX = Math.random() * window.innerWidth * 0.4 - 100; // Start from left edge up to 40% width, slightly off-screen
        const startY = Math.random() * window.innerHeight * 0.4 - 100; // Start from top edge up to 40% height, slightly off-screen
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;

        // Random animation duration (shorter than meteors for faster feel)
        const duration = Math.random() * 4 + 3; // Duration between 3 and 7 seconds
        star.style.animationDuration = `${duration}s`;

        // Random animation delay (makes them appear staggered)
        const delay = Math.random() * duration; // Delay between 0 and duration
        star.style.animationDelay = `${delay}s`;

        // Add the star to the background container
        backgroundContainer.appendChild(star);

        // Remove the star element when its animation finishes
        star.addEventListener('animationend', () => {
            star.remove();
        });
    };

    // Generate moving stars continuously
    const generateMovingStars = () => {
        createMovingStar(); // Create one star

        // Schedule the next star after a short random delay
        const nextDelay = Math.random() * 200 + 50; // Wait 50ms to 250ms for the next star
        setTimeout(generateMovingStars, nextDelay);
    };

    // Start the moving star generation
    // Add a slight initial delay so static stars render first
    setTimeout(generateMovingStars, 500);


    // --- Meteor Generation ---
    const createMeteor = () => {
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');

        // Random size
        const size = Math.random() * 5 + 3; // size between 3px and 8px (slightly larger than before)
        meteor.style.width = `${size}px`;
        meteor.style.height = `${size}px`;
        // Radius handled by CSS

        // Random start position (coming from top-left area)
        const startX = Math.random() * window.innerWidth * 0.3 - 200; // Start more towards the corner
        const startY = Math.random() * window.innerHeight * 0.3 - 200;
        meteor.style.left = `${startX}px`;
        meteor.style.top = `${startY}px`;

        // Random animation duration
        const duration = Math.random() * 6 + 6; // Duration between 6 and 12 seconds (slower than stars)
        meteor.style.animationDuration = `${duration}s`;

        // Random animation delay
        const delay = Math.random() * 8; // Delay between 0 and 8 seconds
        meteor.style.animationDelay = `${delay}s`;

        // Add the meteor to the background container
        backgroundContainer.appendChild(meteor);

        // Remove the meteor element when its animation finishes
        meteor.addEventListener('animationend', () => {
            meteor.remove();
        });
    };

    // Generate meteors periodically in bursts
     const generateMeteors = () => {
        // Generate a small burst of meteors (e.g., 1 to 2)
        const numberOfMeteors = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < numberOfMeteors; i++) {
             // Add a slight delay between meteors in the burst
            setTimeout(createMeteor, i * 800); // 800ms delay between each in the burst
        }

        // Schedule the next burst
        const nextDelay = Math.random() * 5000 + 3000; // Wait 3 to 8 seconds for the next burst
        setTimeout(generateMeteors, nextDelay);
    };

    // Start the meteor generation after a short delay
    setTimeout(generateMeteors, 1000);


});
