'use strict';

class BooksList {
  constructor() {
    this.favoriteBooks = [];
    this.filters = [];
    this.initData();
    this.getElements();
    this.render();
    this.initActions();
  }

  initData() {
    this.data = dataSource.books;
  }

  getElements() {
    this.bookList = document.querySelector('.books-list');
    this.form = document.querySelector('.filters');
  }

  initActions() {
    this.form.addEventListener('click', (event) => {
      const target = event.target;

      if (target.tagName === 'INPUT' && target.type === 'checkbox' && target.name === 'filter') {
        const filterValue = target.value;

        if (target.checked) {
          this.filters.push(filterValue);
        } else {
          const index = this.filters.indexOf(filterValue);
          this.filters.splice(index, 1);
        }

        this.filterBooks();
      }
    });

    this.bookList.addEventListener('dblclick', (event) => {
      const target = event.target;

      if (target.classList.contains('book__image') || target.offsetParent.classList.contains('book__image')) {
        event.preventDefault();

        const bookImage = target.closest('.book__image');
        const bookId = bookImage.dataset.id;
        const isFavorite = this.favoriteBooks.includes(bookId);

        if (isFavorite) {
          const index = this.favoriteBooks.indexOf(bookId);
          this.favoriteBooks.splice(index, 1);
          bookImage.classList.remove('favorite');
        } else {
          this.favoriteBooks.push(bookId);
          bookImage.classList.add('favorite');
        }
      }
    });
  }

  render() {
    const template = document.getElementById('template-book').innerHTML;

    this.data.forEach((book) => {
      const ratingBgc = this.determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;

      const generatedHTML = Handlebars.compile(template)({ book, ratingBgc, ratingWidth });
      const bookElement = utils.createDOMFromHTML(generatedHTML);
      this.bookList.appendChild(bookElement);
    });
  }

  filterBooks() {
    const bookImages = document.querySelectorAll('.book__image');

    bookImages.forEach((bookImage) => {
      const bookId = bookImage.dataset.id;
      const book = this.data.find((book) => book.id == bookId);

      let shouldBeHidden = false;

      for (const filter of this.filters) {
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

  determineRatingBgc(rating) {
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
}

const app = new BooksList();
app.bookList();