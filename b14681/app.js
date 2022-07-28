const fs = require("fs");
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.text';
let input = fs.readFileSync(filePath).toString().split('\n');

input = input.map((item) => +item);

solution(input[0],input[1]);

function solution(x,y){
    let ans = 0;
    if(x>0 && y>0){
        ans = 1;
    }
    if(x<0 && y>0){
        ans = 2;
    }
    if(x<0 && y<0){
        ans = 3;
    }
    if(x>0 && y<0){
        ans = 4;
    }
    console.log(ans)
}