// utils.js
"use strict";

/**
 * Show or hide DOM element.
 *
 * @example
 * // elements must be initialized by DOM already
 * const showMenubar = new IsShown("divMenubar");
 * showMenubar.toggle(); // or switch also a status image
 * showMenubar.toggle({img:imgObj, imgON:"./green.png" imgOFF:"./red.png"});
 */
class IsShown {
  constructor(elementName) {
    this.element = document.getElementById(elementName);
    this.is_enabled = false;
  }
  toggle(option = {}) {
    if (this.is_enabled) {
      this.element.style.display = "none";
      this.is_enabled = false;
      if (option.img) {
        // switch only .src
        option.img.src = option.imgOFF;
        this.element.style.display = "inline-block";
      }
    } else {
      this.element.style.display = "inline-block";
      this.is_enabled = true;
      if (option.img) option.img.src = option.imgON;
    }
  }
  hide() {
    this.element.style.display = "none";
    this.is_enabled = false;
  }
  display() {
    this.element.style.display = "inline-block";
    this.is_enabled = true;
  }
}

/**
 * Stack div and use it as a list.
 * @param {{*}} opt dictionary
 * @example appendDiv({ parentId: 'div0ne', childId: 'c1', innerText: 'low', elemClass: 'logger' });
 */
function appendDiv(opt) {
  let div = document.createElement("div");
  div.id = opt.childId;
  div.classList.add(opt.elemClass);
  div.innerText = opt.innerText;
  opt.parentId.appendChild(div); // parent is full path document.getElem...
}
