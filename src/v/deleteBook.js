/*
Like in the Update case, the setupUserInterface procedure in the view code in src/v/deleteBook.js loads 
the book data into main memory, populates the book selection list and adds some event listeners. 
The event handler for Delete button click events.
 */

pl.v.deleteBook = {
  /**
   * Initialize the deleteBook form
   */
  setupUserInterface: function () {
    var formEl = document.forms['Book'],
        deleteButton = formEl.commit,
        selectBookEl = formEl.selectBook;
    // set up the book selection list
    util.fillSelectWithOptions( selectBookEl, Book.instances, 
        {keyProp:"isbn", displayProp:"title"});
    // Set an event handler for the submit/delete button
    deleteButton.addEventListener("click", function () {
        var isbn = selectBookEl.value;
        if (isbn) {
          Book.destroy( isbn);
          // remove deleted book from select options
          selectBookEl.remove( selectBookEl.selectedIndex);
        }
    });
    // Set a handler for the event when the browser window/tab is closed
    window.addEventListener("beforeunload", Book.saveAll);
  }
};