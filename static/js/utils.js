// utils.js
"use strict";

window.audioControlShow = 1;
window.aboutMenuShow = 1;
window.runMenuShow = 1;

/**
* Show or hide volume and gain slider.
*/
function toggleAudioControls() {
  let console = document.getElementById("audioControls");
  let isShown = "";

  if (audioControlShow === 1) {
    isShown = "inline-block";
    audioControlShow = 0;  // global
  } else {
    isShown = "none";
    audioControlShow = 1;
  }
  setTimeout(function () {
    console.style.display = isShown;
  }, 50);
}

/**
* Show or hide About menu.
*/
function toggleAboutMenu() {
  let console = document.getElementById("wrapAboutMenu");
  let isShown = "";

  if (aboutMenuShow === 1) {
    isShown = "inline-block";
    aboutMenuShow = 0;  // global
  } else {
    isShown = "none";
    aboutMenuShow = 1;
  }
  setTimeout(function () {
    console.style.display = isShown;
  }, 50);
}

/**
* Show or hide Run menu.
*/
function toggleRunMenu() {
  let console = document.getElementById("wrapRunMenu");
  let isShown = "";

  if (runMenuShow === 1) {
    isShown = "inline-block";
    runMenuShow = 0;  // global
  } else {
    isShown = "none";
    runMenuShow = 1;
  }
  setTimeout(function () {
    console.style.display = isShown;
  }, 50);
}

function getBodyColor() {
  let bodyStyle = window.getComputedStyle(document.body, null);
  let backgroundColor = bodyStyle.backgroundColor;
  let darkBody;
  if (backgroundColor === 'rgb(26, 26, 26)') {
    darkBody = true;
  } else { darkBody = false; }
  return darkBody;
}

/**
* Random integer.
* @param {int} min - minimum
* @param {int} max - maximum
* @return random int between and inclusive min and max integer
*/
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}