// playlist.js
"use strict";

/**
 * Plays local sound files.
 * Can move through the playlist, back and forth.
 */
const cl = console.log;
var refreshIntervalId;  // setinterval killer

class PlayList {

  constructor() {
    this.divLogo = document.getElementById('divLogo');  // addon extra
    this.detachCustomImg = document.getElementById('customImg');
    this.detachCustomTxt = document.getElementById('customTxt');
    this.detachWait = document.getElementById('divFrameRightWait');
    this.divFrameRight = document.getElementById('divFrameRight');
    this.divPlayListShow = document.getElementById('divPlayListShow');
    this.divPlayList = document.getElementById('playList');
    this.checkboxShuffle = document.getElementById("checkboxShuffle");
    this.checkboxVdoScreen = document.getElementById("checkboxVdoScreen");
    this.titleDisplay = document.getElementById('titleDisplay');
    this.icyName = document.getElementById('icy_name');                 // misuse radio header display to show playlist info
    this.request_icy_url = document.getElementById('request_icy_url');  // display track count
    this.request_suffix = document.getElementById('request_suffix');    // clean display from former radio header info
    this.request_icy_br = document.getElementById('request_icy_br');    // can display file info, if flask would read file header, length
    this.request_time = document.getElementById('request_time');        // like GhettoRecorder listenWhitelist

    this.nextBtn = undefined;  // Removed at every instance creation.
    this.prevBtn = undefined;
    this.playBtn = document.getElementById("playBtn");
    this.pauseBtn = document.getElementById("pauseBtn");
    this.audioIcon = document.getElementById("audioIcon");

    this.playListMember = [];  // Get the file objects here, not only the title.
    this.trackNumber = 0;
    this.trackCount = 0;
    this.fadeIn = [{ opacity: 0 }, { opacity: 1 }]; // css styling show, key frame thingy args
    this.faderPulseTiming = { duration: 1500, iterations: 5, };
  }
  reset() {
    this.playListMember = [];
    this.trackNumber = 0;
    this.trackCount = 0;
    video.src = "";
    // Get rid of evt listener. Remove by fun is a mess. Holds ref to prev. playListMember array.
    try {
      nextBtn.remove();
      prevBtn.remove();
    } catch (error) {// first run
    }
    createBtnNextPrev();
    this.nextBtn = document.getElementById("nextBtn");
    this.prevBtn = document.getElementById("prevBtn");
    clearInterval(refreshIntervalId);
  }
  create() {
    // Entry point.
    this.reset();
    this.createHtmlDisplay();
    this.attachAnimation();
    this.shufflePlayList();
    this.suppressVideoDisplay();
    this.playLocalMedia();
    this.drawButtons();
    this.addListenerButtons();  // Btn prev, next are recreated at each instance call.
    this.trackCount = this.playListMember.length;
    refreshIntervalId = setInterval(() => { this.mediaTimeShow() }, 1000);
  }
  playLocalMedia() {
    let self = this;  // bind() thingy
    let showText = "👉️ " + self.playListMember[self.trackNumber].name;
    // created a txt createHtmlDisplay(); display parent is "divPlayListShow" div;
    // each <track name> is shown on its own child div, this div has the div.id attribute set as <track name> to be unique
    let curTitleName = document.getElementById(self.playListMember[self.trackNumber].name);
    curTitleName.innerText = showText;
    curTitleName.style.background = "linear-gradient(to left, #f46b45, #eea849)";
    curTitleName.style.color = "black";
    curTitleName.style.fontSize = "100%";
    curTitleName.style.fontWeight = "600";

    video.src = URL.createObjectURL(self.playListMember[self.trackNumber]);
    video.onended = () => {
      // get rid of the hand
      curTitleName.innerText = self.playListMember[self.trackNumber].name
      //change color of played filename
      self.markPlayedFile(self.playListMember[self.trackNumber].name);
      self.trackNumber++;
      if (self.trackNumber < self.playListMember.length) {
        self.playLocalMedia();  // fun recursion
      } else {
        return;
      }
    }
    video.onerror = (error) => {
      console.log("playLocalMedia error->", error);
    }
  }
  mediaTimeShow() {
    let self = this;
    try {
      let duration = video.duration;
      let currentTime = video.currentTime;
      let seconds = Math.floor(duration - currentTime)
      let hours = Math.floor(duration / 3600);
      let minutes = Math.floor(seconds / 60);
      let extraSeconds = seconds % 60;
      let msg = self.trackCount + " tracks. " + hours + ":" + minutes + ":" + extraSeconds + " ";
      self.divLogo.innerText = msg;
    } catch (error) {
      self.divLogo.innerText = self.trackCount + " tracks. ";
    }
  }
  removeElementFromParent(elementId) {
    /* Catch error if div is in state of being deleted, means div with desired name exists yet.
       We use a dot in front in next, prev btn listener to be unique.
    */
    try {
      elementId.parentNode.removeChild(elementId);
    } catch (error) { }
  }
  markPlayedFile(fName) {
    /* Mark played files and del div from list to generate some action. */
    let self = this;
    let playedFile = document.getElementById(fName);
    try {
      playedFile.style.color = "red";
    } catch (error) { return; }
    playedFile.animate(this.fadeIn, this.faderPulseTiming);
    setTimeout(function () {
      self.removeElementFromParent(playedFile);
    }, 10000);
  }
  shufflePlayList() {
    /* Clone the upload list. Can not re-arrange the original. */
    // shuffle
    if (this.checkboxShuffle.checked) {
      this.playListMember = this.shuffleArray([...fileUpload.files]);
      return;
    }
    // regular
    for (let i = 0; i < [...fileUpload.files].length; i++) {
      this.playListMember.push([...fileUpload.files][i]);
    }
  }
  shuffleArray(array) {
    if (array.length <= 2) return array;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  suppressVideoDisplay() {
    if (this.checkboxVdoScreen.checked) {
      video.style.display = "block";
    } else {
      video.style.display = "none";
    }
  }
  createHtmlDisplay() {
    /* Collect all the file references from upload mask and create a list of the file names.
       Each file name gets its own div, so we can later reduce, remove the played list members.
    */
    activeRadioName = "Playlist";  // One analyzer can show a name.
    let parent = this.divPlayListShow;
    let id = "";
    let innerText = "";
    let elemClass = "divChildOfPlayListShow";

    this.removeDiv({ id: parent });  // old HTML display
    for (let i = 0; i < fileUpload.files.length; ++i) {
      innerText = id = fileUpload.files[i]["name"];  // DOM needs unique id
      this.appendDiv({ parent: parent, id: id, elemClass: elemClass, innerText: innerText });
    }
  }
  appendDiv(opt) {
    /* Reusable fun to stack div and use the stack as a list.  */
    let div = document.createElement('div');
    div.id = opt.id;  // id of new child
    div.classList.add(opt.elemClass);
    div.innerText = opt.innerText;
    div.style.background = "#FED8B1";
    div.style.fontWeight = "500";
    div.style.padding = "2px";
    opt.parent.appendChild(div);  // parent is full path document.getElem...
  }
  removeDiv(opt) {
    while (opt.id.firstChild) {
      opt.id.removeChild(opt.id.lastChild);
    }
  }
  attachAnimation() {
    let parent = this.divFrameRight;
    let node = this.divPlayList;
    // put our custom divs where we find them later
    this.removeDiv({ id: parent });
    this.detachWait.appendChild(this.detachCustomImg);  // custom div do it with the playlist
    this.detachWait.appendChild(this.detachCustomTxt);
    // put the playlist in the right container
    parent.appendChild(node);  // detach the node from origin and add to a div destination container in DOM
    this.detachWait.style.display = "none";
    this.detachCustomImg.style.display = "none";
    this.detachCustomTxt.style.display = "none";
  }
  drawButtons() {
    // not needed for network streams
    this.nextBtn.style.display = "inline-block";
    this.prevBtn.style.display = "inline-block";
  }
  addListenerButtons() {
    /* Moving through playlist. 
    * Listener for 'prev', 'next' button must be created full fun, not arrow, to remove them.
    */
    let self = this;
    let parent = self.divPlayListShow;
    let id;
    let innerText;
    self.playBtn.addEventListener("click", (e) => {
      video.play();
    });
    self.pauseBtn.addEventListener("click", (e) => {
      video.pause();
    });

    this.evtNextBtn = (e) => {
      /*
        The list is rebuild on every click.
      */
      if (self.trackNumber >= (self.playListMember.length - 1)) {
        return;
      } else {
        // clean up div element
        this.removeDiv({ id: parent });
        // redraw the list with remaining titles, first header then titles in loop
        for (let i = self.trackNumber; i < self.playListMember.length; ++i) {
          id = self.playListMember[i].name;
          innerText = self.playListMember[i].name;
          self.appendDiv({ parent: parent, id: id, innerText: innerText });
        }
        self.trackNumber++;
        self.playLocalMedia();
      }
    };

    this.evtPrevBtn = (e) => {
      if (self.trackNumber === 0) { return; }
      if ((self.trackNumber <= self.playListMember.length) && (self.trackNumber > 0)) {
        // clean up div element
        this.removeDiv({ id: parent });
        // redraw the list with remaining titles
        // go back one index num from current and draw original partial list from there
        for (let i = (self.trackNumber - 1); i < self.playListMember.length; ++i) {
          id = self.playListMember[i].name;
          innerText = self.playListMember[i].name;
          self.appendDiv({ parent: parent, id: id, innerText: innerText });
        }
        self.trackNumber--;
        self.playLocalMedia();
      }
    };

    self.nextBtn.addEventListener("click", this.evtNextBtn);
    self.prevBtn.addEventListener("click", this.evtPrevBtn);
  }
}
