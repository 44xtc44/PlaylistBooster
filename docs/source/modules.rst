JS docs
========


analyzer.js
-----------------------
.. js:autofunction:: drawAnalyzer

animation.js
-----------------------
.. js:autofunction:: animationMain

constants.js
-----------------------
.. js:autofunction:: constantsDocu

   * allowedFileContent
   * equalizerPresets
   * equalizerRanges
   * filterTypesList for EQ

equalizer.js
-----------------------
.. js:autofunction:: equalizerUpdateSlider
.. js:autofunction:: equalizerSliderSetListener
.. js:autofunction:: equalizerUI
.. js:autofunction:: equalizerLabelFrequency
.. js:autofunction:: equalizerSetListener
.. js:autofunction:: evtGainFilter
.. js:autofunction:: equalizerPresetOptions
.. js:autofunction:: loadSelectedPreset
.. js:autofunction:: equalizerRangeOptions

equalizerInit.js
-----------------------
.. js:autofunction:: initEqualizer

 * Need to separate gain slider and eqalizer, on/off somehow.
 * Equalizer owns the BiquadFilter(s) structure.
 * Equalizer is a collection with one output and input. 
 * One different gain value applied to each frequency band.

.. js:autofunction:: equalizerInitMaster

gainFilter.js
-----------------------
.. js:autoclass:: GainFilter
.. js:autoclass:: GainFilter#gainRunGlobal
.. js:autoclass:: GainFilter#gainRunFrequency

   * frequencyProvider: range section dropdown (winamp, ...)
   * frequencyIdx: range Provider index num to grab the list with frequency bands
   * presetIdx: selected preset (jazz, pop)

index.js
-----------------------
.. js:autofunction:: docuPlaceholder

   * create audio and video DOM elements
   * set event listener on media elements

indexDbCreate.js
-----------------------
.. js:autofunction:: initIndexDb
.. js:autofunction:: initStore

indexDbUpdate.js
-----------------------
.. js:autofunction:: restoreEQ
.. js:autofunction:: restoreFileLoad
.. js:autofunction:: restoreVideo
.. js:autofunction:: restoreAppState
.. js:autofunction:: getIdbValue
.. js:autofunction:: setIdbValue

playGroundSetup.js
-----------------------
.. js:autofunction:: createPlayGround
.. js:autofunction:: arrangePlayGround
.. js:autofunction:: createBtnNextPrev
.. js:autofunction:: createScrollTop
.. js:autofunction:: createVisualElemListener
.. js:autofunction:: createAudioStatusLeds

playlist.js
-----------------------
.. js:autoclass:: PlayList

utils.js
-----------------------
.. js:autoclass:: IsShown
.. js:autofunction:: appendDiv
