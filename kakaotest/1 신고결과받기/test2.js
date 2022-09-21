function solution(id_list, report, k) {
  let reports = [...new Set(report)].map((a) => {
    return a.split(' ');
  }); // [[muzi, frodo], [apeach, frodo], [muzi, neo]] 이런식으로 들어옴 split으로 배열로 각각 담음

  let counts = new Map();
  for (const bad of reports) {
    counts.set(bad[1], counts.get(bad[1]) + 1 || 1);
    // bad[i] = 신고당한 유저 => key , counts.get(bad[1]) + 1 || 1 => value
    // map을 활용하여 객체 모양의 자료형을 만들어줌. frodo 1 => frod 2(1+1) , neo 1
    // counts.get(bad[1]) + 1 이 값이 없을때 1 , 중복될때마다 +1 을 해줌
  } // 신고당한 사람과 횟수 = bad

  let good = new Map();
  for (const report of reports) {
    if (counts.get(report[1]) >= k) {
      good.set(report[0], good.get(report[0]) + 1 || 1);
    }
  }

  let answer = id_list.map((a) => good.get(a) || 0);

  return answer;
}
