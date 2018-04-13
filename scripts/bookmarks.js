'use strict';
/* global store api */

// eslint-disable-next-line no-unused-vars
const bookmarks = (function(){

  function renderList(){
    let listItems = '';
    for(let i = 0; i < store.items.length; i++){
      if(store.items[i].rating >= store.minRating){
        listItems += `<li class="js-bookmark-element" data-id="${store.items[i].id}">${generateHtmlLi(store.items[i])}</li>`;
      }
    }
    $('.js-bookmarks-list').html(listItems);
  }

  function renderError(){
    let errorHtml = '';
    if(store.error !== null){
      errorHtml += `
        <p>A new bookmark must contain a title and a url.</p>
      `;
      store.setError(null);
    }
    $('.js-error-display').html(errorHtml);
  }

  function renderControls(){
    let controls = '';
    if(store.mainControlsExpanded){
      controls += `
      <form name="add-new-bookmark-controls">
        <button class="js-cancel-add">Close</button>
        <button class="js-submit-add" type="submit">Submit</button>
        <div>
          <label for="bookmark-title-entry">Title
          <input type="text" name="bookmark-title-entry" class="js-bookmark-title-entry" placeholder="e.g. Netflix" required>
          </label>
          <label for="bookmark-rating-entry">Rating
          <input type="number" min="1" max="5" value="1" name="bookmark-rating-entry" class="js-bookmark-rating-entry">
          </label>
        </div>
        <div>
          <label for="bookmark-url-entry">url :
          <input type="url" name="bookmark-url-entry" class="js-bookmark-url-entry" placeholder="http://www.example.com" required>
          </label>
        </div>
        <div>
          <label for="bookmark-description-entry">Description
          <textarea name="bookmark-description-entry" class="js-bookmark-desc-entry" rows="3" cols="50"></textarea>
          </label>
        </div>
      </form>`;
    } else {
      controls += `
      <button class="js-expand-add">Add Bookmark</button>
      <label for="min-rating-selector">Min. Rating
      <select name="min-rating-selector" class="js-min-rating-selector">
        <option value=0>Show All</option>
        <option value=5>5</option>
        <option value=4>4</option>
        <option value=3>3</option>
        <option value=2>2</option>
      </select>
      </label>`;
    }
    $('.js-main-controls').html(controls);
    $('.js-min-rating-selector').val(store.minRating);
  }
  
  
  function renderAll(){
    renderControls();
    renderError();
    renderList();
  }

  /*Creates a <li>
   *@example  
   *@returns {String} 
  */
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
      renderList();
    });
  }

  function handleAddBookmarkExpanded(){
    $('.js-main-controls').on('click', '.js-expand-add' ,function(){
      console.log('button to expand clicked');
      store.setMainControlsExpanded(true);
      renderControls();
    });
  }

  function handleCancelAddBookmark(){
    $('.js-main-controls').on('click', '.js-cancel-add', function(){
      store.setMainControlsExpanded(false);
      store.setError(null);
      renderControls();
      renderError();
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
        renderAll();
      });
    });
  }
  
  function handleBookmarkDelete(){
    $(document).on('click', '.js-delete-button', function(event){
      const id = getIdFromElement(event.currentTarget);
      api.deleteItem(id, store.findAndDelete(id));
      store.setError(null);
      renderList();
    });
  }

  function handleMinValueChange(){
    $(document).on('change', '.js-min-rating-selector', function(event){
      const newMinRating = $(event.currentTarget).val();
      store.setMinRating(newMinRating);
      renderList();
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
    renderAll,
    renderControls,
    renderError,
    renderList,
    bindEventListeners,
  };
}());

