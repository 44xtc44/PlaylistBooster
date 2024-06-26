// background.js
"use strict";
/**
 * Can load either "background" or "content_scripts" by pressing button
 */
function openTab(){
    var newTab = browser.tabs.create({ 
      url: "/index.html",
      active:true
    }).then(() => {
      browser.tabs.executeScript({
        code: `console.log('Add-on:', 'PlaylistBooster');`,
      });
    });
}
browser.browserAction.onClicked.addListener(openTab)
