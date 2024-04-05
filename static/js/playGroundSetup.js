// playGroundSetup.js
"use strict";

/* 
  A div structure to attach and remove displayed 
  sound files and one or more canvas.
*/
// file selcetor
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
const divHeader = document.createElement('div');
// current title
const titleDisplay = document.createElement('span');
const icy_name = document.createElement('span');   // misuse radio header display to show playlist info
const request_icy_url = document.createElement('span');  // display track count
const request_suffix = document.createElement('span');   // clean display from former radio header info
const request_icy_br = document.createElement('span');   // can display file info, if flask would read file header, length
const request_time = document.createElement('span');     // like GhettoRecorder listenWhitelist
// network stream descriptions
const customImg = document.createElement('div');  // source project network stream img and description txt
const customTxt = document.createElement('div');
// audio panel
const divPlayButtons = document.createElement("div");
// next and prev btn createBtnNextPrev();
const playBtn = document.createElement("span");
const pauseBtn = document.createElement("span");
const audioIcon = document.createElement("span");
// audio volume gain
const audioControls = document.createElement('div');
const pElemX = document.createElement('p');  // p row to place 'X' close click symbol
const spanX = document.createElement('span');  // 'X' close symbol
const audioSlider = document.createElement('div');
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
  fileUpload.setAttribute("id" ,"fileUpload");
  fileUpload.setAttribute("type","file");
  fileUpload.setAttribute("name","imgs[]");
  fileUpload.setAttribute("multiple","");
  fileUpload.setAttribute("hidden","");
  fileUpload.className = "upload";
  fileUpload.addEventListener('change',(e)=>{
    runLocalSound();  // fileUpload.files stored in the input element
  });
  btnFileUpload.setAttribute("id" ,"input__submit__files");
  btnFileUpload.innerText = "files";
  btnFileUpload.className = "input__submit"
  btnFileUpload.addEventListener('click',(e)=>{
    fileUpload.click();
  });
  divFileUpload.setAttribute("id" ,"divFileUpload");
  
  // nav bar
  divTopNav.setAttribute("id" ,"divTopNav");
  topNav.className = "topNav";
  divLogo.setAttribute("id" ,"divLogo");
  divLogo.innerText = "PlaylistBooster";
  divLogo.style.width = "160px";
  divFrameRightWait.setAttribute("id" ,"divFrameRightWait");
  divFrameRight.setAttribute("id" ,"divFrameRight");
  divPlayListShow.setAttribute("id" ,"divPlayListShow");
  divPlayList.setAttribute("id" ,"playList");
  divHeader.setAttribute("id" ,"divHeader");
  divRowCanvas.setAttribute("id" ,"divRowCanvas");
  rowCanvas.setAttribute("id" ,"rowCanvas");
  rowCanvas.style.cursor = "pointer";
  rowCanvas.addEventListener('click',(e)=>{
    toggleRowAnalyzer();
  });
  // video 
  divVdo.setAttribute("id" ,"divVdo");
  checkboxVdoScreen.setAttribute("id" ,"checkboxVdoScreen");
  checkboxVdoScreen.setAttribute("type" ,"checkbox");
  checkboxVdoScreen.setAttribute("unchecked" ,"");
  checkboxVdoScreen.className = "audioIcon";
  labelForVdoScreen.setAttribute("id" ,"labelForVdoScreen");
  labelForVdoScreen.setAttribute("for" ,"checkboxVdoScreen");
  labelForVdoScreen.innerText = "Show Video";
  labelForVdoScreen.className = "audioIcon";
  // play list display 
  checkboxShuffle.setAttribute("id" ,"checkboxShuffle");
  checkboxShuffle.setAttribute("type" ,"checkbox");
  checkboxShuffle.setAttribute("checked" ,"");
  checkboxShuffle.className = "audioIcon";
  labelForShuffle.setAttribute("id" ,"labelForShuffle");
  labelForShuffle.setAttribute("for" ,"checkboxShuffle");
  labelForShuffle.innerText = "Shuffle";
  labelForShuffle.className = "audioIcon";
  titleDisplay.setAttribute("id" ,"titleDisplay");
  icy_name.setAttribute("id" ,"icy_name");   // misuse radio header display to show playlist info
  request_icy_url.setAttribute("id" ,"request_icy_url");  // display track count
  request_suffix.setAttribute("id" ,"request_suffix");   // clean display from former radio header info
  request_icy_br.setAttribute("id" ,"request_icy_br");   // can display file info, if flask would read file header, length
  request_time.setAttribute("id" ,"request_time");     // like GhettoRecorder listenWhitelist

  // network stream descriptions
  customImg.setAttribute("id" ,"customImg");
  customTxt.setAttribute("id" ,"customTxt");

  // audio panel
  divPlayButtons.setAttribute("id" ,"divPlayButtons");

  playBtn.setAttribute("id" ,"playBtn");
  playBtn.className = "audioIcon";
  playBtn.innerHTML = "&nbsp; &#9654; &nbsp;";
  pauseBtn.setAttribute("id" ,"pauseBtn");
  pauseBtn.className = "audioIcon";
  pauseBtn.innerHTML = "&nbsp; &#9208; &nbsp;";
  audioIcon.setAttribute("id" ,"audioIcon");
  audioIcon.className = "audioIcon";
  audioIcon.innerHTML = "&#128266;";
  audioIcon.addEventListener('click',(e)=>{
    toggleAudioControls();
  });
  
  // audio volume gain
  audioControls.setAttribute("id" ,"audioControls");
  pElemX.className = "pElemX";
  spanX.className = "spanX";
  spanX.innerHTML = "&#10006;";
  spanX.addEventListener('click',(e)=>{
    toggleAudioControls();
  });
  audioSlider.setAttribute("id" ,"audioSlider");

  // about menu
  wrapAboutMenu.setAttribute("id" ,"wrapAboutMenu");
  pElemXabout.className = "pElemX";
  spanXabout.className = "spanX";
  spanXabout.innerHTML = "&#10006;";
  spanXabout.addEventListener('click',(e)=>{
    toggleAboutMenu();
  });
  divAboutDetail.setAttribute("id" ,"divAboutDetail");
  menuAbout.setAttribute("id" ,"menuAbout");
  menuAbout.style.zIndex = "1000";
  menuAbout.innerHTML = "About";
  menuAbout.className = "toggleIcon";
  menuAbout.addEventListener('click',(e)=>{
    toggleAboutMenu();
  });
  fillAboutMenu();
  // run menu
  wrapRunMenu.setAttribute("id" ,"wrapRunMenu");
  pElemXrun.className = "pElemX";
  spanXrun.className = "spanX";
  spanXrun.innerHTML = "&#10006;";
  spanXrun.addEventListener('click',(e)=>{
    toggleRunMenu();
  });
  divRunDetail.setAttribute("id" ,"divRunDetail");
  divRunDetail.innerHTML = "<p>Supported media file type depends on the Browser version.</p>"
    + "Multi-select Button<br>"
    ;
  menuRun.setAttribute("id" ,"menuRun");
  menuRun.style.zIndex = "1000";
  menuRun.innerHTML = "Run";
  menuRun.className = "toggleIcon";
  menuRun.style.width = "100px";
  menuRun.addEventListener('click',(e)=>{
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
  // option display title and web site url
  root.appendChild(divHeader); 
  divHeader.appendChild(icy_name); 
  divHeader.appendChild(document.createElement('br'));  
  divHeader.appendChild(request_icy_url);
  divHeader.appendChild(titleDisplay); 
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
  // network stream descriptions
  root.appendChild(customImg);
  root.appendChild(customTxt);
  // audio volume gain
  root.appendChild(audioControls);
  audioControls.appendChild(pElemX);
  pElemX.appendChild(spanX);
  audioControls.appendChild(audioSlider);
  audioSlider.appendChild(audioVolume);
  audioSlider.appendChild(audioGain);
}

/**
 * Write help and info messages with links to the repo.
 */
function fillAboutMenu() {
  pElemXabout.innerHTML = "";
  divAboutDetail.innerHTML = "<p>Apache 2.0 License René Horn</p>"
    + "<p>&#128266 has two slider elements. Volume and Gain.</p>"
    + "<p>Repository <a href=https://github.com/44xtc44/PlaylistBooster.git>https://github.com/44xtc44/PlaylistBooster.git</a></p>"
    + "<p>Some other projects.</p>"
    + "<p><a href='https://github.com/44xtc44/EisenRadio'><img id='aircraftLogo' src=/static/images/aircraft_logo.png></a></p>"
    + "<p>'aac-repair' (aacp) <a href=https://www.npmjs.com/package/aac-repair>https://www.npmjs.com/package/aac-repair</a></p>"
    + "<p>aac-repair can fix files recorded from streams. Those files can lead to playlist stuck.</p>"
    ;
}

/**
 * Reused at every instance creation of Playlist class.
 * Get event listener for title skipping.
 */
function createBtnNextPrev() {
  const nextBtn = document.createElement("span");
  const prevBtn = document.createElement("span");
  nextBtn.setAttribute("id" ,"nextBtn");
  nextBtn.className = "audioIcon";
  nextBtn.innerHTML = "&nbsp; &#9197; &nbsp;";
  prevBtn.setAttribute("id" ,"prevBtn");
  prevBtn.className = "audioIcon";
  prevBtn.innerHTML = "&nbsp; &#9198; &nbsp;";
  // insert before the audio icon
  let parent = document.getElementById("pauseBtn");
  parent.parentNode.insertBefore(nextBtn, parent.nextSibling);
  parent.parentNode.insertBefore(prevBtn, parent.nextSibling);
}