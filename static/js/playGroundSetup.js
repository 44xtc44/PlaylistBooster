// playGroundSetup.js
"use strict";
/* 
  A div structure to attach and remove displayed 
  sound files and one or more canvas.
*/
window.showVideoScreen = null; // listener set to run
window.showAudioControls = null;
window.showDbContent = null;
window.showEqualizer = null;
window.isEnabledEqualizer = null;
window.showShuffleActive = null;
window.showGainActive = null;
window.showEqActive = null;
window.showVideoActive = null;

/**
 * Styles for EQ in equalizer.css file.
 */

// equalizer elements
var filterNodes = { filters: [] };
const divEqualizer = document.createElement("div");
const divEqualizerHead = document.createElement("div");
const equalizer__head = document.createElement("div");
const divEqualizerContainer = document.createElement("div");
const divEqualizerCover = document.createElement("div");
const imgEqualizer = document.createElement("img");
const divImgEqualizer = document.createElement("div");
const equalizer_controls = document.createElement("div");
const divEq_slid_0 = document.createElement("div");
const divEq_slid_1 = document.createElement("div");
const divEq_slid_2 = document.createElement("div");
const divEq_slid_3 = document.createElement("div");
const divEq_slid_4 = document.createElement("div");
const divEq_slid_5 = document.createElement("div");
const divEq_slid_6 = document.createElement("div");
const divEq_slid_7 = document.createElement("div");
const divEq_slid_8 = document.createElement("div");
const divEq_slid_9 = document.createElement("div");

const eq_slid_0 = document.createElement("input");
const eq_slid_1 = document.createElement("input");
const eq_slid_2 = document.createElement("input");
const eq_slid_3 = document.createElement("input");
const eq_slid_4 = document.createElement("input");
const eq_slid_5 = document.createElement("input");
const eq_slid_6 = document.createElement("input");
const eq_slid_7 = document.createElement("input");
const eq_slid_8 = document.createElement("input");
const eq_slid_9 = document.createElement("input");

const divEq_slid_txt_0 = document.createElement("div");
const divEq_slid_txt_1 = document.createElement("div");
const divEq_slid_txt_2 = document.createElement("div");
const divEq_slid_txt_3 = document.createElement("div");
const divEq_slid_txt_4 = document.createElement("div");
const divEq_slid_txt_5 = document.createElement("div");
const divEq_slid_txt_6 = document.createElement("div");
const divEq_slid_txt_7 = document.createElement("div");
const divEq_slid_txt_8 = document.createElement("div");
const divEq_slid_txt_9 = document.createElement("div");

const divEqualizer__label = document.createElement("div");
const equalizer__label = document.createElement("div");
const divImgLabelEqualizer = document.createElement("div");
const imgLabelEqualizer = document.createElement("img");

const divEqualizer__range = document.createElement("div");
const equalizer__range = document.createElement("select");
const divEqualizer__presets = document.createElement("div");
const equalizer__presets = document.createElement("select");

// file selecetor
const fileUpload = document.createElement("input");
const divFileUpload = document.createElement("div");
// top of the page
const divTopNav = document.createElement("div");
const rowCanvas = document.createElement("canvas");
const divMediaTime = document.createElement("div");
// Main area, symbol information
const divMainContainer_01 = document.createElement("div"); // folder
const divMainContainer_02 = document.createElement("div"); // audio
const divMainContainer_03 = document.createElement("div"); // settings DB
const divMainContainer_04 = document.createElement("div"); // license
const divMainImage_01_wrap = document.createElement("div");
const divMainImage_01_01_wrap = document.createElement("div");
const divMainImage_02_wrap = document.createElement("div");
const divMainImage_03_wrap = document.createElement("div");
const divMainImage_04_wrap = document.createElement("div");
const divMainText_01_wrap = document.createElement("div");
const divMainText_02_wrap = document.createElement("div");
const divMainText_03_wrap = document.createElement("div");
const divMainText_04_wrap = document.createElement("div");
const divMain = document.createElement("div");
const divImgMainFolder = document.createElement("div");
const imgMainFolder = document.createElement("img");
imgMainFolder.src = "/static/images/playlistBooster-twoFiles.svg";
const spanTxtFileLoad = document.createElement("span");
const divImgMainShuffle = document.createElement("div");
const spanTxtShuffle = document.createElement("span");
const imgMainShuffle = document.createElement("img");
imgMainShuffle.src = "/static/images/playlistBooster-shuffle-off.svg";
const divImgMainLogo = document.createElement("div");
const imgMainLogo = document.createElement("img");
imgMainLogo.src = "/static/images/playlistBooster-btn-touch-this.svg";
const imgMainAudioSpeaker = document.createElement("img");
imgMainAudioSpeaker.src = "/static/images/playlistBooster-btn-speaker.svg";
const imgMainSettingsDB = document.createElement("img");
imgMainSettingsDB.src = "/static/images/playlistBooster-browser-idb.svg";

