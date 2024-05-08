// playGroundSetup.js
"use strict";

/* 
  A div structure to attach and remove displayed 
  sound files and one or more canvas.
*/
// file selecetor
const fileUpload = document.createElement("input");
const divFileUpload = document.createElement('div');
const checkboxShuffle = document.createElement("input");
const labelForShuffle = document.createElement("label");
// top of the page
const divTopNav = document.createElement('div');
const rowCanvas = document.createElement('canvas');
const divMediaTime = document.createElement('div');
// Main area, symbol information 
const divMainContainer_01 = document.createElement('div');
const divMainContainer_02 = document.createElement('div');
const divMainContainer_03 = document.createElement('div');
const divMainContainer_04 = document.createElement('div');
const divMainImage_01_wrap = document.createElement('div');
const divMainImage_02_wrap = document.createElement('div');
const divMainImage_03_wrap = document.createElement('div');
const divMainText_01_wrap = document.createElement('div');
const divMainText_02_wrap = document.createElement('div');
const divMainText_03_wrap = document.createElement('div');
const divMain = document.createElement('div');
const imgMainFolder = document.createElement("img");
imgMainFolder.src = "/static/images/playlistBooster-folder.svg";
const imgMainAudioSpeaker = document.createElement('img');
imgMainAudioSpeaker.src = "/static/images/playlistBooster-btn-speaker.svg";
// video 
const divVdo = document.createElement('div');
const labelForVdoScreen = document.createElement("label");
// play list display 
const divPlayList = document.createElement('div');
const divPlayListContainer = document.createElement('div');
const divPlayListAnimation = document.createElement('div');
// audio panel
const divAudioPanel = document.createElement("div");
const divPlayButtons = document.createElement("div");
const divRowPlayButtons = document.createElement("div");  // set perspective 2D
const imgPlayBtn = document.createElement("img");
imgPlayBtn.src = "/static/images/playlistBooster-btn-play.svg";
const imgStopBtn = document.createElement("img");
imgStopBtn.src = "/static/images/playlistBooster-btn-stop.svg";
const audioIcon = document.createElement("img");
audioIcon.src = "/static/images/playlistBooster-btn-speaker.svg";
const imgKillBtn = document.createElement("img");
imgKillBtn.src = "/static/images/playlistBooster-btn-kill.svg";
// audio volume gain time-seek
const divAudioControls = document.createElement('div');
const labelForAudioVolume = document.createElement("label");
const labelForAudioGain = document.createElement("label");
const labelForTimeRuler = document.createElement("label");
const labelForPlaybackHalf = document.createElement("label");
const labelForPlaybackOne = document.createElement("label");
const labelForPlaybackOneHalf = document.createElement("label");
const labelForPlaybackTwo = document.createElement("label");
const divAudioVolume = document.createElement('div');
const divAudioGain = document.createElement('div');
const divTimeRuler = document.createElement('div');
const divPlabackRate = document.createElement('div');
const divAudioLabelWrap = document.createElement('div');
// about and help menu
const menuAbout = document.createElement('img');
menuAbout.src = "/static/images/playlistBooster-copyright.svg";
// run menu
const twoFilesImgRun = document.createElement("img");
twoFilesImgRun.src = "/static/images/playlistBooster-twoFiles.svg";
const divRunMenu = document.createElement('div');

const spantwoFilesImgRun = document.createElement('span');
const spanLabelForShuffle = document.createElement('span');
const divLabelForVdo = document.createElement('div');

/**
 * DOM elements get property fields filled.
 */
