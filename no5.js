var http = require('http');

function cheerleader(lines, cheers) {
    let result = "";
    for (let i = 0; i < lines; i++) {
        let str = "Go" + Array(cheers).fill(" Team Go").join('');
        let indent = " ".repeat(i * 3);
        result += indent + str + '\n';
    }
    return result
}

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' }); 
    let cheerResult = cheerleader(3, 4); 
    res.write(cheerResult);
    res.end();
}).listen(8080);

console.log('Server is running at http://localhost:8080/');
