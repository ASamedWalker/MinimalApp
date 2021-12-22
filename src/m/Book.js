function Book(slots) {
  this.isbn = slots.isbn;
  this.title = slots.title;
  this.year = slots.year;
}

Book.instances = {};

// Creating a new Book Instances
Book.add = function (slots) {
  let book = new Book(slots);
  Book.instances[slots.isbn] = book;
  console.log("Book " + slots.isbn + " created!");
};

// Loading All Book Instances
// Loading Book records to the local Storage involves three steps
// (Firstly)Retrieving the book table that has been stored as large string
// with the key "books" from the Local Storage with the help of the assignment
// booksString = localStorage["books"];

// This process called de-serializes.
// (Secondly)Converting the book table string into a corresponding entity table books with rows as elements
// wit the help of the built-in procedure JSON.parse. A procedure known as de-Serialization
// books = JSON.parse(booksString);

//(Thirdly) Converting each row of books, representing a record, into a corresponding object of type Book
// stored as an element of the entity table Book.instances, with the help of the procedure
// convertRec2Obj defined as a static method in the Book class:
Book.convertRec2Obj = function (bookRow) {
  let book = new Book(bookRow);
  return book;
};

Book.retrieveAll = function () {
  let key = "",
    keys = [],
    booksString = "",
    books = {};
  // We perform this code in a try-catch block because
  // we assume the operation like the localStorage["books"] might fail.
  try {
    if (localStorage.getItem("books")) {
      booksString = localStorage.getItem("books");
    }
  } catch (e) {
    alert("Error when reading from Local Storage\n" + e);
  }
  if (booksString) {
    books = JSON.parse(booksString);
    keys = Object.keys(books);
    console.log(keys.length + " books loaded.");
    for (let values of keys) {
      key = values;
      Book.instances[key] = Book.convertRec2Obj(books[key]);
    }
  }
};

//Updating a Book Instance
// For updating an existing Book instance, we retrieve it from Book.instances, and then re-assign those attributes
// the value of which has changed
Book.update = function (slots) {
  let book = Book.instances[slots.isbn];
  let year = parseInt(slots.year);
  if (book.title !== slots.title) {
    book.title = slots.title;
  }
  if (book.year !== year) {
    book.year = year;
  }
  console.log("Book " + slots.isbn + " modified!");
};

//Deleting a Book Instances
// We delete a book instance from the entity table Book,instances by first testing if the table has row with the given key
// Afterwards, we delete a slot from an object, or an entry from a map
Book.destroy = function (isbn) {
  if (Book.instances[isbn]) {
    console.log("Book " + isbn + " deleted");
    delete Book.instances[isbn];
  } else {
    console.log("There is no book with ISBN " + isbn + " in the database!");
  }
};

// Saving all Book Instances
// Saving all book objects from Book.instances collection in main memory to Local Storage in secondary memory invloves two steps:
//(firstly) Converting the entity table Book.instances into a string with the help of the predefined JS procedure JSON.stringify:
// This process is called serialization
// booksString = JSON.stringify(Book.instances);

// (secondly) Writing the resulting string as the value of the key "books" to Local Storage:
// localStorage["books"] = booksString;

Book.saveAll = function () {
  let booksString = "",
    error = false,
    nmrOfBooks = Object.keys(Book.instances).length;
  try {
    booksString = JSON.stringify(Book.instances);
    localStorage.setItem("books", booksString);
  } catch (e) {
    alert("Error when reading from Local Storage\n" + e);
    error = true;
  }
  if (!error) {
    console.log(nmrOfBooks + " books saved.");
  }
};

// Creating Test Data
// For being able to test our code, we may create some test data and save it in out Local Storage Database

Book.generateTestData = function () {
  Book.instances["006251587X"] = new Book({
    isbn: "006251587X",
    title: "Weaving the Web",
    year: 2000,
  });
  Book.instances["0465026567"] = new Book({
    isbn: "0465026567",
    title: "Godel, Escher, Bach",
    year: 1999,
  });
  Book.instances["0465030793"] = new Book({
    isbn: "0465030793",
    title: "I Am A Strange Loop",
    year: 2008,
  });
  Book.saveAll();
};

// Clearing all Data
// This procedure clears all data from Local Storage:
Book.clearData = function () {
  if (confirm("Do you really want to delete all book data?")) {
    Book.instances = {};
    localStorage.setItem("books", "{}");
  }
};
