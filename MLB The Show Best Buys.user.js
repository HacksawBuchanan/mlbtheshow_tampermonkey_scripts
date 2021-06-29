// ==UserScript==
// @name         MLB The Show Best Buys
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://mlb21.theshow.com/community_market*
// @grant        none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

function getPlayers(tableData){
      var start =1;
      var increment =10;
      var current = start;
      var tableDataSize = tableData.length;
      var players = new Array();
    console.log("table dat length = " + tableDataSize);
      while(current<tableDataSize){
          //console.log(tableData[current]);
          //console.log(tableData[current+2]);
          //console.log(tableData[current+3]);
          var player = { name:tableData[current+1].innerText, buyNow:parseInt(tableData[current+3].innerText.trim()), sellNow:parseInt(tableData[current+4].innerText.trim()),link:tableData[current].getElementsByTagName("a")[0].href,profit:0,roi:0}
          player.profit = calculateProfit(player.buyNow,player.sellNow)
          player.roi = player.profit/player.buyNow;
          players.push(player);
          current+=increment;
      }
    return players;
}

function calculateProfit(buyNow,sellNow){
  return (buyNow*.9)-sellNow;
}


function playerFilter(value,index,array){
    return value.profit> 1000;
}

function profitSort(a,b){
    return (a.profit< b.profit) ? 1: -1;
}

function roiSort(a,b){
    return (a.roi< b.roi) ? 1: -1;
}

(function() {
    'use strict';
    var $ = window.jQuery;

    var elements = $("td");
    var players = getPlayers(elements);
    var filtered = players.filter(playerFilter);
    console.log(filtered);
    var sorted = filtered.sort(roiSort);
console.log(sorted);
    var display = sorted
    for( const index in display){
        var player = display[index];
        var text = player.name;
        text+=' $';
        text+= player.profit;
        text+= " ROI:: ";
        text+= player.roi
        $("body").prepend('<div><a href='+player.link+'><p>'+text+'</p></a></div>');
    }
}

)();

