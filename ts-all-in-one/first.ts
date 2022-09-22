//const a = '5'; //최대한 정확하게 하기위해 :string을 빼줌
//const b: number = 5;
//const c: boolean = true;
const d: undefined = undefined;
const e: null = null;
const f: true = true; //바뀔리없는 값은 명확히

function add(x: number, y: number): number {
  return x + y;
}
const add2: (x: number, y: number) => number = (x, y) => x + y;
const obj2: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 };

const arr: string[] = ['123'];
const arr2: Array<number> = [123]; //<> = 제네릭
const arr3: [number, string] = [2, '2']; // 갯수 타입 모두 맞아야됨

function add3(x: number, y: number): number; //변환시 사라지는부분
function add3(x, y) {
  return x + y;
} // 이런식으로 가능

let aa = 123;
aa = 'hello' as unknown as number; //js변환시 as부분도 사라짐

try {
  const array = []; //만약 타입이 never이면 :string[] 꼭해준다
  array.push('hello');
} catch (error) {
  error;
}

// <div id='header'><div/>
//const head = document.querySelector('#head')!; !는 타입 null을 지워주나 쓰지말고 if를 사용
const head = document.querySelector('#head');
if (head) {
  head.innerHTML = 'hello';
}

type World = 'world' | 'hell';
const a: World = 'world';
const b = `hello ${a}`;

type Greeting = `hello ${World}`; //타입선언 한걸 백틱으로 넣어줄 수 있음.
const c: Greeting = 'hello hell';

function rest(a, ...args: string[]) {
  console.log(a, args); // 1, [2,3]
}

rest('1', '2', '3');

const tuple: [string, number] = ['1', 1];
tuple.push('hello'); // push 로 3번째 요소 넣어주는건 못막아줌.

const enum EDirection { //변수를 그룹으로 묶고 싶을 때 사용 자바스크립트에서 사라짐
  Up = 3,
  Down = 'hello',
  Left = 5,
  Right,
}
//객체로 나타낼 수 있음.
const ODirection = {
  Up: 3,
  Down: 'hello',
  Left: 5,
  Right: 6,
} as const; // as const 값을 상수로 쓰겠다. 타입이 바뀜. readonly 수정 못하게 고정됨.

const x = EDirection.Up;
const y = EDirection.Left;

const obj = { a: '123', b: 'hello', c: 'world' } as const;
type Key = keyof typeof obj; // obj를 타입으로 쓰고싶을 때 typeof 그 중 키값 keyof 해서 Key라는 타입으로 만듬.
type Key2 = typeof obj[keyof typeof obj]; // = 이넘enum 원리
//Key2는 value들의 타입만 가져옴
