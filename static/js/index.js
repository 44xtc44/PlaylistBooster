// index.js
"use strict";

const root = document.getElementById("root");
const video = document.createElement("video");
const audioVolume = document.createElement("input");  // slider
const audioGain = document.createElement("input");  // slider show only for local sound, network is blocked
const audioContext = new AudioContext();
var audioSource = null;
var videoSource = null;
const gainNode = audioContext.createGain();
const analyserNodeOne = audioContext.createAnalyser();
const analyserNodeTwo = audioContext.createAnalyser();  // second analyzer show, other fft size

var playList = undefined;
var activeRadioName = "";  // future use for inet radios

window.addEventListener('load', function () {
  createAudio();
  createPlayGround();
  arrangePlayGround();
  connectAnalyzer();
  animationMain();
});

function createAudio() {
  // video element plays audio too
  video.setAttribute("id", "videoWithControls");
  video.setAttribute("autoplay", "");
  video.setAttribute("controls", "");
  video.setAttribute("volume", "0.75");
  audioVolume.setAttribute("id", "audioVolumeController");
  audioVolume.setAttribute("type", "range");
  audioVolume.setAttribute("value", "75");
  audioGain.setAttribute("id", "audioGainController");
  audioGain.setAttribute("type", "range");
  audioGain.setAttribute("value", "1");
  audioGain.setAttribute("min", "1");
  audioGain.setAttribute("max", "5");
  audioGain.setAttribute("step", "0.1");
  root.appendChild(audioVolume);
  root.appendChild(audioGain);
  audioVolumeController.addEventListener("input", setAudioVolume);
  audioGainController.addEventListener("input", setAudioGain);
}

function setAudioVolume() {
  video.volume = audioVolume.value / 100;
}

function setAudioGain() {
  gainNode.gain.value = audioGain.value;
}

/**
 * Gain node and a analyzer visual show on canvas.
 * enable only for local sound files; MUST be removed for Networksound
 * 
 * video and audio must be connected to the gain node
 */
function connectAnalyzer() {
  // only local sound files, else complete silence (CORS)
  audioSource = audioContext.createMediaElementSource(video);
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
  playList = new PlayList();
  playList.create();
}
