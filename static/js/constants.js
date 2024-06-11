// constants.js
"use strict";

const msgGainOn = 'Gain ON';
const msgGainOff = 'Gain OFF';
const msgEqualizerOn = 'Equalizer ON';
const msgEqualizerOff = 'Equalizer OFF';
const msgVideoScreenOn = 'Video ON';
const msgVideoScreenOff = 'Video OFF';
const msgFileLoad = '';  // 'Multi-select';
const msgShuffleOn = '';  // '<br><br><br>Shuffle';
const msgShuffleOff = '';

/**
 * 
 */
function constantsDocu() {
	// To write directly in sphinx docu module.
}
const playbackRates = [0.5, 1.0, 1.5, 2.0];

const allowedFileContent = [
	"video/mpeg, audio/mpeg",
	".m4v, .m4a",
	".aacp, audio/aacp, application/aacp",
	".aac, audio/aac",
	".wav, audio/wav",
	".mp3, audio/mp3",
	".mp4",
	".mid, .midi",
	".flac, audio/flac",
	".wbem, audio/webm, video/webm, video/WEBM",
	"video/x-matroska",
	".ogg, .spx, audio/ogg",
	// other media; a spanish course has pdf and audio
	".pdf, application/pdf"
];

const equalizerPresets = [
	{ "id": "default", "gains": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] },
	{ "is_separator": true },
	{ "id": "live", "gains": [-2.9, 0.0, 2.4, 3.4, 3.4, 3.4, 2.4, 1.4, 1.4, 1.4] },
	{ "id": "acoustic", "gains": [7.5, 7.5, 5.0, 2.0, 3.5, 3.5, 5.0, 6.0, 5.0, 2.5] },
	{ "id": "classical", "gains": [7.5, 6.0, 5.0, 4.0, -2.5, -2.5, 0.0, 3.5, 5.0, 6.0] },
	{ "id": "piano", "gains": [5.0, 3.0, 0.0, 4.5, 5.0, 2.5, 6.5, 7.5, 5.0, 5.5] },
	{ "id": "lounge", "gains": [-5.0, -2.5, -1.0, 2.0, 6.5, 2.0, 0.0, -2.5, 3.0, 1.5] },
	{ "id": "spoken_word", "gains": [-3.5, -0.5, 0.0, 1.0, 6.0, 7.5, 8.0, 7.0, 4.0, 0.0] },
	{ "id": "jazz", "gains": [6.5, 5.0, 2.0, 3.0, -2.5, -2.5, 0.0, 2.0, 5.0, 6.5] },
	{ "id": "pop", "gains": [1.0, 2.9, 4.3, 4.8, 3.4, 0.0, -1.4, -1.4, 1.0, 1.0] },
	{ "id": "dance", "gains": [6.0, 11.0, 7.5, 0.0, 2.5, 5.0, 8.0, 7.5, 6.0, 0.0] },
	{ "id": "latin", "gains": [4.5, 2.5, 0.0, 0.0, -2.5, -2.5, -2.5, 0.0, 5.0, 7.5] },
	{ "id": "rnb", "gains": [4.5, 11.5, 9.5, 2.0, -4.0, -2.5, 4.0, 4.5, 5.0, 6.0] },
	{ "id": "hiphop", "gains": [8.0, 7.0, 2.0, 5.0, -2.0, -1.5, 2.0, -1.0, 3.0, 5.0] },
	{ "id": "electronic", "gains": [7.0, 6.5, 2.0, 0.0, -3.0, 3.0, 1.5, 2.0, 6.5, 7.5] },
	{ "id": "techno", "gains": [4.8, 3.4, 0.0, -3.4, -2.9, 0.0, 4.8, 5.8, 5.8, 5.3] },
	{ "id": "deep", "gains": [7.5, 6.0, 2.5, 1.5, 5.0, 4.0, 2.5, -3.0, -6.0, -7.5] },
	{ "id": "club", "gains": [0.0, 0.0, 4.8, 3.4, 3.4, 3.4, 1.9, 0.0, 0.0, 0.0] },
	{ "id": "rock", "gains": [8.0, 6.5, 5.0, 2.0, -0.5, -1.0, 0.5, 4.0, 5.5, 7.5] },
	{ "id": "rock_soft", "gains": [2.9, 1.0, 0.0, -1.4, 0.0, 2.4, 4.8, 5.8, 6.7, 7.2] },
	{ "id": "ska", "gains": [-1.4, -2.9, -2.4, 0.0, 2.4, 3.4, 5.3, 5.8, 6.7, 5.8] },
	{ "id": "reggae", "gains": [0.0, 0.0, 0.0, -3.4, 0.0, 3.8, 3.8, 0.0, 0.0, 0.0] },
	{ "is_separator": true },
	{ "id": "headphones", "gains": [2.9, 6.7, 3.4, -1.9, -1.4, 1.0, 2.9, 5.8, 7.7, 8.6] },
	{ "id": "laptop_speakers", "gains": [5.6, 9.9, 6.0, 1.7, 2.1, 5.1, 5.6, 5.8, 7.7, 8.6] },
	{ "id": "small_speakers", "gains": [9.0, 7.0, 6.5, 4.0, 2.0, 0.0, -2.0, -4.5, -5.5, -7.0] },
	{ "id": "vocal_booster", "gains": [-2.5, -5.0, -5.0, 2.0, 6.0, 6.0, 5.0, 2.5, 0.0, -2.5] },
	{ "id": "bass_booster", "gains": [7.5, 6.0, 5.0, 3.5, 1.5, 0.0, 0.0, 0.0, 0.0, 0.0] },
	{ "id": "bass_reducer", "gains": [-7.5, -6.0, -5.0, -4.0, -2.5, 0.0, 0.0, 3.5, 5.0, 6.0] },
	{ "id": "treble_booster", "gains": [0.0, 0.0, 0.0, 0.0, 0.0, 1.5, 4.0, 6.0, 7.0, 8.5] },
	{ "id": "treble_reducer", "gains": [0.0, 0.0, 0.0, 0.0, 0.0, -1.5, -4.0, -6.0, -7.0, -8.5] },
	{ "id": "bass_treble_boost", "gains": [4.3, 3.4, 0.0, -4.3, -2.9, 1.0, 4.8, 6.7, 7.2, 7.2] }
];

const equalizerRanges = [
	{ "id": "winamp", "ranges": [70, 180, 320, 600, 1000, 3000, 6000, 12000, 14000, 16000] },
	{ "id": "World", "ranges": [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000] },
	{ "id": "common", "ranges": [40, 80, 160, 300, 600, 1200, 2400, 5000, 10000, 20000] }
];

const filterTypesList = [   // filter type for each frequency band
{"type": "lowshelf" }, // 0
{"type": "peaking" },
{"type": "peaking" },  // 2
{"type": "peaking" },
{"type": "peaking" },  // 4
{"type": "peaking" },
{"type": "peaking" },  // 6
{"type": "peaking" },
{"type": "peaking" },  // 8
{"type": "highshelf" }
];