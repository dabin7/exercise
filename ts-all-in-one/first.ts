const a = '5'; //최대한 정확하게 하기위해 :string을 빼줌
const b: number = 5;
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;
const f: true = true; //바뀔리없는 값은 명확히

function add(x: number, y: number): number {
  return x + y;
}
const add2: (x: number, y: number) => number = (x, y) => x + y;
const obj: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 };

const arr: string[] = ['123'];
const arr2: Array<number> = [123]; //<> = 제네릭
const arr3: [number, string] = [2, '2']; // 갯수 타입 모두 맞아야됨