// video
const divVdo = document.createElement("div");
var playrateSelector = { isShown: false };
const divImgPlaybackRate = document.createElement("div");
divImgPlaybackRate.setAttribute("id", "divImgPlaybackRate");
divImgPlaybackRate.classList.add("divAudioImgArea");
const imgPlaybackRate = document.createElement("img");
imgPlaybackRate.setAttribute("id", "imgPlaybackRate");
imgPlaybackRate.setAttribute("width", "60px");
imgPlaybackRate.setAttribute("heigth", "60px");
imgPlaybackRate.classList.add("cursorP");
const divImgScrollTop = document.createElement("div");
divImgScrollTop.setAttribute("id", "divImgScrollTop");
divImgScrollTop.classList.add("divAudioImgArea");

// play list display
const divPlayList = document.createElement("div");
const divPlayListContainer = document.createElement("div");
const divPlayListAnimation = document.createElement("div");
// audio panel
const divAudioPanel = document.createElement("div");
const divPlayButtons = document.createElement("div");
const divRowPlayButtons = document.createElement("div"); // set perspective 2D
const imgPlayBtn = document.createElement("img");
imgPlayBtn.src = "/static/images/playlistBooster-btn-play.svg";
const imgStopBtn = document.createElement("img");
imgStopBtn.src = "/static/images/playlistBooster-btn-stop.svg";
const audioIcon = document.createElement("img");
audioIcon.src = "/static/images/playlistBooster-btn-speaker.svg";
const imgKillBtn = document.createElement("img");
imgKillBtn.src = "/static/images/playlistBooster-btn-reset.svg";
// run menu
const twoFilesImgRun = document.createElement("img");
twoFilesImgRun.src = "/static/images/playlistBooster-twoFiles.svg";
const spantwoFilesImgRun = document.createElement("span");
// DB content
const divDbContainer = document.createElement("div");
const divDbContainerHead = document.createElement("div");
const divDbContainerContent = document.createElement("div");

// audio volume gain time-seek
const divTxtGain = document.createElement("div");
const divTxtEq = document.createElement("div");
const divTxtVideo = document.createElement("div");
const spanTxtGain = document.createElement("span");
const spanTxtVideo = document.createElement("span");
const spanTxtEq = document.createElement("span");
const imgTxtGain = document.createElement("img");
imgTxtGain.setAttribute("id", "imgTxtGain");

imgTxtGain.src = "/static/images/playlistBooster-led-off.svg";
imgTxtGain.classList.add("audioStatusImages");
const imgTxtEq = document.createElement("img");
imgTxtEq.setAttribute("id", "imgTxtEq");
imgTxtEq.src = "/static/images/playlistBooster-led-off.svg";
imgTxtEq.classList.add("audioStatusImages");
imgTxtEq.setAttribute("id", "imgTxtEq");
const imgTxtVideo = document.createElement("img");
imgTxtVideo.setAttribute("id", "imgTxtVideo");
imgTxtVideo.src = "/static/images/playlistBooster-led-off.svg";
imgTxtVideo.classList.add("audioStatusImages");
const statusGainDict = {
  img: imgTxtGain,
  imgON: "/static/images/playlistBooster-led-on.svg",
  imgOFF: "/static/images/playlistBooster-led-off.svg",
};
const statusEqDict = {
  img: imgTxtEq,
  imgON: "/static/images/playlistBooster-led-on.svg",
  imgOFF: "/static/images/playlistBooster-led-off.svg",
};
const statusVideoDict = {
  img: imgTxtVideo,
  imgON: "/static/images/playlistBooster-led-on.svg",
  imgOFF: "/static/images/playlistBooster-led-off.svg",
};

const divAudioControls = document.createElement("div");
const labelForAudioVolume = document.createElement("label");
const labelForAudioGain = document.createElement("label");
const labelForTimeRuler = document.createElement("label");
const divAudioVolume = document.createElement("div");
const divAudioGain = document.createElement("div");
const divTimeRuler = document.createElement("div");
const divAudioLabelWrap = document.createElement("div");
const divAudioImgArea = document.createElement("div");
const divImgVideoScreen = document.createElement("div");
const imgVideoScreen = document.createElement("img");

/**
 * DOM elements get property fields filled.
 */
