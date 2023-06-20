'use strict';

const favoriteBooks = [];

function initActions() {
  const bookImages = document.querySelectorAll('.book__image');

  bookImages.forEach(bookImage => {
    bookImage.addEventListener('dblclick', function(event) {
      event.preventDefault();
      const bookId = bookImage.dataset.id;
      const isFavorite = favoriteBooks.includes(bookId);

      if (isFavorite) {
        const index = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(index, 1);
        bookImage.classList.remove('favorite');
      } else {
        favoriteBooks.push(bookId);
        bookImage.classList.add('favorite');
      }
    });
  });
}

function render() {
  const template = document.getElementById('template-book').innerHTML;
  const booksList = document.querySelector('.books-list');

  dataSource.books.forEach(book => {
    const generatedHTML = Handlebars.compile(template)(book);
    const bookElement = utils.createDOMFromHTML(generatedHTML);
    booksList.appendChild(bookElement);
  });
}

render();
initActions();