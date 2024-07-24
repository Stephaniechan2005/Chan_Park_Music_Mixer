console.log("JavaScript is connected");

// Variables
const dropZones = document.querySelectorAll(".drop-zone");
const instruments = document.querySelectorAll(".instruments-pieces img");
const playButton = document.querySelector("#playButton"),
  pauseButton = document.querySelector("#pauseButton"),
  stopButton = document.querySelector("#stopButton"),
  resetButton = document.querySelector("#resetButton"),
  volSlider = document.querySelector("#volumeControl"),
  pitchupButton = document.querySelector("#pitchupButton"),
  pitchdownButton = document.querySelector("#pitchdownButton");
let dragPiece;
let playingAudios = [];
const originalPositions = [];
let currentPitch = 1;

// Save the original positions of instruments
instruments.forEach((instrument) => {
  originalPositions.push(instrument.parentElement);
});

// Functions
function playAudio() {
  playingAudios.forEach((audio) => {
    audio.play();
  });
}

function pauseAudio() {
  playingAudios.forEach((audio) => {
    audio.pause();
  });
}

function restartAudio() {
  playingAudios.forEach((audio) => {
    audio.currentTime = 0;
    audio.play();
  });
}

function setVolume() {
  playingAudios.forEach((audio) => {
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
  playingAudios.forEach((audio) => {
    audio.currentTime = 0;
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
  playingAudios.forEach((audio) => {
    audio.play();
  });
}

function resetPositions() {
  instruments.forEach((instrument, index) => {
    // Move instrument back to its original position
    originalPositions[index].appendChild(instrument);
  });

  // Stop all playing audios and clear the playingAudios array
  playingAudios.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
  playingAudios = [];
}

function pitchUp() {
  const pitch = ["lower", "original", "higher"];

  const instrumentNames = [
    "drum",
    "cello",
    "guitar",
    "piano",
    "violin",
    "trumpets",
  ];
  currentPitch++;
  if (currentPitch >= pitch.length) {
    currentPitch = 0;
  }
  console.log(currentPitch);

  playingAudios.forEach((audio) => {
    audio.pause();
  });

  instruments.forEach((instrument, index) => {
    const instrumentName = instrumentNames[index];
    const trackId = instrument.getAttribute("data-track");
    const audioElement = document.getElementById(trackId);

    if (audioElement) {
      audioElement.src = `audio/${instrumentName}_${pitch[currentPitch]}.mp3`;
      audioElement.currentTime = 0;
      if (playingAudios.includes(audioElement)) {
        audioElement.play();
      }
    }
  });
}

function pitchDown() {
  const pitch = ["lower", "original", "higher"];

  const instrumentNames = [
    "drum",
    "cello",
    "guitar",
    "piano",
    "violin",
    "trumpets",
  ];
  currentPitch--;
  if (currentPitch < 0) {
    currentPitch = pitch.length - 1;
  }
  console.log(currentPitch);

  playingAudios.forEach((audio) => {
    audio.pause();
  });

  instruments.forEach((instrument, index) => {
    const instrumentName = instrumentNames[index];
    const trackId = instrument.getAttribute("data-track");
    const audioElement = document.getElementById(trackId);

    if (audioElement) {
      audioElement.src = `audio/${instrumentName}_${pitch[currentPitch]}.mp3`;
      audioElement.currentTime = 0;
      if (playingAudios.includes(audioElement)) {
        audioElement.play();
      }
    }
  });
}

// Events
instruments.forEach((piece) =>
  piece.addEventListener("dragstart", handlestartDrag)
);
dropZones.forEach((zone) => zone.addEventListener("dragover", handleOver));
dropZones.forEach((zone) => zone.addEventListener("drop", dropped));
playButton.addEventListener("click", playAudio);
pauseButton.addEventListener("click", pauseAudio);
stopButton.addEventListener("click", restartAudio);
resetButton.addEventListener("click", resetPositions);
volSlider.addEventListener("change", setVolume);
pitchupButton.addEventListener("click", pitchUp);
pitchdownButton.addEventListener("click", pitchDown);
