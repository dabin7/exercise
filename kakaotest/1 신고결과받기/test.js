function solution(id_list, report, k) {
  let answer = new Array(id_list.length);
  answer.fill(0);
  let setReport = [...new Set(report)]; // 중복제거를 위한 set

  let arr = [];
  let user = [];
  let reportingUser = []; //정지된 유저
  let reportedUser = []; //신고한 유저

  for (let i = 0; i < setReport.length; i++) {
    arr.push(setReport[i].split(' ')); //split 으로 나눠 [0]신고한사람 [1]신고당한사람 나눠줌.
  }
  // arr에 다시 넣는다? 배열로 다시 만드는과정?

  for (let i = 0; i < id_list.length; i++) {
    user.push({ name: id_list[i], reported: 0 });
  } // user리스트 만들기?

  for (let i = 0; i < user.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (user[i].name == arr[j][1]) {
        user[i].reported++;
      }
    }
  } // 신고된 횟수 구하기

  for (let i = 0; i < user.length; i++) {
    if (user[i].reported >= k) {
      reportingUser.push(user[i].name);
    }
  } // 정지된 유저 구하기

  for (let i = 0; i < reportingUser.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (reportingUser[i] == arr[j][1]) {
        reportedUser.push(arr[j][0]);
      }
    }
  }
  return answer;
}
