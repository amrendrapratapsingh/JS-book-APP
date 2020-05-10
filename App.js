
// Book class display the Book

class Book {
    constructor(title,author,isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


// UI class - Handle UI task

class UI {
    static  displayBooks() {
        const storeBooks = [
            {title:'Book one',
             author:'yuvi',
             isbn:3456
            },
            { title:'Book two',
              author:'yuvi',
              isbn:3456
            },
        ];

        const books = storeBooks;

        books.forEach( (book) => UI.addBookList(book))

    }

    static addBookList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message,className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form')
        container.insertBefore(div,form);

        // vanish in 3 seconds
        setTimeout( () => {
         document.querySelector('.alert').remove()
        },3000)
        }
}

// store class: handle Storage


// Event: display books

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: To Add Books

document.querySelector('#book-form').addEventListener('submit',(e) => {

    // to prevent the default submission

    e.preventDefault();

// to get the form values

const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;
const isbn = document.querySelector('#isbn').value;


// validate

if(title === '' || author === '' || isbn === '' ) {
   UI.showAlert('Please Fillup the Fields','danger');
} else {
// instantiate the Book
const book = new Book(title,author,isbn);
//console.log(book)
UI.addBookList(book);

UI.showAlert('Successfully Added','success');
//to clear the fields
UI.clearFields();
}
});

// Events : Remove the Book

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    UI.showAlert('Deleted','success');
})
