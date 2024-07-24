console.log("JavaScript is connected");
const dropZones = document.querySelectorAll(".drop-zone");
const instruments = document.querySelectorAll(".instruments-pieces img");
const playButton = document.querySelector("#playButton"),
  pauseButton = document.querySelector("#pauseButton"),
  stopButton = document.querySelector("#stopButton"),
      
let dragPiece;
let playingAudios = [];
const originalPositions = [];

// Functions
function playAudio() {
  playingAudios.forEach(audio => {
    audio.play();
  });
}

function pauseAudio() {
  playingAudios.forEach(audio => {
    audio.pause();
  });
}

function restartAudio() {
  playingAudios.forEach(audio => {
    audio.currentTime = 0;
    audio.play();
  });
}

function setVolume() {
  playingAudios.forEach(audio => {
    audio.volume = this.value / 100;
  });
}

function handlestartDrag() {
  console.log("started dragging");
  dragPiece = this;
}

function handleOver(e) {
  console.log("dragging over dropZone");
  e.preventDefault();
}

function dropped() {
  if (this.children.length >= 1) {
    return;
  }
  this.appendChild(dragPiece);

  // Restart and play all currently playing audios
  playingAudios.forEach(audio => {
    audio.currentTime = 0;
    audio.play();
  });

  // Play corresponding audio
  const trackId = dragPiece.getAttribute("data-track");
  const audioElement = document.getElementById(trackId);
  
  if (audioElement) {
    if (!playingAudios.includes(audioElement)) {
      playingAudios.push(audioElement);
    }
    audioElement.currentTime = 0;
    audioElement.play();
  }
}

function resetPositions() {
  instruments.forEach((instrument, index) => {
    // Move instrument back to its original position
    originalPositions[index].appendChild(instrument);
  });

  // Stop all playing audios and clear the playingAudios array
  playingAudios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
  playingAudios = [];
}

dropZones.forEach((zone) => zone.addEventListener("dragover", handleOver));
dropZones.forEach((zone) => zone.addEventListener("drop", dropped));
playButton.addEventListener("click", playAudio);
pauseButton.addEventListener("click", pauseAudio);
stopButton.addEventListener("click", restartAudio);

