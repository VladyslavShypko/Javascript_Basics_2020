//Exercise 1

class Point {
    
    constructor (x, y) {
       this.x = x;
       this.y = y;
    }
    
    plus(obj) {
       return new Point( this.x + obj.x, this.y + obj.y)
    }
}

console.log(new Point(1, 2).plus(new Point(2, 1)));

//Exercise 2

// ES5

function Speaker1(name) {
    
    this.name = name;
    
    Speaker1.prototype.speak = function(text) {
        return `${this.name} says ${text}`;
    }
}

function Screamer1(...arguments) {
 Object.assign(this, new Speaker1(...arguments))
 Object.setPrototypeOf(Screamer1.prototype, Speaker1.prototype);
    
    Screamer1.prototype.speak = function(text) {
        return this.name + ' ' + 'says' + text.toUpperCase();
    }
}

console.log(new Speaker1("Mr. Calm").speak("easy, man"));
console.log(new Screamer1("Mr. Loud").speak("hell yeah"));

// ES6

class Speaker2 {
    
    constructor (name) {
        this.name = name;
    }
    
    speak(text) {
        return `${this.name} says ${text}`;
    }
}

class Screamer2 extends Speaker2 {
    
  speak(text) {
     return super.speak(text.toUpperCase());
  }
}

console.log(new Speaker2("Mr. Calm").speak("easy, man"));
console.log(new Screamer2("Mr. Loud").speak("hell yeah"));

//Exercise 3

class Book {
    
    constructor (title, genre, author){
        this.title = title;
        this.genre = genre;
        this.author = author;
        this.read = false;
        this.readDate = null;
    }
    
    markAsRead() {
        this.read = true;
        this.date = new Date();
    }

}

class BookLists {
    arrBooks = [];
    numberOfBooksRead = 0;
    numberOfBooksNotReadYet = 0;
    nextBookToRead = null;
    currentBookBeingRead = null;
    lastBookRead = null;

    add(book) {
       this.arrBooks.push(book); 
       if(this.arrBooks[0] === book) {
           this.currentBookBeingRead = book;
           book.read = true;
       }
       this.numberOfBooksNotReadYet++;
    }

    finishCurrentBook() {
        
        if(this.currentBookBeingRead) {
           this.lastBookRead = this.currentBookBeingRead;
           this.lastBookRead.readDate = new Date();
           this.numberOfBooksRead++;
        }else {
           this.lastBookRead = 'No book are being read right now';
        }
        
        if(this.nextBookToRead) {
           this.currentBookBeingRead = this.nextBookToRead;
        } else if(this.arrBooks.find(book => !book.read)) {
           this.currentBookBeingRead = this.arrBooks.find(book => !book.read);    
        } else {
           this.currentBookBeingRead = 'No book is scheduled for reading'
        }
        
        if(typeof this.currentBookBeingRead !== String) {
           this.currentBookBeingRead.read = true;
           this.numberOfBooksNotReadYet = this.numberOfBooksNotReadYet ? --this.numberOfBooksNotReadYet : 0;
        }
        
        if(this.arrBooks.length){
           this.nextBookToRead = this.arrBooks.find(book => !book.read) || 'Nothing to read';
        }else {
            this.nextBookToRead = 'The list of books is empty';
        }
    }
}

const bookLists = new BookLists();
const book1 = new Book('title1', 'genre1', 'author1');
const book2 = new Book('title2', 'genre2', 'author2');
const book3 = new Book('title3', 'genre3', 'author3');
const book4 = new Book('title4', 'genre4', 'author4');
const book5 = new Book('title5', 'genre5', 'author5');
bookLists.add(book1);
bookLists.add(book2);
bookLists.add(book3);
bookLists.add(book4);
bookLists.add(book5);
console.log(bookLists.currentBookBeingRead);
bookLists.finishCurrentBook();
console.log(bookLists.arrBooks);
console.log(bookLists.numberOfBooksRead);
console.log(bookLists.numberOfBooksNotReadYet);
console.log(bookLists.nextBookToRead);
console.log(bookLists.currentBookBeingRead);
console.log(bookLists.lastBookRead);
console.log(bookLists.arrBooks);
book5.markAsRead();
console.log(bookLists.arrBooks);


