'use strict';
/*global */

// eslint-disable-next-line no-unused-vars
const store = (function(){
  let items = [
    {name: 'bookmark 1', id: 1, expanded: true, rating: 4, url: 'http://example.com', description: 'Lorem Ipsum',},
    {name: 'bookmark 2', id: 2, expanded: false, rating: 3, url: 'http://example.com', description: 'Dolar Sit',}
  ];


  return{
    items
  };
}());