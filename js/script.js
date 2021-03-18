// functionality
let myLibrary = [];

//adding test Book
let sampleBook = new Book("agot", "grrm", "900", "Read");
myLibrary.push(sampleBook);
updateList();

function Book(title, author, numberOfPages, readStatus) {
    // the constructor...
    // author, title, number of pages, read status.
    this.title = title
    this.author = author
    this.numberOfPages = numberOfPages
    this.readStatus = readStatus
}

Object.defineProperty(Book.prototype, 'status',  {
    get: function() {
        return this.readStatus;
    },
    
    set: function(value) {
        this.readStatus = value;
    }
});


Book.prototype.toggleStatus = function() {
    if (this.status == "Read") {
        this.status = "Not Read";
    } else {
        this.status = "Read";
    }
}



//DOM interaction
let deleteBookk = event => {
    console.log("working");
    let bookId = event.id;
    myLibrary.forEach(book => {
        console.log(book.id);
        if (book.id == bookId) {
            console.log("found");
            myLibrary.splice(myLibrary.indexOf(book), 1);
        }
    })
    updateList();
}

function updateList() {
    let nHtml = "<tr> <th> Title </th> <th> Author </th> <th> Pages </th> <th> Read </th>";
    let id = 0;
    myLibrary.forEach(book => {
        let deleteBtn = `<button type="submit" class="deleteBook" id="${id}">Delete Book</button>`;
        let toggleStatusButton = `<button type="submit" class="toggleStatusButton">${book.readStatus}</button>`;
        
        nHtml += '<tr>' + '<td>' + book.title + '</td>' + '<td>' + book.author + '</td>'
            + '<td>' + book.numberOfPages + '</td>' + '<td>' + toggleStatusButton + '</td>' + '<td>' + deleteBtn + '</td>' + '</tr>';
        book.id = id;
        id++;
    })
    document.getElementById("bookTable").innerHTML = nHtml;
}

const form = document.forms[0];

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const { title, author, pages, read } = this.elements;
    //console.log(title, author, pages, read);
    let book = new Book(title.value, author.value, pages.value, read.value);
    myLibrary.push(book);
    updateList();
});


document.body.addEventListener( 'click', function ( event ) {
  if( event.target.className == 'deleteBook' ) {
    deleteBookk(event.target);
  };

  if ( event.target.className == 'toggleStatusButton') {
      let row = event.target.parentElement.parentElement;
      let bookId = row.getElementsByClassName("deleteBook")[0].id;

      console.log(bookId);
      myLibrary.forEach(book => {
          if (book.id == bookId) {
              book.toggleStatus();
          }
      })
      updateList();
  }
} );

//popup form functionts
const openFormButton = document.getElementById("openForm");
openFormButton.addEventListener("click", openForm);

const closeFormButton = document.getElementById("closeForm");
closeFormButton.addEventListener("click", closeForm);

function openForm() {
  document.getElementById("bookForm").style.display = "block";
}

function closeForm() {
  document.getElementById("bookForm").style.display = "none";
}

