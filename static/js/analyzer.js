// analyzer.js
"use strict";

class SwitchAnalyzer {
    /* Init in index.js
      Browser must call switchAnalyzer.update() to increment index
    */
    constructor() {
      this.stageAnalyzerShow = true;
      this.analyzerListIdx = 0;
      this.analyzerList = [
        () => stageAnimatedBars({ canvasId: "rowCanvas", clearRect: true }),
        () => stageDrawAnalyzer({ canvasId: "rowCanvas" })
      ];
    }
    update() {
      // index
      this.analyzerListIdx += 1;
      if (this.analyzerListIdx > this.analyzerList.length - 1) { this.analyzerListIdx = 0; }
    }
  }
  const switchAnalyzer = new SwitchAnalyzer();

  function stageDrawAnalyzer(opt) {
    // simple lines dancing
    analyserNodeTwo.fftSize = 2048;  // node two
    const bufferLength = analyserNodeTwo.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserNodeTwo.getByteTimeDomainData(dataArray);  // current data
  
    let canvas = document.getElementById(opt.canvasId);
    let ctx = canvas.getContext('2d');
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    ctx.lineWidth = 2.0;
    let darkBody = getBodyColor();
    if (darkBody) {
      ctx.fillStyle = 'rgba(15,71,87,.0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgb(219, 111, 52)';
    } else {
      ctx.fillStyle = 'rgba(0, 191, 255, .0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'red';
    }
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
  
  function stageAnimatedBars(opt) {
    // Old fashioned, retro stapled bars colorized on top.
    let canvas = document.getElementById(opt.canvasId);
    let ctx = canvas.getContext('2d');
  
    analyserNodeTwo.fftSize = 128;  // node two
    const bufferLength = analyserNodeTwo.frequencyBinCount;
    var barWidth = (canvas.width / bufferLength) * 2;
    const dataArray = new Uint8Array(bufferLength);
    analyserNodeTwo.getByteFrequencyData(dataArray);
  
    if (opt.clearRect) ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    let x = 0 - barWidth * 2;   // kill the guys scratching the ceiling anyhow
    for (let i = 0; i < bufferLength; i++) {
      let barHeight = ((dataArray[i] / 2) - 12) + 2;
      ctx.lineWidth = 3;
      let darkBody = getBodyColor();
      // draw layer over layer
      ctx.fillStyle = 'red';
      ctx.fillRect(x, canvas.height - barHeight - 3, barWidth, 3);
      ctx.fillStyle = 'rgb(219, 111, 52)';
      ctx.fillRect(x, canvas.height - barHeight - 6, barWidth, 3);
      ctx.fillStyle = 'blue';
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
  
      x += barWidth;
    }
  }
  
  function toggleRowAnalyzer() {
    switchAnalyzer.update();
  }