// ==UserScript==
// @name         SinglePlayer
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Remove the progress bars of other players while typing in TypeRacer.
// @author       SkyPromp
// @match        https://play.typeracer.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=typeracer.com
// ==/UserScript==

new MutationObserver(getPlayersList).observe(document.body, {subtree: true, childList: true});

function getPlayersList(mutations_list) {
    for (let mutation of mutations_list){
        for (let node of mutation.addedNodes){
            if (node.className === "row")
            {
                removeOthers(node.querySelectorAll("tr"));
            }
        }
	}
}

function removeOthers(rows) {
    for (let row of rows){
        const username = row.querySelector(".lblUsername").innerText;
        if (username !== "(you)") row.style.display = "none";
    }
}
