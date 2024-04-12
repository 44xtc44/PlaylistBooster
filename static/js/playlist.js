// playlist.js
"use strict";

/**
 * Plays local sound files.
 * Can move through the playlist, back and forth.
 */
var refreshIntervalId;  // setinterval killer

class PlayList {

  constructor() {
    this.divLogo = document.getElementById('divLogo');  // addon extra
    this.detachWait = document.getElementById('divFrameRightWait');
    this.divFrameRight = document.getElementById('divFrameRight');
    this.divPlayListShow = document.getElementById('divPlayListShow');
    this.divPlayList = document.getElementById('playList');
    this.checkboxShuffle = document.getElementById("checkboxShuffle");
    this.checkboxVdoScreen = document.getElementById("checkboxVdoScreen");
    this.checkboxPlaybackRateOne = document.getElementById("plbr_1_0");

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
  resetEnv() {
    // instance
    this.playListMember = [];  // Get the file objects here, not only the title.
    this.trackNumber = 0;
    this.trackCount = 0;
    // DOM
    video.src = "";
    // this.checkboxPlaybackRateOne.click();
    divMain.style.display = "none";  // help info
    rowCanvas.style.display = "block";  // analyzer
    rowCanvasRear.style.display = "none";  // logo
    try {
      nextBtn.remove();  // Get rid of evt listener on btn. 
      prevBtn.remove();
    } catch (error) {/* first call */ }
    createBtnNextPrev();
    this.nextBtn = document.getElementById("nextBtn");
    this.prevBtn = document.getElementById("prevBtn");
    // setIntervall killer
    clearInterval(refreshIntervalId);
  }
  create() {
    // Entry point.
    this.resetEnv();
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
    let self = this;
    timeRuler.value = 0;
    self.checkboxPlaybackRateOne.checked = true; 
    this.prettifyDisplayRow();

    video.src = URL.createObjectURL(self.playListMember[self.trackNumber]);
    video.onended = () => {
      //change color of played filename before removal
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
  prettifyDisplayRow() {
    let self = this;  // bind() thingy
    let showText = self.playListMember[self.trackNumber].name;
    // each <track name> is shown on its own child div, this div has the div.id attribute set as <track name> to be unique
    let curTitleName = document.getElementById(self.playListMember[self.trackNumber].name);
    curTitleName.innerText = showText;
    curTitleName.style.background = "linear-gradient(to left, #f46b45, #eea849)";  // hex!
    curTitleName.style.color = "lightyellow";
    curTitleName.style.padding = "4px";
    curTitleName.style.fontSize = "130%";
    curTitleName.style.fontWeight = "600";
    curTitleName.style.fontStyle = "oblique";
    curTitleName.style.textShadow = "1px 1px 2px tomato";
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
      if(isNaN(hours) || isNaN(minutes) || isNaN(extraSeconds)) throw new Error("Video element can not read time.");
      let msg = self.trackCount + " tracks :: " + hours + ":" + minutes + ":" + extraSeconds + " ";
      self.divLogo.innerText = msg;
    } catch (error) {
      self.divLogo.innerText = self.trackCount + " tracks";
    }
  }
  removeElementFromParent(elementId) {
    try {
      elementId.parentNode.removeChild(elementId);
    } catch (error) { }
  }
  markPlayedFile(fName) {
    /* Mark played files and del div from list to generate some action. */
    let playedFile = document.getElementById(fName);
    try {
      playedFile.style.color = "red";
    } catch (error) { return; }

    let playedRemove = () => {
      /* 
      * MDN hint: 
      * "Remember that element.animate() does < not > return a Promise.
      * It returns an Animation object with a finished property that is a Promise."
      */
      let aObj = playedFile.animate(this.fadeIn, this.faderPulseTiming);
      return aObj.finished;
    };
    playedRemove()
      .then((finished) => { if (finished) playedFile.remove() })
      .catch((error) => {
        console.error(error);
        playedFile.remove();
      });
  }
  shufflePlayList() {
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
    // there is an additional event listener on the checkbox
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
    /* Stack div and use it as a list. */
    let div = document.createElement('div');
    div.id = opt.id;  // id of new child
    div.classList.add(opt.elemClass);
    div.innerText = opt.innerText;
    div.style.background = "#FED8B1";
    div.style.color = "black";
    div.style.padding = "4px";
    div.style.fontSize = "90%";
    div.style.fontWeight = "500";
    div.style.fontStyle = "normal";
    div.style.textShadow = "0px 0px 0px black";
    div.style.fontFamily = "Roboto, Helvetica, Arial, sans-serif";
    div.style.boxShadow = "6px 6px 12px rgba(0,0,0,0.5)";

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
    // put the playlist in the right container
    parent.appendChild(node);  // detach the node from origin and add to a div destination container in DOM
    this.detachWait.style.display = "none";
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
    self.playBtn.addEventListener("click", () => {
      video.play();
    });
    self.pauseBtn.addEventListener("click", () => {
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

    self.nextBtn.addEventListener("click", this.evtNextBtn, false);
    self.prevBtn.addEventListener("click", this.evtPrevBtn, false);
  }
}
