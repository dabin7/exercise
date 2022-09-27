const xx: {} = 'hello';
const yy: Object = 'hi';
//{} , Object 는 객체가아닌 모든 타입을 의미(null, undefined 제외)
const cc: object = { hello: 'world' }; // 소문자 o가 object

// unknown = {} | null | undefined

interface A {
  readonly a: string;
  b: string;
}
//readonly 읽기전용 수정불가

type A = { [key: string]: number }; //인덱스드 시그니처
const aaaa: A = { a: 3, b: 5, c: 5 };

type B = 'Human' | 'Mammal' | 'Animal'; // & | 는 interface에서 안됨
type A = { [key in B]: number }; //맵드 타입
const aaaa: A = { Human: 3, Mammal: 5, Animal: 5 };

class B implements A {
  private a: string;
  protected b: string;
}
class C extends B {}
new C().a;
new C().b;
