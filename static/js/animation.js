// animation.js
"use strict";

var animationFrameCount = 0;

/**
 * Any animation called here.
 * Runs on Browser refresh rate.
 */
function animationMain() {
  drawAnalyzer({ canvasId: "rowCanvas" });
  /* requestAnimationFrame; only one in an app. */
  animationFrameCount = requestAnimationFrame(animationMain);
}