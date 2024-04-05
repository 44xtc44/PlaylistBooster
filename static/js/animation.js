// animation.js
"use strict";

var frameCount = 0;  // use with modulo to skip animation frames to decrease load

function animationMain() {
    // switch index to call next fun from list
    let idx = switchAnalyzer.analyzerListIdx;
    switchAnalyzer.analyzerList[idx]();
    
    /* requestAnimationFrame; only one in an app. */
    frameCount = requestAnimationFrame(animationMain);
  }