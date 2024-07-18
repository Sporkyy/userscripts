// ==UserScript==
// @name         Mylar - Improve Search
// @namespace    https://github.com/Sporkyy/
// @version      2024.04.06.13.0
// @description  Remove problematical words from queries
// @author       Sporkyy
// @match        *://localhost:8090/*
// @match        *://macmini.lumpatio.us:8090/*
// @match        *://mylar.lumpatio.us/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mylarcomics.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(() => {
  'use strict';

  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const inpSearch = qs('#searchbar input[type="text"]');

  inpSearch.addEventListener('change', () => {
    let newVal = inpSearch.value;
    newVal = newVal.replace(/\./, ' ');
    newVal = newVal.replace(/\:/, ' ');
    newVal = newVal.replace(/\&/, ' ');
    newVal = newVal.replace(/\-/, ' ');
    newVal = newVal.replace(/\band\b/, ' ');
    newVal = newVal.replace(/\bthe\b/, ' ');
    newVal = newVal.replace(/\bversus\b/, ' ');
    newVal = newVal.replace(/\bvs\b/, ' ');
    newVal = newVal.replace(/\s{2,}/g, ' ');
    newVal = newVal.trim();
    inpSearch.value = newVal;
  });
})();
