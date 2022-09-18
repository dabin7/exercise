const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
const items = input.map((item) => +item);
solution(items);

function solution(items){
    const num = items[0]*items[1]*items[2];
    const strNum = String(num).split('').map((item) => +item)
    let arr = Array(10).fill(0)

    for(let i = 0; i < strNum.length; ++i){
        arr[strNum[i]]++
    }
    for(let i = 0; i < arr.length; ++i){
        console.log(arr[i])
    }
}