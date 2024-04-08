// playGroundSetup.js
"use strict";

/* 
  A div structure to attach and remove displayed 
  sound files and one or more canvas.
*/
// file selcetor
const cloudy = document.createElement("img");
cloudy.src = "/static/images/playlistBooster-cloud.svg";
console.log("cloudy->", cloudy)
const fileUpload = document.createElement("input");
const btnFileUpload = document.createElement('button');
const divFileUpload = document.createElement('div');
const checkboxShuffle = document.createElement("input");
const labelForShuffle = document.createElement("label");
// nav bar
const divTopNav = document.createElement('div');
const topNav = document.createElement('section');
const divLogo = document.createElement('div');  // also switch to current title
const divRowCanvas = document.createElement('div');
const rowCanvasRear = document.createElement('canvas');
const rowCanvas = document.createElement('canvas');
// video 
const divVdo = document.createElement('div');
const checkboxVdoScreen = document.createElement("input");
const labelForVdoScreen = document.createElement("label");
// play list display 
const divFrameRightWait = document.createElement('div');  // put the element in a place we know if detached
const divFrameRight = document.createElement('div');
const divPlayListShow = document.createElement('div');
const divPlayList = document.createElement('div');
const divPlayListContainer = document.createElement('div');
const divPlayListAnimation = document.createElement('div');
// audio panel
const divPlayButtons = document.createElement("div");
const playBtn = document.createElement("span");
const pauseBtn = document.createElement("span");
const audioIcon = document.createElement("span");
// audio volume gain time-seek
const audioControls = document.createElement('div');
const divAudioControlsDetail = document.createElement('div');
const pElemX = document.createElement('p');  // p row to place 'X' close click symbol
const spanX = document.createElement('span');  // 'X' close symbol
const audioSlider = document.createElement('div');
const labelForAudioVolume = document.createElement("label");
const labelForAudioGain = document.createElement("label");
const labelForTimeRuler = document.createElement("label");
const divAudioVolume = document.createElement('div');
const divAudioGain = document.createElement('div');
const divTimeRuler = document.createElement('div');
const divAudioLabelWrap = document.createElement('div');

