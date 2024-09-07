var http = require('http');

// input
const input = [
    {title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, genre: 'Fiction'},
    {title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, genre: 'Fiction'},
    {title: '1984 Romance', author: 'George Orwell', year: 1949, genre: 'Science Fiction'},
    {title: 'The Hunger Games', author: 'Suzanne Romance', year: 2008, genre: 'Science Fiction'},
    {title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, genre: 'Romance'}]; 

// finding year 
function findYear(yearsBefore) {
    var currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - yearsBefore); 
    return currentDate.getFullYear(); 
}

// filter books
function filterBooksBy10Years() {
    var yearLimit = findYear(20);     
    return input.filter(book => book.year > yearLimit);
}

// search
function search(query){
    lowerCaseQuery = query.toLowerCase();
    return input.filter(book => 
        book.title.toLowerCase().includes(lowerCaseQuery) ||
        book.genre.toLowerCase().includes(lowerCaseQuery) ||
        book.author.toLowerCase().includes(lowerCaseQuery) 
    );
}

http.createServer(function (req, res) {
    if (req.method === 'GET' && req.url === '/books') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(filterBooksBy10Years()));        
    }
    else if (req.method === "GET" && req.url === '/search'){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(search("fiction")));
    }
    else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(input));
    }
}).listen(8080);


console.log('Server is running at http://localhost:8080/');
