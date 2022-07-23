const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
solution(input[0]);

function solution(S){
    let answerArray = new Array(26).fill(-1);
    for (let i = 0; i < S.length; ++i){
        let nowChar = S[i];
        let answerArrayIdx = nowChar.charCodeAt() - 97;
        if (answerArray[answerArrayIdx] === -1 ){
            answerArray[answerArrayIdx] = i;
        }
    }

    for(let i = 0; i < answerArray.length; ++i){
        process.stdout.write(answerArray[i] + " ");
    }
}