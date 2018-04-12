'use strict';
/* global store api */

// eslint-disable-next-line no-unused-vars
const bookmarks = (function(){

  function render(){
    let listItems = '';
    for(let i = 0; i < store.items.length; i++){
      listItems += `<li>${generateHtmlLi(store.items[i])}</li>`;
    }

    $('.js-bookmarks-list').html(listItems);
  }

  function generateHtmlLi(element){
    let liString = `
    <div class="unexpanded-bookmark-contents">
      <span class="bookmark-title">${element.name}</span>
      <span>Rating: ${element.rating}/5</span>
      <span class="bookmark-control">  
        <button class="show-more-button">
          <span class="button-label">${element.expanded ? 'show less' : 'show more'}</span>
        </button>
      </span>  
    </div>`;
    if(element.expanded){
      liString += `
      <div class="expanded-bookmark-contents">
        <span>${element.description}</span>
        <span class="link"><a href="${element.url}">Link</a></span>
      </div>`;
    }

    return liString;
  }

  return{
    render,
  };
}());

