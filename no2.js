var http = require('http');

// input
const input = [
    {title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, genre: 'Fiction', rating: 4.5},
    {title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, genre: 'Fiction', rating: 4.9},
    {title: '1984', author: 'George Orwell', year: 1949, genre: 'Science Fiction', rating: 4.2},
    {title: 'The Hunger Games', author: 'Suzanne Collins', year: 2008, genre: 'Science Fiction', rating:
    4.6},
    {title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, genre: 'Romance', rating: 4.7},
    {title: 'Jane Eyre', author: 'Charlotte Bronte', year: 1847, genre: 'Romance', rating: 4.3},
    {title: 'The Da Vinci Code', author: 'Dan Brown', year: 2003, genre: 'Mystery', rating: 3.9},
    {title: 'Murder on the Orient Express', author: 'Agatha Christie', year: 1934, genre: 'Mystery',
    rating: 4.1},
    {title: 'The Name of the Rose', author: 'Umberto Eco', year: 1980, genre: 'Mystery', rating: 4.4}
]; 

//group
function groupByGenre(books){
    return books.reduce((acc, book) => {
        const key = book.genre;

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(book);

        return acc;
    }, {}); 
}

//sort
function sortByRating(books, order = 'asc') {
    return books.sort((a, b) => {
        if (order === 'asc') {
            return a.rating - b.rating;
        } else {
            return b.rating - a.rating;
        }
    });
}

//filter top3 per genre
function getTopThreeBooksPerGenre(books) {
    const grouped = groupByGenre(books);

    const topThreeBooksPerGenre = {};
    for (const genre in grouped) {
        const sortedBooks = sortByRating(grouped[genre], 'desc');
        topThreeBooksPerGenre[genre] = sortedBooks.slice(0, 3);
    }

    return Object.values(topThreeBooksPerGenre).flat();
}

http.createServer(function (req, res) {
    if (req.method === 'GET' && req.url === '/books') {
        const sortedBooks = getTopThreeBooksPerGenre(input, 'desc');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(sortedBooks));
    }

    else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(input));
    }
}).listen(8080);


console.log('Server is running at http://localhost:8080/');
