let myLibrary = [
    {
        "title": "Harry Potter",
        "author": "JK Rowling",
        "pages": "256 Pages",
        "read": "Read"
    },
    {
        "title": "Derpie Potter",
        "author": "JK Rowling",
        "pages": "256 Pages",
        "read": "Read"
    }
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    bookForm.classList.remove('hide');
    blackOverlay.classList.remove('hide');
}

function closeForm() {
    bookForm.classList.add('hide');
    blackOverlay.classList.add('hide');
}

// Loops through myLibrary array and renders book objects on to browser
function scanBooks() {
    let bookCard = myLibrary.forEach(book =>{
        let libraryCard = document.createElement("div");
        libraryCard.setAttribute('class', 'book-card');
        
        let titleContainer = document.createElement("h1");
        let titleText = document.createTextNode(book.title);
        titleContainer.appendChild(titleText);

        let authorContainer = document.createElement("p");
        let authorText = document.createTextNode(book.author);
        authorContainer.appendChild(authorText);

        let pagesContainer = document.createElement("p");
        let pagesText = document.createTextNode(book.pages);
        pagesContainer.appendChild(pagesText);

        libraryCard.appendChild(titleContainer);
        libraryCard.appendChild(authorContainer);
        libraryCard.appendChild(pagesContainer);

        addBookButton.before(libraryCard);
    })
}

const librarySection = document.getElementById("library-section");
const addBookButton = document.getElementById("add-book-btn");
const bookForm = document.getElementById("book-form-container");
const blackOverlay = document.getElementById("black-overlay");

addBookButton.addEventListener("click", addBookToLibrary);
blackOverlay.addEventListener("click", closeForm);

scanBooks();

// work on adding functionality to the add button to show a centered form and create a black overlay over the other elements