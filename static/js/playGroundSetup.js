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
// nav bar (only decoration to host analyzer and time elapsed)
const divTopNav = document.createElement('div');
const divRowCanvas = document.createElement('div');
const rowCanvas = document.createElement('canvas');
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
const imgMainTwoFiles = document.createElement("img");
imgMainTwoFiles.src = "/static/images/playlistBooster-twoFiles.svg";
const imgMainFolder = document.createElement("img");
imgMainFolder.src = "/static/images/playlistBooster-folder.svg";
const imgMainAudioSpeaker  = document.createElement('span');

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
const playBtn = document.createElement("span");
const pauseBtn = document.createElement("span");
const audioIcon = document.createElement("span");
const folderImgAudio = document.createElement("img");
folderImgAudio.src = "/static/images/playlistBooster-folder.svg";
const spanFolderImgAudio = document.createElement("span");
// audio volume gain time-seek
const audioControls = document.createElement('div');
const audioSlider = document.createElement('div');
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
const wrapAboutMenu = document.createElement('div');
const menuAbout = document.createElement('span');
const divMenuAbout = document.createElement('div');
// run menu
const twoFilesImgRun = document.createElement("img");
twoFilesImgRun.src = "/static/images/playlistBooster-twoFiles.svg";
const divRunMenu = document.createElement('div');

