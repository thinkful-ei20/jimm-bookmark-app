'use strict';
/* global store api */

// eslint-disable-next-line no-unused-vars
const bookmarks = (function(){

  function render(){
    let controls = '';
    if(store.mainControlsExpanded){
      controls += `
      <form>
        <button class="js-cancel-add">Cancel</button>
        <button class="js-submit-add" type="submit">Submit</button>
        <div>
          <label for="bookmark-title-entry">Title</label>
          <input type="text" name="bookmark-title-entry" class="js-bookmark-title-entry" placeholder="e.g. Netflix" required>
          <label for="bookmark-rating-entry">Rating</label>
          <input type="number" min="1" max="5" value="1" name="bookmark-rating-entry" class="js-bookmark-rating-entry">
        </div>
        <div>
          <label for="bookmark-url-entry">url :</label>
          <input type="url" name="bookmark-url-entry" class="js-bookmark-url-entry" placeholder="http://www.example.com" required>
        </div>
        <div>
          <label for="bookmark-description-entry">Description</label>
          <textarea name="bookmark-description-entry" class="js-bookmark-desc-entry" rows="3" cols="50"></textarea>
        </div>
      </form>`;
    } else if(!store.mainControlsExpanded) {
      controls += `
      <button class="js-expand-add">Add Bookmark</button>
      <label for="min-rating-selector">Min. Rating</label>
      <select name="min-rating-selector" class="js-min-rating-selector">
        <option value=0>Show All</option>
        <option value=5>5</option>
        <option value=4>4</option>
        <option value=3>3</option>
        <option value=2>2</option>
      </select>`;
    }
    
    let listItems = '';
    for(let i = 0; i < store.items.length; i++){
      if(store.items[i].rating >= store.minRating){
        listItems += `<li class="js-bookmark-element" data-id="${store.items[i].id}">${generateHtmlLi(store.items[i])}</li>`;
      }
    }
    //$('.js-main-controls').html(controls);
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
        <span>${element.desc}</span>
        <button class="js-delete-button">Delete</button>
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

  //MOVE THIS TO STORE AND RENDER
  function handleAddBookmarkExpanded(){
    $('.js-main-controls').on('click', '.js-expand-add' ,function(){
      console.log('button to expand clicked');
      $('.js-main-controls').html(`
        <form>
          <button class="js-cancel-add">Cancel</button>
          <button class="js-submit-add" type="submit">Submit</button>
          <div>
            <label for="bookmark-title-entry">Title</label>
            <input type="text" name="bookmark-title-entry" class="js-bookmark-title-entry" placeholder="e.g. Netflix" required>
            <label for="bookmark-rating-entry">Rating</label>
            <input type="number" min="1" max="5" value="1" name="bookmark-rating-entry" class="js-bookmark-rating-entry">
          </div>
          <div>
            <label for="bookmark-url-entry">url :</label>
            <input type="url" name="bookmark-url-entry" class="js-bookmark-url-entry" placeholder="http://www.example.com" required>
          </div>
          <div>
            <label for="bookmark-description-entry">Description</label>
            <textarea name="bookmark-description-entry" class="js-bookmark-desc-entry" rows="3" cols="50"></textarea>
          </div>
        </form>`);
    });
  }

  function handleCancelAddBookmark(){
    $('.js-main-controls').on('click', '.js-cancel-add', function(){
      $('.js-main-controls').html(`
        <button class="js-expand-add">Add Bookmark</button>
        <label for="min-rating-selector">Min. Rating</label>
        <select name="min-rating-selector" class="js-min-rating-selector">
          <option value=0>Show All</option>
          <option value=5>5</option>
          <option value=4>4</option>
          <option value=3>3</option>
          <option value=2>2</option>
        </select>`);

    });
  }

  function handleNewBookmarkFormSubmit(){
    $(document).on('click', '.js-submit-add', function(event){
      event.preventDefault();
      const createdName = $('.js-bookmark-title-entry').val();
      const createdRating = $('.js-bookmark-rating-entry').val();
      const createdURL = $('.js-bookmark-url-entry').val();
      const createdDesc = $('.js-bookmark-desc-entry').val();
      api.createItem(createdName, createdDesc, createdURL, createdRating, (newItem) => {
        store.addItem(newItem);
        store.setError(null);
        render();
      });
    });
  }
  
  function handleBookmarkDelete(){
    $(document).on('click', '.js-delete-button', function(event){
      const id = getIdFromElement(event.currentTarget);
      console.log(id);
      api.deleteItem(id, store.findAndDelete(id));
      store.setError(null);
      render();
    });
  }

  function handleMinValueChange(){
    $(document).on('change', '.js-min-rating-selector', function(event){
      const newMinRating = $(event.currentTarget).val();
      console.log(`min value changed to ${newMinRating}`);
      store.setMinRating(newMinRating);
      render();
    });
  }


  function bindEventListeners(){
    handleShowMoreClicked();
    handleAddBookmarkExpanded();
    handleCancelAddBookmark();
    handleNewBookmarkFormSubmit();
    handleBookmarkDelete();
    handleMinValueChange();
  }

  return{
    render,
    bindEventListeners,
  };
}());

