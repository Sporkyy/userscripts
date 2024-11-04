// ==UserScript==
// @name         Mylar - Improve Titles
// @namespace    https://github.com/Sporkyy/userscripts
// @version      2024.11.04
// @description  Move Mylar to the end of the title
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
  const wd = window.document;
  const wdt = wd.title.trim();
  const matches = wdt.match(/^(Mylar)(\s+-\s+)(.+)$/);
  if (null === matches) {
    console.log('🛑 Aborting; Cannot parse document title');
    return;
  }
  const [, mylar, divider, pageTitle] = matches;
  console.log(`Page Title: ${pageTitle}`);
  wd.title = `${pageTitle}${divider}${mylar}`;
})();
