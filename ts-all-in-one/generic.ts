function add<T>(x: T, y: T): T {
  return x + y;
}
add<number>(1, 2);
add(1, 2);
add<string>('1', '2');
add('1', '2');
add(1, '2');
//제네릭 타입을 변수처럼 extends 로 타입에 제한을 줄 수 있음.
// <T extends abstract new (...args: any) => any> 생성자   add(A)가능  add(new A()) 불가능

function a<T>() {}
class B<T>() {}
interface C<T> {}
type D<T> = {};

const e = <T>() => {}; //제네릭 선언 위치

//react로 할땐 <T = unknown> 기본값을 넣어줌 <div>와같은 형식땜에 타입스크립트가 추론을 못함