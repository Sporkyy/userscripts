// ==UserScript==
// @name         Real-Debrid URL Decode Magnet Links
// @namespace    https://github.com/Sporkyy/userscripts
// @match        https://real-debrid.com/torrents*
// @grant        none
// @version      2024.08.16.1
// @author       Sporkyy
// @description  Fully decode magnet links in Real-Debrid magnet input field
// @run-at       document-idle
// @icon         https://www.google.com/s2/favicons?sz=64&domain=real-debrid.com
// ==/UserScript==

(function () {
  'use strict';

  // MARK: Helper Functions

  const qs = (sel, ctx = document) => ctx.querySelector(sel);

  // Recursive decodeURI function
  const rDecodeURI = function (uri) {
    const dUri = decodeURIComponent(uri);
    return uri === dUri ? dUri : rDecodeURI(dUri);
  };

  // Recursive decodeURIComponent function
  const rDecodeURIComponent = function (uriComponent) {
    const dUriComponent = decodeURIComponent(uriComponent);
    return uriComponent === dUriComponent
      ? dUriComponent
      : rDecodeURIComponent(dUriComponent);
  };

  // This makes sense, but I didn't write it
  const decodeBase64 = str => {
    let clearText = '';
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    str = str.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    const keyString =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    while (i < str.length) {
      enc1 = keyString.indexOf(str.charAt(i++));
      enc2 = keyString.indexOf(str.charAt(i++));
      enc3 = keyString.indexOf(str.charAt(i++));
      enc4 = keyString.indexOf(str.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      clearText = clearText + String.fromCharCode(chr1);
      if (enc3 != 64) {
        clearText = clearText + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        clearText = clearText + String.fromCharCode(chr3);
      }
    }
    clearText = decodeUTF8(clearText);
    return clearText;
  };

  // TODO: Replace the deprecated escape() function
  const decodeUTF8 = str => decodeURIComponent(escape(str));

  // I did nothting to test this code, but it works
  const isBase64Encoded = str =>
    new RegExp(
      // prettier-ignore
      [
        '^',                       // Start of input
        '([0-9a-zA-Z+/]{4})*',     // Groups of 4 valid characters decode
                                   // to 24 bits of data for each group
        '(',                       // Either ending with:
          '([0-9a-zA-Z+/]{2}==)',  // two valid characters followed by ==
          '|',                     // , or
          '([0-9a-zA-Z+/]{3}=)',   // three valid characters followed by =
        ')?',                      // , or nothing
        '$',                       // End of input,
      ].join(''),
    ).test(str);

  // MARK: Main

  const inpMagnet = qs('input[name="magnet"]');

  inpMagnet.addEventListener('change', function () {
    let str = inpMagnet.value.trim();

    // Because a certain forum likes to encode magnet links in base64
    if (isBase64Encoded(str)) {
      str = decodeBase64(str);
    }

    // For MyCloud links, but generalized
    if (str.includes('?url=')) {
      str = decodeURIComponent(str.split('?url=')[1]);
    }

    // Because the links from NZBHydra2 are sometimes encoded twice
    const decoded = rDecodeURI(str);
    // console.log('decoded:', decoded);

    const [protocol, query] = decoded.split(':?');
    // console.log('protocol:', protocol);
    // console.log('query:', query);

    // I think there's no harm in decoding every parameter
    const components = query.split('&').map(component => {
      const [key, value] = component.split('=');
      // Again, because the links from NZBHydra2 are sometimes encoded twice
      const returnValue = rDecodeURIComponent(value);
      return `${key}=${returnValue}`;
    });

    // When the form is submitted, anything needing to be encoded will be
    inpMagnet.value = `${protocol}:?${components.join('&')}`;
  });
})();
