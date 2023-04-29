let library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Math.floor(100000 + Math.random() * 900000)
}

function addBookToLibrary(book) {
    library.push(book);
}
function removeBookFromLibrary(index) {
    library.splice(index, 1); 
}

function displayBooks(library) {
    const bookshelf = document.getElementById('bookshelf');
    bookshelf.innerHTML = "";

    library.forEach((book) => {
        // Create HTML elements
        const container = document.createElement('div');
        const cover = document.createElement('div');
        const title = document.createElement('h1');
        const author = document.createElement('p');
        const info = document.createElement('div');
        const pages = document.createElement('p');
        const read = document.createElement('button');
        const remove = document.createElement('button');

        // Add classes and ids
        container.id = ""+book.id;
        container.classList.add('container');
        cover.classList.add('cover');
        title.classList.add('title');
        author.classList.add('author');
        info.classList.add('info');
        pages.classList.add('pages');
        remove.classList.add('remove');

        // read class
        if (book.read) {
            read.classList = 'read read-true';
            read.innerHTML = 'Read <i class="fa-solid fa-fw fa-check"></i>';
        } else {
            read.classList = 'read';
            read.innerHTML = 'Read <i class="fa-solid fa-fw fa-ban"></i>';
        }

        // Generate content
        title.innerText = book.title;
        author.innerText = book.author;
        pages.innerText = book.pages + " pgs";
        remove.innerHTML = '<i class="fa-solid fa-fw fa-xmark"></i>';

        // Event listeners
        read.addEventListener('click', () => {
            (function toggleRead(ele, book) {
                ele.innerHTML = (!book.read) ? 'Read <i class="fa-solid fa-fw fa-check"></i>' : 'Read <i class="fa-solid fa-fw fa-ban"></i>';
                ele.classList.toggle('read-true');
                book.read = !book.read;
            })(read, book);
        })

        // Find index in library array, delete from library, delete from DOM
        remove.addEventListener('click', function() {
            removeBookFromLibrary(library.findIndex(index => index.id == book.id));

            const bookElem = document.getElementById(book.id);
            bookElem.remove();
        })

        // Append to document
        info.append(pages, read);
        container.append(cover, title, author, info, remove);
        bookshelf.append(container);

    });
}

function addBookDOM() {
    const button = document.createElement("button");
    button.classList.add('add-book');
    button.innerText = "Add new book";

    button.addEventListener('click', () => {
        createFormDOM();
    })

    return button;
}

function createFormDOM() {
    function createFormElement(element, type, classList, id, placeholder, required) {
        const formElement = document.createElement(element);
        if (type) formElement.type = type;
        if (classList) formElement.classList = classList;
        if (id) formElement.id = id;
        if (placeholder) formElement.placeholder = placeholder;
        if (required) formElement.required = required;

        return formElement;
    }

    // create DOM elements
    const container = document.createElement('div');
    const background = document.createElement('div');

    const form = document.createElement('form');
    const label = document.createElement('h1');

    const title = createFormElement('input', 'text', 'form-input', 'form-book-title', 'Title', true);
    const author = createFormElement('input', 'text', 'form-input', 'form-book-author', 'Author', true);
    const pages = createFormElement('input', 'number', 'form-input', 'form-book-pages', '# of pages', true);
        pages.min = 0;
    const readContainer = document.createElement('div');
    const read = createFormElement('input', 'checkbox', 'form-input', 'form-book-read');
    const readLabel = createFormElement('label', null, 'form-input', 'form-book-read-label');
        readLabel.innerText = 'Read?';

    const btnContainer = document.createElement('div');
    const submit = createFormElement('input', 'submit', 'submit-btn', 'form-submit-btn');
    const cancel = createFormElement('input', 'button', 'cancel-btn', 'form-cancel-btn');
        cancel.value = "Cancel";

    // add ids
    container.id = 'form-container';
    btnContainer.id = 'form-btn-container';
    readContainer.id = 'form-read-container'
    form.id = 'add-book-form';
    background.id = 'form-background';
    label.classList = 'form-label';
    label.innerText = "Add new book";

    btnContainer.append(submit, cancel);
    readContainer.append(read, readLabel);
    form.append(label, title, author, pages, readContainer, btnContainer);
    container.append(background, form);
    document.body.append(container);

    // Event listeners
    container.addEventListener('click', (e) => {
        e.stopPropagation();
    })
    background.addEventListener('click', () => {
        deleteFormDOM();
    })
    cancel.addEventListener('click', () => {
        deleteFormDOM();
    })
    form.onsubmit = (e) => {
        e.preventDefault();
        createBook(title.value, author.value, pages.value, read.checked);
        deleteFormDOM();
    }
}

function deleteFormDOM() {
    const form = document.getElementById('form-container');
    const background = document.getElementById('form-background');
    form.remove();
    background.remove();
}

function createBook(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    addBookToLibrary(book);
    displayBooks(library);
}

function generateHeaderDOM() {
    const header = document.createElement('div');
    const heading = document.createElement('h1');


    header.id = "header";
    header.classList = "header";

    heading.id = "heading";
    heading.classList = "heading";
    heading.innerText = "Library App"


    header.append(heading, addBookDOM());
    document.body.prepend(header);

    addBookDOM();
}



generateHeaderDOM();