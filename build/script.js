let myLibrary = [];

function Book(title, author, pages, id, read, img) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = id;
    this.read = read;
    this.img = img;
}

// Reveals add book form to user and adds overlay to other elements
function openBookForm() {
    bookFormContainer.classList.remove('hidden', 'opacity-0');
    blackOverlay.classList.remove('hidden');
    if(confirmBookButton.classList.contains('hidden')){
        confirmBookButton.classList.remove('hidden');
        saveChangesButton.classList.add('hidden');
    }
}

// Closes and hides add book form
function closeForm() {
    bookFormContainer.classList.add('hidden', 'opacity-0');
    blackOverlay.classList.add('hidden');
    bookForm.reset();
    img_output.style.backgroundImage = null;
}

function readImageData(file){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    })
}

async function imgFile() {
    try {
        let file = img_input.files[0];
        let bookImg = await readImageData(file);
        return bookImg;
    } catch(err) {
        console.log(err);
    }
}

// Creates new book object from user's form inputs, pushes into library array, then renders array of books
async function submitForm(){
    let bookRead = "";
    if (readButton.classList.contains("bg-white")){
        bookRead = "Read";
    } else if (notReadButton.classList.contains("bg-white")){
        bookRead = "Not Read";
    }

    let bookImg = '';
    if (!img_input.files[0]) {
        bookImg = 'No cover'
    } else {
        bookImg = await imgFile();
    }
    
    let bookId = myLibrary.length;
    let newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookId, bookRead, bookImg);
    myLibrary.push(newBook);
    closeForm();
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

        // creates main book card div container
        let libraryCard = document.createElement("div");
        libraryCard.setAttribute('class', 'bg-white h-auto w-auto shadow-library-card border border-black/2 py-3 px-4 rounded-lg book-card');
        libraryCard.setAttribute('data-id', myLibrary.length-1);

        // creates div container for book img, read tag, and card buttons
        let imgContainer = document.createElement("div");
        imgContainer.setAttribute('class', 'h-56 bg-[#F8F8F9] relative flex justify-center items-center rounded bg-center bg-cover');
       
        // if user doesn't upload a cover, book card will default to placeholder image
        if(outputArray[i].img == "No cover"){
            let img = document.createElement("img");
            img.setAttribute('src', '../assets/camera-01.svg');
            imgContainer.appendChild(img);
        } 
        else {
            imgContainer.style.backgroundImage = `url(${myLibrary[i].img})`;
        }

        // creates header container for book card read tag and card buttons
        let cardHeaderContainer = document.createElement("div");
        cardHeaderContainer.setAttribute("class", "absolute top-0 w-full flex justify-between items-center px-3 pt-2")
        imgContainer.appendChild(cardHeaderContainer);
                

        // Create read or not read tag on library card
        let readTag = document.createElement("div");
        if(outputArray[i].read == "Read"){
            readTag.setAttribute("class", "bg-[#DEF3DC] w-max h-full px-2 py-1 rounded-full text-xs text-[#12BA23] font-bold");
            readTag.appendChild(document.createTextNode("Read"));
        } else if (outputArray[i].read == "Not Read") {
            readTag.setAttribute("class", "bg-[#FFE4C5] w-max h-full px-2 py-1 rounded-full text-xs text-[#FC8B24] font-bold");
            readTag.appendChild(document.createTextNode("Not Read"));
        }
        cardHeaderContainer.appendChild(readTag);

        let cardButtons = document.createElement("div");
        cardButtons.setAttribute("class", "flex gap-1")

        let deleteButton = document.createElement("img");
        deleteButton.setAttribute("src",  "../assets/trash-02.svg");
        deleteButton.setAttribute("class", "bg-white w-max p-2 rounded-full cursor-pointer shadow-sm-buttons border-[.5px] border-black/2");

        deleteButton.addEventListener("click", deleteBook);

        cardButtons.appendChild(deleteButton);

        let editButton = document.createElement("img");
        editButton.setAttribute("src",  "../assets/pencil-01.svg");
        editButton.setAttribute("class", "bg-white w-max p-2 rounded-full overflow-visible cursor-pointer shadow-sm-buttons border-[.5px] border-black/2");

        editButton.addEventListener("click", editBook);

        cardButtons.appendChild(editButton);

        cardHeaderContainer.appendChild(cardButtons);
        


        let titleContainer = document.createElement("h1");
        titleContainer.setAttribute('class', 'text-base font-bold mt-3');
        let titleText = document.createTextNode(outputArray[i].title);
        titleContainer.appendChild(titleText);
    
        let bookDetailsContainer = document.createElement("p");
        let bookDetailsText = document.createTextNode(outputArray[i].author + " • " + outputArray[i].pages + " pages");
        bookDetailsContainer.appendChild(bookDetailsText);

        libraryCard.appendChild(imgContainer);
        libraryCard.appendChild(titleContainer);
        libraryCard.appendChild(bookDetailsContainer);
    
        librarySection.appendChild(libraryCard);      
    }
}

