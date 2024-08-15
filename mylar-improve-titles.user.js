// ==UserScript==
// @name         Mylar - Improve Titles
// @namespace    https://github.com/Sporkyy/userscripts
// @version      2024.02.15
// @description  Move Mylar to the end of the title
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
  const wd = window.document;
  const wdt = wd.title.trim();
  const matches = wdt.match(/^(Mylar)(\s+-\s+)(.+)$/);
  if (null === matches) {
    console.log('Cannot parse document title; aborting');
    return;
  }
  const [, mylar, divider, pageTitle] = matches;
  console.log(`Page Title: ${pageTitle}`);
  wd.title = `${pageTitle}${divider}${mylar}`;
})();
