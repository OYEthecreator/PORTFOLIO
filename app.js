// ------------------------------
// VIDEO HOVER PLAY/PAUSE
// ------------------------------
// ------------------------------
// VIDEO HOVER PLAY/PAUSE (SAFE GUARDED)
// ------------------------------
const videoList = [
    document.getElementById('projectVideo1'),
    document.getElementById('projectVideo2'),
    document.getElementById('projectVideo3')
].filter(video => video !== null); // Only keep found videos

const hoverSign = document.querySelector('.hover-sign');

if (videoList.length > 0 && hoverSign) {
    videoList.forEach(video => {
        video.addEventListener('mouseenter', () => {
            video.play().catch(e => console.log('Hover play prevented:', e));
            hoverSign.classList.add('active');
        });

        video.addEventListener('mouseleave', () => {
            video.pause();
            hoverSign.classList.remove('active');
        });
    });
}

// ------------------------------
// SURGICAL FIX: FORCE AUTOPLAY FOR BACKGROUND VIDEOS
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const bgVideos = document.querySelectorAll('video[autoplay]');

    bgVideos.forEach(video => {
        // Ensure critical attributes for production
        video.setAttribute('playsinline', '');
        video.setAttribute('muted', '');
        video.muted = true; // Force property

        // Try to play immediately
        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay started!
            }).catch(error => {
                // Autoplay was prevented.
                // Mobile Low Power Mode or Browser Policy blockage.
                // We add a one-time touch listener to start them.
                console.log('Autoplay prevented, adding interaction listener');
                const startVideo = () => {
                    video.play();
                    document.removeEventListener('touchstart', startVideo);
                    document.removeEventListener('click', startVideo);
                };
                document.addEventListener('touchstart', startVideo);
                document.addEventListener('click', startVideo);
            });
        }
    });
});

// ------------------------------
// SIDEBAR TOGGLE
// ------------------------------
const sideBar = document.querySelector('.sidebar');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

menuIcon.addEventListener('click', () => {
    sideBar.classList.add('open-sidebar');
    sideBar.classList.remove('close-sidebar');
});

closeIcon.addEventListener('click', () => {
    sideBar.classList.remove('open-sidebar');
    sideBar.classList.add('close-sidebar');
});

// Optional: Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sideBar.contains(e.target) && !menuIcon.contains(e.target)) {
        sideBar.classList.remove('open-sidebar');
        sideBar.classList.add('close-sidebar');
    }
});

// ------------------------------
// OPTIONAL: AUTO PAUSE OTHER VIDEOS ON HOVER
// ------------------------------
videoList.forEach((currentVideo) => {
    currentVideo.addEventListener('mouseenter', () => {
        videoList.forEach(video => {
            if (video !== currentVideo) video.pause();
        });
    });
});
