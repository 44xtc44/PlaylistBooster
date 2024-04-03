// background.js
"use strict";
/**
 * Can load either "background" or "content_scripts" by pressing button
 */
function openTab(){
    var newTab = browser.tabs.create({ 
      url: "/playlistShuffleBooster.html",
      active:true
    }).then(() => {
      browser.tabs.executeScript({
        code: `console.log('location:', window.location.href);`,
      });
    });
}
browser.browserAction.onClicked.addListener(openTab)
