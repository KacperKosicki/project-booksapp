'use strict';

const favoriteBooks = [];
const filters = [];

function initActions() {
  const bookList = document.querySelector('.books-list');
  const form = document.querySelector('.filters');

  form.addEventListener('click', function(event) {
    const target = event.target;

    if (target.tagName === 'INPUT' && target.type === 'checkbox' && target.name === 'filter') {
      const filterValue = target.value;

      if (target.checked) {
        filters.push(filterValue);
      } else {
        const index = filters.indexOf(filterValue);
        filters.splice(index, 1);
      }

      filterBooks();
    }
  });

  bookList.addEventListener('dblclick', function(event) {
    const target = event.target;

    if (target.classList.contains('book__image') || target.offsetParent.classList.contains('book__image')) {
      event.preventDefault();

      const bookImage = target.closest('.book__image');
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
    }
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

function filterBooks() {
  const bookImages = document.querySelectorAll('.book__image');

  bookImages.forEach(bookImage => {
    const bookId = bookImage.dataset.id;
    const book = dataSource.books.find(book => book.id == bookId);

    let shouldBeHidden = false;

    for (const filter of filters) {
      if (!book.details[filter]) {
        shouldBeHidden = true;
        break;
      }
    }

    if (shouldBeHidden) {
      bookImage.classList.add('hidden');
    } else {
      bookImage.classList.remove('hidden');
    }
  });
}

render();
initActions();