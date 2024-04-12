// index.js
"use strict";
/**
* @author René Horn
* @author www.github.com/44xtc44
* @version 1.1
* @since 1.0
* @see license {Apache 2.0 License (2024), René Horn}
*/

const root = document.getElementById("root");
const video = document.createElement("video");
const timeRuler = document.createElement("input");  // slider
const audioVolume = document.createElement("input");  // slider
const audioGain = document.createElement("input");  // slider show only for local sound, network is blocked by CORS
const plbr_0_5 = document.createElement("input");  // checkbox playbackRate
const plbr_1_0 = document.createElement("input");
const plbr_1_5 = document.createElement("input");  
const plbr_2_0 = document.createElement("input");
const checkboxVdoScreen = document.createElement("input");

window.showAudioControls = null;
window.showWrapAboutMenu = null;
window.showDivRunMenu = null;

const audioContext = new AudioContext();
var audioSource = null;
var videoSource = null;
const gainNode = audioContext.createGain();
const analyserNodeOne = audioContext.createAnalyser();
const analyserNodeTwo = audioContext.createAnalyser();  // second analyzer show, other fft size

var playList = undefined;  // instance of class PlayList
var timeSeekCount = 0;  // save system load

window.addEventListener('load', () => {
  createAudio();
  createPlaybackRadios();
  createPlayGround();
  arrangePlayGround();
  connectAnalyzer();
  animationMain();
  checkboxVdoScreen.addEventListener("input", setCheckboxVdoScreen);

  showAudioControls = new IsShown("audioControls");
  showWrapAboutMenu = new IsShown("wrapAboutMenu");
  showDivRunMenu = new IsShown("divRunMenu");
});

function createAudio() {
  // video element plays audio too
  video.setAttribute("id", "videoWithControls");
  video.setAttribute("autoplay", "");
  video.setAttribute("controls", "");
  video.setAttribute("volume", "0.75");
  video.style.display = "none";  // prevents to show player on startup
  timeRuler.setAttribute("id", "durationController");
  timeRuler.setAttribute("type", "range");
  timeRuler.setAttribute("value", "0");
  timeRuler.setAttribute("min", "0");
  timeRuler.setAttribute("max", "100");
  timeRuler.setAttribute("step", "0.05");
  audioVolume.setAttribute("id", "audioVolumeController");
  audioVolume.setAttribute("type", "range");
  audioVolume.setAttribute("value", "75");
  audioGain.setAttribute("id", "audioGainController");
  audioGain.setAttribute("type", "range");
  audioGain.setAttribute("value", "1");
  audioGain.setAttribute("min", "1");
  audioGain.setAttribute("max", "5");
  audioGain.setAttribute("step", "0.1");

  video.addEventListener("timeupdate", getTimeSetRuler);
  timeRuler.addEventListener("input", setTimeRuler);
  audioVolume.addEventListener("input", setAudioVolume);
  audioGain.addEventListener("input", setAudioGain);
}
function createPlaybackRadios() {
  plbr_0_5.setAttribute("name", "plbr");
  plbr_0_5.id = "plbr_0_5";
  plbr_0_5.type = "radio";

  plbr_1_0.setAttribute("name", "plbr");
  plbr_1_0.id = "plbr_1_0";
  plbr_1_0.type = "radio";
  plbr_1_0.setAttribute("checked", "");  // checked

  plbr_1_5.setAttribute("name", "plbr");
  plbr_1_5.id = "plbr_1_5";
  plbr_1_5.type = "radio";

  plbr_2_0.setAttribute("name", "plbr");
  plbr_2_0.id = "plbr_2_0";
  plbr_2_0.type = "radio";

  plbr_0_5.addEventListener("input", setPlavbackRateHalf);
  plbr_1_0.addEventListener("input", setPlavbackRateOne);
  plbr_1_5.addEventListener("input", setPlavbackRateOneHalf);
  plbr_2_0.addEventListener("input", setPlavbackRateTwo);
}
function getTimeSetRuler() {
  // 'timeupdate' system event fires up to system load, slow pace
  timeSeekCount += 1;
  if (timeSeekCount > 5) {
    timeSeekCount = 0;
    timeRuler.value = (video.currentTime * 100) / video.duration;
  }
}
function setTimeRuler() {
  // user change range value
  video.currentTime = (video.duration / 100) * timeRuler.value;
}
function setAudioVolume() {
  video.volume = audioVolume.value / 100;
}
function setAudioGain() {
  gainNode.gain.value = audioGain.value;
}
function setPlavbackRateHalf() {
  plbr_0_5.checked = true;
  video.playbackRate = 0.5;
}
function setPlavbackRateOne() {
  plbr_1_0.checked = true;
  video.playbackRate = 1.0;
}
function setPlavbackRateOneHalf() {
  plbr_1_5.checked = true;
  video.playbackRate = 1.5;
}
function setPlavbackRateTwo() {
  plbr_2_0.checked = true;
  video.playbackRate = 2.0;
}
function setCheckboxVdoScreen() {
  if (checkboxVdoScreen.checked) {
    video.style.display = "block";
  } else {
    video.style.display = "none";
  }
}
/**
 * Gain node and a analyzer visual show on canvas.
 * enable only for local sound files; MUST be removed for Networksound (if!)
 */
function connectAnalyzer() {
  // only local sound files, else complete silence (CORS)
  audioSource = audioContext.createMediaElementSource(video);
  audioSource.connect(analyserNodeOne).connect(gainNode).connect(audioContext.destination);  // audio + extra analyzer
  audioSource.connect(analyserNodeTwo); // data copy for analyzer in fake menu bar
}
function disconnectAnalyzer() {
  audioSource = null;
}

function runLocalSound() {
  // class PlayList pulls "fileUpload.files" list from the input element "fileUpload"
  document.getElementById('divFrameRight').style.display = "block";
  document.getElementById('divPlayListShow').style.display = "block";
  document.getElementById('playList').style.display = "block";
  playList = new PlayList();
  playList.create();
}
