// ==UserScript==
// @name         Reddit - Redirect to Old Reddit
// @namespace    https://github.com/Sporkyy/userscripts
// @version      2024.12.08.3
// @description	 Redirects new Reddit to old Reddit
// @author       Sporkyy
// @match        *://www.reddit.com/*
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

  const href = window.location.href;
  const newHref = href.replace('www.reddit.com', 'old.reddit.com');

  window.location.replace(newHref);
})();
