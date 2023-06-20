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
    const ratingBgc = determineRatingBgc(book.rating);
    const ratingWidth = book.rating * 10;
  
    const generatedHTML = Handlebars.compile(template)({ ...book, ratingBgc, ratingWidth });
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

function determineRatingBgc(rating) {
  if (rating < 6) {
    return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
  } else if (rating > 6 && rating <= 8) {
    return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
  } else if (rating > 8 && rating <= 9) {
    return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
  } else {
    return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  }
}

render();
initActions();