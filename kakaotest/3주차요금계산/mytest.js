function solution(fees, records) {
  const answer = []; //차량번호작은수부터 차례대로 배열??
  //fees = [기본시간, 기본요금 , 추가시간, 추가요금]
  const time = (records) => {
    //records = ['시간 번호 IN/OUt','시간 번호 IN/OUt','시간 번호 IN/OUt']
    for (let i = 0; i < records.length; i++) {
      const inRecord = records[i].split(' ');

      if (inRecord[2] === 'IN') {
        for (let j = i; j < records.length - (i + 1); j++) {
          const outRecord = records[j].split(' ');

          if (inRecord[1] === outRecord[1]) {
            const A = +inRecord[0].split(':');
            const B = +outRecord[0].split(':');
            const result = B[0] * 60 + B[1] - (A[0] * 60 + A[1]);

            return +result;
          }
        }
      }
    }
  };

  const pay = (time) => {
    if (+time <= +fees[0]) {
      return fees[1]; //good
    }
    const fee = fees[1] + (time - fees[0]) * fees[3];
    answer.push(fee);
  };

  return answer;
}
// 피드백
// 1. forEach 를 활용!!!
// 2. 주차시간을 객체로 만듬!! records를 객체로 만드는게 아니라 parkingTime(주차시간)을 객체로 만듬.(key(차번호id): value(주차시간))
// 3. 24시간 = 1440분 (1439 - 입차시간) 을 더하고 (1439 - 출차시간)을 빼면 주차시간이 나옴.
// 4. sort()로 배열
