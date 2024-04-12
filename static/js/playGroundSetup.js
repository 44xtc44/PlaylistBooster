// playGroundSetup.js
"use strict";

/* 
  A div structure to attach and remove displayed 
  sound files and one or more canvas.
*/
// file selcetor
const fileUpload = document.createElement("input");
const divFileUpload = document.createElement('div');
const checkboxShuffle = document.createElement("input");
const labelForShuffle = document.createElement("label");
// nav bar (only decoration to host analyzer and time elapsed)
const divTopNav = document.createElement('div');
const topNav = document.createElement('section');
const divLogo = document.createElement('div');  // also switch to current title
const divRowCanvas = document.createElement('div');
const rowCanvasRear = document.createElement('canvas');
const rowCanvas = document.createElement('canvas');
// Main area, symbol information 
const divMainContainer_01 = document.createElement('div');
const divMainContainer_02 = document.createElement('div');
const divMainContainer_03 = document.createElement('div');
const divMainContainer_04 = document.createElement('div');
const divMainImage_01_wrap = document.createElement('div');
const divMainImage_02_wrap = document.createElement('div');
const divMainImage_03_wrap = document.createElement('div');
const divMainImage_04_wrap = document.createElement('div');
const divMainText_01_wrap = document.createElement('div');
const divMainText_02_wrap = document.createElement('div');
const divMainText_03_wrap = document.createElement('div');
const divMainText_04_wrap = document.createElement('div');
const divMain = document.createElement('div');
const imgMainTwoFiles = document.createElement("img");
imgMainTwoFiles.src = "/static/images/playlistBooster-twoFiles.svg";
const imgMainFolder = document.createElement("img");
imgMainFolder.src = "/static/images/playlistBooster-folder.svg";
const imgMainLogo = document.createElement("img");
imgMainLogo.src = "/static/images/playlistBooster-cloud.svg"
const imgMainAudioSpeaker  = document.createElement('span');

