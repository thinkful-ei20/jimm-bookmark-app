'use strict';
/*global */

// eslint-disable-next-line no-unused-vars
const store = (function(){
  let items = [
    //{title: 'bookmark 1', id: 1, rating: 4, url: 'http://example.com', desc: 'Lorem Ipsum',},
    //{title: 'bookmark 2', id: 2, rating: 3, url: 'http://example.com', desc: 'Dolar Sit',}
  ];

  let expandedIds = ['cjfwxxod8002m0kz5kv4p1k4d'];

  const addItem = function(item) {
    this.items.push(item);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
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



  return{
    items,
    addItem,
    expandedIds,
    findById,
    findAndDelete,
    findAndUpdate
  };
}());