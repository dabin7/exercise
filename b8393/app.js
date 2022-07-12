const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
solution(+input[0]);

function solution(N){
    let sum = 0;
    for(let i=1;i<=N;++i){
        sum += i;} //sum = sum + i
    console.log(sum)

}