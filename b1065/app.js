const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
solution(+input[0]);

function f(num) {
 const strNum = String(num)
 if( strNum.length <= 2){
    return true
 }
 if(strNum[1]-strNum[0] === strNum[2]-strNum[1]){
    return true
 }else {
    return false
 }
}
function solution(N){
  let cnt = 0;
  for(let i = 1; i <= N; ++i){
    if(f(i)){
        cnt++
    }
  }
  console.log(cnt)
}