// equalizer.js
"use strict";

// https://www.dofactory.com/
// https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
// https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_byte_streams
// moz-extension://d1bdc74e-97f7-43a5-b41e-b6fc9ef625f9/ root of extension dir, find manifest.json
// moz-extension://6a6d297d-d519-49a8-a768-ef91d9d44594/content/popup.html s3

// s3radio.main_url = "https://radio.s3blog.org"; s3radio.main_url + '/stations/json/' + country + '.json'
// https://radio.s3blog.org/stations/json/de.json https://radio.s3blog.org/stations/json/ch.json
// https://github.com/mikepierce/internet-radio-streams
// https://web.dev/articles/webaudio-intro?hl=de howto fade in playlist
// https://blog.landr.com/eq-basics-everything-musicians-need-know-eq/
// https://medium.com/@likovalevl/video-streaming-with-javascript-the-easy-way-45ecd7ec3f08

/**
 * Auto set slider by reading list from constants.js.
 */
function equalizerUpdateSlider() {
  let eq_slidList = document.getElementsByClassName("eq_slid");
  for (let idx = 0; idx < eq_slidList.length; idx++) {
    let gainValue = filterNodes.filters[idx].gain.value;
    if (gainValue > 12) gainValue = 12;
    if (gainValue < -12) gainValue = -12;
    eq_slidList[idx].value = gainValue;
  }
}
/**
 * Each slider gets an event listener
 * to manipulate its frequency range gain.
 */
function equalizerSliderSetListener() {
  let eq_slidList = document.getElementsByClassName("eq_slid");
  for (let idx = 0; idx < eq_slidList.length; idx++) {
    eq_slidList[idx].addEventListener("input", () => {
      filterNodes.filters[idx].gain.value = eq_slidList[idx].value;
    });
  }
}
/**
 * Make slider accessable if EQ is ON.
 */
function equalizerUI() {
  let sliders = document.getElementsByClassName("eq_slid");
  for (let idx = 0; idx < sliders.length; idx++) {
    sliders[idx].disabled = true;
  }
}

/**
 * Write frequency range start num below each slider.
 */
function equalizerLabelFrequency() {
  let sliderTxtList = document.getElementsByClassName("eq_slid_txt");
  for (let idx = 0; idx < sliderTxtList.length; idx++) {
    let freqVal = filterNodes.filters[idx].frequency.value;
    if (freqVal.toString().length > 3)
      freqVal = (freqVal / 1000).toString().concat("K");
    sliderTxtList[idx].innerText = freqVal;
  }
}
/**
 * Set listener on all EQ elements, except slider.
 */
function equalizerSetListener() {
  document
    .getElementById("equalizer__label")
    .addEventListener("click", evtGainFilter); // text 'Equalizer'
  document
    .getElementById("imgLabelEqualizer")
    .addEventListener("click", evtGainFilter); // switch button
  document
    .getElementById("equalizer__range")
    .addEventListener("click", loadSelectedPreset); // select winamp, common
}

/**
 * Switch to equalizer or global volume gain slider,
 * if pwr btn is active.
 */
