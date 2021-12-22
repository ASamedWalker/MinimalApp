// This code contains two procedures
// (firstly)SetupUserInterface which takes care of retrieving the collection of all objects from the persistent data store
// And setting up the event handler(handleSaveButtonClickEvent) on the save button for handling click button
// events by saving the user input data.

// (secondly) handleSaveButtonClickEvent reads the user input data from the form fields and then saves
// this data by calling Book.add procedure.

pl.v.createBook = {
  setupUserInterface: function () {
    let saveButton = document.forms["Book"].commit;
    // load all book objects
    Book.retrieveAll();
    // set an event handler for the save/submit button
    saveButton.addEventListener(
      "click",
      pl.v.createBook.handleSaveButtonClickEvent
    );
    // handle the event when the browser window/tab is closed
    window.addEventListener("beforeunload", Book.saveAll);
  },

  handleSaveButtonClickEvent: function () {
    let formEl = document.forms["Book"];
    let slots = {
      isbn: formEl.isbn.value,
      title: formEl.title.value,
      year: formEl.year.value,
    };
    Book.add(slots);
    formEl.reset();
  },
};
