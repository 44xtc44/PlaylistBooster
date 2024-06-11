// gainFilter.js
"use strict";

/**
 * Switch between "global" gain on volume and
 * equalizer gain (filter) for given frequency ranges.
 */
class GainFilter {
  constructor() {
    this.is_global = true; // gainNode same over all frequencies
    this.btn_onOff_is_active = false; // equalizer has activated ui or not
  }
  /**
   * Method for Gain, even over all frequencies.
   */
  gainRunGlobal() {
    gainNode.disconnect(0);
    gainNode = null; // GC?
    gainNode = audioContext.createGain();
    audioSource.connect(gainNode);
    gainNode.connect(audioContext.destination);
    setIdbValue({
      objectStore: "equalizer",
      updFields: { power: false },
    });
  }

  /**
   * Method for Equalizer, selective gain.
   * @param {{*}} opt dictionary of select dropdown index options
   * 
   */
  gainRunFrequency( opt = {} ) {
    gainNode.disconnect(0); // -- KEEP in 'gainRunFrequency' -- needs disconnect before re-creation
    equalizerInitMaster(
      equalizerRanges[opt.frequencyIdx].ranges,
      opt.presetIdx
    );
    equalizerUpdateSlider();
    setIdbValue({
      objectStore: "equalizer",
      updFields: { power: true, band: opt.frequencyIdx, preset: opt.presetIdx },
    });
  }
}
const gainFilter = new GainFilter();
