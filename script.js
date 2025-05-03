// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const okayButton = document.getElementById('okayButton');
    const jumpscareAudio = document.getElementById('jumpscareAudio');
    const backgroundAudio = document.getElementById('backgroundAudio');
    const menuIcon = document.getElementById('menuIcon');
    const sidebar = document.getElementById('sidebar');
    const backgroundAnimations = document.querySelector('.background-animations'); // Get the animation container

    // --- Jumpscare Button Functionality ---
    okayButton.addEventListener('click', function() {
        // Reset and play jumpscare audio
        jumpscareAudio.currentTime = 0;
        jumpscareAudio.play().catch(e => {
            console.error("Error playing jumpscare audio:", e);
            // Optional: Provide user feedback if playback fails
        });
    });

    // --- Background Music Playback ---
    // Attempt to play background music immediately.
    // Browsers might block this until user interaction.
    const playBackgroundMusic = () => {
        backgroundAudio.play().catch(e => {
            console.warn("Background audio autoplay blocked:", e);
            // We won't add a button to turn it on, so it will just be silent if blocked.
            // A common practice is to add a subtle hint or try playing on ANY first user interaction,
            // but for this request, we'll just attempt on load.
        });
    };

    playBackgroundMusic(); // Try playing on load

    // Optional: Try playing on the first click anywhere on the document as a fallback
    // document.body.addEventListener('click', function firstClickPlay() {
    //     playBackgroundMusic();
    //     document.body.removeEventListener('click', firstClickPlay); // Only try once
    // });


    // --- Sidebar Toggle Functionality ---
    menuIcon.addEventListener('click', function() {
        document.body.classList.toggle('sidebar-open'); // Toggle the class on the body
    });

    // Optional: Close sidebar by clicking outside (more complex, involves checking click target)
    // document.addEventListener('click', function(event) {
    //     const isClickInsideSidebar = sidebar.contains(event.target);
    //     const isClickOnMenuIcon = menuIcon.contains(event.target);

    //     if (document.body.classList.contains('sidebar-open') && !isClickInsideSidebar && !isClickOnMenuIcon) {
    //         document.body.classList.remove('sidebar-open');
    //     }
    // });


    // --- Meteor Generation ---
    const createMeteor = () => {
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');

        // Random size
        const size = Math.random() * 3 + 2; // size between 2px and 5px
        meteor.style.width = `${size}px`;
        meteor.style.height = `${size}px`;
        meteor.style.borderRadius = '50%'; // Ensure it's round

        // Random start position - make it appear from random edges or corners
        // Let's simplify and have them mainly come from the top-left area
        const startX = Math.random() * window.innerWidth * 0.5 - 200; // Start from left edge up to halfway, slightly off-screen
        const startY = Math.random() * window.innerHeight * 0.5 - 200; // Start from top edge up to halfway, slightly off-screen
        meteor.style.left = `${startX}px`;
        meteor.style.top = `${startY}px`;

        // Random animation duration
        const duration = Math.random() * 5 + 5; // Duration between 5 and 10 seconds
        meteor.style.animationDuration = `${duration}s`;

        // Random animation delay
        const delay = Math.random() * 5; // Delay between 0 and 5 seconds
        meteor.style.animationDelay = `${delay}s`;

        // Add slight random rotation (in case animation path isn't perfectly 45deg)
        const rotation = Math.random() * 30 - 15; // Between -15 and 15 degrees
         meteor.style.transform = `rotateZ(${rotation + 45}deg)`; // Add 45 for the base animation direction


        // Add the meteor to the background container
        backgroundAnimations.appendChild(meteor);

        // Remove the meteor element when its animation finishes
        meteor.addEventListener('animationend', () => {
            meteor.remove();
        });
    };

    // Generate meteors periodically
    const generateMeteors = () => {
        // Generate a burst of meteors (e.g., 1 to 3)
        const numberOfMeteors = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numberOfMeteors; i++) {
             // Add a slight delay between meteors in the burst
            setTimeout(createMeteor, i * 500); // 500ms delay between each in the burst
        }


        // Schedule the next burst
        const nextDelay = Math.random() * 3000 + 1000; // Wait 1 to 4 seconds for the next burst
        setTimeout(generateMeteors, nextDelay);
    };

    // Start the meteor generation
    generateMeteors();

});
