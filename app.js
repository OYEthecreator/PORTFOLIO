// ------------------------------
// VIDEO HOVER PLAY/PAUSE
// ------------------------------
const videoList = [
    document.getElementById('projectVideo1'),
    document.getElementById('projectVideo2'),
    document.getElementById('projectVideo3')
];

const hoverSign = document.querySelector('.hover-sign');

videoList.forEach(video => {
    video.addEventListener('mouseenter', () => {
        video.play();
        hoverSign.classList.add('active');
    });

    video.addEventListener('mouseleave', () => {
        video.pause();
        hoverSign.classList.remove('active');
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
            if(video !== currentVideo) video.pause();
        });
    });
});
