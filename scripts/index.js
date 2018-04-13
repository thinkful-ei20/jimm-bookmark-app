'use strict';
/* global store bookmarks api */

$(document).ready(function() {
  api.getItems((items) => {
    items.forEach((item) => store.addItem(item));
    bookmarks.renderAll();
  });
  bookmarks.bindEventListeners();
});