// index.js

/* Refactor: growing module split in fun per feature button, 
 * then folders for features under /static/js.
*/

/* Documentation setup with Python sphinx-js package
 *
 * https://test-builds.readthedocs.io/en/jsdoc-autoapi/
 * https://pypi.org/project/sphinx-js/
 */
"use strict";
/**
 * Browser extension for PC and Android
 * @author 'www.github.com/44xtc44'
 * @version 1.5
 * @since 1.0
 * @see license {Apache 2.0 License (2024), René Horn}
 *
 * Bug: FF Android looses file handle after tab was in background.
 *   See if it is gone after going React. PlayList Class to fun, state in shadow DOM.
 */

/**
 *
 */
function docuPlaceholder() {
  // Able to write comments into sphinx module.
}
var module = module || {}; // if module export for test, prevents console error in browser

const root = document.getElementById("root");
const video = document.createElement("video");
const timeRuler = document.createElement("input"); // slider
const audioVolume = document.createElement("input"); // slider
const audioGain = document.createElement("input"); // slider show only for local sound, network is blocked by CORS
const playbackRate__select = document.createElement("select");

// image and pdf stuff to show dynamically loaded between sound and video; el cheapo mp3 player
const pdfDisp = document.createElement("object");

const audioContext = new AudioContext();
const analyserNodeOne = audioContext.createAnalyser();
const analyserNodeTwo = audioContext.createAnalyser(); // second analyzer show, other fft size
var audioSource = audioContext.createMediaElementSource(video);
var gainNode = null;

var playList = undefined; // instance of class PlayList

window.addEventListener("load", () => {
  createAudio();
  createOtherMedia();
  createPlayRateSelect();
  createPlayGround();

  arrangePlayGround();
  createVisualElemListener();
  createAudioStatusLeds();
  connectAudioSource();
  initEqualizer();
  equalizerUI();
  initIndexDb()
    .then(() => restoreAppState())
    .catch((error) => {
      appendDiv({
        parent: document.getElementById("divDbContainerContent"),
        childId: "initIndexDb.catch".concat(Date.now() + Math.random()),
        innerText: "restore app state fail: " + error,
        elemClass: "msgDivs",
      });
    });
  animationMain();
  equalizerUI();
});

function createAudio() {
  // video element plays audio too, 'crossorigin' anonymous attr for net
  video.setAttribute("id", "videoWithControls");
  video.setAttribute("crossorigin", "anonymous");
  video.setAttribute("preload", "metadata");
  video.setAttribute("autoplay", "");
  video.setAttribute("controls", "");
  video.setAttribute("volume", "0.75");
  video.style.display = "none";
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
function createOtherMedia() {
  // pdf
  pdfDisp.setAttribute("id", "pdfDisp");
  pdfDisp.setAttribute("type", "application/pdf"); // set data attribute with url onLoad
  pdfDisp.setAttribute("width", "100%");
  pdfDisp.setAttribute("height", "800px");
}
function createPlayRateSelect() {
  playbackRate__select.setAttribute("id", "playbackRate__select"); // onChange, selectedIndex
  playbackRate__select.style.display = "none";

  for (let idx = 0; idx < playbackRates.length; idx++) {
    let option = document.createElement("option");
    option.text = playbackRates[idx];
    option.value = option.text;
    playbackRate__select.options.add(option);
  }
  playbackRate__select.addEventListener("change", getPlaybackRateSelect);
}
function getPlaybackRateSelect() {
  const rate =
    playbackRate__select.options[playbackRate__select.selectedIndex].value;
  video.playbackRate = rate;
  imgPlaybackRate.src =
    "/static/images/playlistBooster-equalizer-thumb-speed-" + rate + ".svg";
  playbackRate__select.style.display = "none";
  playrateSelector.isShown = false;
  setIdbValue({ objectStore: "video", updFields: { speedRate: rate } });
}
function getTimeSetRuler() {
  if (!video.duration) return;
  timeRuler.value = (video.currentTime * 100) / video.duration;
}
function setTimeRuler() {
  // user change range value
  if (!video.duration) return;
  video.currentTime = (video.duration / 100) * timeRuler.value;
}
function setAudioVolume() {
  video.volume = audioVolume.value / 100;
  setIdbValue({
    objectStore: "video",
    updFields: { volume: audioVolume.value },
  });
}
function setAudioGain() {
  gainNode.gain.value = audioGain.value;
  setIdbValue({ objectStore: "video", updFields: { gain: audioGain.value } });
}
function connectAudioSource() {
  audioSource.connect(analyserNodeOne);
  audioSource.connect(analyserNodeTwo); // data copy for analyzer in fake menu bar
}
function runLocalSound() {
  // class PlayList pulls "fileUpload.files" list from the input element "fileUpload"
  playList = new PlayList();
  playList.create();
}
