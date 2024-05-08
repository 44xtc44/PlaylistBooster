// utils.js
"use strict";

/**
 * Show or hide DOM element.
 * 
 * @example
 * // elements must be initialized by DOM already
 * const showMenubar = new IsShown("divMenubar");
 * showMenubar.toggle();
 */
class IsShown {
  constructor(elementName) {
    this.element = document.getElementById(elementName);
    this.show = false;
  }
  toggle() {
    if(this.show) {
      this.element.style.display = "none";
      this.show = false;
    }else {
      this.element.style.display = "inline-block";
      this.show = true;
    }
  }
}