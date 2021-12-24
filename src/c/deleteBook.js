pl.c.deleteBook = {
  initialize: function () {
    pl.c.deleteBook.loadData();
    pl.v.deleteBook.setupUserInterface();
  },
  /**
   * Load session data
   */
  loadData: function () {
    Book.retrieveAll();
  }
};