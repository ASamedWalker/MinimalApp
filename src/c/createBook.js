pl.c.createBook = {
  initialize: function () {
    pl.c.createBook.loadData();
    pl.v.createBook.setupUserInterface();
  },
  /**
   *  Load session data
   */
  loadData: function () {
    Book.retrieveAll();
  }
};