const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");

// Play & Pause ----------------------------------- //
const showPauseIcon = () => {
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
};

const showPlayIcon = () => {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
};

const togglePlay = () => {
  if (video.paused === true) {
    video.play();
    showPauseIcon();
  } else {
    video.pause();
    showPlayIcon();
  }
};

// On Video End, show play button icon
video.addEventListener("ended", showPlayIcon);

// Progress Bar ---------------------------------- //
// Calculate display time format
const displayTime = (time) => {
  let minutes = String(Math.floor(time / 60)).padStart(2, "0");
  let seconds = String(Math.floor(time % 60)).padStart(2, "0");

  return `${minutes}:${seconds}`;
};

// Update progress bar as video plays
const updateProgress = () => {
  let progress = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${progress}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} / `;
  duration.textContent = `${displayTime(video.duration)}`;
};

// Click to seek within the video
const setProgress = (e) => {
  // Where user clicked on progress bar divided by width of parent (progress-bar)
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
  currentTime.textContent = `${displayTime(video.currentTime)}`;
};

// Volume Controls --------------------------- //
// Toggle Mute
const toggleMute = () => {
  volumeIcon.classList.toggle("fa-volume-up");
  volumeIcon.classList.toggle("fa-volume-mute");
  !video.muted ? (video.muted = true) : (video.muted = false);
};

// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

// Events Listeners
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeIcon.addEventListener("click", toggleMute);