const spantwoFilesImgRun = document.createElement('span');
const spanLabelForShuffle = document.createElement('span');
const spanLabelForVdo = document.createElement('span');

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
  divRowCanvas.setAttribute("id", "divRowCanvas");
  rowCanvas.setAttribute("id", "rowCanvas");
  rowCanvas.className = "stackCanvas";
  rowCanvas.style.display = "none";
  // Main area
  divMain.setAttribute("id", "divMain");
  imgMainFolder.setAttribute("width", "40px");
  imgMainFolder.setAttribute("heigth", "40px");
  imgMainTwoFiles.setAttribute("width", "40px");
  imgMainTwoFiles.setAttribute("heigth", "40px");
  imgMainAudioSpeaker.innerHTML = "&#128266;";
  imgMainAudioSpeaker.style.fontSize ="200%";
  divMainContainer_01.classList.add("mainContainer");
  divMainContainer_02.classList.add("mainContainer");
  divMainContainer_03.classList.add("mainContainer");
  divMainContainer_04.classList.add("mainContainer");
  divMainImage_01_wrap.classList.add("mainDisplay");
  divMainImage_01_wrap.classList.add("mainImageFormat"); 
  divMainText_01_wrap.classList.add("mainDisplay");
  divMainText_01_wrap.classList.add("mainTextFormat");
  divMainImage_02_wrap.classList.add("mainDisplay");
  divMainImage_02_wrap.classList.add("mainImageFormat"); 
  divMainText_02_wrap.classList.add("mainDisplay");
  divMainText_02_wrap.classList.add("mainTextFormat");
  divMainImage_03_wrap.classList.add("mainDisplay");
  divMainImage_03_wrap.classList.add("mainImageFormat"); 
  divMainText_03_wrap.classList.add("mainDisplay");
  divMainText_03_wrap.classList.add("mainTextFormat");
  divMainText_01_wrap.innerHTML = "<p>Show the file selector.<br>Playlist is an oldschool folder.</p>";
  divMainText_02_wrap.innerHTML = "<p>Multi-file-select with 'file-upload' mask. (local Add-on)</p>"
    + "<ul>"
    + "<li>Play sound of mixed files, e.g., .mp4, mp3 </li>"
    + "<li>Video screen checkbox default disabled</li>"
    + "<li>Shuffle can be disabled in the checkbox</li>"
    + "<li>&#9197; &nbsp; lists remaining files in shuffled order</li>"
    + "</ul>";
  divMainText_03_wrap.innerHTML = "<ul>"
    + "<li>Volume</li>"
    + "<li>Gain</li>"
    + "<li>Time-seek</li>"
    + "<li>Playback rate</li>"
    + "</ul>";

  // video 
  divVdo.setAttribute("id", "divVdo");
  checkboxVdoScreen.setAttribute("id", "checkboxVdoScreen");
  checkboxVdoScreen.setAttribute("type", "checkbox");
  checkboxVdoScreen.setAttribute("unchecked", "");
  labelForVdoScreen.setAttribute("id", "labelForVdoScreen");
  labelForVdoScreen.setAttribute("for", "checkboxVdoScreen");
  labelForVdoScreen.innerText = "Show Video";
  // play list display 
  checkboxShuffle.setAttribute("id", "checkboxShuffle");
  checkboxShuffle.setAttribute("type", "checkbox");
  checkboxShuffle.setAttribute("checked", "");
  labelForShuffle.setAttribute("id", "labelForShuffle");
  labelForShuffle.setAttribute("for", "checkboxShuffle");
  labelForShuffle.innerText = "Shuffle";
  // audio panel
  divAudioPanel.setAttribute("id", "divAudioPanel");
  divPlayButtons.setAttribute("id", "divPlayButtons");
  playBtn.setAttribute("id", "playBtn");
  playBtn.className = "playBtn";
  playBtn.classList.add("spanInRow");
  playBtn.classList.add("cursorP");
  playBtn.classList.add("fontSize200");
  playBtn.innerHTML = "&nbsp; &#9654; &nbsp;";
  pauseBtn.setAttribute("id", "pauseBtn");
  pauseBtn.className = "pauseBtn";
  pauseBtn.classList.add("spanInRow");
  pauseBtn.classList.add("cursorP");
  pauseBtn.classList.add("fontSize200");
  pauseBtn.innerHTML = "&nbsp; &#9208; &nbsp;";
  audioIcon.setAttribute("id", "audioIcon");
  audioIcon.classList.add("spanInRow");
  audioIcon.classList.add("cursorP");
  audioIcon.classList.add("fontSize200");
  audioIcon.innerHTML = "&#128266;";
  audioIcon.addEventListener('click', () => {
    showAudioControls.toggle();
  });
  spanFolderImgAudio.classList.add("spanInRow");
  folderImgAudio.setAttribute("width", "40px");
  folderImgAudio.setAttribute("heigth", "40px");
  folderImgAudio.style.verticalAlign = "bottom";
  folderImgAudio.classList.add("cursorP");
  folderImgAudio.addEventListener('click', () => {
    showDivRunMenu.toggle();
  });
  // volume gain time-seek
  timeRuler.classList.add("cursorP");
  audioVolume.classList.add("cursorP");
  audioGain.classList.add("cursorP");
  audioControls.setAttribute("id", "audioControls");
  audioSlider.setAttribute("id", "audioSlider");
  labelForTimeRuler.setAttribute("id", "labelForTimeRuler");
  labelForTimeRuler.setAttribute("for", "durationController");
  labelForTimeRuler.innerText = "Time-seek";
  divTimeRuler.classList.add("labelAudioSlider");
  labelForAudioGain.setAttribute("id", "labelForAudioGain");
  labelForAudioGain.setAttribute("for", "audioGainController");
  labelForAudioGain.innerText = "Gain";
  divAudioGain.classList.add("labelAudioSlider");
  labelForAudioVolume.setAttribute("id", "labelForAudioVolume");
  labelForAudioVolume.setAttribute("for", "audioVolumeController");
  labelForAudioVolume.innerText = "Volume";
  divAudioVolume.classList.add("labelAudioSlider");
  divAudioLabelWrap.setAttribute("id", "divAudioLabelWrap");
  divAudioLabelWrap.style.marginLeft = "20px";
  divAudioLabelWrap.style.fontSize = "110%";
  divPlabackRate.setAttribute("id", "divPlabackRate");
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
  // about menu
  wrapAboutMenu.setAttribute("id", "wrapAboutMenu");
  divMenuAbout.setAttribute("id", "divMenuAbout");
  divMenuAbout.style.float = "right";
  divMenuAbout.style.fontSize = "120%";
  divMenuAbout.style.fontWeight = "600";
  divMenuAbout.style.marginTop = "10px";
  divMenuAbout.style.marginRight = "10px";

  menuAbout.setAttribute("id", "menuAbout");
  menuAbout.innerText = "About";
  menuAbout.classList.add("cursorP");
  menuAbout.addEventListener('click', () => {
    showWrapAboutMenu.toggle();
  });
  fillAboutMenu();
  // run menu
  twoFilesImgRun.setAttribute("id", "twoFilesImgRun");
  twoFilesImgRun.setAttribute("width", "40px");
  twoFilesImgRun.setAttribute("heigth", "40px");
  twoFilesImgRun.style.verticalAlign = "bottom";
  twoFilesImgRun.classList.add("cursorP");
  twoFilesImgRun.addEventListener('click', () => {
    fileUpload.click();
  });
  divRunMenu.setAttribute("id", "divRunMenu");
  spantwoFilesImgRun.innerText = "collect files"
  spantwoFilesImgRun.addEventListener('click', () => {
    fileUpload.click();
  });
  spantwoFilesImgRun.style.cursor = "pointer";
  spantwoFilesImgRun.classList.add("spanInRow");
  spanLabelForShuffle.classList.add("spanInRow");
  spanLabelForVdo.classList.add("spanInRow");
}

