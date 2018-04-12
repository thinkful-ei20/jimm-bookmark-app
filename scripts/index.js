'use strict';
/* global store bookmarks api */

$(document).ready(function() {
  //bookmarks.render();
  api.getItems((items) => {
    items.forEach((item) => store.addItem(item));

    bookmarks.render();
  });
  bookmarks.bindEventListeners();
});