/*
Like in the Update case, the setupUserInterface procedure in the view code in src/v/deleteBook.js loads 
the book data into main memory, populates the book selection list and adds some event listeners. 
The event handler for Delete button click events.
 */

pl.v.deleteBook = {
  setupUserInterface: function () {
    let formEl = document.forms["Book"],
      deleteButton = formEl.commit,
      selectEl = formEl.selectBook;

    let key = "",
      keys = [],
      i = 0,
      book = null,
      optionEl = null;

    Book.retrieveAll();

    // populate the selection of the book to delele form the list of books
    keys = Object.keys(Book.instances);
    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      book = Book.instances[key];
      optionEl = document.createElement("option");
      optionEl.text = book.title;
      optionEl.value = book.isbn;
      selectEl.add(optionEl, null);
    }

    // Set an event handler for delete button\
    deleteButton.addEventListener(
      "click",
      pl.v.deleteBook.handleDeleteButtonClickEvent
    );

    //  handle the event when the browser window/tab is closed
    window.addEventListener("beforeunload", Book.saveAll);
  },

  handleDeleteButtonClickEvent: function () {
    let selectEl = document.forms["Book"].selectBook;
    let isbn = selectEl.value;
    if (isbn) {
      Book.destroy(isbn);
      // remove deleted book from select options
      selectEl.remove(selectEl.selectedIndex);
    }
  },
};
