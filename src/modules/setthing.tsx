/* 액션 타입 선언 */
const TEST = "TEST";

/* 액션 생성함수 선언 */
export const addTodo = (id: number) => ({
  type: TEST,
  test: {
    id,
  },
});

/* 초기 상태 선언 */
// 리듀서의 초기 상태는 꼭 객체타입일 필요 없다.
// 배열이여도 되고, 원시 타입 (숫자, 문자열, 불리언 ) 이여도 상관 없다.
const initialState = [
  {
    id: 1,
    text: "예시",
    done: false,
  },
];

const setthing = (state = initialState, action: any) => {
  switch (action.type) {
    case TEST:
      return state;
    default:
      return state;
  }
};

export default setthing;