function createPlayGround() {
  divEqualizer.setAttribute("id", "divEqualizer");
  divEqualizerHead.setAttribute("id", "divEqualizerHead");
  equalizer__head.setAttribute("id", "equalizer__head");
  divEqualizerContainer.setAttribute("id", "divEqualizerContainer");
  divEqualizerCover.setAttribute("id", "divEqualizerCover");
  imgEqualizer.setAttribute("id", "imgEqualizer");
  divImgEqualizer.setAttribute("id", "divImgEqualizer");
  divImgEqualizer.classList.add("divAudioImgArea");
  equalizer_controls.setAttribute("id", "equalizer_controls"); // freq. slider
  eq_slid_0.setAttribute("id", "eq_slid_0");
  eq_slid_1.setAttribute("id", "eq_slid_1");
  eq_slid_2.setAttribute("id", "eq_slid_2");
  eq_slid_3.setAttribute("id", "eq_slid_3");
  eq_slid_4.setAttribute("id", "eq_slid_4");
  eq_slid_5.setAttribute("id", "eq_slid_5");
  eq_slid_6.setAttribute("id", "eq_slid_6");
  eq_slid_7.setAttribute("id", "eq_slid_7");
  eq_slid_8.setAttribute("id", "eq_slid_8");
  eq_slid_9.setAttribute("id", "eq_slid_9");

  eq_slid_0.setAttribute("type", "range");
  eq_slid_1.setAttribute("type", "range");
  eq_slid_2.setAttribute("type", "range");
  eq_slid_3.setAttribute("type", "range");
  eq_slid_4.setAttribute("type", "range");
  eq_slid_5.setAttribute("type", "range");
  eq_slid_6.setAttribute("type", "range");
  eq_slid_7.setAttribute("type", "range");
  eq_slid_8.setAttribute("type", "range");
  eq_slid_9.setAttribute("type", "range");

  eq_slid_0.setAttribute("min", "-12");
  eq_slid_1.setAttribute("min", "-12");
  eq_slid_2.setAttribute("min", "-12");
  eq_slid_3.setAttribute("min", "-12");
  eq_slid_4.setAttribute("min", "-12");
  eq_slid_5.setAttribute("min", "-12");
  eq_slid_6.setAttribute("min", "-12");
  eq_slid_7.setAttribute("min", "-12");
  eq_slid_8.setAttribute("min", "-12");
  eq_slid_9.setAttribute("min", "-12");

  eq_slid_0.setAttribute("max", "12");
  eq_slid_1.setAttribute("max", "12");
  eq_slid_2.setAttribute("max", "12");
  eq_slid_3.setAttribute("max", "12");
  eq_slid_4.setAttribute("max", "12");
  eq_slid_5.setAttribute("max", "12");
  eq_slid_6.setAttribute("max", "12");
  eq_slid_7.setAttribute("max", "12");
  eq_slid_8.setAttribute("max", "12");
  eq_slid_9.setAttribute("max", "12");

  eq_slid_0.setAttribute("step", "0.2");
  eq_slid_1.setAttribute("step", "0.2");
  eq_slid_2.setAttribute("step", "0.2");
  eq_slid_3.setAttribute("step", "0.2");
  eq_slid_4.setAttribute("step", "0.2");
  eq_slid_5.setAttribute("step", "0.2");
  eq_slid_6.setAttribute("step", "0.2");
  eq_slid_7.setAttribute("step", "0.2");
  eq_slid_8.setAttribute("step", "0.2");
  eq_slid_9.setAttribute("step", "0.2");

  eq_slid_0.setAttribute("value", "0");
  eq_slid_1.setAttribute("value", "0");
  eq_slid_2.setAttribute("value", "0");
  eq_slid_3.setAttribute("value", "0");
  eq_slid_4.setAttribute("value", "0");
  eq_slid_5.setAttribute("value", "0");
  eq_slid_6.setAttribute("value", "0");
  eq_slid_7.setAttribute("value", "0");
  eq_slid_8.setAttribute("value", "0");
  eq_slid_9.setAttribute("value", "0");

  divEq_slid_0.classList.add("eq_slid_box");
  divEq_slid_1.classList.add("eq_slid_box");
  divEq_slid_2.classList.add("eq_slid_box");
  divEq_slid_3.classList.add("eq_slid_box");
  divEq_slid_4.classList.add("eq_slid_box");
  divEq_slid_5.classList.add("eq_slid_box");
  divEq_slid_6.classList.add("eq_slid_box");
  divEq_slid_7.classList.add("eq_slid_box");
  divEq_slid_8.classList.add("eq_slid_box");
  divEq_slid_9.classList.add("eq_slid_box");

  eq_slid_0.classList.add("eq_slid");
  eq_slid_1.classList.add("eq_slid");
  eq_slid_2.classList.add("eq_slid");
  eq_slid_3.classList.add("eq_slid");
  eq_slid_4.classList.add("eq_slid");
  eq_slid_5.classList.add("eq_slid");
  eq_slid_6.classList.add("eq_slid");
  eq_slid_7.classList.add("eq_slid");
  eq_slid_8.classList.add("eq_slid");
  eq_slid_9.classList.add("eq_slid");

  divEq_slid_txt_0.classList.add("eq_slid_txt");
  divEq_slid_txt_1.classList.add("eq_slid_txt");
  divEq_slid_txt_2.classList.add("eq_slid_txt");
  divEq_slid_txt_3.classList.add("eq_slid_txt");
  divEq_slid_txt_4.classList.add("eq_slid_txt");
  divEq_slid_txt_5.classList.add("eq_slid_txt");
  divEq_slid_txt_6.classList.add("eq_slid_txt");
  divEq_slid_txt_7.classList.add("eq_slid_txt");
  divEq_slid_txt_8.classList.add("eq_slid_txt");
  divEq_slid_txt_9.classList.add("eq_slid_txt");

  divEqualizer__label.setAttribute("id", "divEqualizer__label");
  equalizer__label.setAttribute("id", "equalizer__label");
  equalizer__label.innerText = "EQ";
  divImgLabelEqualizer.setAttribute("id", "divImgLabelEqualizer");
  imgLabelEqualizer.setAttribute("id", "imgLabelEqualizer");

  divEqualizer__range.setAttribute("id", "divEqualizer__range");
  equalizer__range.setAttribute("id", "equalizer__range");
  divEqualizer__presets.setAttribute("id", "divEqualizer__presets");
  equalizer__presets.setAttribute("id", "equalizer__presets");

  equalizer__head.classList.add("equalizer__head");
  imgEqualizer.setAttribute("width", "60px");
  imgEqualizer.setAttribute("heigth", "60px");
  imgEqualizer.src = "/static/images/playlistBooster-equalizer-thumb-off.svg";
  imgEqualizer.addEventListener("click", () => {
    showEqualizer.toggle();
  });
  divImgEqualizer.classList.add("cursorP");

  equalizer_controls.classList.add("equalizer_controls");

  equalizer__label.height = "20px"; // label shows name EQ and power button
  equalizer__label.style.marginTop = "5px";
  equalizer__label.style.marginRight = "1px";
  equalizer__label.style.cursor = "pointer";
  equalizer__label.style.fontSize = "110%";
  equalizer__label.style.verticalAlign = "middle";
  imgLabelEqualizer.setAttribute("width", "26px");
  imgLabelEqualizer.setAttribute("heigth", "26px");
  imgLabelEqualizer.src =
    "/static/images/playlistBooster-equalizer-btn-off.svg";
  imgLabelEqualizer.style.marginRight = "10px";
  imgLabelEqualizer.style.cursor = "pointer";
  divImgLabelEqualizer.style.marginTop = "2px"; // power button
  divImgLabelEqualizer.style.marginLeft = "2px";
  divImgLabelEqualizer.classList.add("cursorP");
  equalizer__range.setAttribute("type", "select");
  equalizer__range.setAttribute("type", "select");
  equalizer__range.style.marginTop = "5px"; // select range
  equalizer__range.style.marginRight = "5px";
  equalizer__presets.setAttribute("type", "select");
  equalizer__presets.setAttribute("type", "select");
  equalizer__presets.style.marginTop = "5px";
  equalizer__presets.style.marginRight = "5px";

  // file selcetor
  fileUpload.setAttribute("id", "fileUpload");
  fileUpload.setAttribute("type", "file");
  fileUpload.setAttribute("name", "imgs[]");
  fileUpload.setAttribute("multiple", "");
  fileUpload.setAttribute("hidden", "");
  fileUpload.setAttribute("accept", allowedFileContent.join());
  fileUpload.className = "upload";
  fileUpload.addEventListener("change", () => {
    runLocalSound(); // fileUpload.files stored in the input element
  });
  divFileUpload.setAttribute("id", "divFileUpload");
  // nav bar
  divTopNav.setAttribute("id", "divTopNav");
  divPlayList.setAttribute("id", "divPlayList");
  // Main area
  divMain.setAttribute("id", "divMain");
  imgMainFolder.setAttribute("width", "40px");
  imgMainFolder.setAttribute("heigth", "40px");
  imgMainFolder.style.display = "block";
  imgMainFolder.classList.add("imgTransform");
  imgMainFolder.classList.add("cursorP");
  imgMainFolder.addEventListener("click", () => {
    fileUpload.click();
  });
  imgMainLogo.setAttribute("id", "imgMainShuffle");
  imgMainLogo.setAttribute("width", "100px");
  imgMainLogo.setAttribute("heigth", "100px");
  divImgMainLogo.style.display = "block";
  divImgMainLogo.style.display = "block";
  divImgMainLogo.style.marginTop = "10px";
  imgMainShuffle.setAttribute("id", "imgMainShuffle");
  imgMainShuffle.setAttribute("width", "36px");
  imgMainShuffle.setAttribute("heigth", "36px");
  imgMainShuffle.classList.add("imgTransform");
  imgMainShuffle.classList.add("cursorP");
  divImgMainFolder.style.display = "block";
  divImgMainShuffle.style.display = "block";
  divImgMainShuffle.style.marginTop = "10px";
  spanTxtShuffle.setAttribute("id", "spanTxtShuffle");
  imgMainAudioSpeaker.setAttribute("id", "imgMainAudioSpeaker");
  imgMainAudioSpeaker.setAttribute("width", "40px");
  imgMainAudioSpeaker.setAttribute("heigth", "40px");
  imgMainSettingsDB.setAttribute("id", "imgMainAudioSpeaker");
  imgMainSettingsDB.setAttribute("width", "40px");
  imgMainSettingsDB.setAttribute("heigth", "40px");

  divMainContainer_01.classList.add("mainContainer");
  divMainContainer_02.classList.add("mainContainer");
  divMainContainer_03.classList.add("mainContainer");
  divMainContainer_04.classList.add("mainContainer");

  divMainImage_01_wrap.classList.add("mainDisplay");
  divMainText_01_wrap.classList.add("mainDisplay");
  divMainText_01_wrap.classList.add("mainTextFormat");
  divMainText_01_wrap.classList.add("cursorP");
  divMainText_01_wrap.style.backgroundImage =
    'url("/static/images/playlistBooster-btn-touch-this.svg")';
  divMainText_01_wrap.style.minHeight = "100px";
  divMainText_01_wrap.style.minWidth = "100px";
  spanTxtFileLoad.innerText = msgFileLoad;
  divMainText_01_wrap.appendChild(spanTxtFileLoad);
  divMainText_01_wrap.appendChild(spanTxtShuffle);
  divMainText_02_wrap.classList.add("cursorP");

  divTxtGain.appendChild(imgTxtGain);
  divTxtGain.appendChild(spanTxtGain);
  divTxtEq.appendChild(imgTxtEq);
  divTxtEq.appendChild(spanTxtEq);
  divTxtVideo.appendChild(imgTxtVideo);
  divTxtVideo.appendChild(spanTxtVideo);
  spanTxtGain.innerText = msgGainOn;
  spanTxtEq.innerText = msgEqualizerOff;
  spanTxtVideo.innerText = msgVideoScreenOff;

  divMainText_02_wrap.appendChild(divTxtGain);
  divMainText_02_wrap.appendChild(divTxtEq);
  divMainText_02_wrap.appendChild(divTxtVideo);

  divMainText_02_wrap.classList.add("mainDisplay");
  divMainText_02_wrap.classList.add("mainTextFormat");
  divMainImage_02_wrap.classList.add("mainDisplay");
  divMainImage_02_wrap.classList.add("cursorP");
  divMainImage_02_wrap.classList.add("imgTransform");

  divMainText_03_wrap.innerText = "App state";
  divMainText_03_wrap.classList.add("mainDisplay");
  divMainText_03_wrap.classList.add("mainTextFormat");
  divMainText_03_wrap.classList.add("cursorP");
  divMainText_03_wrap.style.marginBottom = "15px";

  divMainImage_03_wrap.classList.add("mainDisplay");
  divMainImage_03_wrap.classList.add("cursorP");
  divMainImage_03_wrap.classList.add("imgTransform");

  divMainText_04_wrap.classList.add("mainDisplay");
  divMainText_04_wrap.classList.add("mainTextFormat");
  divMainText_04_wrap.innerHTML =
    "<p>Apache 2.0 License (2024), René Horn</p>" +
    "<p>Repository <a href=https://github.com/44xtc44/PlaylistBooster.git>" +
    "https://github.com/44xtc44/PlaylistBooster.git</a></p>";
  divMainText_04_wrap.style.fontSize = "100%";
  // video
  divVdo.setAttribute("id", "divVdo");
  // audio panel
  divAudioPanel.setAttribute("id", "divAudioPanel");
  divPlayButtons.setAttribute("id", "divPlayButtons");
  rowCanvas.setAttribute("id", "rowCanvas");
  rowCanvas.style.position = "absolute";
  rowCanvas.style.marginLeft = "3px";
  rowCanvas.style.width = "42px";
  rowCanvas.style.height = "34px";
  rowCanvas.style.marginTop = "3px";
  rowCanvas.style.marginBottom = "2px";
  rowCanvas.style.transform = "perspective(100px) rotateY(25deg)";
  divRowPlayButtons.setAttribute("id", "divRowPlayButtons");
  imgPlayBtn.setAttribute("id", "imgPlayBtn");
  imgPlayBtn.style.marginLeft = "44px";
  imgPlayBtn.classList.add("audioImages");
  imgPlayBtn.classList.add("imgTransform");
  imgStopBtn.setAttribute("id", "imgStopBtn");
  imgStopBtn.style.marginLeft = "0px";
  imgStopBtn.classList.add("audioImages");
  imgStopBtn.classList.add("imgTransform");
  audioIcon.setAttribute("id", "audioIcon");
  audioIcon.style.marginLeft = "5px";
  audioIcon.classList.add("audioImages");
  audioIcon.classList.add("imgTransform");

  imgKillBtn.setAttribute("id", "imgKillBtn");
  imgKillBtn.style.marginLeft = "5px";
  imgKillBtn.classList.add("audioImages");
  imgKillBtn.classList.add("imgTransform");
  imgKillBtn.addEventListener("click", () => {
    location.reload(true);
  });
  // volume gain time-seek
  timeRuler.classList.add("cursorP");
  timeRuler.style.width = "75%";
  audioVolume.classList.add("cursorP");
  audioVolume.style.width = "75%";
  audioGain.classList.add("cursorP");
  audioGain.style.width = "75%";
  divMediaTime.setAttribute("id", "divMediaTime");
  divMediaTime.style.margin = "5px";
  divMediaTime.style.fontSize = "100%";
  divMediaTime.style.color = "#f7b733";
  divAudioControls.setAttribute("id", "divAudioControls");
  labelForTimeRuler.setAttribute("id", "labelForTimeRuler");
  labelForTimeRuler.setAttribute("for", "durationController");
  labelForTimeRuler.innerHTML =
    "<div style=margin-left:5px;min-width:100px'>Time-seek</div>";
  labelForAudioGain.setAttribute("id", "labelForAudioGain");
  labelForAudioGain.setAttribute("for", "audioGainController");
  labelForAudioGain.innerHTML =
    "<div style=margin-left:5px;min-width:100px'>Gain</div>";
  labelForAudioVolume.setAttribute("id", "labelForAudioVolume");
  labelForAudioVolume.setAttribute("for", "audioVolumeController");
  labelForAudioVolume.innerHTML =
    "<div style=margin-left:5px;min-width:100px'>Volume</div>";
  divAudioLabelWrap.setAttribute("id", "divAudioLabelWrap");
  divAudioLabelWrap.style.marginLeft = "0px";
  divAudioLabelWrap.style.fontSize = "100%";

  imgVideoScreen.setAttribute("id", "imgVideoScreen");
  imgVideoScreen.setAttribute("width", "60px");
  imgVideoScreen.setAttribute("heigth", "60px");
  imgVideoScreen.src = "/static/images/playlistBooster-video-screen-off.svg";
  imgVideoScreen.classList.add("cursorP");

  divImgVideoScreen.setAttribute("id", "divImgVideoScreen");
  divImgVideoScreen.classList.add("divAudioImgArea");
  divAudioImgArea.setAttribute("id", "divAudioImgArea");
  divAudioImgArea.style.display = "flex";
  divAudioImgArea.style.flexDirection = "row";
  divAudioImgArea.width = "60%";
  divAudioImgArea.height = "100%";
  divAudioImgArea.style.marginLeft = "5px";
  divAudioImgArea.style.marginTop = "10px";

  // run menu
  twoFilesImgRun.setAttribute("id", "twoFilesImgRun");
  twoFilesImgRun.classList.add("audioImages");
  twoFilesImgRun.classList.add("imgTransform");
  spantwoFilesImgRun.innerText = "files";
  spantwoFilesImgRun.style.marginLeft = "15px";
  spantwoFilesImgRun.style.cursor = "pointer";
  // DB content
  divDbContainer.setAttribute("id", "divDbContainer");
  divDbContainerHead.setAttribute("id", "divDbContainerHead");
  divDbContainerHead.innerText = "";
  divDbContainerHead.style.fontSize = "90%";
  divDbContainerHead.style.color = "lightyellow%";
  divDbContainerHead.style.display = "none";
  divDbContainerContent.setAttribute("id", "divDbContainerContent");
  divDbContainerContent.style.fontSize = "90%";
  divDbContainerContent.addEventListener("click", () => {
    divDbContainerHead.style.display = "block";
  });
}
/**
 * Connect the Dom Elements.
 */
