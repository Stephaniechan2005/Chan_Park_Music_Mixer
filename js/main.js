console.log("JavaScript is connected");
//Variable
const theButtons = document.querySelectorAll("#buttons");

const dropZones = document.querySelectorAll(".drop-zone");
const instruments = document.querySelectorAll(".instruments-pieces img");
const playButton = document.querySelector("#playButton"),
  pauseButton = document.querySelector("#pauseButton"),
  stopButton = document.querySelector("#stopButton"),
  volSlider = document.querySelector("#volumeControl");
let dragPiece;

//function
function playAudio() {
  theAudioEl.play();
}

function pauseAudio() {
  theAudioEl.pause();
}

function restartAudio() {
  theAudioEl.currentTime = 0;
  playAudio();
}

function setVolume() {
  console.log(this.value);
  theAudioEl.volume = this.value / 100;
}

function changeBGImage(event) {
  console.log("changeBGImage called");
  //Method 1
  //console.log(this.id);
  //background-image: url('../images/backGround0.jpg');
  // puzzleBoard.style.backgroundImage = `url('../images/backGround${this.id}.jpg')`;
  // Method 1 of changing puzzle
  //puzzlePieces[0].src = `images/topLeft${event.currentTarget.id}.jpg`;
  //puzzlePieces[1].src = `images/topRight${event.currentTarget.id}.jpg`;
  //puzzlePieces[2].src = `images/bottomLeft${event.currentTarget.id}.jpg`;
  //puzzlePieces[3].src = `images/bottomRight${event.currentTarget.id}.jpg`;

  // Method 2 of changing puzzle using foreach loop and put back puzzle
  const pos = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

  puzzlePieces.forEach((piece, index) => {
    piece.src = `images/${pos[index]}${event.currentTarget.id}.jpg`;
    puzzlePieceDiv.appendChild(piece);
  });

  //Method 2
  console.log(event.currentTarget.id);
  puzzleBoard.style.backgroundImage = `url('../images/backGround${event.currentTarget.id}.jpg')`;
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
}

//event

theButtons.forEach((button) => button.addEventListener("click", changeBGImage));
instruments.forEach((piece) =>
  piece.addEventListener("dragstart", handlestartDrag)
);
dropZones.forEach((zone) => zone.addEventListener("dragover", handleOver));
dropZones.forEach((zone) => zone.addEventListener("drop", dropped));
playButton.addEventListener("click", playAudio);
pauseButton.addEventListener("click", pauseAudio);
stopButton.addEventListener("click", restartAudio);
volSlider.addEventListener("change", setVolume);
