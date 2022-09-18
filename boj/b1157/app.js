const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
solution(input[0]);

function solution(str){
   const  X = str.toUpperCase()
   const arr = new Array(26).fill(0);

   for (let i = 0; i < X.length; i++){
       const num = (X.charCodeAt(i))-65
       arr[num]++
    }

    const max = Math.max(...arr);
    const index = arr.indexOf(max);

    let isSame = false;

    for(let j = 0; j < 26; j++){
        if(arr[j] === max && index !== j){
            isSame = true;
            break;
        }
    }
    console.log(isSame ? "?" : String.fromCharCode(index + 65))
}