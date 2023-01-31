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

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    // this.read = read;
}

// Reveals add book form to user and adds overlay to other elements
function addBookToLibrary() {
    bookFormContainer.classList.remove('hide');
    blackOverlay.classList.remove('hide');
}


function closeForm() {
    bookFormContainer.classList.add('hide');
    blackOverlay.classList.add('hide');
}

function submitForm(){
    let newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value);
    myLibrary.push(newBook);
    closeForm();
    scanBooks();
}

// Loops through myLibrary array and renders book objects on to browser
function scanBooks() {
    if(librarySection.children.length == 1){
        console.log("derp");
        myLibrary.forEach(book =>{ 
            let libraryCard = document.createElement("div");
            libraryCard.setAttribute('class', 'book-card');
            
            let titleContainer = document.createElement("h1");
            titleContainer.setAttribute('class', 'book-title-text');
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
    } else {
        
        // for (i; i<myLibrary.length; i++) {
        //     console.log("hello-1");
        //     for(j; j<bookTitleText.length; j++) {
        //         console.log("hello-2");
        //         console.log(bookTitleText[j].textContent);
        //         console.log(myLibrary[i].title);
        //         if(bookTitleText[j].textContent == myLibrary[i].title){
        //             continue;
        //         } else {
        //                 let libraryCard = document.createElement("div");
        //                 libraryCard.setAttribute('class', 'book-card');
                        
        //                 let titleContainer = document.createElement("h1");
        //                 titleContainer.setAttribute('class', 'book-title-text');
        //                 let titleText = document.createTextNode(myLibrary[i].title);
        //                 titleContainer.appendChild(titleText);
    
        //                 let authorContainer = document.createElement("p");
        //                 let authorText = document.createTextNode(myLibrary[i].author);
        //                 authorContainer.appendChild(authorText);
    
        //                 let pagesContainer = document.createElement("p");
        //                 let pagesText = document.createTextNode(myLibrary[i].pages);
        //                 pagesContainer.appendChild(pagesText);
    
        //                 libraryCard.appendChild(titleContainer);
        //                 libraryCard.appendChild(authorContainer);
        //                 libraryCard.appendChild(pagesContainer);
    
        //                 addBookButton.before(libraryCard);
                        
        //                 return;
        //         }
        //     }
        // }
        for (let i=0; i<bookTitleText.length; i++) {
            if(bookTitleText[i].textContent == myLibrary[i].title){
                console.log("hit");
                continue;
            }
        }
        console.log("derpie")
        let libraryCard = document.createElement("div");
        libraryCard.setAttribute('class', 'book-card');
        
        let titleContainer = document.createElement("h1");
        titleContainer.setAttribute('class', 'book-title-text');
        let titleText = document.createTextNode(myLibrary[myLibrary.length-1].title);
        titleContainer.appendChild(titleText);

        let authorContainer = document.createElement("p");
        let authorText = document.createTextNode(myLibrary[myLibrary.length-1].author);
        authorContainer.appendChild(authorText);

        let pagesContainer = document.createElement("p");
        let pagesText = document.createTextNode(myLibrary[myLibrary.length-1].pages);
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

addBookButton.addEventListener("click", addBookToLibrary);
confirmBookButton.addEventListener("click", submitForm);
blackOverlay.addEventListener("click", closeForm);

scanBooks();

// work on adding functionality to the form to add in the book title,author,pages, and have read to the array