function createPlayGround() {
  // file selcetor
  fileUpload.setAttribute("id", "fileUpload");
  fileUpload.setAttribute("type", "file");
  fileUpload.setAttribute("name", "imgs[]");
  fileUpload.setAttribute("multiple", "");
  fileUpload.setAttribute("hidden", "");
  fileUpload.setAttribute("accept", allowedFileContent.join());
  fileUpload.className = "upload";
  fileUpload.addEventListener('change', (e) => {
    runLocalSound();  // fileUpload.files stored in the input element
  });
  divFileUpload.setAttribute("id", "divFileUpload");
  // nav bar
  divTopNav.setAttribute("id", "divTopNav");
  divPlayList.setAttribute("id", "divPlayList");
  // Main area
  divMain.setAttribute("id", "divMain");
  imgMainFolder.setAttribute("width", "40px");
  imgMainFolder.setAttribute("heigth", "40px");
  imgMainAudioSpeaker.setAttribute("id", "imgMainAudioSpeaker");
  imgMainAudioSpeaker.setAttribute("width", "40");
  imgMainAudioSpeaker.setAttribute("heigth", "40px");
  divMainContainer_01.classList.add("mainContainer");
  divMainContainer_02.classList.add("mainContainer");
  divMainContainer_03.classList.add("mainContainer");
  divMainImage_01_wrap.classList.add("mainDisplay");
  divMainImage_01_wrap.classList.add("mainImageFormat");
  divMainImage_01_wrap.classList.add("cursorP");
  divMainImage_01_wrap.classList.add("imgTransform");
  divMainImage_01_wrap.addEventListener('click', () => {
    showDivRunMenu.toggle();
  });
  divMainText_01_wrap.classList.add("mainDisplay");
  divMainText_01_wrap.classList.add("mainTextFormat");
  divMainText_01_wrap.classList.add("cursorP");
  divMainText_01_wrap.innerHTML = "<ul>"
    + "<li>Select files</li>"
    + "<li>Shuffle ON/OFF</li>"
    + "</ul>";
  divMainText_01_wrap.addEventListener('click', () => {
    showDivRunMenu.toggle();
  });
  divMainText_02_wrap.classList.add("cursorP");
  divMainText_02_wrap.innerHTML = "<ul>"
    + "<li>Gain</li>"
    + "<li>Time-seek</li>"
    + "<li>Playback rate</li>"
    + "<li>Video screen ON/OFF</li>"
    + "</ul>";
  divMainText_02_wrap.addEventListener('click', () => {
    showAudioControls.toggle();
  });
  divMainText_02_wrap.classList.add("mainDisplay");
  divMainText_02_wrap.classList.add("mainTextFormat");
  divMainImage_02_wrap.classList.add("mainDisplay");
  divMainImage_02_wrap.classList.add("mainImageFormat");
  divMainImage_02_wrap.classList.add("cursorP");
  divMainImage_02_wrap.classList.add("imgTransform");
  divMainImage_02_wrap.addEventListener('click', () => {
    showAudioControls.toggle();
  });
  divMainText_03_wrap.classList.add("mainDisplay");
  divMainText_03_wrap.classList.add("mainTextFormat");
  // about menu
  menuAbout.setAttribute("id", "menuAbout");
  menuAbout.setAttribute("width", "40px");
  menuAbout.setAttribute("heigth", "40px");
  menuAbout.style.verticalAlign = "bottom";
  menuAbout.classList.add("cursorP");
  menuAbout.classList.add("imgTransform");
  divMainText_03_wrap.innerHTML = "<p>Apache 2.0 License (2024), René Horn</p>"
    + "<p>Repository <a href=https://github.com/44xtc44/PlaylistBooster.git>https://github.com/44xtc44/PlaylistBooster.git</a></p>"
    ;
  divMainText_03_wrap.style.fontSize = "90%";
  // video 
  divVdo.setAttribute("id", "divVdo");
  checkboxVdoScreen.setAttribute("id", "checkboxVdoScreen");
  checkboxVdoScreen.setAttribute("type", "checkbox");
  checkboxVdoScreen.setAttribute("unchecked", "");
  labelForVdoScreen.setAttribute("id", "labelForVdoScreen");
  labelForVdoScreen.setAttribute("for", "checkboxVdoScreen");
  labelForVdoScreen.innerText = "Video screen";
  // play list display 
  checkboxShuffle.setAttribute("id", "checkboxShuffle");
  checkboxShuffle.setAttribute("type", "checkbox");
  checkboxShuffle.setAttribute("checked", "");
  checkboxShuffle.classList.add("cursorP");
  labelForShuffle.setAttribute("id", "labelForShuffle");
  labelForShuffle.setAttribute("for", "checkboxShuffle");
  labelForShuffle.innerText = "Shuffle";
  labelForShuffle.classList.add("cursorP");
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
  audioIcon.addEventListener('click', () => {
    showAudioControls.toggle();
  });
  imgKillBtn.setAttribute("id", "imgKillBtn");
  imgKillBtn.style.marginLeft = "5px";
  imgKillBtn.classList.add("audioImages");
  imgKillBtn.classList.add("imgTransform");
  imgKillBtn.addEventListener('click', () => {
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
  divMediaTime.style.fontSize = "120%";
  divMediaTime.style.color = "#f7b733";
  divAudioControls.setAttribute("id", "divAudioControls");
  labelForTimeRuler.setAttribute("id", "labelForTimeRuler");
  labelForTimeRuler.setAttribute("for", "durationController");
  labelForTimeRuler.innerHTML = "<div style=margin-left:5px;min-width:100px'>Time-seek</div>";
  labelForAudioGain.setAttribute("id", "labelForAudioGain");
  labelForAudioGain.setAttribute("for", "audioGainController");
  labelForAudioGain.innerHTML = "<div style=margin-left:5px;min-width:100px'>Gain</div>";
  labelForAudioVolume.setAttribute("id", "labelForAudioVolume");
  labelForAudioVolume.setAttribute("for", "audioVolumeController");
  labelForAudioVolume.innerHTML = "<div style=margin-left:5px;min-width:100px'>Volume</div>";
  divAudioLabelWrap.setAttribute("id", "divAudioLabelWrap");
  divAudioLabelWrap.style.marginLeft = "0px";
  divAudioLabelWrap.style.fontSize = "120%";
  divPlabackRate.setAttribute("id", "divPlabackRate");
  divPlabackRate.style.marginLeft = "5px";
  divPlabackRate.style.marginTop = "10px";
  labelForPlaybackHalf.setAttribute("id", "labelForPlabackRateHalf");
  labelForPlaybackHalf.setAttribute("for", "plbr_0_5");
  labelForPlaybackHalf.innerText = "  0.5x";
  labelForPlaybackOne.setAttribute("id", "labelForPlaybackOne");
  labelForPlaybackOne.setAttribute("for", "plbr_1_0");
  labelForPlaybackOne.innerText = "  1.0x";
  labelForPlaybackOneHalf.setAttribute("id", "labelForPlaybackOneHalf");
  labelForPlaybackOneHalf.setAttribute("for", "plbr_1_5");
  labelForPlaybackOneHalf.innerText = "  1.5x";
  labelForPlaybackTwo.setAttribute("id", "labelForPlaybackTwo");
  labelForPlaybackTwo.setAttribute("for", "plbr_2_0");
  labelForPlaybackTwo.innerText = "  2.0x";
  divLabelForVdo.style.marginLeft = "5px";
  divLabelForVdo.style.marginTop = "15px";
  divLabelForVdo.style.marginBottom = "15px";
  // run menu
  twoFilesImgRun.setAttribute("id", "twoFilesImgRun");
  twoFilesImgRun.classList.add("audioImages");
  twoFilesImgRun.classList.add("imgTransform");
  twoFilesImgRun.addEventListener('click', () => {
    fileUpload.click();
  });
  divRunMenu.setAttribute("id", "divRunMenu");
  divRunMenu.style.padding = "5px";
  divRunMenu.style.fontSize = "120%";
  spantwoFilesImgRun.innerText = "files"
  spantwoFilesImgRun.style.marginLeft = "15px";
  spantwoFilesImgRun.addEventListener('click', () => {
    fileUpload.click();
  });
  spantwoFilesImgRun.style.cursor = "pointer";
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
  divMain.appendChild(divMainContainer_01);  // to display div side by side
  divMain.appendChild(divMainContainer_02);
  divMain.appendChild(divMainContainer_03);
  divMain.appendChild(divMainContainer_04);
  divMainContainer_01.appendChild(divMainImage_01_wrap);
  divMainContainer_01.appendChild(divMainText_01_wrap);
  divMainContainer_02.appendChild(divMainImage_02_wrap);
  divMainContainer_02.appendChild(divMainText_02_wrap);
  divMainContainer_03.appendChild(divMainImage_03_wrap);
  divMainContainer_03.appendChild(divMainText_03_wrap);
  divMainImage_01_wrap.appendChild(imgMainFolder);
  divMainImage_02_wrap.appendChild(imgMainAudioSpeaker);
  // run menu
  labelForShuffle.appendChild(checkboxShuffle);
  spantwoFilesImgRun.appendChild(twoFilesImgRun);
  spanLabelForShuffle.appendChild(labelForShuffle);
  divRunMenu.appendChild(spanLabelForShuffle);
  divRunMenu.appendChild(spantwoFilesImgRun);
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
  divAudioPanel.appendChild(divRunMenu);
  divAudioPanel.appendChild(divAudioControls);
  divRowPlayButtons.appendChild(imgPlayBtn);
  divRowPlayButtons.appendChild(imgStopBtn);
  divRowPlayButtons.appendChild(audioIcon);
  divRowPlayButtons.appendChild(imgKillBtn);

  // volume gain time-seek
  labelForAudioVolume.appendChild(audioVolume);
  labelForAudioGain.appendChild(audioGain);
  labelForTimeRuler.appendChild(timeRuler);
  labelForPlaybackHalf.appendChild(plbr_0_5);
  labelForPlaybackOne.appendChild(plbr_1_0);
  labelForPlaybackOneHalf.appendChild(plbr_1_5);
  labelForPlaybackTwo.appendChild(plbr_2_0);
  divAudioVolume.appendChild(labelForAudioVolume);
  divAudioGain.appendChild(labelForAudioGain);
  divTimeRuler.appendChild(labelForTimeRuler);
  divPlabackRate.appendChild(labelForPlaybackHalf);
  divPlabackRate.appendChild(labelForPlaybackOne);
  divPlabackRate.appendChild(labelForPlaybackOneHalf);
  divPlabackRate.appendChild(labelForPlaybackTwo);
  divAudioLabelWrap.appendChild(divAudioVolume);
  divAudioLabelWrap.appendChild(divAudioGain);
  divAudioLabelWrap.appendChild(divTimeRuler);
  divAudioLabelWrap.appendChild(divPlabackRate);
  labelForVdoScreen.appendChild(checkboxVdoScreen);
  divLabelForVdo.appendChild(labelForVdoScreen);
  divAudioLabelWrap.appendChild(divLabelForVdo);
  divAudioControls.appendChild(divMediaTime);
  divAudioControls.appendChild(divAudioLabelWrap);
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