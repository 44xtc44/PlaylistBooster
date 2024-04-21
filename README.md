# Playlist Booster Shuffle [Volume Gain]

## Overview

This repository shows the source code of a browser add-on.
Runs on FireFox.

* Offline ( Android ) mp3, mp4 video player
* Gain booster, Time-seek and playback rate options 
* pdf support

# Why

Working with multi-file upload objects, an old school mp3 player appeared in my mind's eye. 

This guy follows me on my cell phone and helps me out with my spanish course and at cycling.

# How it works

[manifest.json](https://github.com/44xtc44/PlaylistBooster/blob/dev/manifest.json) The add-on uses browser 'tabs' permission to load a background script, which opens the HTML page.

[background.js](https://github.com/44xtc44/PlaylistBooster/blob/dev/background.js) Loads the HTML page, which loads the JavaScript scripts.

[index.js](https://github.com/44xtc44/PlaylistBooster/blob/dev/static/js/index.js) - DOM Audio, video context and element creation.

[playlist.js](https://github.com/44xtc44/PlaylistBooster/blob/dev/static/js/playlist.js) - Multi-file-upload feature creates a playlist. Forward and backward buttons are disposable to get rid of the event listener in case of a new playlist creation.

Favicon (rotating default_icon) and buttons are SVG files created with Inkscape.

Spectrum analyzer reads data from 'analyserNodeTwo' and is is driven by 'requestAnimationFrame'.

'analyserNodeOne' will be used by a bigger analyzer show in the future.

# HowTo PC

Clone the repo. 

FireFox 'about:debugging', and 'this FireFox' select a new temporary Add-on.

Open the PlaylistBooster manifest.json and then start the Add-on from the puzzle icon list.

# HowTo Android

Dev options here: "https://extensionworkshop.com/documentation/develop/developing-extensions-for-firefox-for-android/".

You want to download the FireFox apk file and drag it onto the AVM. 
Search "Firefox Nightly for Developers". If you find 'APKmirror' save, go there. Else use the registration
process to enable PlayStore to pull FireFox Nightly, into every AVM.


> **_NOTE:_** Deinstall FireFox 'regular' version, if any.

Open a terminal in the root of the repo clone, to load the Add-on into the AVM via USB.

    @PlaylistBooster$ adb devices -l
    List of devices attached
    emulator-5554   offline

    @PlaylistBooster$ web-ext run --target=firefox-android --android-device emulator-5554 --firefox-apk org.mozilla.fenix

The AVM and FireFox Nightly must be USB enabled (Dev mode) then.

Drag some media files into 'Device Explorer' in 'Android Studio'. Use 'mnt/sdcard/Music', to see it in user view on AVM.

<table>
  <tbody>
    <tr>
      <td>
        <img src="https://github.com/44xtc44/PlaylistBooster/raw/dev/.github/start.png" alt="start screen" height="585"/> 
      </td>
    </tr>
     <tr>
      <td>
        <img src="https://github.com/44xtc44/PlaylistBooster/raw/dev/.github/sound.png" alt="sound files active" height="585"/> 
      </td>
    </tr>
     <tr>
      <td>
        <img src="https://github.com/44xtc44/PlaylistBooster/raw/dev/.github/video.png" alt="video files active" height="585"/> 
      </td>
    </tr>

  </tbody>
</table>

# Gain - preamp

Bring your earbuds to the limit.
Push the preamp to 500%. This feels like 20% louder.

Works with bluetooth headphones!


# Known issues


# Contributions

Pull requests are welcome.
If you want to make a major change, open an issue first to have a short discuss.


# Thank you

[YouTube franks laboratory](https://www.youtube.com/results?search_query=franks+laboratory)

# License

Apache 2.0 License