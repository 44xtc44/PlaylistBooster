// indexDbUpdate.js
"use strict";

/**
 * Equalizer settings.
 * @see restoreAppState
 * @param {{*}} options idb object store dict received by the DB query
 */
function restoreEQ(options) {
  document.getElementById("equalizer__range").selectedIndex = options.band;
  document.getElementById("equalizer__presets").selectedIndex = options.preset;
  if (options.power) document.getElementById("equalizer__label").click(); // trigger event chain
}

/**
 * Shuffle is checked.
 * @param {{*}} options idb object store dict received by the DB query
 */
function restoreFileLoad(options) {
  if (options.is_shuffle && !showShuffleActive.is_enabled)
    document.getElementById("imgMainShuffle").click();
}
/**
 * Video.
 * @param {{*}} options Index Data Base (IDB) object store dict received by the DB query
 */
function restoreVideo(options) {
  if (options.screenPower) document.getElementById("imgVideoScreen").click();
  document.getElementById("audioGainController").value = options.gain;
  document.getElementById("audioVolumeController").value = options.volume;
  video.volume = options.volume / 100;
  video.playbackRate = options.speedRate;
  imgPlaybackRate.src =
    "/static/images/playlistBooster-equalizer-thumb-speed-" +
    options.speedRate +
    ".svg";
  // activate number in option of select menu, so it is default; current is not selectable, no 'onChange'
  document.getElementById("playbackRate__select").selectedIndex =
    playbackRates.indexOf(options.speedRate);
    let y = options.speedRate
  let x = playbackRates.indexOf(options.speedRate);
  let z=1;
}

/**
 * App state restore.
 * Dump all data (dict) from a named objectStore and
 * transfer it to the wrapped worker function.
 */
function restoreAppState() {
  getIdbValue({
    objectStore: "equalizer",
    updFun: (dataClone) => restoreEQ(dataClone), // dataClone={k1:v1,k2:v2};updFun(dataClone)
  });
  getIdbValue({
    objectStore: "fileLoad",
    updFun: (dataClone) => restoreFileLoad(dataClone),
  });
  getIdbValue({
    objectStore: "video",
    updFun: (dataClone) => restoreVideo(dataClone),
  });
}
/* ------------------------------------------------------------------ */
/**
 * Get Index Data Base (IDB) values.
 * Option callback, restore fun, uses data set (dataClone).
 *
 * @param {{*}} options {objectStore: name, updFun:() => {}}
 * @returns Promise, data set
 * @example  
 * getIdbValue({
    objectStore: "fileLoad",
    updFun: (dataClone) => restoreFileLoad(dataClone),
  }).then((dataSet) => {return dataSet});  // writing .then is an option
 */
function getIdbValue(options = {}) {
  let logDiv = document.getElementById("divDbContainerContent");

  return new Promise((resolve) => {
    // transaction, objectStore and first id use all the same name, so far!
    let objectStore = options.objectStore;

    let conOpen = window.indexedDB.open(settingsDbName, settingsDbNameVersion);
    conOpen.onerror = (event) => {
      appendDiv({
        parentId: logDiv,
        childId: "getIdbValue_conOpen_onerror".concat(
          Date.now() + Math.random()
        ),
        innerText: "getIdbValue, Error loading database. " + event.target.error,
        elemClass: "msgDivs",
      });
    };

    conOpen.onsuccess = () => {
      let db = conOpen.result;
      let store = db.transaction(objectStore).objectStore(objectStore);
      let data = store.get(objectStore);

      data.onsuccess = () => {
        let dataClone = data.result; // {id:equalizer,power:true,band:3,...}
        if (options.updFun) options.updFun(dataClone);

        let msg = "<-restore".concat(JSON.stringify(dataClone, null));
        appendDiv({
          // app state stack of divs
          parentId: logDiv,
          childId: "getIdbValue_data.onsuccess".concat(
            Date.now() + Math.random()
          ),
          innerText: msg,
          elemClass: "msgDivs",
        });
        resolve(dataClone);
      };

      data.onerror = (event) => {
        console.error(`Error to get information: ${event}`);
      };
    };
  });
}

/* ------------------------------------------------------------------ */
/**
 * Refresh value(s) in a named objectStore.
 * Transaction, objectStore and first id use 
 * 
 * (in this release 1.5) 
 * 
 * all 'the same' name. 
 * In bigger env use distinguished names and or unique num.
 * 
 * @param {{*}} options update dict
 * @example
    setIdbValue({
      objectStore: "equalizer",
      updFields: { power: true, band: opt.frequencyIdx, preset: opt.presetIdx },
    });
 * 
 */
function setIdbValue(options) {
  let logDiv = document.getElementById("divDbContainerContent");
  let objectStore = options.objectStore;
  let updFields = options.updFields; // may contain one or more fields

  let conOpen = window.indexedDB.open(settingsDbName, settingsDbNameVersion);
  conOpen.onerror = (event) => {
    appendDiv({
      parentId: logDiv,
      childId: "getIdbValue_conOpen.onerror".concat(Date.now() + Math.random()),
      innerText: "setIdbValue, Error loading database. " + event.target.error,
      elemClass: "msgDivs",
    });
  };

  conOpen.onsuccess = () => {
    let db = conOpen.result;
    let store = db
      .transaction(objectStore, "readwrite")
      .objectStore(objectStore);
    let data = store.get(objectStore);

    data.onsuccess = () => {
      let dataClone = data.result; // {id:equalizer,power:true,band:3,...}
      let updKeyList = Object.keys(updFields); // list of keys [power,band]
      for (let key of updKeyList) {
        dataClone[key] = updFields[key]; // upd val
      }
      store.put(dataClone);

      let msg = "set-> ".concat(JSON.stringify(updFields, null));

      appendDiv({
        parentId: logDiv,
        childId: "setIdbValue_data.onsuccess".concat(
          Date.now() + Math.random()
        ),
        innerText: msg,
        elemClass: "msgDivs",
      });
    };

    data.onerror = (event) => {
      appendDiv({
        parentId: logDiv,
        childId: "setIdbValue_data.onerror".concat(Date.now() + Math.random()),
        innerText:
          "setIdbValue,Error to get information: " + event.target.error,
        elemClass: "msgDivs",
      });
      console.error(`Error to get information: ${event}`);
    };
  };
}
