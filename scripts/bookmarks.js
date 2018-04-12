'use strict';
/* global store api */

// eslint-disable-next-line no-unused-vars
const bookmarks = (function(){

  function render(){
    let listItems = '';
    for(let i = 0; i < store.items.length; i++){
      listItems += `<li class="js-bookmark-element" data-id="${store.items[i].id}">${generateHtmlLi(store.items[i])}</li>`;
    }

    $('.js-bookmarks-list').html(listItems);
  }

  function generateHtmlLi(element){
    
    let expanded = false;
    if(store.expandedIds.find(function(id){
      if(id === element.id){return true;}
    })){
      expanded = true;
    }

    let liString = `
    <div class="unexpanded-bookmark-contents">
      <span class="bookmark-title">${element.title}</span>
      <span>Rating: ${element.rating}/5</span>
      <span class="bookmark-control">  
        <button class="show-more-button">
          <span class="button-label">${expanded ? 'show less' : 'show more'}</span>
        </button>
      </span>  
    </div>`;
    if(expanded){
      liString += `
      <div class="expanded-bookmark-contents">
        <span>${element.description}</span>
        <span class="link"><a href="${element.url}" target="_blank">Link</a></span>
      </div>`;
    }

    return liString;
  }

  function getIdFromElement(element){
    return $(element).closest('.js-bookmark-element').data('id');
  }

  function handleShowMoreClicked(){
    $('.js-bookmarks-list').on('click', '.show-more-button', event =>{
      const id = getIdFromElement(event.currentTarget);
      if(store.isIdExpaneded(id)){
        store.removeFromExpanded(id);
      } else {
        store.expandedIds.push(id);
      }
      store.setError(null);
      render();
    });
  }

  function bindEventListeners(){
    handleShowMoreClicked();
  }

  return{
    render,
    bindEventListeners,
  };
}());

