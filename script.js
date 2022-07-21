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
const speed = document.querySelector(".player-speed");

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
let lastVolume = 1;
// Volume Bar
const changeVolume = (e) => {
  let volume = e.offsetX / volumeRange.offsetWidth;

  // Rounding volume up or down
  volume < 0.1 ? (volume = 0) : volume > 0.9 ? (volume = 1) : false;

  // Update volume bar UI
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;

  // Change icon depending on volume
  volumeIcon.className = "";
  if (volume > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }
  lastVolume = volume;
};

// Toggle Mute/Unmute
const toggleMute = () => {
  volumeIcon.className = "";
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeIcon.setAttribute("title", "Unmute");
  } else {
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.className = "";
    if (lastVolume > 0.7) {
      volumeIcon.classList.add("fas", "fa-volume-up");
    } else if (lastVolume > 0) {
      volumeIcon.classList.add("fas", "fa-volume-down");
    } else {
      volumeIcon.classList.add("fas", "fa-volume-off");
    }
    video.volume = lastVolume;
    volumeIcon.setAttribute("title", "Mute");
  }
};

// Change Playback Speed -------------------- //
const changeSpeed = () => {
  video.playbackRate = speed.value;
};

// Fullscreen ------------------------------- //

// Events Listeners
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
