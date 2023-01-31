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
const addBookButton = document.getElementById("book-form-btn");

addBookToLibrary();