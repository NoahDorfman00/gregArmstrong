// Mobile menu toggle
document.querySelector('.navbar-toggle').addEventListener('click', function () {
    document.querySelector('.nav-list').classList.toggle('active');
});

// Audio player functionality
document.addEventListener('DOMContentLoaded', function () {
    const audioElements = document.getElementsByTagName('audio');

    Array.from(audioElements).forEach(audio => {
        audio.addEventListener('play', function () {
            Array.from(audioElements).forEach(otherAudio => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                    otherAudio.currentTime = 0;
                }
            });
        });

        // Lazy loading
        audio.setAttribute('loading', 'lazy');
        audio.setAttribute('preload', 'none');
    });

    // Smooth scroll for back to top
    document.querySelector('.back-to-top')?.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// File sharing functionality
async function webShare(filePath) {
    try {
        const response = await fetch(filePath);
        const data = await response.blob();
        const fileName = filePath.split('/').pop();
        const file = new File([data], fileName, { type: "video/mp4" });

        if (!navigator.canShare || !navigator.canShare({ files: [file] })) {
            throw new Error('Sharing not supported on this device');
        }

        await navigator.share({ files: [file] });
    } catch (error) {
        console.error('Error sharing:', error);
        if (error.name !== 'AbortError') {
            alert('Sharing not supported or failed: ' + error.message);
        }
    }
} 