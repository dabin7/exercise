function solution(fees, records) {
  const parkingTime = {}; // 주차시간을 객체
  records.forEach((r) => {
    let [time, id, type] = r.split(' ');
    let [h, m] = time.split(':');
    time = h * 1 * 60 + m * 1;

    if (!parkingTime[id]) parkingTime[id] = 0;
    if (type === 'IN') parkingTime[id] += 1439 - time; //1440 = 24시간, 11시59분 = 1439분 - 입차/출차시간
    if (type === 'OUT') parkingTime[id] -= 1439 - time;
    //객체가 id : 주차시간  이렇게됨  key : value
  });
  //forEach로 각각의 주차시간을 구함.

  const answer = [];

  for (let [car, time] of Object.entries(parkingTime)) {
    if (time <= fees[0]) {
      time = fees[1]; //한줄이면 중가로 생략가능
    } else {
      time = Math.ceil((time - fees[0]) / fees[2]) * fees[3] + fees[1];
    }

    answer.push([car, time]);
  }
  //fees = [기본시간, 기본요금 , 추가시간, 추가요금]

  return answer.sort((a, b) => a[0] - b[0]).map((v) => v[1]);
  //.sort((a, b) => a[0] - b[0]) 로 작은수대로 정렬
  //.map((v) => v[1])으로 time 주차비 값만 리턴해줌
}
