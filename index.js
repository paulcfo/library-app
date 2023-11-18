
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

var myLibrary = [];

// Add book to the library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// Event listener for book sumbit (addition) from the user
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    // Check if the book already exists in the library
    const bookExists = myLibrary.some((book) => book.title === title);
    // const count = myLibrary.length;

    if (!bookExists) {
      addBookToLibrary(title, author, pages, read);

      // Save in browser's local storage
      addBooktoLocalStorage();

      displayBooks();
    }
    else {
      alert("This book already exists in the library!");
    }
  });
});

// Save books in local storage
function addBooktoLocalStorage() {
  localStorage.setItem("myBooks", JSON.stringify(myLibrary));
}

// Load books from local storage
function loadBooks() {
  if (localStorage.getItem("myBooks")) {
    myLibrary = JSON.parse(localStorage.getItem("myBooks"));
    displayBooks();
  }
}
loadBooks();

// Display books on the page
function displayBooks() {
  const booksGrid = document.querySelector(".books-grid");
  const booksFromLocalStorage = Object.values(localStorage);
  booksGrid.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    if (book.title !== undefined ) {
      bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Number of Pages: ${book.pages}</p>
        <p>Read: ${book.read ? "Yes" : "No"}</p><br>
        <button class="removeButton" onclick="removeBook(${index})">Remove</button>
      `;
      booksGrid.appendChild(bookCard);
    }

  });
}
displayBooks();

// Remove book from the library
function removeBook(index) {
  myLibrary.splice(index, 1); // Remove the book from the array
  localStorage.setItem("myBooks", JSON.stringify(myLibrary)); // Update local storage with new book array!
  displayBooks(); // Update the display
}
