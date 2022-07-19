const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
const items = input.map((item) => +item);
solution(items);

function solution(items){
    const result = items[0]*items[1]*items[2];
    const strResult = String(result);
    const answer = Array(10).fill(0);

    for (let i = 0; i < strResult.length; ++i) {
        const nowChar = +strResult[i];
        answer[nowChar]++;
    }
    for (let i = 0; i < answer.length;++i){
    console.log(answer[i])
    }
}