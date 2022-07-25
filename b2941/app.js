const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
solution(input[0]);


function solution(input) {
    let croatia = ["c=", "c-", "dz=", "d-", "lj", "nj", "s=", "z="];
  for (let alphabet of croatia) {
    input = input.split(alphabet).join("Q");
  }
  console.log(input.length);
}
asda