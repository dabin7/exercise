const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const items = input.map((item)=>+item);

solution(items);

function solution(items){
    let maxnum = items[0];
    let X = 0;
    for(let i = 0; i < items.length;++i){
    if(maxnum < items[i]){
        maxnum = items[i];
        X = i;
    }
}
console.log(`${maxnum}`)
console.log(X+1)
}