const evtGainFilter = () => {
  let sliders = document.getElementsByClassName("eq_slid");

  if (gainFilter.btn_onOff_is_active) {
    // switch off equalizer, enable 'global' gain over all frequencies
    gainFilter.is_global = true;
    gainFilter.gainRunGlobal(); // all frequ. volume
    // switch off equalizer UI
    gainFilter.btn_onOff_is_active = false;
    spanTxtGain.innerText = msgGainOn;
    spanTxtEq.innerText = msgEqualizerOff;
    showGainActive.toggle({
      img: imgTxtGain,
      imgON: "/static/images/playlistBooster-led-on.svg",
      imgOFF: "/static/images/playlistBooster-led-off.svg",
    });
    showEqActive.toggle({
      img: imgTxtEq,
      imgON: "/static/images/playlistBooster-led-on.svg",
      imgOFF: "/static/images/playlistBooster-led-off.svg",
    });

    imgEqualizer.src = "/static/images/playlistBooster-equalizer-thumb-off.svg";
    imgLabelEqualizer.src =
      "/static/images/playlistBooster-equalizer-btn-off.svg";
    document.getElementById("audioGainController").disabled = false;
    document.getElementById("equalizer__range").disabled = true;
    document.getElementById("equalizer__presets").disabled = true;
    document.getElementById("divEqualizerCover").style.display = "block";
    for (let idx = 0; idx < sliders.length; idx++) {
      sliders[idx].disabled = true;
    }
  } else {
    // switch on equalizer (show UI elements)
    gainFilter.is_global = false;
    gainFilter.btn_onOff_is_active = true;
    spanTxtGain.innerText = msgGainOff;
    spanTxtEq.innerText = msgEqualizerOn;
    showGainActive.toggle({
      img: imgTxtGain,
      imgON: "/static/images/playlistBooster-led-on.svg",
      imgOFF: "/static/images/playlistBooster-led-off.svg",
    });
    showEqActive.toggle({
      img: imgTxtEq,
      imgON: "/static/images/playlistBooster-led-on.svg",
      imgOFF: "/static/images/playlistBooster-led-off.svg",
    });

    /**
     * EQ panel is enabled or not.
     */
    loadSelectedPreset(); // activate default preset
    imgEqualizer.src = "/static/images/playlistBooster-equalizer-thumb-on.svg";
    imgLabelEqualizer.src =
      "/static/images/playlistBooster-equalizer-btn-on.svg";

    document.getElementById("audioGainController").disabled = true;
    document.getElementById("equalizer__range").disabled = false;
    document.getElementById("equalizer__presets").disabled = false;
    document.getElementById("divEqualizerCover").style.display = "none";
    for (let idx = 0; idx < sliders.length; idx++) {
      sliders[idx].disabled = false;
    }
  }
};

/**
 * Draw preset options selector and attach onChange listener.
 */
function equalizerPresetOptions() {
  let equalizer__presets = document.getElementById("equalizer__presets");
  equalizer__presets.onchange = loadSelectedPreset; // evt listener

  for (let idx = 0; idx < equalizerPresets.length; idx++) {
    if (equalizerPresets[idx].is_separator) {
      let option = document.createElement("option");
      option.text = "──────────";
      equalizer__presets.options.add(option);
      option.disabled = true;
    } else {
      let option = document.createElement("option");
      option.text = equalizerPresets[idx].id;
      option.value = option.text;
      equalizer__presets.options.add(option);
    }
  }
}
/**
 * Trigger HTML display of sliders and load preset into equalizer.
 */
function loadSelectedPreset() {
  let rangeOptActive = document.getElementById("equalizer__range");
  let frequencyProvider =
    rangeOptActive.options[rangeOptActive.selectedIndex].value;
  let frequencyIdx = rangeOptActive.selectedIndex;
  let presetOptActive = document.getElementById("equalizer__presets");
  let presetIdx = presetOptActive.selectedIndex;

  // console.log("loadSelectedPreset->",frequencyProvider,frequencyIdx,presetIdx);

  gainFilter.gainRunFrequency({
    frequencyProvider: frequencyProvider, // range section dropdown (winamp, ...)
    frequencyIdx: frequencyIdx, // range Provider index, list with frequency bands
    presetIdx: presetIdx, // preset select dropdown (jazz, pop )
  });
}

/**
 * Draw the frequency range names into the select element.
 */
function equalizerRangeOptions() {
  let equalizer__range = document.getElementById("equalizer__range");
  for (let idx = 0; idx < equalizerRanges.length; idx++) {
    let option = document.createElement("option");
    option.text = equalizerRanges[idx].id;
    option.value = option.text;
    equalizer__range.options.add(option);
  }
}
