'use strict';
/* global store*/

// eslint-disable-next-line no-unused-vars
const api = (function(){
  const BASE_URL = ' https://thinkful-list-api.herokuapp.com/jimmlusk/bookmarks';

  function getItems(callback){
    $.getJSON(`${BASE_URL}`,callback);
  }

  function createItem(name, description, url, rating, callback){
    let newItem =JSON.stringify({
      title : name,
      desc: description,
      url: url,
      rating: rating,
    });
    $.ajax({
      url : `${BASE_URL}`,
      method : 'POST',
      data : newItem,
      contentType : 'application/json',
      success : callback,
      error : (e) => {
        store.setError(e);
      },
    });    
  }

  function updateItem(id,updateData,callback){
    $.ajax({
      url : `${BASE_URL}/${id}`,
      method : 'PATCH',
      data : JSON.stringify(updateData),
      contentType : 'application/json',
      success : callback,
      error : (response) => {
        store.setError(response);
      },
    });
  }

  function deleteItem(id, callback){
    $.ajax({
      url : `${BASE_URL}/${id}`,
      method : 'DELETE',
      success : callback,
      error : (response) => {
        store.setError(response);
      },
    });
  }



  return{
    getItems,
    createItem,
    deleteItem,
    updateItem,
  };
}());