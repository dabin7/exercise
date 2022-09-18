// 배열의 값을 name 프로퍼티에 넣고 몇번째 원소인지를
// order에 넣은 객체의 배열을 출력하세요

function solution(inputArray) {
  return inputArray.reduce((acc, cur, i) => {
    acc.push({ name: cur, order: i + 1 });
    return acc;
  }, []);
}

exports.solution = solution;