/**
 * Connect the Dom Elements.
 */
function arrangePlayGround() {
  // Menu
  root.appendChild(divTopNav);  
  divTopNav.appendChild(divRowCanvas);
  divTopNav.appendChild(divAudioPanel); 
  divTopNav.appendChild(divMain);
  divTopNav.appendChild(divVdo);
  divTopNav.appendChild(divPlayList);
  divRowCanvas.appendChild(rowCanvas);
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
  divMainImage_02_wrap.appendChild(imgMainTwoFiles);
  divMainImage_03_wrap.appendChild(imgMainAudioSpeaker);
  // about menu under divAudioPanel
  divMenuAbout.appendChild(menuAbout);
  // run menu
  labelForShuffle.appendChild(checkboxShuffle);
  labelForVdoScreen.appendChild(checkboxVdoScreen);
  spantwoFilesImgRun.appendChild(twoFilesImgRun);
  spanLabelForShuffle.appendChild(labelForShuffle);
  spanLabelForVdo.appendChild(labelForVdoScreen);
  divRunMenu.appendChild(spanLabelForShuffle);
  divRunMenu.appendChild(spanLabelForVdo);
  divRunMenu.appendChild(spantwoFilesImgRun);
  // video
  divVdo.appendChild(video);
  // play list text
  divPlayList.appendChild(divPlayListContainer);
  divPlayListContainer.appendChild(divPlayListAnimation);
  divPlayListAnimation.appendChild(fileUpload);
  // audio panel
  divAudioPanel.appendChild(divPlayButtons);
  divAudioPanel.appendChild(divRunMenu);
  divAudioPanel.appendChild(audioControls);
  divAudioPanel.appendChild(wrapAboutMenu);
  divPlayButtons.appendChild(playBtn);
  divPlayButtons.appendChild(pauseBtn);
  divPlayButtons.appendChild(audioIcon);
  spanFolderImgAudio.appendChild(folderImgAudio);
  divPlayButtons.appendChild(spanFolderImgAudio);
  divPlayButtons.appendChild(divMenuAbout);
  // volume gain time-seek
  audioControls.appendChild(audioSlider);
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
  audioControls.appendChild(divAudioLabelWrap);
}

/**
 * Write help and info messages with links to the repo.
 */
function fillAboutMenu() {
  wrapAboutMenu.innerHTML = "<p>Apache 2.0 License (2024), René Horn</p>"
    + "<p>Repository <a href=https://github.com/44xtc44/PlaylistBooster.git>https://github.com/44xtc44/PlaylistBooster.git</a></p>"
    ;
}

/**
 * Reused at every instance creation of Playlist class.
 * Get event listener for title skipping.
 */
function createBtnNextPrev() {
  const nextBtn = document.createElement("span");
  const prevBtn = document.createElement("span");
  nextBtn.setAttribute("id", "nextBtn");
  nextBtn.classList.add("spanInRow");
  nextBtn.classList.add("cursorP");
  nextBtn.classList.add("fontSize200");
  nextBtn.innerHTML = "&nbsp; &#9197; &nbsp;";
  prevBtn.setAttribute("id", "prevBtn");
  prevBtn.classList.add("spanInRow");
  prevBtn.classList.add("cursorP");
  prevBtn.classList.add("fontSize200");
  prevBtn.innerHTML = "&nbsp; &#9198; &nbsp;";
  // insert before the audio icon
  let parent = document.getElementById("pauseBtn");
  parent.parentNode.insertBefore(nextBtn, parent.nextSibling);
  parent.parentNode.insertBefore(prevBtn, parent.nextSibling);
}