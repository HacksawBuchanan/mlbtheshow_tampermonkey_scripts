// ==UserScript==
// @name         MLB The Show Buy Order Totals
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://mlb21.theshow.com/orders/*_orders
// @grant        none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

function getOrders(tableData){
      var start =1;
      var increment =3;
      var current = start;
      var tableDataSize = tableData.length;
      var orders = new Array();
    console.log("table dat length = " + tableDataSize);
    console.log(orders);
      while(current<tableDataSize){
          console.log(tableData[current]);
             console.log(tableData[current+1]);
          var order = { name:tableData[current].innerText,price:parseInt(tableData[current+1].innerText.replace(/,/g, '')) };
          orders.push(order);
          current+=increment;
      }
    return orders;
}




(function() {
    'use strict';
    var $ = window.jQuery;

    var elements = $("td");
    var baseUri = window.location;
    console.log(baseUri);
    var type = "SELL";
    if(baseUri.href.toString().includes("buy")){

      type="BUY";
    }
    console.log(type);
    var orders = getOrders(elements);

   var total=0;
    for( const index in orders){
        var order = orders[index];
     total += order.price
        console.log("Price:"+order.price);

    }
     if(type=="SELL"){
             total = total*.9;
        }

        $("body").prepend('<div><p>Total order value:   '+total+'</p></a></div>');

}

)();

