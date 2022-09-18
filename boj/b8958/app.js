const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
const arrayLength = +input[0];
const items = input.slice(1);
solution(arrayLength, items);

function solution(arrayLength, items){
    for(let i = 0; i < arrayLength; ++i){
        let cnt = 0;
        let sum = 0;
        for(let j = 0; j < items[i].length; ++j){
         if(items[i][j] === 'O'){
            cnt++;
         }else {
            cnt = 0;
         }

         sum += cnt;
        }
        console.log(sum)
    }
}