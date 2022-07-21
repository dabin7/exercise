const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
const arrayLength = +input[0];
const items = input.slice(1);
solution(arrayLength, items);

function solution(arrayLength, items){
    for (let i=0; i < arrayLength; ++i){
        const OXList = items[i];    
        let cnt = 0;
        let score = 0;
    for (let j=0; j < OXList.length; ++j){
        const OorX = OXList[j]
        if( OorX === "O"){
            cnt++
            score += cnt;
        }else{
            cnt = 0;
        }
    }
    console.log(score)
 }
}