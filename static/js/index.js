// index.js
"use strict";

/* 
  Side, light project of EisenRadio on GitHub (Snapcraft.io, Pypi) without recorder.
  Most names are taken over from source project to make it more easy to maintain booth.
  This project is using some elements from React layout to make the HTML and JS more readable.
*/
const root = document.getElementById("root");
const audio = document.createElement("audio");
const audioVolume = document.createElement("input");  // slider
const audioGain = document.createElement("input");  // slider show only for local sound
const audioContext = new AudioContext();
var audioSource = null;
const gainNode = audioContext.createGain();
const analyserNodeOne = audioContext.createAnalyser();
const analyserNodeTwo = audioContext.createAnalyser();  // second analyzer show, other fft size

var activeRadioName = "EisenRadio"; 

window.addEventListener('load', function () {
  createAudio();
  createPlayGround();
  arrangePlayGround();
  // runNetworkSound("https://hirschmilch.de:7001/prog-house.mp3"); // unexpected, needs a button
});

function createAudio() {
  audio.setAttribute("id", "audioWithControls");
  audio.setAttribute("autoplay", "");
  audio.setAttribute("controls", "");
  audio.setAttribute("volume", "0.75");
  audio.style.display = "none";
  audioVolume.setAttribute("id", "audioVolumeController");
  audioVolume.setAttribute("type", "range");
  audioVolume.setAttribute("value", "75");
  audioGain.setAttribute("id", "audioGainController");
  audioGain.setAttribute("type", "range");
  audioGain.setAttribute("value", "1");
  audioGain.setAttribute("min", "1");
  audioGain.setAttribute("max", "5");
  audioGain.setAttribute("step", "0.1");
  root.appendChild(audio);
  root.appendChild(audioVolume);
  root.appendChild(audioGain);
  audioVolumeController.addEventListener("input", setAudioVolume);
  audioGainController.addEventListener("input", setAudioGain);
}

function setAudioVolume() {
  audio.volume = audioVolume.value / 100;
}

function setAudioGain() {
  gainNode.gain.value = audioGain.value;
}

/**
 * Gain node and a analyzer visual show on canvas.
 * enable only for local sound files; MUST be removed for Networksound
 */
function connectAnalyzer() {
  // only local sound files, else complete silence (CORS)
  audioSource = audioContext.createMediaElementSource(audio);
  audioSource.connect(analyserNodeOne).connect(gainNode).connect(audioContext.destination);
  audioSource.connect(analyserNodeTwo); // get the data copy for analyzer in foreground
}

function disconnectAnalyzer() {
  audioSource = null;
}

function runNetworkSound(radioUrl) {
  disconnectAnalyzer();  // local can use analyzer
  audio.setAttribute("src", radioUrl);
  audio.play();
}

function runLocalSound() {
  // class PlayList pulls "fileUpload.files" list from the input element "fileUpload"
  document.getElementById('divFrameRight').style.display = "block";
  document.getElementById('divPlayListShow').style.display = "block";
  document.getElementById('playList').style.display = "block";
  window.playListOne = new PlayList();
  playListOne.create();
  connectAnalyzer();
  animationMain();
}
