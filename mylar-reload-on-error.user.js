// ==UserScript==
// @name         Mylar - Reload on Error
// @namespace    https://github.com/Sporkyy/userscripts
// @version      2024.02.06
// @description	 Reloads the page if Mylar throws an error
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

  const w = window;
  const dt = document.title;
  const e = 'Internal Server Error';
  const dl = document.location;

  // If the error message is not in the title, do nothing
  if (!dt.includes(e)) return;

  const randmm = (min, max) => Math.random() * (max - min) + min;
  const ms = randmm(5000, 10000);

  // If we're here, it's because of an error message
  w.setTimeout(() => dl.reload(), ms);
})();

// Here's the error message:
// (In simplified form)
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
<!DOCTYPE html>
<html>
  <head>
    <title>500 Internal Server Error</title>
  </head>
  <body>
    <h2>500 Internal Server Error</h2>
    <p>The server encountered an unexpected condition...</p>
  </body>
</html>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
