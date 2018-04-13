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

  function handleAddBookmarkExpanded(){
    $('.js-main-controls').on('click', '.js-expand-add' ,function(){
      console.log('button to expand clicked');
      $('.js-main-controls').html(`
        <form>
          <button class="js-cancel-add">Cancel</button>
          <button class="js-submit-add" type="submit">Submit</button>
          <div>
            <label for="bookmark-title-entry">Title</label>
            <input type="text" name="bookmark-title-entry" class="js-bookmark-title-entry" placeholder="e.g. Mozilla Array.find() Docs" required>
            <label for="bookmark-rating-entry">Rating</label>
            <input type="number" name="bookmark-rating-entry" class="js-bookmark-rating-entry">
          </div>
          <div>
            <label for="bookmark-url-entry">url :</label>
            <input type="url" name="bookmark-url-entry" class="js-bookmark-url-entry" placeholder="http://www.example.com">
          </div>
          <div>
            <label for="bookmark-description-entry">Description</label>
            <textarea name="bookmark-description-entry" rows="3" cols="50"></textarea>
          </div>
        </form>`);
    });
  }

  function handleCancelAddBookmark(){
    $('.js-main-controls').on('click', '.js-cancel-add', function(){
      $('.js-main-controls').html('<button class="js-expand-add">Add Bookmark</button>');
    });
  }

  function handleNewBookmarkFormSubmit(){
    $('.js-main-controls').on('click', '.js-submit-add', function(event){
      event.preventDefault();
    });
  }



  function bindEventListeners(){
    handleShowMoreClicked();
    handleAddBookmarkExpanded();
    handleCancelAddBookmark();
    handleNewBookmarkFormSubmit();

  }

  return{
    render,
    bindEventListeners,
  };
}());

