// In SetupUserInterface procedure, we first set up the data management context by retrieving all book data
// from the database and then fill the table by creating a table row for each book object from Book.instances
pl.v.retrieveAndListAllBooks = {
  setupUserInterface: function () {
    var i=0, book=null, row={}, key="", 
        keys = Object.keys( Book.instances),
        tableBodyEl = document.querySelector("table#books>tbody");
    for (let i=0; i < keys.length; i++) {
      key = keys[i];
      book = Book.instances[key];
      row = tableBodyEl.insertRow(-1);
      row.insertCell(-1).textContent = book.isbn;
      row.insertCell(-1).textContent = book.title;
      row.insertCell(-1).textContent = LanguageEL.labels[book.originalLanguage-1];
      row.insertCell(-1).textContent = LanguageEL.convertEnumIndexes2Names( 
          book.otherAvailableLanguages);
      row.insertCell(-1).textContent = BookCategoryEL.labels[book.category-1];
      row.insertCell(-1).textContent = PublicationFormEL.convertEnumIndexes2Names( 
          book.publicationForms);
    }
  }
};