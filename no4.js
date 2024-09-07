var http = require('http');

//input
const input = [
    { gpa: 3.87, credits: 178, honorcredits: 16 },
    { gpa: 1.5, credits: 199, honorcredits: 30 },
    { gpa: 2.7, credits: 380, honorcredits: 50 },
    { gpa: 3.62, credits: 200, honorcredits: 10 },
    { gpa: 3.93, credits: 185, honorcredits: 0 },
    { gpa: 3.85, credits: 190, honorcredits: 15 },
];

//logic
// not graduate (gpa < 2) or (credits < 180)
// graduate (gpa >= 2 and credits >= 180)
// cumlaude (gpa >= 3.6)
// magna cumlaude (gpa >= 3.8) or (gpa >= 3.6 and honor >= 15)
// summa cumlaude (gpa >= 3.8 and  honor >= 15)

function graduation(gpa, credits, honorcredits) {

    // minimum credits 180 for graduation
    if (credits < 180) {
        return "not graduating";
    }
    
    //minimum gpa for above cumlaude
    if (gpa >= 3.8) {
        //minimum honor credit 15 for summa cumlaude
        if (honorcredits >= 15) {
            return "summa cum laude";
        } 
        else {
            return "magna cum laude";
        }
    } 
    //mininum gpa 3.6 for cumlaude
    else if (gpa >= 3.6) {
        // minimum honor credit 15 for magna cumlaude
        if (honorcredits >= 15) {
            return "magna cum laude";
        } 
        else {
            return "cum laude";
        }
    //mininum gpa 2.0 for graduation
    } 
    else if (gpa >= 2.0) {
        return "graduating";
    }
    
    return "not graduating";
}

http.createServer(function (req, res) {
    if (req.method === 'GET' && req.url === '/graduation') {
        const results = input.map(student => ({
            gpa: student.gpa,
            credits: student.credits,
            honorcredits: student.honorcredits,
            status: graduation(student.gpa, student.credits, student.honorcredits)
        }));

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    }
}).listen(8080);

console.log('Server is running at http://localhost:8080/');
