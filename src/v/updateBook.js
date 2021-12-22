/* 
 We have a selection field for choosing the book to be updated,
 An output field for the standard identifier attribute isbn,
 An input field for each attribute of the Book class that can be updated,
 An output field for the standard identifier attribute, we do not allow changing 
 the standard identifier of an existing object.
*/

pl.v.updateBook = {
  setupUserInterface: function () {
    let formEl = document.forms["Book"],
      saveButton = formEl.commit,
      selectBookEl = formEl.selectBook;

    let key = "",
      keys = [],
      book = null,
      i = 0,
      optionEl = null;
    Book.retrieveAll();
    // populate the selection list with books
    keys = Object.keys(Book.instances);
    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      book = Book.instances[key];
      optionEl = document.createElement("option");
      optionEl.text = book.title;
      optionEl.value = book.isbn;
      selectBookEl.add(optionEl, null);
    }
    // When a book is selected, populate the form
    selectBookEl.addEventListener(
      "change",
      pl.v.updateBook.handleBookSelectionEvent
    );

    // Set an event handler for the submit/save button
    saveButton.addEventListener(
      "click",
      pl.v.updateBook.handleSaveButtonClickEvent
    );

    //handle the event when the browser window/tab is closed
    window.addEventListener("beforeunload", Book.saveAll);
  },

  //  A book selection event is caught via a listener for change events on the select element
  //  When a book is selected, the form is filled with its data
  handleBookSelectionEvent: function () {
    let formEl = document.forms["Book"];
    let selectBookEl = formEl.selectBook,
      book = null,
      key = selectBookEl.value;
    if (key) {
      book = Book.instances[key];
      formEl.isbn.value = book.isbn;
      formEl.title.value = book.title;
      formEl.year.value = book.year;
    } else {
      formEl.reset();
    }
  },

  // When the save button is activated,
  //  a slots record is created from the form field values and,
  // used as the argument for calling Book.update:

  handleSaveButtonClickEvent: function () {
    let formEl = document.forms["Book"];
    let slots = {
      isbn: formEl.isbn.value,
      title: formEl.title.value,
      year: formEl.year.value,
    };
    Book.update(slots);
    formEl.reset();
  },
};
