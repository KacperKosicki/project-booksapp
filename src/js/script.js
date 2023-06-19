'use strict';

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