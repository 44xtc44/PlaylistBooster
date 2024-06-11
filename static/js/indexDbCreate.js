// indexDbCreate.js
"use strict";

// https://medium.com/free-code-camp/a-quick-but-complete-guide-to-indexeddb-25f030425501
// https://dev.to/pandresdev/indexeddb-step-by-step-2475

/**
 * Auto restore of settings after page reload.
 *
 * indexName and keyPath? A dictionaries concept. Read JS "map()".
 * objectStore.createIndex(indexName, keyPath, { unique: false });
 * indexName is the name of the 'key' column (often id) used as table or column index.
 * It's (key:) 'values' can be numbers (as in SQL DB), strings. Unique or multiple, to make it worse.
 * With other words. The primary key (value array is a) column of an objectStore.
 *
 * keyPath points to that indexName, keyPath pair that will represent the primary key. Full stop.
 * All other indexName, key(Path) combinations are not used as primary key. .createIndex(indexName, keyPath, { unique: false });
 *
 * One can not alter the objectStore, only upgrade (destroy).
 * An initial DB design is often quickly outdated and needs at least more rows (primary keys, indicies).
 * One should design the objectStore like a DB table with columns.
 *
 */
const settingsDbName = "dbPlaylistBooster";
const settingsDbNameVersion = 1;
const eqDict = {
  equalizer: {
    // object store name
    id: "equalizer", // first key value (primary key) to grab data set
    power: false,
    band: 0,
    preset: 23,
  },
};
const playlistDict = {
  playlist: {
    id: "playlist",
    track: 'fileFoo',
    trackNumber: 0,
  },
};
const videoDict = {
  video: {
    id: "video",
    screenPower: false,
    speedRate: 1,
    volume: 75,
    gain: 1.1,
  },
};
const fileLoadDict = {
  fileLoad: {
    id: "fileLoad",
    is_shuffle: false,
  },
};

/**
 * Create db and objectStore, or init the Index Data Base (IDB).
 * @see initStore
 * @returns Promise true or false.
 */
function initIndexDb() {
  // Promise to schedule app state update fun.
  return new Promise((resolve, reject) => {
    let DBOpenRequest = window.indexedDB.open(
      settingsDbName,
      settingsDbNameVersion
    );
    let db = null;

    // evt handlers onerror, onsuccess, onupgradeneeded
    DBOpenRequest.onerror = (event) => {
      appendDiv({
        parentId: document.getElementById("divDbContainerContent"),
        childId: "initIndexDb".concat(Date.now() + Math.random()),
        innerText: "initIndexDb, Error loading database. " + event.target.error,
        elemClass: "msgDivs",
      });
      reject(event.target.error);
    };

    DBOpenRequest.onsuccess = () => {
      appendDiv({
        parentId: document.getElementById("divDbContainerContent"),
        childId: "DBOpenRequest".concat(Date.now() + Math.random()),
        innerText: "Database initialized",
        elemClass: "msgDivs",
      });
      // store the result of opening the database in the db
      db = DBOpenRequest.result;
      // read, write or return a msg
      resolve(true); // https://exploringjs.com/es6/ch_promises.html
    };

    DBOpenRequest.onupgradeneeded = (event) => {
      let result = event.target.result;
      result.onerror = (event) => {
        appendDiv({
          parentId: document.getElementById("divDbContainerContent"),
          childId: "DBOpenRequest".concat(Date.now() + Math.random()),
          innerText:
            "(onupgradeneeded) loading database. " + event.target.error,
          elemClass: "msgDivs",
        });
      };

      // Create the DB indicies for this database.
      const objectStore_play = result.createObjectStore("playlist", {
        keyPath: "id",
      });
      objectStore_play.createIndex("id", "id", { unique: true });
      objectStore_play.createIndex("playlist", "playlist", { unique: false });
      objectStore_play.createIndex("trackNumber", "trackNumber", { unique: true });  // char case

      const objectStore_eq = result.createObjectStore("equalizer", {
        keyPath: "id",
      });
      objectStore_eq.createIndex("id", "id", { unique: true });
      objectStore_eq.createIndex("power", "power", { unique: true });
      objectStore_eq.createIndex("band", "band", { unique: true }); // frequency band range value lists
      objectStore_eq.createIndex("preset", "preset", { unique: false });

      const objectStore_video = result.createObjectStore("video", {
        keyPath: "id",
      });
      objectStore_video.createIndex("id", "id", { unique: true }); // add({id:videoOne}) get(videoOne) update
      objectStore_video.createIndex("screenPower", "screenPower", {
        unique: true,
      });
      objectStore_video.createIndex("speedRate", "speedRate", { unique: true });
      objectStore_video.createIndex("volume", "volume", { unique: true });
      objectStore_video.createIndex("gain", "gain", { unique: true });

      const objectStore_fileLoad = result.createObjectStore("fileLoad", {
        keyPath: "id",
      });
      objectStore_fileLoad.createIndex("id", "id", { unique: true });
      objectStore_fileLoad.createIndex("is_shuffle", "is_shuffle", {
        unique: true,
      });

      appendDiv({
        parentId: document.getElementById("divDbContainerContent"),
        childId: "DBOpenRequest_create_the_DB".concat(Date.now() + Math.random()),
        innerText: "Object store created.",
        elemClass: "msgDivs",
      });

      initStore(videoDict);
      initStore(fileLoadDict);
      initStore(eqDict);
      initStore(playlistDict);

      resolve(true);
    };
  });
}

/**
 * Insert default settings into a keyStore.
 * Use objectStore.add() to make a clear INIT statement.
 * Could be also put().
 * @param {{*}} storeDict nested dict
 * @example
 * {equalizer: {
    // object store name
    id: "equalizer", // first key value (primary key) to grab data set
    power: false,
    band: 0,
    preset: 23,
  },}
 */
function initStore(storeDict) {
  let logDiv = document.getElementById("divDbContainerContent");
  let storeName = Object.keys(storeDict)[0];
  const DBOpenAdd = window.indexedDB.open(
    settingsDbName,
    settingsDbNameVersion
  );

  DBOpenAdd.onsuccess = () => {
    let db = DBOpenAdd.result;
    const transaction = db.transaction(storeName, "readwrite");
    transaction.oncomplete = function () {
      // nothing to do
    };
    transaction.onerror = function (event) {
      appendDiv({
        parentId: logDiv,
        childId: "DBOpenAdd_transaction".concat(Date.now() + Math.random()),
        innerText:
          "DBOpenAdd: transaction.onerror - failed" + event.target.error,
        elemClass: "msgDivs",
      });
    };
    const objectStore = transaction.objectStore(storeName);
    // Add
    const request = objectStore.add(storeDict[storeName]);
    request.onsuccess = () => {
      // request.result contains key of the added object
      appendDiv({
        parentId: logDiv,
        childId: "DBOpenAdd_request_ok".concat(Date.now() + Math.random()),
        innerText: "Result adding ".concat(storeName, ": ", request.readyState),
        elemClass: "msgDivs",
      });
    };
    request.onerror = (event) =>
      appendDiv({
        parentId: logDiv,
        childId: "DBOpenAdd_request_onerror".concat(Date.now() + Math.random()),
        innerText: "DBOpenAdd_onerror, Error adding " + event.target.error,
        elemClass: "msgDivs",
      });
  };
}
