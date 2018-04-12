'use strict';
/* global store*/

// eslint-disable-next-line no-unused-vars
const api = (function(){
  const BASE_URL = ' https://thinkful-list-api.herokuapp.com/jimmlusk/bookmarks';

  function getItems(callback){
    $.getJSON(`${BASE_URL}`,callback);
  }




  return{
    getItems,
  };
}());