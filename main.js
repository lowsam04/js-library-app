let myLibrary = [];

//1. Book Constructor
function Book(Title, Author, Pages, Read) {
    (this.Title = Title),
        (this.Author = Author),
        (this.Pages = Pages),
        (this.Read = Read);
}

// 2. Function to adding book to array
function addBookToLibrary(Title, Author, Pages, Read) {
    let book = new Book(Title, Author, Pages, Read)
    myLibrary.push(book);
    displayBooksOnPage();
}


//3. Function to display library array to cards
function displayBooksOnPage() {
    const books = document.querySelector(".books");

    // Remove all previously displayed cards before I loop over array agian
    const removeDivs = document.querySelectorAll(".card");
    console.log("show me the node count of current card divs__", removeDivs);
    for (let i = 0; i < removeDivs.length; i++) {
        removeDivs[i].remove();
    }

    // Loop over the library array and display the cards
    let index = 0
    myLibrary.forEach(myLibrarys => {
        const card = document.createElement("div");
        card.classList.add("card");
        books.appendChild(card);

        //create remove book button and add class attrivute for each array card
        const removeBookButton = document.createElement("button");
        removeBookButton.classList.add("remove-book-button");
        removeBookButton.textContent = "Remove From Library"
        console.log("show me my current array objects inside of foreach...", myLibrary);

        //link the data attribute of the remove button to the array and card
        removeBookButton.dataset.linkedArray = index;
        console.log("show me the dataset link back to array...", removeBookButton.dataset.linkedArray);
        card.appendChild(removeBookButton);

        // Start event listener / remove array item from array adn card from parent div via data link
        removeBookButton.addEventListener("click", removeBookFromLibrary);

        function removeBookFromLibrary() {
            let retrieveBookToRemove = removeBookButton.dataset.linkedArray;
            console.log("Attempting to remove array item via data attribute...", parseInt(retrieveBookToRemove));
            myLibrary.splice(parseInt(retrieveBookToRemove), 1);
            card.remove()
            displayBooksOnPage();
        }

        // Create read status button adn add class attribute for each array card
        const readStatusButton = document.createElement("button");
        readStatusButton.classList.add("read-status-button");
        readStatusButton.textContent = "Toggle Read Status";

        // Link the data attribute of the toggle read button to array and card
        readStatusButton.dataset.linkedArray = index;
        console.log("show me the dataset link back to the array FOR READ STATUS BUTTON....", readStatusButton.dataset.linkedArray);
        card.appendChild(readStatusButton);

        // Create event listener/toggle logic array objects protptype for read status change
        readStatusButton.addEventListener("click", toggleReadStatus);

        function toggleReadStatus() {
            let retrieveBookToToggle = readStatusButton.dataset.linkedArray;
            Book.prototype = Object.create(Book.prototype);
            const toggleBook = new Book();
            console.log("what is the toggle initial value?...", myLibrary[parseInt(retrieveBookToToggle)].Read);

            // Run check to see what read value is present to toggle from
            if ((myLibrary[parseInt(retrieveBookToToggle)].Read) == "Yes") {
                toggleBook.Read = "No";
                myLibrary[parseInt(retrieveBookToToggle)].Read = toggleBook.Read;
            } else if ((myLibrary[parseInt(retrieveBookToToggle)].Read == "No")) {
                toggleBook.Read = "Yes";
                myLibrary[parseInt(retrieveBookToToggle)].Read = toggleBook.Read;
            }
            displayBooksOnPage();
        }

        //loop over the object keys and values adn display to each card
        for (let key in myLibrarys) {
            console.log(`${key}: ${myLibrarys[key]}`);
            const para = document.createElement("p");
            para.textContent = (`${key}: ${myLibrarys[key]}`);
            card.appendChild(para);
        }
        index++;
    });
}

// 4.start event listener display form to add a new book to libary
const addBookButton = document.querySelector(".add-book-button");
addBookButton.addEventListener('click', displayTheForm);

function displayTheForm() {
    document.getElementById("add-book-form").style.display = '';
}

// start event listener/ add input to array for new entry form
const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener('click', intakeFormData);

// Transform form data to variables for intake
function intakeFormData() {
    let Title = document.getElementById("Title").value;
    let Author = document.getElementById("Author").value;
    let Pages = document.getElementById("Pages").value;
    let Read = document.getElementById("Read").value;

    if ((Title == '') || (Author == '') || (Pages == '') || (Read == '')) {
        return alert("Try again");
    }

    // Call function to input the book data to array
    addBookToLibrary(Title, Author, Pages, Read);

    //Reset the form after successful submission
    document.getElementById("add-book").reset();
}

// Start event listener for clear the form
const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener('click', clearForm)

function clearForm() {
    document.getElementById("add-book").reset();
}












