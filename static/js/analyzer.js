// analyzer.js
"use strict";

/**
 * Simple lines dB dancing animation.
 * @param {{*}} opt dictionary 
 * @example 
 * drawAnalyzer({ canvasId: "rowCanvas" })
 */
function drawAnalyzer(opt = {}) {
  analyserNodeTwo.fftSize = 2048;  // node two
  const bufferLength = analyserNodeTwo.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyserNodeTwo.getByteTimeDomainData(dataArray);  // current data

  let canvas = document.getElementById(opt.canvasId);
  let ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = 4.0;
  ctx.fillStyle = '#0f4757';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#f7b733';
  ctx.beginPath();
  var sliceWidth = canvas.width * 1.0 / bufferLength;
  var x = 0;

  for (var i = 0; i < bufferLength; i++) {
    var v = dataArray[i] / 128.0;
    var y = v * canvas.height / 2;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    x += sliceWidth;
  }
  ctx.stroke();
}