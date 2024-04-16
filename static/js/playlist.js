// playlist.js
"use strict";

/**
 * Plays local media files.
 * Can move through the playlist, back and forth.
 */
class PlayList {

  constructor() {
    this.divPlayList = document.getElementById('divPlayList');
    this.checkboxShuffle = document.getElementById("checkboxShuffle");
    this.checkboxVdoScreen = document.getElementById("checkboxVdoScreen");
    this.checkboxPlaybackRateOne = document.getElementById("plbr_1_0");

    this.nextBtn = undefined;  // Removed at every instance creation.
    this.prevBtn = undefined;
    this.playBtn = document.getElementById("imgPlayBtn");
    this.pauseBtn = document.getElementById("imgStopBtn");
    this.audioIcon = document.getElementById("audioIcon");

    this.timeLeftShow = false;  // show current time or remaining time

    this.playListMember = [];  // Get the file objects here.
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
    this.divPlayList.style.display = "block";
    divMain.style.display = "none";  // help info
    rowCanvas.style.display = "block";  // analyzer
    try {
      nextBtn.remove();  // Get rid of evt listener on btn. 
      prevBtn.remove();
    } catch (error) {/* first call */ }
    createBtnNextPrev();
    this.nextBtn = document.getElementById("nextBtn");
    this.prevBtn = document.getElementById("prevBtn");
    showDivRunMenu.toggle()
  }
  create() {
    // Entry point.
    this.resetEnv();
    this.shufflePlayList();
    this.createHtmlDisplay();
    this.suppressVideoDisplay();
    this.playLocalMedia();
    this.drawButtons();
    this.addListenerButtons();  // Btn prev, next are recreated at each instance call.
    this.trackCount = this.playListMember.length;
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
    curTitleName.style.background = "#fc4a1a"  // hex!
    curTitleName.style.color = "lightyellow";
    curTitleName.style.padding = "4px";
    curTitleName.style.fontSize = "130%";
    curTitleName.style.fontWeight = "600";
    curTitleName.style.fontStyle = "oblique";
    curTitleName.style.textShadow = "1px 1px 2px tomato";
  }
  removeElementFromParent(elementId) {
    try {
      elementId.parentNode.removeChild(elementId);
    } catch (error) { }
  }
  markPlayedFile(fName) {
    /* Mark played files and del div from list to generate some action. */
    let playedFile = document.getElementById(fName);
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
    let parent = this.divPlayList;
    let id = "";
    let innerText = "";

    this.removeDiv({ id: parent });  // old HTML display

    if (this.checkboxShuffle.checked) {
      for (let i = this.trackNumber; i < this.playListMember.length; ++i) {
        id = this.playListMember[i].name;
        innerText = this.playListMember[i].name;
        this.appendDiv({ parent: parent, id: id, innerText: innerText });
      }
      return;
    }
    // regular
    for (let i = 0; i < fileUpload.files.length; ++i) {
      innerText = id = fileUpload.files[i]["name"];  // DOM needs unique id
      this.appendDiv({ parent: parent, id: id, innerText: innerText });
    }
  }
  appendDiv(opt) {
    /* Stack div and use it as a list. */
    let div = document.createElement('div');
    div.id = opt.id;  // id of new child
    div.classList.add(opt.elemClass);
    div.innerText = opt.innerText;
    div.style.background = "#4abdac";
    div.style.color = "#000";
    div.style.padding = "4px";
    div.style.fontSize = "110%";
    div.style.fontWeight = "500";
    div.style.fontStyle = "normal";
    div.style.fontFamily = "Roboto, Helvetica, Arial, sans-serif";
    div.style.boxShadow = "6px 6px 12px rgba(0,0,0,0.5)";
    opt.parent.appendChild(div);  // parent is full path document.getElem...
  }
  removeDiv(opt) {
    while (opt.id.firstChild) {
      opt.id.removeChild(opt.id.lastChild);
    }
  }
  drawButtons() {
    // not needed for network streams
    if(this.nextBtn !== undefined && this.prevBtn !== undefined) {
      this.nextBtn.style.display = "inline-block";
      this.prevBtn.style.display = "inline-block";
    }
  }
  /**
   * Problem to remove evt listener.
   * If listener is pointing to a class method, 
   * 'this' is not available (no instace property fields access).
   * If listener points to a function in a var,
   * listener can not be removed with x.removeEventlistener()
   * Remove the DOM elements to get rid of the listener.
   */
  addListenerButtons() {
    let self = this;
    let parent = self.divPlayList;
    let id = "";
    let innerText = "";
    self.playBtn.addEventListener("click", () => {
      video.play();
    });
    self.pauseBtn.addEventListener("click", () => {
      video.pause();
    });
    self.nextBtn.addEventListener("click", () => {
      /*
        The list rebuilds on every click.
      */
        if (self.trackNumber >= (self.playListMember.length - 1)) {
          return;
        } else {
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
    });
    self.prevBtn.addEventListener("click", () => {
      if (self.trackNumber === 0) { return; }
      if ((self.trackNumber <= self.playListMember.length) && (self.trackNumber > 0)) {
        this.removeDiv({ id: parent });
        // go back one index num from current and draw original partial list from there
        for (let i = (self.trackNumber - 1); i < self.playListMember.length; ++i) {
          id = self.playListMember[i].name;
          innerText = self.playListMember[i].name;
          self.appendDiv({ parent: parent, id: id, innerText: innerText });
        }
        self.trackNumber--;
        self.playLocalMedia();
      }
    }); 
  }
}
