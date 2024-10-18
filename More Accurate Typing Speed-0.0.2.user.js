// ==UserScript==
// @name         More Accurate Typing Speed
// @namespace    http://tampermonkey.net/
// @version      0.0.3
// @description  Show more tying speed digits after a race on TypeRacer
// @author       SkyPromp
// @match        https://play.typeracer.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=typeracer.com
// @grant        none
// ==/UserScript==

function Log(message){
    console.log("MAW:", message);
}

new MutationObserver(getScoreboard).observe(document.body, {subtree: true, childList: true});

function getScoreboard(mutations_list) {
    let avg = document.getElementsByClassName('lblWpm')[0];
    avg.textContent = avg.title.substring(0, avg.title.lastIndexOf(" "));
	
    for (let mutation of mutations_list){
        for (let node of mutation.addedNodes){
            if (node.className === "tblOwnStatsNumber"){
                handleScoreboardNode(node);
            } else if(node.className === "gwt-TabPanel"){
                //handleStats(node.querySelectorAll(".StatsTable tbody tbody .gwt-Label"));
                handleStats(node.querySelectorAll(".gwt-Label"));
            }
        }
	}
}

function handleScoreboardNode(node){
    let field = node.textContent.split(" ").at(-1);
    if (field === "wpm" || field === "cpm") {
        node.textContent = node.title;
    }
}

function handleStats(nodes){
    nodes.forEach(node => handleScoreboardNode(node));
}
