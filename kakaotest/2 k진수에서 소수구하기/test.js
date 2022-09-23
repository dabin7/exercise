function isPrime(num) {
  if (!num || num === 1) return false; // !num ?? 했던 num 거르기
  for (let i = 2; i <= +Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  //sqrt = 루트씌움
  return true;
} //소수 구하기 - 1을 제외, 루트를 씌웠을 때 작거나 같은 2이상의 자연수로 나눠지지 않는 수(나머지 0 => x)

function solution(n, k) {
  const candidates = n.toString(k).split('0'); // toString(k) => k진법으로 변환
  return candidates.filter((v) => isPrime(+v)).length; // v를 +롤 number 타입으로
}

console.log(solution(930909, 10));
