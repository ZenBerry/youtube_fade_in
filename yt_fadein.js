(function () {
    let video = document.querySelector("video");
    if (!video) {
        console.log("[Crossfade] No video found.");
        return;
    }

    console.log("[Crossfade] Script loaded.");

    let fadeDuration = 1; // Fade-in duration in seconds
    let fadeInStartTime = null;
    let fadeInAnimation;

    function easeInCubic(t) {
        return t * t * t; // Cubic easing function for smooth fade-in
    }

    function fadeIn(timestamp) {
        if (!fadeInStartTime) {
            fadeInStartTime = timestamp;
            video.volume = 0; // Reset volume to 0 immediately
            console.log("[Crossfade] Fade-in started.");
        }

        let elapsed = (timestamp - fadeInStartTime) / 1000; // Convert ms to seconds
        let progress = Math.min(elapsed / fadeDuration, 1); // Normalize between 0 and 1
        video.volume = easeInCubic(progress);

        if (progress < 1) {
            fadeInAnimation = requestAnimationFrame(fadeIn);
        } else {
            console.log("[Crossfade] Fade-in complete.");
            fadeInStartTime = null;
        }
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            console.log(`[Crossfade] ${event.key} pressed - restarting fade-in.`);
            cancelAnimationFrame(fadeInAnimation);
            fadeInStartTime = null; // Reset timing
            requestAnimationFrame(fadeIn);
        }
    });

    console.log("[Crossfade] Listening for arrow keys.");
})();