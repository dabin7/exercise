const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');
const items = input.map((item) => +item);
solution(items);

function solution(items){
    const arr = [];
    for(let i = 0; i < items.length; ++i){
       const rest = items[i] % 42;
       if(arr.indexOf(rest) === -1){arr.push(rest)}
    }
    const ans = arr.length
    console.log(ans)
}