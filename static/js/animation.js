// animation.js
"use strict";

var animationFrameCount = 0;

function animationMain() {
    let idx = switchAnalyzer.analyzerListIdx;
    switchAnalyzer.analyzerList[idx]();
    
    /* requestAnimationFrame; only one in an app. */
    animationFrameCount = requestAnimationFrame(animationMain);
  }