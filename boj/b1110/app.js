const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
solution(+input[0]);

function solution(N){
    let num = N;
    let sum;
    let cnt = 0;

    while(N !== num || cnt === 0){
        cnt++;

        sum = Math.floor(num/10) + num % 10;
        num = (num % 10)*10 + sum % 10; 

    }
    console.log(N)
}