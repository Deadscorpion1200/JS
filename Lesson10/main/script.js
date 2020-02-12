'use strict';

let adv = document.querySelector('.adv')
adv.remove();
let books = document.querySelectorAll('.books')
let book = document.querySelectorAll('.book');
let item = document.querySelectorAll('li')

// console.log(books, book, item);

// восстановлние порядка книг
books[0].insertBefore(book[1], book[0]);
books[0].insertBefore(book[2], null);
books[0].insertBefore(book[4], book[3]);

// изменение фоновой картинки
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// Изменение заголовка в книге 3
book[4].childNodes[1].children[0].textContent='Глава 3. this и Прототипы Объектов';

// восстановление глав

// Вторая книга
book[0].children[1].insertBefore(book[0].children[1].children[2], book[0].children[1].children[10]);
book[0].children[1].insertBefore(book[0].children[1].children[6], book[0].children[1].children[8]);
book[0].children[1].insertBefore(book[0].children[1].children[4], book[0].children[1].children[7]);
book[0].children[1].insertBefore(book[0].children[1].children[3], book[0].children[1].children[6]);
// Пятая книга
// book[5].children[1].insertAfter(book[5].children[1].children[2], book[5].children[1].children[5]);
console.log(book[5].children[1].children);
book[5].children[1].insertBefore(book[5].children[1].children[9], book[5].children[1].children[2]);
book[5].children[1].insertBefore(book[5].children[1].children[3], book[5].children[1].children[5]);
book[5].children[1].insertBefore(book[5].children[1].children[5], book[5].children[1].children[4]);
book[5].children[1].insertBefore(book[5].children[1].children[6], book[5].children[1].children[9]);
// Добавим 8 главу в 6ю книгу

let newChapter = document.createElement('li');
newChapter.textContent = 'Глава 8: За пределами ES6';
console.log(book[0].children[1].children);
book[2].children[1].appendChild(newChapter);
book[2].children[1].insertBefore(book[2].children[1].children[10], book[2].children[1].children[9]);