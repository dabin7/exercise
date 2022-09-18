const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
solution(+input[0]);

function solution(num){
    if(num >= 90 && num <= 100) {
        console.log("A");
    }else if(num >=80 && num <= 89) {
        console.log("B");
    }else if(num >=70 && num <= 79) {
        console.log("C");
    }else if(num >=60 && num <= 69) {
        console.log("D")
    } else {
        console.log("F");
    }
}