const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
let splitedInput = input[0].split(" ");
const reversePrint = (str) => {
  let output = "";
  for (let i = 2; i >= 0; --i) {
    output += str[i];
  }
  console.log(output);
};
solution(splitedInput[0], splitedInput[1]);

function solution(A, B) {
  const reverseA = A.split(" ").map((x) => [...x].reverse().join(""));
  const reverseB = B.split(" ").map((x) => [...x].reverse().join(""));

  console.log(Math.max(reverseA, reverseB));
}
// +[...A].reverse().join() 으로 더 쉽게 가능
