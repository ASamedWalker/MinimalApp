// In SetupUserInterface procedure, we first set up the data management context by retrieving all book data
// from the database and then fill the table by creating a table row for each book object from Book.instances
pl.v.retrieveAndListAllBooks = {
  setupUserInterface: function () {
    let tableBodyE1 = document.querySelector("table#books > tbody");
    let keys = [],
      key = "",
      row = {};
    // load all book objects
    Book.retrieveAll();
    keys = Object.keys(Book.instances);

    //for each book, create a table row with cells for the 3 attributes
    /*More specifically, the procedure setupUserInterface creates the view table in a loop over all objects of Book.instances. 
        In each step of this loop, a new row is created in the table body element with the help of the JavaScript DOM operation insertRow(), 
        and then three cells are created in this row with the help of the DOM operation insertCell(): 
        the first one for the isbn property value of the book object, 
        and the second and third ones for its title and year property values. 
        Both insertRow and insertCell have to be invoked with the argument -1 for 
        making sure that new elements are appended to the list of rows and cells. 
        */
    for (let values of keys) {
      key = values;
      row = tableBodyE1.insertRow();
      row.insertCell(-1).textContent = Book.instances[key].isbn;
      row.insertCell(-1).textContent = Book.instances[key].title;
      row.insertCell(-1).textContent = Book.instances[key].year;
    }
  },
};
