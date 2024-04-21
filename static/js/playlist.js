// playlist.js
"use strict";

var refreshIntervalId;  // setinterval killer
/**
 * Plays local media files.
 * Can move through the playlist, back and forth.
 */
class PlayList {

  constructor() {
    this.divPlayList = document.getElementById('divPlayList');
    this.divMediaTime = document.getElementById('divMediaTime');
    this.checkboxShuffle = document.getElementById("checkboxShuffle");
    this.checkboxVdoScreen = document.getElementById("checkboxVdoScreen");
    this.checkboxPlaybackRateOne = document.getElementById("plbr_1_0");

    this.nextBtn = undefined;  // Removed at every instance creation.
    this.prevBtn = undefined;
    this.playBtn = document.getElementById("imgPlayBtn");
    this.pauseBtn = document.getElementById("imgStopBtn");
    this.audioIcon = document.getElementById("audioIcon");

    this.timeLeftShow = false;  // show current time or remaining time
    this.load = undefined;
    this.loadedFileName = undefined;

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
    divMain.style.display = "none";  // help, info
    rowCanvas.style.display = "block";  // analyzer
    try {
      nextBtn.remove();  // Get rid of evt listener on btn. 
      prevBtn.remove();
    } catch (error) {/* first call */}
    createBtnNextPrev();
    this.nextBtn = document.getElementById("nextBtn");
    this.prevBtn = document.getElementById("prevBtn");
    showDivRunMenu.toggle()
    clearInterval(refreshIntervalId);
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
    refreshIntervalId = setInterval(() => { this.mediaTimeShow() }, 1000);
  }
  playLocalMedia() {
    timeRuler.value = 0;
    this.checkboxPlaybackRateOne.checked = true; 
    this.prettifyDisplayRow();
    pdfDisp.data = "";  // spanish course has a pdf document

    this.load = this.playListMember[this.trackNumber];
    this.loadedFileName = this.load.name.toLowerCase();
    video.src = URL.createObjectURL(this.load);
    video.onended = () => {
      //change color of played filename before removal
      this.markPlayedFile(this.playListMember[this.trackNumber].name);
      this.trackNumber++;
      if (this.trackNumber < this.playListMember.length) {
        this.playLocalMedia();  // fun recursion
      } else {
        return;
      }
    }
    video.onerror = (error) => {
      // should we load next media or try display this one?
      let fileExt = "";
      fileExt = this.loadedFileName.split('.').pop();
      if(fileExt === "pdf") {
        if(navigator.pdfViewerEnabled) {
          pdfDisp.data = URL.createObjectURL(this.load);
        }
      }else {
        console.log("playLocalMedia error->", error);
      }
    }
  }
  prettifyDisplayRow() {
    let showText = this.playListMember[this.trackNumber].name;
    // each <track name> is shown on its own child div, this div has the div.id attribute set as <track name> to be unique
    let curTitleName = document.getElementById(this.playListMember[this.trackNumber].name);
    curTitleName.innerText = showText;
    curTitleName.style.background = "#fc4a1a"  // hex!
    curTitleName.style.color = "#dfdce3";
    curTitleName.style.padding = "4px";
    curTitleName.style.fontSize = "130%";
    curTitleName.style.fontWeight = "600";
    curTitleName.style.fontStyle = "oblique";
    curTitleName.style.textShadow = "1px 1px 2px tomato";
  }
  mediaTimeShow() {
    let mediaCount = this.trackCount + " files | "
    if(! video.duration) {
      this.divMediaTime.innerText = mediaCount;
      return;
    }
    let seconds = Math.floor(video.duration - video.currentTime)
    let hours = Math.floor(video.duration / 3600);
    let minutes = Math.floor(seconds / 60);
    let extraSeconds = seconds % 60;
    try {
      if(isNaN(hours) || isNaN(minutes) || isNaN(extraSeconds)) throw new Error("Video element can not read time.");
    } catch (error) {
      this.divMediaTime.innerText = mediaCount;
      return;
    }
    if(hours.toString().length < 2) hours = "0".concat(hours);
    if(minutes.toString().length < 2) minutes = "0".concat(minutes);
    if(extraSeconds.toString().length < 2) extraSeconds = "0".concat(extraSeconds);
    this.divMediaTime.innerText = mediaCount + hours + ":" + minutes + ":" + extraSeconds;
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
      .then((finished) => { if (finished || ! finished) playedFile.remove() })
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
   * 'this' is not available to the inner fun (no instace property fields access).
   * If listener points to a function in a var,
   * listener can not be removed with x.removeEventlistener()
   * Remove the DOM elements 'nextBtn' and 'prevBtn' to get rid of the listener.
   */
  addListenerButtons() {
    let parent = this.divPlayList;
    let id = "";
    let innerText = "";
    this.playBtn.addEventListener("click", () => {
      video.play();
    });
    this.pauseBtn.addEventListener("click", () => {
      video.pause();
    });
    this.nextBtn.addEventListener("click", () => {
      /*
        The list rebuilds on every click.
      */
        if (this.trackNumber >= (this.playListMember.length - 1)) {
          return;
        } else {
          this.removeDiv({ id: parent });
          // redraw the list with remaining titles, first header then titles in loop
          for (let i = this.trackNumber; i < this.playListMember.length; ++i) {
            id = this.playListMember[i].name;
            innerText = this.playListMember[i].name;
            this.appendDiv({ parent: parent, id: id, innerText: innerText });
          }
          this.trackNumber++;
          this.playLocalMedia();
        }
    });
    this.prevBtn.addEventListener("click", () => {
      if (this.trackNumber === 0) { return; }
      if ((this.trackNumber <= this.playListMember.length) && (this.trackNumber > 0)) {
        this.removeDiv({ id: parent });
        // go back one index num from current and draw original partial list from there
        for (let i = (this.trackNumber - 1); i < this.playListMember.length; ++i) {
          id = this.playListMember[i].name;
          innerText = this.playListMember[i].name;
          this.appendDiv({ parent: parent, id: id, innerText: innerText });
        }
        this.trackNumber--;
        this.playLocalMedia();
      }
    }); 
  }
}
