// ==UserScript==
// @name         More Accurate WPM
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Show more precise wpm after a race on TypeRacer
// @author       SkyPromp
// @match        https://play.typeracer.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=typeracer.com
// @grant        none
// ==/UserScript==

function Log(message){
    console.log("MAW:", message);
}

new MutationObserver(getScoreboard).observe(document.body, {subtree: true, childList: true});
let wpm = document.getElementsByClassName()[0];


function getScoreboard(mutations_list) {
    for (let mutation of mutations_list){
        for (let node of mutation.addedNodes){
            if (node.className === "tblOwnStatsNumber"){
                handleScoreboardNode(node);
            }
            else if(node.className === "gwt-TabPanel"){
                //handleStats(node.querySelectorAll(".StatsTable tbody tbody .gwt-Label"));
                handleStats(node.querySelectorAll(".gwt-Label"));
            }
        }
	}
}

function handleScoreboardNode(node){
    if (node.textContent.split(" ").at(-1) === "wpm") {
        node.textContent = node.title;
    }
}

function handleStats(nodes){
    nodes.forEach(node => handleScoreboardNode(node));
}