// deletes book from myLibrary array
function deleteBook(event) {
    let selectedElement = event.srcElement.parentElement.parentElement.parentElement.parentElement;
    let deleteIndex = +(selectedElement.getAttribute('data-id'));
    let librarySection = Object.values(bookCard);

    myLibrary = myLibrary.filter(deletedBook => deletedBook.id != deleteIndex);
    for(let i=0; i<myLibrary.length; i++) {
        myLibrary[i].id = i;
        librarySection[i].setAttribute("data-id", i);
    }
    selectedElement.remove();
}

let currentBookId = '';

// edit book details of existing books
function editBook(event) {
    let selectedElement = event.srcElement.parentElement.parentElement.parentElement.parentElement;
    let bookObj = myLibrary[+selectedElement.getAttribute('data-id')];
    currentBookId = selectedElement.getAttribute('data-id');

    bookTitle.value = bookObj.title;
    bookAuthor.value = bookObj.author;
    bookPages.value = bookObj.pages;
    if(bookObj.read == "Read"){
        notReadButton.classList.remove("bg-white", "text-[#4353DB]", "font-bold");
        notReadButton.classList.add("text-[#A2A3AE]");
        readButton.classList.remove("text-[#A2A3AE]");
        readButton.classList.add("bg-white", "text-[#4353DB]", "font-bold");
    } else if(bookObj.read == "Not Read"){
        readButton.classList.remove("bg-white", "text-[#4353DB]", "font-bold");
        readButton.classList.add("text-[#A2A3AE]");
        notReadButton.classList.remove("text-[#A2A3AE]");
        notReadButton.classList.add("bg-white", "text-[#4353DB]", "font-bold");
    };
    
    img_output.style.backgroundImage = `url(${bookObj.img})`;

    confirmBookButton.classList.add('hidden');
    saveChangesButton.classList.remove('hidden');
    bookFormContainer.classList.remove('hidden', 'opacity-0');
    blackOverlay.classList.remove('hidden');
}

async function submitChanges() {    
    let currentBook = document.querySelector(`[data-id="${currentBookId}"]`);
    let currentHeader = currentBook.querySelector('h1');
    let currentAuthorAndPages = currentBook.querySelector('p');

    // targets read / not read tag
    let currentReadTag = currentBook.firstChild.lastChild.firstChild;
    let bookButtons = currentBook.firstChild.lastChild.lastChild;
    currentBook.firstChild.lastChild.removeChild(currentReadTag);

    let readTag = document.createElement("div");

    if(readButton.classList.contains('bg-white')){
        readTag.setAttribute("class", "bg-[#DEF3DC] w-max h-full px-2 py-1 rounded-full text-xs text-[#12BA23] font-bold");
        readTag.appendChild(document.createTextNode("Read"));
    } else if (notReadButton.classList.contains('bg-white')) {
        readTag.setAttribute("class", "bg-[#FFE4C5] w-max h-full px-2 py-1 rounded-full text-xs text-[#FC8B24] font-bold");
        readTag.appendChild(document.createTextNode("Not Read"));
    }

    if(img_input.files[0]){
        let uploaded_image = await imgFile();
        currentBook.firstChild.style.backgroundImage = `url(${uploaded_image})`;
        if(currentBook.firstChild.childNodes.length > 1){
            currentBook.firstChild.removeChild(currentBook.firstChild.firstChild);
        }
    } 

    currentBook.firstChild.lastChild.insertBefore(readTag, bookButtons);
    currentAuthorAndPages.removeChild(currentAuthorAndPages.firstChild);
    currentAuthorAndPages.appendChild(document.createTextNode(`${bookAuthor.value} • ${bookPages.value} pages`));
    currentHeader.removeChild(currentHeader.firstChild);
    currentHeader.appendChild(document.createTextNode(`${bookTitle.value}`));
    closeForm();
}

const librarySection = document.getElementById("library-section");
const addBookButton = document.getElementById("add-book-btn");
const confirmBookButton = document.getElementById("confirm-book-btn");
const saveChangesButton = document.getElementById("save-changes-btn");
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
const img_input = document.getElementById("img_input");
const img_output = document.getElementById("img_output");

img_input.addEventListener("change", () => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        img_output.style.backgroundImage = `url(${uploaded_image})`;
    });
    reader.readAsDataURL(img_input.files[0]);
})

readButton.addEventListener("click", () => {
    if(readButton.classList.contains("bg-white")){
        return;
    } else {
        notReadButton.classList.remove("bg-white", "text-[#4353DB]", "font-bold");
        notReadButton.classList.add("text-[#A2A3AE]");
        readButton.classList.remove("text-[#A2A3AE]");
        readButton.classList.add("bg-white", "text-[#4353DB]", "font-bold");
    }
});

notReadButton.addEventListener("click", () => {
    if(notReadButton.classList.contains("bg-white")){
        return;
    } else {
        readButton.classList.remove("bg-white", "text-[#4353DB]", "font-bold");
        readButton.classList.add("text-[#A2A3AE]");
        notReadButton.classList.remove("text-[#A2A3AE]");
        notReadButton.classList.add("bg-white", "text-[#4353DB]", "font-bold");
    }
});

addBookButton.addEventListener("click", openBookForm);
confirmBookButton.addEventListener("click", submitForm);
saveChangesButton.addEventListener("click", submitChanges);
blackOverlay.addEventListener("click", closeForm);