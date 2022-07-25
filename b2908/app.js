const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let splitedInput = input[0].split(' ');
const reversePrint = (str) => {
    let output = '';
    for (let i = 2; i >= 0; --i) {
        output += str[i];
    }
    console.log(output);
};
solution(splitedInput[0], splitedInput[1]);

function solution(A, B){
    const strA = String(A)
    const strB = String(B)
    let arrA = []
    let arrB = []
    for (let i = 2; i >= 0; --i){
        arrA.push(strA[i])
        arrB.push(strB[i])
    }
    if(+arrA.join('') < +arrB.join('')){
        console.log(+arrB.join(''))
    } else{
        console.log(+arrA.join(''))
    }
}
// +[...A].reverse().join() 으로 더 쉽게 가능