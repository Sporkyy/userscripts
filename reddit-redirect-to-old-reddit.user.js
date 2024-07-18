// ==UserScript==
// @name         Reddit - Redirect to Old Reddit
// @namespace    https://github.com/Sporkyy/
// @version      2024.06.18.0
// @description	 Redirects new Reddit to old Reddit
// @author       Sporkyy
// @match        *://www.reddit.com/*
// @exclude      *://old.reddit.com/*
// @exclude      *://www.reddit.com/appeals/*,
// @exclude      *://www.reddit.com/community-points/*
// @exclude      *://www.reddit.com/gallery/*
// @exclude      *://www.reddit.com/media/*
// @exclude      *://www.reddit.com/poll/*
// @exclude      *://www.reddit.com/r/*/s/*,
// @exclude      *://www.reddit.com/rpan/*,
// @exclude      *://www.reddit.com/settings/*,
// @exclude      *://www.reddit.com/topics/*,
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

(() => {
  'use strict';

  const winLoc = window.location;
  const path = winLoc.href.split('reddit.com/', 1)[1];
  const newLocation = `https://old.reddit.com/${path}`;

  winLoc.replace(newLocation);
})();
