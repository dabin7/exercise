function numOrStr(a: number | string) {
  if (typeof a === 'string') {
    a.split(',');
  } else {
    a.toFixed(1);
  }
}

function numOrNumArr(a: number | number[]) {
  if (Array.isArray(a)) {
    //number[]
    a.slice(1);
  } else {
    a.toFixed(1);
  }
}

class A {
  aaa() {}
}
class B {
  bbb() {}
}

function aOrB(param: A | B) {
  if (param instanceof A) {
    //class가 매개변수인 경우 instanceof 연산자도 가능
    param.aaa();
  }
}
aOrB(new A());
aOrB(new B());

type B = { type: 'b'; bbb: string };
type C = { type: 'c'; ccc: string };
type D = { type: 'd'; ddd: string };

function typeCheck(a: B | C | D) {
  if (a.type === 'b') {
    a.bbb;
  } else if ('ccc' in a) {
    // in을 통해 특성으로 찾을 수도 있음.
    a.ccc;
  } else {
    a.ddd;
  }
} // 값으로 type  구분 // 객체에 type을 달아주는 습관을 들인다.

interface Cat {
  meow: number;
}
interface Dog {
  bow: number;
}
function catOrDog(a: Cat | Dog): a is Dog {
  //is 커스텀 타입 추론
  if ((a as Cat).meow) {
    return false;
  }
  return true;
}
const cat: Cat | Dog = { meow: 3 };
if (catOrDog(cat)) {
  console.log(cat.meow);
}
if ('meow' in cat) {
  console.log(cat.meow);
}

const isRejected = (
  input: PromiseSettledResult<unknown>
): input is PromiseRejectedResult => input.status === 'rejected';
const isFulfilled = <T>(
  input: PromiseSettledResult<T>
): input is PromiseFulfilledResult<T> => input.status === 'fulfilled';

const promises = await Promise.allSettled([
  Promise.resolve('a'),
  Promise.resolve('b'),
]);
const errors = promises.filter(isRejected);
//promise(then,catch) 비동기함수들을 제어함. 이행then 거부catch
