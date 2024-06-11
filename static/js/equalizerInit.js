// equalizerInit.js
"use strict";

/**
 * Create equalizer.
 */
function initEqualizer() {
  // https://www.levelsmusicproduction.com/blog/5-step-magic-eq-settings
  let firstPreset = 0;
  equalizerInitMaster(equalizerRanges[0].ranges, firstPreset); // create filter to draw slider label numbers first time
  
  equalizerPresetOptions();
  equalizerRangeOptions();
  equalizerLabelFrequency();
  equalizerSliderSetListener();
  equalizerSetListener();
  document.getElementById("equalizer__range").disabled = true;
  document.getElementById("equalizer__presets").disabled = true;
}


/**
 * Create the equalizer (filter collection) and DOM audio.
 * @param {Array} frequencies band range start nums
 * @param {Array} presetIdx gain values for every band range
 */
function equalizerInitMaster(frequencies, presetIdx) {

  filterNodes = { filters: [] };
  gainNode = null;  // GC?
  gainNode = audioContext.createGain(); 
  audioSource.connect(gainNode);
  
  for (let idx = 0; idx < filterTypesList.length; idx++) {
    let filter = audioContext.createBiquadFilter();
    filter.type = filterTypesList[idx].type;
    filter.frequency.value = frequencies[idx]; // frequency band start
    filter.gain.value = equalizerPresets[presetIdx].gains[idx];
    filter.Q.value = 1;
    filterNodes.filters.push(filter);
    gainNode.connect(filter);
    gainNode = filter;
  }
  gainNode.connect(audioContext.destination);
  equalizerLabelFrequency(); // re-assign slider labels
}
