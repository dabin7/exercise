const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

input = input[0];
input = input.split(' ').map((item) => +item);

solution(input[0],input[1]);

function solution(H, M){
    //45분 일찍 알람
    M -= 45
   if(M < 0){
        M += 60;
        H -= 1;
        if(H < 0){
            H = 23;
        }
    }
    console.log(H,M)
}