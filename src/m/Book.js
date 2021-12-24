
var LanguageEL = new Enumeration({"en":"English", "de":"German",
    "fr":"French","es":"Spanish"});
var BookCategoryEL = new Enumeration(["novel","biography",
    "textbook","other"]);
var PublicationFormEL = new Enumeration(["hardcover","paperback",
    "ePub","PDF"]);


class Book {
  #isbn = null;
  #title = null ;
  #originalLanguage = null;
  #otherAvailableLanguages = null;
  #category = null;
  #publicationForms = null;

  constructor(slots) {
    this.isbn = "";
    this.title = "";
    this.originalLanguage = 0;  // enum value (from LanguageEL)
    this.otherAvailableLanguages = [];  // list of enum values
    this.category = 0;  // number (from BookCategoryEL)
    this.publicationForms = []; 

     if (typeof slots === "object" && Object.keys( slots).length > 0) {
      // assign properties by invoking implicit setters
      this.isbn = slots.isbn;
      this.title = slots.title;
      this.originalLanguage = slots.originalLanguage;
      this.otherAvailableLanguages = slots.otherAvailableLanguages;
      this.category = slots.category;
      this.publicationForms = slots.publicationForms;
    }
  }

  get isbn() {
    return this._isbn;
  }

  static checkIsbn( isbn) {
    if (!id) {
      return new NoConstraintViolation();
    } else if (typeof id !== "string" || id.trim() === "") {
      return new RangeConstraintViolation('The ISBN must be a non-empty string!');
    } else if (!/\b\d{9}(\d|X)\b/.test( id)) {
      return new PatternConstraintViolation('The ISBN must be a 10-digit string or' + 'a 9-digit string followed by "X"!')
    } else {
      return new NoConstraintViolation();
    }
  }

  static checkIsbnAsId( isbn) {
    var constraintViolation = Book.checkIsbn(id);
      if ((constraintViolation instanceof NoConstraintViolation)) {
        if (!id) {
          constraintViolation = new MandatoryValueConstraintViolation("A value for the ISBN must be provided!");
        } else if (Book.instances[id]) {
          constraintViolation = new UniquenessConstriantViolation("There is already a book record with this ISBN!");
        } else {
          constraintViolation = new NoConstraintViolation();
        }
      }
    return constraintViolation;
  }

