var http = require('http');

// input
const input = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]; 
//asumsi semua input konsisten persegi / persegi panjang
function totalAdj(a, b){
    var total = 0 
    var col = input[0].length;
    var row = input.length;
    console.log("col ",col, " row ",row,);

    //row total
    total += input[a].reduce(add, 0);
    console.log(total);

    //col total 
    for(i = 0; i < row; i++){
        total += input[i][b];
    }
    //duplicate handling
    total = total - input[a][b];
    console.log(total);

    //diagonal 1 "/"
    var dia1 = 0
    if(b == 0 || a == row - 1){
        for(i = a; i >= 0; i--){
            total += input[i][b+dia1];
            dia1 += 1;
        }
    }
    else if (b == col - 1 || a == 0){
        for(i = b; i >= 0; i--){
            total += input[a+dia1][i];
            dia1 += 1;
        }
    }
    else {
        console.log("tengah");
    }
    //duplicate handling
    total = total - input[a][b];

    console.log(total);

    //diagonal 2 "\"
    var dia2 = 0
    if(a == 0 || b == 0){
        for(i = b; i < col; i++){
            console.log(input[a+dia2][i])
            total += input[a+dia2][i];

            dia2 += 1;

        }
    }
    else if(a == row - 1){
        console.log("bawah");
    }
    else {
        console.log("tengah2");
    }
    total = total - input[a][b];
    console.log(total);
}

function add(a, b){
    return a + b;
}
totalAdj(1, 0);

http.createServer(function (req, res) {

}).listen(8080);


console.log('Server is running at http://localhost:8080/');