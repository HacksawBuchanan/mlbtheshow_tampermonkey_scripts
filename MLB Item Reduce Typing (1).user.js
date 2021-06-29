// ==UserScript==
// @name         MLB Item Reduce Typing
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://mlb21.theshow.com/items/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==


function extractBuyNowPrice($){
    var elements = $(".market-forms-quick");
    console.log(elements);

    var buy = elements[0];
    var sell = elements[1];
    var buyPrice = $(buy).find('input[name="price"]').val()
   var sellPrice = $(sell).find('input[name="price"]').val()
    return { minBuyPrice:sellPrice,maxSellPrice:buyPrice};
}


function writeBuyPrice($,prices){
      var elements = $(".market-forms-price");
console.log(elements);
     var buyInput = $(elements[0]).find('input[name="price"]')[0];
    var sellInput = $(elements[1]).find('input[name="price"]')[0];
    console.log(buyInput);
    buyInput.value = parseInt(prices.minBuyPrice)+1;
    sellInput.value = parseInt(prices.maxSellPrice)-1;

}

(function() {
    'use strict';
    var $ = window.jQuery;
    var prices = extractBuyNowPrice($);
    console.log(prices);
    writeBuyPrice($,prices);
     $("body").prepend('<div><p>Profit: '+((prices.maxSellPrice*.9)-prices.minBuyPrice)+'</p></a></div>');
    // Your code here...
})();