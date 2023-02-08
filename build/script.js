let myLibrary = [
    {
        title: 'Harry Potter',
        author: 'JK Rowling',
        pages: '356',
        id: '0',
        read: 'Read'
    },
    {
        title: 'Harry Potter',
        author: 'JK Rowling',
        pages: '356',
        id: '1',
        read: 'Read'
    },
    {
        title: 'Harry Potter',
        author: 'JK Rowling',
        pages: '356',
        id: '2',
        read: 'Read'
    },
    {
        title: 'Harry Potter',
        author: 'JK Rowling',
        pages: '356',
        id: '3',
        read: 'Read'
    },
];

function Book(title, author, pages, id, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = id;
    this.read = read;
    
}

// Reveals add book form to user and adds overlay to other elements
function addBookToLibrary() {
    bookFormContainer.classList.remove('hidden', 'opacity-0');
    blackOverlay.classList.remove('hidden');
}

// Closes and hides add book form
function closeForm() {
    bookFormContainer.classList.add('hidden', 'opacity-0');
    blackOverlay.classList.add('hidden');
}

// Creates new book object from user's form inputs, pushes into library array, then renders array of books
function submitForm(){
    let bookRead = "";
    if (readButton.classList.contains("active-read")){
        bookRead = "Read";
    } else if (notReadButton.classList.contains("active-read")){
        bookRead = "Not Read";
    }

    let bookId = myLibrary.length;
    let newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookId, bookRead);
    myLibrary.push(newBook);
    closeForm();
    bookForm.reset();
    scanBooks();
}

// Loops through myLibrary array and renders book objects on to browser
function scanBooks() {
    let outputArray = [];

    if(!bookCard.length){
        outputArray = myLibrary;
    } else {
        // Filter through the existing book objects and only append the new book ids to outputArray
        outputArray = myLibrary.filter(newBook => {
            return !Object.values(bookCard).some(oldBooks => oldBooks.getAttribute("data-id") == newBook.id);
        });
    }

    // Loops through outputArray of Book objects and creates a library card DOM element for each 
    for (let i=0; i<outputArray.length; i++) {
        let libraryCard = document.createElement("div");
        libraryCard.setAttribute('class', 'bg-white h-auto w-auto');
        libraryCard.setAttribute('data-id', myLibrary.length-1);

        let readTag = document.createElement("div");
        if(outputArray[i].read == "Read"){
            readTag.setAttribute("class", "bg-[#DEF3DC] w-max px-2 py-1 rounded-full text-xs text-[#12BA23] font-bold");
            readTag.appendChild(document.createTextNode("Read"));
        } else if (outputArray[i].read == "Not Read") {
            readTag.setAttribute("class", "not-read-tag");
            readTag.appendChild(document.createTextNode("Not Read"));
        }
        
        let titleContainer = document.createElement("h1");
        titleContainer.setAttribute('class', 'text-base font-bold');
        let titleText = document.createTextNode(outputArray[i].title);
        titleContainer.appendChild(titleText);
    
        let bookDetailsContainer = document.createElement("p");
        let bookDetailsText = document.createTextNode(outputArray[i].author + " • " + outputArray[i].pages + " pages");
        bookDetailsContainer.appendChild(bookDetailsText);

        libraryCard.appendChild(readTag);
        libraryCard.appendChild(titleContainer);
        libraryCard.appendChild(bookDetailsContainer);
    
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
const readButton = document.getElementById("read-button");
const notReadButton = document.getElementById("not-read-button");

readButton.addEventListener("click", () => {
    if(readButton.classList.contains("active-read")){
        return;
    } else {
        notReadButton.classList.remove("active-read");
        notReadButton.classList.add("active-not-read");
        readButton.classList.remove("active-not-read");
        readButton.classList.add("active-read");
    }
});

notReadButton.addEventListener("click", () => {
    if(notReadButton.classList.contains("active-read")){
        return;
    } else {
        readButton.classList.remove("active-read");
        readButton.classList.add("active-not-read");
        notReadButton.classList.remove("active-not-read");
        notReadButton.classList.add("active-read");
    }
});

addBookButton.addEventListener("click", addBookToLibrary);
confirmBookButton.addEventListener("click", submitForm);
blackOverlay.addEventListener("click", closeForm);
scanBooks();