// video 
const divVdo = document.createElement('div');
const labelForVdoScreen = document.createElement("label");
// play list display 
const divFrameRightWait = document.createElement('div');  // put the element in a place we know if detached
const divFrameRight = document.createElement('div');
const divPlayListShow = document.createElement('div');
const divPlayList = document.createElement('div');
const divPlayListContainer = document.createElement('div');
const divPlayListAnimation = document.createElement('div');
// audio panel
const wrapPlayButtons = document.createElement("div");
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
  topNav.className = "topNav";
  divLogo.setAttribute("id", "divLogo");
  divLogo.innerText = "PlaylistBooster";
  divLogo.style.width = "200px";
  divFrameRightWait.setAttribute("id", "divFrameRightWait");
  divFrameRight.setAttribute("id", "divFrameRight");
  divPlayListShow.setAttribute("id", "divPlayListShow");
  divPlayList.setAttribute("id", "playList");
  divRowCanvas.setAttribute("id", "divRowCanvas");
  rowCanvas.setAttribute("id", "rowCanvas");
  rowCanvas.style.cursor = "pointer";
  rowCanvas.className = "stackCanvas";
  rowCanvas.style.display = "none";
  rowCanvas.addEventListener('click', (e) => {
    toggleRowAnalyzer();
  });
  rowCanvasRear.setAttribute("id", "rowCanvasRear");
  rowCanvasRear.className = "stackCanvas";
  rowCanvasRear.style.display = "inline-block";
  // Main area
  divMain.setAttribute("id", "divMain");
  imgMainFolder.setAttribute("width", "40px");
  imgMainFolder.setAttribute("heigth", "40px");
  imgMainTwoFiles.setAttribute("width", "40px");
  imgMainTwoFiles.setAttribute("heigth", "40px");
  imgMainLogo.setAttribute("width", "40px");
  imgMainLogo.setAttribute("heigth", "40px");
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
  divMainImage_04_wrap.classList.add("mainDisplay");
  divMainImage_04_wrap.classList.add("mainImageFormat"); 
  divMainText_04_wrap.classList.add("mainDisplay");
  divMainText_04_wrap.classList.add("mainTextFormat");

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
  divMainText_04_wrap.innerHTML = "<p>Click enables spectrum analyzer mini-show.<br>Active if media is loaded.</p>";

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
  wrapPlayButtons.setAttribute("id", "wrapPlayButtons");
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
  audioIcon.addEventListener('click', (e) => {
    toggleAudioControls();
  });
  spanFolderImgAudio.classList.add("spanInRow");
  folderImgAudio.setAttribute("width", "40px");
  folderImgAudio.setAttribute("heigth", "40px");
  folderImgAudio.style.verticalAlign = "bottom";
  folderImgAudio.classList.add("cursorP");
  folderImgAudio.addEventListener('click', (e) => {
    toggleRunMenu();
  });
  // audio volume gain time-seek
  timeRuler.classList.add("cursorP");
  audioVolume.classList.add("cursorP");
  audioGain.classList.add("cursorP");
  audioControls.setAttribute("id", "audioControls");
  audioSlider.setAttribute("id", "audioSlider");
  labelForTimeRuler.setAttribute("id", "labelForTimeRuler");
  labelForTimeRuler.setAttribute("for", "durationController");
  labelForTimeRuler.innerText = "time-seek";
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
  divAudioLabelWrap.style.marginBottom = "20px";
  divAudioLabelWrap.style.fontSize = "110%";
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
    toggleAboutMenu();
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
  divTopNav.appendChild(topNav);
  topNav.appendChild(divLogo);
  divRowCanvas.appendChild(rowCanvasRear);  // first is bottom
  divRowCanvas.appendChild(rowCanvas);
  divTopNav.appendChild(divRowCanvas);  // canvas
  // Main area
  root.appendChild(divMain);
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
  divMainContainer_04.appendChild(divMainImage_04_wrap);
  divMainContainer_04.appendChild(divMainText_04_wrap);
  divMainImage_01_wrap.appendChild(imgMainFolder);
  divMainImage_02_wrap.appendChild(imgMainTwoFiles);
  divMainImage_03_wrap.appendChild(imgMainAudioSpeaker);
  divMainImage_04_wrap.appendChild(imgMainLogo);
  // about menu under wrapPlayButtons
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
  root.appendChild(divVdo);
  divVdo.appendChild(video);
  // play list text
  root.appendChild(divFrameRight);
  root.appendChild(divFrameRightWait);
  root.appendChild(divPlayList);
  divPlayList.appendChild(divPlayListContainer);
  divPlayListContainer.appendChild(divPlayListAnimation);
  divPlayListContainer.appendChild(divPlayListShow);
  divPlayListAnimation.appendChild(fileUpload);
  // audio panel
  root.appendChild(wrapPlayButtons);
  wrapPlayButtons.appendChild(divPlayButtons);
  wrapPlayButtons.appendChild(divRunMenu);
  wrapPlayButtons.appendChild(audioControls);
  wrapPlayButtons.appendChild(wrapAboutMenu);
  divPlayButtons.appendChild(playBtn);
  divPlayButtons.appendChild(pauseBtn);
  divPlayButtons.appendChild(audioIcon);
  spanFolderImgAudio.appendChild(folderImgAudio);
  divPlayButtons.appendChild(spanFolderImgAudio);
  divPlayButtons.appendChild(divMenuAbout);
  // audio volume gain time-seek
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
  // add cloudLogo
  drawCloudLogoCanvas({ canvasId: "rowCanvasRear" });
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

/**
 * Object tag in HTML page reads SVG from disk.
 * Scratch the string form (like xml serialized) out of the object and
 * import new SVG into DOM. Circumvent fetch from server.
 */
function addCloudLogoDom() {
  let xml = document.getElementById("svg-cloud").contentDocument.activeElement.outerHTML;  // object tag in HTML page
  const parser = new DOMParser();
  const cloudLogo = parser.parseFromString(xml, 'text/html').body.childNodes[0];
  document.body.append(cloudLogo)
  cloudLogo.style.display = "none";  // Can grab the path ids later to manipulate, show/hide.
}

function drawCloudLogoCanvas(opt) {
  let canvas = document.getElementById(opt.canvasId);
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let svg = document.getElementById("playlistBooster-svg-cloud");  // <symbol> in playlist....html
  let xml = new XMLSerializer().serializeToString(svg);
  let head = 'data:image/svg+xml;base64,';
  let bodySvg64 = btoa(xml);
  let image64 = head + bodySvg64;

  let img = new Image();
  img.onload = function () {
    ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
  }
  img.src = image64;
}