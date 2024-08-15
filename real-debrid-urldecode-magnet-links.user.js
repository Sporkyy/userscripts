// ==UserScript==
// @name        Real-Debrid URL Decode Magnet Links
// @namespace   https://github.com/Sporkyy/userscripts
// @match       https://real-debrid.com/torrents*
// @grant       none
// @version     2024.08.15.0
// @author      Sporkyy
// @description Fully decode magnet links in Real-Debrid magnet input field
// @run-at      document-idle
// @icon        https://www.google.com/s2/favicons?sz=64&domain=real-debrid.com
// ==/UserScript==

(function () {
  'use strict';

  const qs = (sel, ctx = document) => ctx.querySelector(sel);

  const inpMagnet = qs('input[name="magnet"]');

  const rDecodeURI = uri =>
    (dUri => (uri === dUri ? dUri : rDecodeURI(dUri)))(decodeURIComponent(uri));

  const rDecodeURIComponent = uriComponent => dUriComponent =>
    (uriComponent === dUriComponent
      ? dUriComponent
      : rDecodeURIComponent(dUriComponent))(decodeURIComponent(uriComponent));

  const base64Decode = str => {
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
    clearText = uTF8Decode(clearText);
    return clearText;
  };

  const uTF8Decode = str => decodeURIComponent(escape(str));

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

  inpMagnet.addEventListener('change', function () {
    let str = inpMagnet.value.trim();

    if (str.includes('?url=')) {
      str = decodeURIComponent(str.split('?url=')[1]);
    }

    if (isBase64Encoded(str)) {
      str = base64Decode(str);
    }

    const decoded = rDecodeURI(str);
    const [protocol, query] = decoded.split(':?');
    const components = query.split('&').map(component => {
      const [key, value] = component.split('=');
      const returnValue = rDecodeURIComponent(value);
      return `${key}=${returnValue}`;
    });

    inpMagnet.value = `${protocol}:?${components.join('&')}`;
  });
})();
