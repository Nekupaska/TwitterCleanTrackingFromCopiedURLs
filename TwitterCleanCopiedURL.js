// ==UserScript==
// @name         Twitter Clean Tracking From Copied URLs
// @namespace    http://tampermonkey.net/
// @version      2026-11-14
// @description  Removes tracking info from copied links
// @author       Nekupaska
// @match        https://x.com/*
// @grant        GM_setClipboard
// @icon         https://abs.twimg.com/favicons/twitter.3.ico
// ==/UserScript==

(function() {
    'use strict';

    //https://x.com/user/status/000000000000000000?someGarbage=as2343dasid9ad&s=20
    document.addEventListener('copy', function(event) {
        setTimeout(function() {

            navigator.clipboard.readText().then(text => {
                let isTwitter = false;
                const cleanURL = text.replace(/\?.+/g, ''); //remove portion from "?" onwards

                if (cleanURL.match(/(https:\/\/x.com\/\w+\/status\/\d+)/i)) { //check if it's an X link
                    isTwitter = true;
                }

                if(isTwitter){

                    navigator.clipboard
                        .writeText(cleanURL)
                        .then(() => {/*link copied*/})
                        .catch(() => { console.error("Failed to write to clipboard"); });
                }
            }).catch(err => {
                console.error('Failed to read clipboard: ', err);
            });
        }, 100); // delay to ensure clipboard is updated
    });

})();