function arrangePlayGround() {
  // Menu
  root.appendChild(divTopNav);
  divTopNav.appendChild(divAudioPanel);
  divTopNav.appendChild(divMain);
  divTopNav.appendChild(divVdo);
  divTopNav.appendChild(pdfDisp);
  divTopNav.appendChild(divPlayList);
  // Main area
  divMain.appendChild(divMainContainer_01); // to display div side by side
  divMain.appendChild(divMainContainer_02);
  divMain.appendChild(divAudioControls);
  divMain.appendChild(divEqualizer);

  divMain.appendChild(divMainContainer_03);
  divMain.appendChild(divDbContainer);
  divMain.appendChild(divMainContainer_04);
  divMainContainer_01.appendChild(divMainImage_01_wrap);
  divMainContainer_01.appendChild(divMainText_01_wrap);
  // divMainContainer_01.appendChild(divMainImage_01_01_wrap);
  divMainContainer_02.appendChild(divMainImage_02_wrap);
  divMainContainer_02.appendChild(divMainText_02_wrap);
  divMainContainer_03.appendChild(divMainImage_03_wrap);
  divMainContainer_03.appendChild(divMainText_03_wrap);
  divMainContainer_04.appendChild(divMainImage_04_wrap);
  divMainContainer_04.appendChild(divMainText_04_wrap);

  divMainContainer_01.style.display = "flex";
  divMainContainer_01.style.flexFlow = "row";
  divMainImage_01_wrap.appendChild(divImgMainFolder);
  divMainImage_01_wrap.appendChild(divImgMainShuffle);
  divMainImage_01_01_wrap.appendChild(divImgMainLogo);
  divImgMainLogo.appendChild(imgMainLogo);
  divImgMainShuffle.appendChild(imgMainShuffle);
  divImgMainFolder.appendChild(imgMainFolder);
  divMainImage_02_wrap.appendChild(imgMainAudioSpeaker);
  divMainImage_03_wrap.appendChild(imgMainSettingsDB);
  // video
  divVdo.appendChild(video);
  // play list text
  divPlayList.appendChild(divPlayListContainer);
  divPlayListContainer.appendChild(divPlayListAnimation);
  divPlayListAnimation.appendChild(fileUpload);
  // audio panel
  divPlayButtons.appendChild(rowCanvas);
  divPlayButtons.appendChild(divRowPlayButtons);
  divAudioPanel.appendChild(divPlayButtons);

  divRowPlayButtons.appendChild(imgPlayBtn);
  divRowPlayButtons.appendChild(imgStopBtn);
  divRowPlayButtons.appendChild(audioIcon);
  divRowPlayButtons.appendChild(imgKillBtn);
  // volume gain time-seek
  labelForAudioVolume.appendChild(audioVolume);
  labelForAudioGain.appendChild(audioGain);
  labelForTimeRuler.appendChild(timeRuler);

  divAudioVolume.appendChild(labelForAudioVolume);
  divAudioGain.appendChild(labelForAudioGain);
  divTimeRuler.appendChild(labelForTimeRuler);
  divAudioLabelWrap.appendChild(divAudioVolume);
  divAudioLabelWrap.appendChild(divAudioGain);
  divAudioLabelWrap.appendChild(divTimeRuler);
  divAudioLabelWrap.appendChild(divAudioImgArea);
  divAudioImgArea.appendChild(divImgVideoScreen);
  divImgVideoScreen.appendChild(imgVideoScreen);
  divAudioControls.appendChild(divMediaTime);
  divAudioControls.appendChild(divAudioLabelWrap);

  divEqualizer.appendChild(divEqualizerHead);
  divEqualizer.appendChild(divEqualizerCover);
  divEqualizer.appendChild(divEqualizerContainer);
  divImgEqualizer.appendChild(imgEqualizer);
  divAudioImgArea.appendChild(divImgEqualizer); // thumbnail img
  divEqualizerContainer.appendChild(equalizer_controls); // slider
  // playbackrate img
  divAudioImgArea.appendChild(divImgPlaybackRate);
  divImgPlaybackRate.appendChild(imgPlaybackRate);
  divImgPlaybackRate.appendChild(playbackRate__select);
  // scroll top img in createScrollTop()
  divAudioImgArea.appendChild(divImgScrollTop);

  equalizer_controls.appendChild(divEq_slid_0);
  equalizer_controls.appendChild(divEq_slid_1);
  equalizer_controls.appendChild(divEq_slid_2);
  equalizer_controls.appendChild(divEq_slid_3);
  equalizer_controls.appendChild(divEq_slid_4);
  equalizer_controls.appendChild(divEq_slid_5);
  equalizer_controls.appendChild(divEq_slid_6);
  equalizer_controls.appendChild(divEq_slid_7);
  equalizer_controls.appendChild(divEq_slid_8);
  equalizer_controls.appendChild(divEq_slid_9);

  divEq_slid_0.appendChild(eq_slid_0);
  divEq_slid_1.appendChild(eq_slid_1);
  divEq_slid_2.appendChild(eq_slid_2);
  divEq_slid_3.appendChild(eq_slid_3);
  divEq_slid_4.appendChild(eq_slid_4);
  divEq_slid_5.appendChild(eq_slid_5);
  divEq_slid_6.appendChild(eq_slid_6);
  divEq_slid_7.appendChild(eq_slid_7);
  divEq_slid_8.appendChild(eq_slid_8);
  divEq_slid_9.appendChild(eq_slid_9);

  divEq_slid_0.appendChild(divEq_slid_txt_0);
  divEq_slid_1.appendChild(divEq_slid_txt_1);
  divEq_slid_2.appendChild(divEq_slid_txt_2);
  divEq_slid_3.appendChild(divEq_slid_txt_3);
  divEq_slid_4.appendChild(divEq_slid_txt_4);
  divEq_slid_5.appendChild(divEq_slid_txt_5);
  divEq_slid_6.appendChild(divEq_slid_txt_6);
  divEq_slid_7.appendChild(divEq_slid_txt_7);
  divEq_slid_8.appendChild(divEq_slid_txt_8);
  divEq_slid_9.appendChild(divEq_slid_txt_9);

  divEqualizerHead.appendChild(equalizer__head);
  equalizer__head.appendChild(divEqualizer__label);
  equalizer__head.appendChild(divImgLabelEqualizer);
  equalizer__head.appendChild(divEqualizer__range);
  equalizer__head.appendChild(divEqualizer__presets);

  divEqualizer__label.appendChild(equalizer__label);
  divImgLabelEqualizer.appendChild(imgLabelEqualizer); // on/off btn
  divEqualizer__range.appendChild(equalizer__range);
  divEqualizer__presets.appendChild(equalizer__presets);

  // DB content
  divDbContainer.appendChild(divDbContainerHead);
  divDbContainer.appendChild(divDbContainerContent);

  createBtnNextPrev();
  createScrollTop();
}
/**
 * Reused at every instance creation of Playlist class.
 * Get event listener for title skipping.
 */