// about and help menu
const wrapAboutMenu = document.createElement('div');
const pElemXabout = document.createElement('p');
const spanXabout = document.createElement('span');
const pAboutText = document.createElement('p');
const divAboutDetail = document.createElement('div');
const menuAbout = document.createElement('div');
// run menu
const wrapRunMenu = document.createElement('div');
const pElemXrun = document.createElement('p');
const spanXrun = document.createElement('span');
const divRunDetail = document.createElement('div');
const menuRun = document.createElement('div');

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
  btnFileUpload.setAttribute("id", "input__submit__files");
  btnFileUpload.innerText = "files";
  btnFileUpload.className = "input__submit"
  btnFileUpload.addEventListener('click', (e) => {
    fileUpload.click();
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
  rowCanvas.className = "stackCanvas"
  rowCanvas.addEventListener('click', (e) => {
    toggleRowAnalyzer();
  });
  rowCanvasRear.setAttribute("id", "rowCanvasRear");
  rowCanvasRear.className = "stackCanvas"
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
  divPlayButtons.setAttribute("id", "divPlayButtons");
  playBtn.setAttribute("id", "playBtn");
  playBtn.className = "playBtn";
  playBtn.classList.add("audioIcon");
  playBtn.classList.add("pressTransform");
  playBtn.innerHTML = "&nbsp; &#9654; &nbsp;";
  pauseBtn.setAttribute("id", "pauseBtn");
  pauseBtn.className = "pauseBtn";
  pauseBtn.classList.add("audioIcon");
  pauseBtn.classList.add("pressTransform");
  pauseBtn.innerHTML = "&nbsp; &#9208; &nbsp;";
  audioIcon.setAttribute("id", "audioIcon");
  audioIcon.classList.add("audioIcon");
  audioIcon.innerHTML = "&#128266;";
  audioIcon.addEventListener('click', (e) => {
    toggleAudioControls();
  });

  // audio volume gain time-seek
  audioControls.setAttribute("id", "audioControls");
  divAudioControlsDetail.setAttribute("id", "divAudioControlsDetail")
  divAudioControlsDetail.innerHTML = "<h3>Audio / Video</h3>";
  pElemX.className = "pElemX";
  spanX.className = "spanX";
  spanX.innerHTML = "&#10006;";
  spanX.addEventListener('click', (e) => {
    toggleAudioControls();
  });
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

  // about menu
  wrapAboutMenu.setAttribute("id", "wrapAboutMenu");
  pElemXabout.className = "pElemX";
  spanXabout.className = "spanX";
  spanXabout.innerHTML = "&#10006;";
  spanXabout.addEventListener('click', (e) => {
    toggleAboutMenu();
  });
  divAboutDetail.setAttribute("id", "divAboutDetail");
  menuAbout.setAttribute("id", "menuAbout");
  menuAbout.style.zIndex = "1000";
  menuAbout.innerHTML = "About";
  menuAbout.className = "About";
  menuAbout.classList = "pressTransform";
  menuAbout.addEventListener('click', (e) => {
    toggleAboutMenu();
  });
  fillAboutMenu();
  // run menu
  wrapRunMenu.setAttribute("id", "wrapRunMenu");
  pElemXrun.className = "pElemX";
  spanXrun.className = "spanX";
  spanXrun.innerHTML = "&#10006;";
  spanXrun.addEventListener('click', (e) => {
    toggleRunMenu();
  });
  divRunDetail.setAttribute("id", "divRunDetail");
  divRunDetail.innerHTML = "<p>File upload mask is used to collect files. (local Add-on).</p>"
    + "Multi-select Button<br>"
    ;
  menuRun.setAttribute("id", "menuRun");
  menuRun.style.zIndex = "1000";
  menuRun.innerText = "Run";
  menuRun.className = "Run";
  menuRun.classList = "pressTransform",
    menuRun.style.width = "100px";
  menuRun.addEventListener('click', (e) => {
    toggleRunMenu();
  });
}

/**
 * Connect the Dom Elements.
 */
function arrangePlayGround() {
  // Menu
  root.appendChild(divTopNav);
  divTopNav.appendChild(topNav);
  topNav.appendChild(divLogo);
  topNav.appendChild(menuRun);  // nav bar click
  topNav.appendChild(menuAbout);
  divRowCanvas.appendChild(rowCanvasRear);  // first is bottom
  divRowCanvas.appendChild(rowCanvas);
  divTopNav.appendChild(divRowCanvas);  // canvas
  // about menu
  root.appendChild(wrapAboutMenu);
  wrapAboutMenu.appendChild(pElemXabout);
  pElemXabout.appendChild(spanXabout);
  wrapAboutMenu.appendChild(divAboutDetail);
  // run menu
  root.appendChild(wrapRunMenu);
  wrapRunMenu.appendChild(pElemXrun);
  pElemXrun.appendChild(spanXrun);
  wrapRunMenu.appendChild(divRunDetail);
  wrapRunMenu.appendChild(btnFileUpload);
  wrapRunMenu.appendChild(divFileUpload);
  divFileUpload.appendChild(fileUpload);
  labelForShuffle.appendChild(checkboxShuffle);
  divFileUpload.appendChild(labelForShuffle);
  labelForVdoScreen.appendChild(checkboxVdoScreen);
  wrapRunMenu.appendChild(labelForVdoScreen);
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
  root.appendChild(divPlayButtons);
  divPlayButtons.appendChild(playBtn);
  divPlayButtons.appendChild(pauseBtn);
  divPlayButtons.appendChild(audioIcon);
  // audio volume gain time-seek
  root.appendChild(audioControls);
  audioControls.appendChild(divAudioControlsDetail);
  audioControls.appendChild(pElemX);
  pElemX.appendChild(spanX);
  audioControls.appendChild(audioSlider);
  labelForAudioVolume.appendChild(audioVolume);
  labelForAudioGain.appendChild(audioGain);
  labelForTimeRuler.appendChild(timeRuler);
  divAudioVolume.appendChild(labelForAudioVolume);
  divAudioGain.appendChild(labelForAudioGain);
  divTimeRuler.appendChild(labelForTimeRuler);
  divAudioLabelWrap.appendChild(divAudioVolume);
  divAudioLabelWrap.appendChild(divAudioGain);
  divAudioLabelWrap.appendChild(divTimeRuler);
  divAudioControlsDetail.appendChild(divAudioLabelWrap);

  // add cloudLogo
  drawCloudLogoCanvas({ canvasId: "rowCanvasRear" });
}

/**
 * Write help and info messages with links to the repo.
 */
function fillAboutMenu() {
  pElemXabout.innerHTML = "";
  divAboutDetail.innerHTML = "<p>Apache 2.0 License (2024), René Horn</p>"
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
  nextBtn.classList.add("audioIcon");
  nextBtn.classList.add("pressTransform");
  nextBtn.innerHTML = "&nbsp; &#9197; &nbsp;";
  prevBtn.setAttribute("id", "prevBtn");
  prevBtn.classList.add("audioIcon");
  prevBtn.classList.add("pressTransform");
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