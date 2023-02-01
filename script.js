let myLibrary = [
    // {
    //     "title": "Harry Potter",
    //     "author": "JK Rowling",
    //     "pages": "256 Pages",
    //     "read": "Read"
    // },

    // {
    //     "title": "Derpie Potter",
    //     "author": "JK Rowling",
    //     "pages": "256 Pages",
    //     "read": "Read"
    // }
];

function Book(title, author, pages,id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    // this.read = read;
    this.id = id;
    
}

// Reveals add book form to user and adds overlay to other elements
function addBookToLibrary() {
    bookFormContainer.classList.remove('hide');
    blackOverlay.classList.remove('hide');
}

// Closes and hides add book form
function closeForm() {
    bookFormContainer.classList.add('hide');
    blackOverlay.classList.add('hide');
}

// Creates new book object from user's form inputs, pushes into library array, then renders array of books
function submitForm(){
    let bookId = myLibrary.length;
    let newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookId);
    myLibrary.push(newBook);
    closeForm();
    bookForm.reset();
    scanBooks();
}

// Loops through myLibrary array and renders book objects on to browser
function scanBooks() {
    let newArray = [];

    if(!bookCard.length){
        newArray = myLibrary;
    } else {
        // Filter through the existing book objects to store only the newly added one
        newArray = myLibrary.filter(newBook => {
            return !Object.values(bookCard).some(oldBooks => oldBooks.getAttribute("data-id") == newBook.id);
        });
    }

    for (let i=0; i<newArray.length; i++) {
        let libraryCard = document.createElement("div");
        libraryCard.setAttribute('class', 'book-card');
        libraryCard.setAttribute('data-id', myLibrary.length-1);
        
        let titleContainer = document.createElement("h1");
        titleContainer.setAttribute('class', 'book-title-text');
        let titleText = document.createTextNode(newArray[i].title);
        titleContainer.appendChild(titleText);
    
        let authorContainer = document.createElement("p");
        let authorText = document.createTextNode(newArray[i].author);
        authorContainer.appendChild(authorText);
    
        let pagesContainer = document.createElement("p");
        let pagesText = document.createTextNode(newArray[i].pages);
        pagesContainer.appendChild(pagesText);
    
        libraryCard.appendChild(titleContainer);
        libraryCard.appendChild(authorContainer);
        libraryCard.appendChild(pagesContainer);
    
        addBookButton.before(libraryCard);        
    }
}



const librarySection = document.getElementById("library-section");
const addBookButton = document.getElementById("add-book-btn");
const confirmBookButton = document.getElementById("confirm-book-btn");
const bookFormContainer = document.getElementById("book-form-container");
const bookForm = document.getElementById("add-book-form");
const bookTitle = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookPages = document.getElementById("book-pages");
const blackOverlay = document.getElementById("black-overlay");
const bookTitleText = document.getElementsByClassName("book-title-text");
const bookCard = document.getElementsByClassName("book-card");

addBookButton.addEventListener("click", addBookToLibrary);
confirmBookButton.addEventListener("click", submitForm);
blackOverlay.addEventListener("click", closeForm);