function createBtnNextPrev() {
  const nextBtn = document.createElement("img");
  nextBtn.src = "/static/images/playlistBooster-btn-playForward.svg";
  const prevBtn = document.createElement("img");
  prevBtn.src = "/static/images/playlistBooster-btn-playBackward.svg";

  prevBtn.setAttribute("id", "prevBtn");
  prevBtn.style.marginLeft = "0px";
  prevBtn.classList.add("audioImages");
  prevBtn.classList.add("imgTransform");

  nextBtn.setAttribute("id", "nextBtn");
  nextBtn.style.marginLeft = "5px";
  nextBtn.style.marginRight = "5px";
  nextBtn.classList.add("audioImages");
  nextBtn.classList.add("imgTransform");

  // insert behind the stop button
  let parent = document.getElementById("imgStopBtn");
  parent.parentNode.insertBefore(nextBtn, parent.nextSibling);
  parent.parentNode.insertBefore(prevBtn, parent.nextSibling);
}
/**
 * Image hosts event listener to start playlist from the beginning.
 */
function createScrollTop() {
  const imgScrollTop = document.createElement("img");
  imgScrollTop.setAttribute("id", "imgScrollTop");
  imgScrollTop.setAttribute("width", "60px");
  imgScrollTop.setAttribute("heigth", "60px");
  imgScrollTop.src = "/static/images/playlistBooster-playlist-top.svg";
  imgScrollTop.style.opacity = '0.1';
  imgScrollTop.classList.add("cursorP");
  divImgScrollTop.appendChild(imgScrollTop);
}
/**
 * Set initial event listener on DOM elements.
 */
