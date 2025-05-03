// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const okayButton = document.getElementById('okayButton');
    const jumpscareAudio = document.getElementById('jumpscareAudio');

    // Add a click event listener to the button
    okayButton.addEventListener('click', function() {
        // Reset audio to the beginning in case it was played before
        jumpscareAudio.currentTime = 0;
        // Play the audio
        jumpscareAudio.play().catch(e => {
            // Catch potential errors, e.g., browser autoplay restrictions
            console.error("Error playing audio:", e);
            alert("Could not play sound. Please click anywhere on the page first to allow audio playback.");
        });
    });
});