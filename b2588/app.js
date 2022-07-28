const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

input = input.map((item) => +item);

solution(input[0],input[1]);

function solution(A, B){
    const strB = String(B)
    const th = A * +strB[2]
    const fo = A * +strB[1]
    const fi = A * +strB[0]
    const si = A * B
    console.log(th)
    console.log(fo)
    console.log(fi)
    console.log(si)
}