function createVisualElemListener() {
  twoFilesImgRun.addEventListener("click", () => {
    fileUpload.click();
  });
  divMainText_01_wrap.addEventListener("click", () => {
    fileUpload.click();
  });
  imgMainLogo.addEventListener("click", () => {
    fileUpload.click();
  });
  showShuffleActive = new IsShown("imgMainShuffle");
  imgMainShuffle.addEventListener("click", () => {
    showShuffleActive.toggle({
      img: imgMainShuffle,
      imgON: "/static/images/playlistBooster-shuffle-on.svg",
      imgOFF: "/static/images/playlistBooster-shuffle-off.svg",
    });
    setIdbValue({
      objectStore: "fileLoad",
      updFields: { is_shuffle: showShuffleActive.is_enabled },
    });
    spanTxtShuffle.innerText = showShuffleActive.is_enabled
      ? msgShuffleOn
      : msgShuffleOff;
  });
  showVideoScreen = new IsShown("videoWithControls");
  imgVideoScreen.addEventListener("click", () => {
    showVideoScreen.toggle({
      img: imgVideoScreen,
      imgON: "/static/images/playlistBooster-video-screen-on.svg",
      imgOFF: "/static/images/playlistBooster-video-screen-off.svg",
    });
    showVideoActive.toggle({
      img: imgTxtVideo,
      imgON: "/static/images/playlistBooster-led-on.svg",
      imgOFF: "/static/images/playlistBooster-led-off.svg",
    });
    setIdbValue({
      objectStore: "video",
      updFields: { screenPower: showVideoScreen.is_enabled },
    });
    if (showVideoScreen.is_enabled) {
      spanTxtVideo.innerText = msgVideoScreenOn;
      video.style.display = "block";
    } else {
      spanTxtVideo.innerText = msgVideoScreenOff;
      video.style.display = "none";
    }
  });
  divMainImage_02_wrap.addEventListener("click", () => {
    showAudioControls.toggle();
    showEqualizer.hide();
  });
  audioIcon.addEventListener("click", () => {
    showAudioControls.toggle();
    showEqualizer.hide();
  });
  showDbContent = new IsShown("divDbContainer");
  divMainText_03_wrap.addEventListener("click", () => {
    showDbContent.toggle();
  });
  divMainImage_03_wrap.addEventListener("click", () => {
    showDbContent.toggle();
  });
  divDbContainer.addEventListener("click", () => {
    showDbContent.toggle();
  });
  showEqualizer = new IsShown("divEqualizer");
  showAudioControls = new IsShown("divAudioControls");
  divMainText_02_wrap.addEventListener("click", () => {
    showAudioControls.toggle();
    showEqualizer.hide();
  });
  imgPlaybackRate.addEventListener("click", () => {
    if (playrateSelector.isShown) {
      playrateSelector.isShown = false;
      playbackRate__select.style.display = "none";
    } else {
      playrateSelector.isShown = true;
      playbackRate__select.style.display = "block";
    }
  });
}

/**
 * Main page, create red and green status LED.
 * Color dependend on Index DB object store, App status.
 */
function createAudioStatusLeds() {
  showGainActive = new IsShown("imgTxtGain");
  showEqActive = new IsShown("imgTxtEq");
  showVideoActive = new IsShown("imgTxtVideo");

  showGainActive.toggle({
    // gain starts actve
    img: imgTxtGain,
    imgON: "/static/images/playlistBooster-led-on.svg",
    imgOFF: "/static/images/playlistBooster-led-off.svg",
  });
}
