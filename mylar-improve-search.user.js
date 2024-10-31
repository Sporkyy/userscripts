// ==UserScript==
// @name         Mylar - Improve Search
// @namespace    https://github.com/Sporkyy/userscripts
// @version      2024.04.06.13.0
// @description  Remove problematical words from queries
// @author       Sporkyy
// @match        *://localhost:8090/*
// @match        *://*.local:8090/*
// @match        *://mylar.*/*
// @match        *://*/mylar/*
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
    newVal = newVal.replaceAll('.', ' ');
    newVal = newVal.replaceAll(':', ' ');
    newVal = newVal.replaceAll('&', ' ');
    newVal = newVal.replaceAll('-', ' ');
    newVal = newVal.replaceAll(/\band\b/g, ' ');
    newVal = newVal.replaceAll(/\bthe\b/g, ' ');
    newVal = newVal.replaceAll(/\bversus\b/g, ' ');
    newVal = newVal.replaceAll(/\bvs\b/g, ' ');
    newVal = newVal.replaceAll(/\s{2,}/g, ' ');
    newVal = newVal.trim();
    inpSearch.value = newVal;
  });
})();
