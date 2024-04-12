// animation.js
"use strict";

var animationFrameCount = 0;

/**
 * All animations will get called here.
 * Runs on Browser refresh rate.
 */
function animationMain() {

  let idx = switchAnalyzer.analyzerListIdx;
  switchAnalyzer.analyzerList[idx]();

  /* requestAnimationFrame; only one in an app. */
  animationFrameCount = requestAnimationFrame(animationMain);
}