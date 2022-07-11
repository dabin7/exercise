const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
input = input.map((item) => +item);
solution(input[0], input[1]);

function solution(A , B) {
    const stringB = String(B)
    //3 472*5
    //4 472*8
    //5 472*3
    console.log(A * B);//6 472*385
}