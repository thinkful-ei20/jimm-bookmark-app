'use strict';
/*global */

// eslint-disable-next-line no-unused-vars
const store = (function(){
  let items = [
    //{title: 'bookmark 1', id: 1, rating: 4, url: 'http://example.com', desc: 'Lorem Ipsum',},
    //{title: 'bookmark 2', id: 2, rating: 3, url: 'http://example.com', desc: 'Dolar Sit',}
  ];

  let expandedIds = ['cjfwxxod8002m0kz5kv4p1k4d'];

  let error = null;

  let minRating = 0;

  function setError(e){
    this.error = e;
  }

  const isIdExpaneded = function(id){
    if(this.expandedIds.find(idInArr => {if(idInArr === id){return true;}})){
      return true;
    } else {
      return false;
    }  
  };

  const removeFromExpanded = function(id){
    this.expandedIds = this.expandedIds.filter(expandedId => expandedId !== id);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const addItem = function(item) {
    this.items.push(item);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const findAndUpdate = function(id,newData){
    let found = this.items.find(item => {
      if(item.id === id)
        return item;
    });
    Object.assign(found,newData);
  };

  const setFilterMinimumRating = function(rating){
    this.minRating = rating;
  };



  return{
    items,
    addItem,
    expandedIds,
    findById,
    findAndDelete,
    findAndUpdate,
    error,
    setError,
    setFilterMinimumRating,
    isIdExpaneded,
    removeFromExpanded,
  };
}());