// animation.js
"use strict";

window.frameCount = 0;

function animationMain() {
    // switch index to call next fun from list
    let idx = switchAnalyzer.analyzerListIdx;
    switchAnalyzer.analyzerList[idx]();
    
    /* requestAnimationFrame; only one in an app. */
    frameCount = requestAnimationFrame(animationMain);
  }