const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
input = input.map((item) => +item);
solution(input[0], input[1]);

function solution(A , B) {
    const stringB = String(B)
    const one = +stringB[2]
    const ten = +stringB[1]
    const hun = +stringB[0]
    console.log(A * one)//3 472*5
    console.log(A * ten)//4 472*8
    console.log(A * hun)//5 472*3
    console.log(A * B);//6 472*385
}