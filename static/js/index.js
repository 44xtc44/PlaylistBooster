// index.js
"use strict";
// https://extensionworkshop.com/documentation/develop/build-a-secure-extension/
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Build_a_cross_browser_extension  manifest v3
// https://www-archive.mozilla.org/projects/security/components/reviewguide.html

// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface
// https://extensionworkshop.com/documentation/develop/build-a-secure-extension/
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

/**
 * Gain node and a analyzer visual show on canvas.
 * enable only for local sound files; MUST be removed for Networksound (if!)
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

function runLocalSound() {
  // class PlayList pulls "fileUpload.files" list from the input element "fileUpload"
  document.getElementById('divFrameRight').style.display = "block";
  document.getElementById('divPlayListShow').style.display = "block";
  document.getElementById('playList').style.display = "block";
  playList = new PlayList();
  playList.create();
}
