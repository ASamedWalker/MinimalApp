pl.c.updateBook = {
  initialize: function () {
    pl.c.updateBook.loadData();
    pl.v.updateBook.setupUserInterface();
  },
  /**
   *  Load session data
   */
  loadData: function () {
    Book.retrieveAll();
  }
};