  set isbn(n) {
    var validationResult = Book.checkIsbnAsId(n);
    if (validationResult instanceof NoConstraintViolation) {
      this.#isbn = n;
    } else {
      throw validationResult;
    }
  }
   get title() {
    return this._title;
  }
  static checkTitle( t) {
    if (t === undefined || t === "") {
      return new MandatoryValueConstraintViolation(
          "A title must be provided!");
    } else if (!util.isNonEmptyString(t)) {
      return new RangeConstraintViolation(
          "The title must be a non-empty string!");
    } else {
      return new NoConstraintViolation();
    }
  }
  set title( t) {
    const validationResult = Book.checkTitle( t);
    if (validationResult instanceof NoConstraintViolation) {
      this._title = t;
    } else {
      throw validationResult;
    }
  }
  get originalLanguage() {
    return this._originalLanguage;
  }
  static checkOriginalLanguage( ol) {
    if (ol === undefined || ol === "") {
      return new MandatoryValueConstraintViolation(
          "An original language must be provided!");
    } else if (!util.isIntegerOrIntegerString(ol) ||
        parseInt(ol) < 1 || parseInt(ol) > LanguageEL.MAX) {
      return new RangeConstraintViolation(
          "Invalid value for original language: "+ ol);
    } else {
      return new NoConstraintViolation();
    }
  }
  set originalLanguage( ol) {
    const validationResult = Book.checkOriginalLanguage( ol);
    if (validationResult instanceof NoConstraintViolation) {
      this._originalLanguage = parseInt( ol);
    } else {
      throw validationResult;
    }
  }
  get otherAvailableLanguages() {
    return this._otherAvailableLanguages;
  }
  static checkOtherAvailableLanguage( oLang) {
    if (!Number.isInteger( oLang) || oLang < 1 ||
        oLang > LanguageEL.MAX) {
      return new RangeConstraintViolation(
          "Invalid value for other available language: "+ oLang);
    } else {
      return new NoConstraintViolation();
    }
  }
  static checkOtherAvailableLanguages( oLangs) {
    if (oLangs == undefined || (Array.isArray( oLangs) &&
        oLangs.length === 0)) {
      return new NoConstraintViolation();  // optional
    } else if (!Array.isArray( oLangs)) {
      return new RangeConstraintViolation(
          "The value of otherAvailableLanguages must be a list/array!");
    } else {
      for (let i=0; i < oLangs.length; i++) {
        const constraintViolation = Book.checkOtherAvailableLanguage( oLangs[i]);
        if (!(constraintViolation instanceof NoConstraintViolation)) {
          return constraintViolation;
        }
      }
      return new NoConstraintViolation();
    }
  }
  set otherAvailableLanguages( oLangs) {
    const constraintViolation = Book.checkOtherAvailableLanguages( oLangs);
    if (constraintViolation instanceof NoConstraintViolation) {
      this._otherAvailableLanguages = oLangs;
    } else {
      throw constraintViolation;
    }
  }
  get category() {
    return this._category;
  }
  static checkCategory( c) {
    if (c === undefined || c === "") {
      return new MandatoryValueConstraintViolation(
          "A category must be provided!");
    } else if (!util.isIntegerOrIntegerString(c) || parseInt(c) < 1 ||
        parseInt(c) > BookCategoryEL.MAX) {
      return new RangeConstraintViolation(
          "Invalid value for category: "+ c);
    } else {
      return new NoConstraintViolation();
    }
  }
  set category( c) {
    const validationResult = Book.checkCategory( c);
    if (validationResult instanceof NoConstraintViolation) {
      this._category = parseInt( c);
    } else {
      throw validationResult;
    }
  }
  get publicationForms() {
    return this._publicationForms;
  }
  static checkPublicationForm( p) {
    if (p === undefined) {
      return new MandatoryValueConstraintViolation(
          "No publication form provided!");
    } else if (!Number.isInteger( p) || p < 1 ||
        p > PublicationFormEL.MAX) {
      return new RangeConstraintViolation(
          "Invalid value for publication form: "+ p);
    } else {
      return new NoConstraintViolation();
    }
  }
  static checkPublicationForms( pubForms) {
    if (pubForms === undefined || (Array.isArray( pubForms) &&
        pubForms.length === 0)) {
      return new MandatoryValueConstraintViolation(
          "No publication form provided!");
    } else if (!Array.isArray( pubForms)) {
      return new RangeConstraintViolation(
          "The value of publicationForms must be an array!");
    } else {
      for (let i=0; i < pubForms.length; i++) {
        const validationResult = Book.checkPublicationForm( pubForms[i]);
        if (!(validationResult instanceof NoConstraintViolation)) {
          return validationResult;
        }
      }
      return new NoConstraintViolation();
    }
  }
  set publicationForms( pubForms) {
    const constraintViolation = Book.checkPublicationForms( pubForms);
    if (constraintViolation instanceof NoConstraintViolation) {
      this._publicationForms = pubForms;
    } else {
      throw constraintViolation;
    }
  }
  /*********************************************************
   ***  Other Instance-Level Methods  ***********************
   **********************************************************/
  toString() {
    return "Book{ ISBN:"+ this.isbn +", title:"+ this.title +
        ", originalLanguage:"+ this.originalLanguage +
        ", otherAvailableLanguages:"+
        this.otherAvailableLanguages.toString() +
        ", category:"+ this.category +
        ", publicationForms:"+
        this.publicationForms.toString() +"}";
  }
}


Book.instances = {};


Book.add = function (slots) {
  var book = null;
  try {
    book = new Book(slots);
  } catch (e) {
    console.log(e.contructor.name +": "+ e.message);
    book = null;
  }
  if (book) {
        // add book to the collection of Book.instances
    Book.instances[slots.isbn] = book;
    console.log("Book " + slots.isbn + " created!");
  }
};

Book.convertRec2Obj = function (bookRow) {
  var book={};
  try {
    book = new Book( bookRow);
  } catch (e) {
    console.log( e.constructor.name + 
        " while deserializing a book row: " + e.message);
  }
  return book;
};

Book.retrieveAll = function() {
  var key="", keys=[], i=0,
  booksString="", books={};
  try {
    if (localStorage["books"]) booksString = localStorage["books"];
  } catch (e) {
    alert("Error when reading from the Local Storage\n" + e);
  }
  if (booksString) {
    books = JSON.parse(booksString);
    keys = Object.keys(books);
    console.log(keys.length + " books loaded");
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      Book.instances[key] = Book.convertRec2Obj( books[key]);
    }
  }
};

Book.update = function (slots) {
  var book = Book.instances[slots.isbn],
      noConstraintViolated = true,
      updatedProperties = [],
      objectBeforeUpdate = util.cloneObject( book);
  try {
    if (book.title !== slots.title) {
      book.setTitle( slots.title);
      updatedProperties.push("title");
    }
    if (book.year !== parseInt(slots.year)) {
      book.setYear( slots.year);
      updatedProperties.push("year");
    }
    if (slots.edition && slots.edition !== book.edition) {
      // slots.edition has a non-empty value that is new
      book.setEdition( slots.edition);
      updatedProperties.push("edition");
    } else if (!slots.edition && book.edition !== undefined) {
      // slots.edition has an empty value that is new
      delete book.edition;
      updatedProperties.push("edition");
  }
  } catch (e) {
    console.log( e.constructor.name +": "+ e.message);
    noConstraintViolated = false;
    // restore object to its state before updating
    Book.instances[slots.isbn] = objectBeforeUpdate;
  }
  if (noConstraintViolated) {
    if (updatedProperties.length > 0) {
      console.log("Properties " + updatedProperties.toString() + 
          " modified for book " + slots.isbn);
    } else {
      console.log("No property value changed for book " + slots.isbn + " !");      
    }
  }
};

Book.destroy = function (isbn) {
  if (Book.instances[isbn]) {
    console.log("Book " + isbn + " deleted");
    delete Book.instances[isbn];
  } else {
    console.log("There is no book with ISBN " + isbn + " in the database!");
  }
};

Book.saveAll = function () {
  var booksString="", error=false,
  nmrOfBooks = Object.keys(Book.instances).length;
  try {
    booksString = JSON.stringify(Book.instances);
    localStorage["books"] = booksString;
  } catch (e) {
    alert("Error when writing to Local Storage\n" + e);
    error = true;
  }
  if (!error) console.log( nmrOfBooks + " books saved");
};


Book.createTestData = function () {
  try {
    Book.instances["006251587X"] = new Book({isbn:"006251587X", 
        title:"Weaving the Web", originalLanguage:LanguageEL.EN, 
        otherAvailableLanguages:[LanguageEL.DE,LanguageEL.FR], 
        category:BookCategoryEL.NOVEL, 
        publicationForms: 
            [PublicationFormEL.EPUB,PublicationFormEL.PDF]});
    Book.instances["0465026567"] = new Book({isbn:"0465026567", 
        title:"Gödel, Escher, Bach", originalLanguage:LanguageEL.DE, 
        otherAvailableLanguages:[LanguageEL.FR], 
        category:BookCategoryEL.OTHER, 
        publicationForms:[PublicationFormEL.PDF]});
    Book.instances["0465030793"] = new Book({isbn:"0465030793", 
        title:"I Am A Strange Loop", originalLanguage:LanguageEL.EN, 
        otherAvailableLanguages:[], category:BookCategoryEL.TEXTBOOK, 
        publicationForms:[PublicationFormEL.EPUB]});
    Book.saveAll();
  } catch (e) {
    console.log( e.constructor.name + ": " + e.message);
  }
};

Book.clearData = function () {
  if (confirm("Do you really want to delete all book data?")) localStorage["books"] = "{}";
};