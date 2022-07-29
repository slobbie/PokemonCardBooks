## PokemonCardBooks

🍎 [배포 링크](https://slobbie.github.io/PokemonCardBooks/)

![스크린샷 2022-03-22 오후 6 37 07](https://user-images.githubusercontent.com/86298255/159450966-4e852db9-769a-4326-a3ad-84d0f1e07fe9.png)

## 사용 스택

`Typescript` `React` `Styled-Components` `recoil`

## 주요 기능

1. Pokemon API 를 이용하여 list 만들기
2. Infinite scroll 기능 구현
3. router 를 이용한 Detail 페이지
4. Recoil를 이용한 상태관리
5. search 기능으로 원하는 포켓몬을 찾을수 있다.
6. Pokemon 타입별 필터링 기능

---

### 📎 Pokemon API

프로젝트 초반 API 를 호출 하는데 많은 시간을 사용하였습니다.
초반 호출 한 데이터에는 이름과 Url 만 들어있고 그 Url을 다시 호출 하여 나온 데이터에서 한번더 호출 해야하는 방식의 API 였기때문에,
데이터를 어떤식으로 다뤄야할지에 대한 고민이 많았던거 같습니다.

---

### 📎 Recoil를 이용한 상태관리

Pokemon API에서 받아온 데이터를 Recoil에 담아 Detail , search 컴포넌트에서 사용하였습니다.

---

### 📎 Infinite scroll 기능 구현

![화면 기록 2022-03-22 오후 6 43 50](https://user-images.githubusercontent.com/86298255/181829903-d1456593-c88b-43aa-b989-5730f58df328.gif)

API 문서 자체에 Data 를 호출시에 호출되는 데이터수의 limit 을 정할수 있었습니다.
문서에 적힌 내용을 토대로 State 로 초반 호출 되는 데이터의 양을 제어하고

Intersection Observer API를 활용해서 무한 스크롤을 구현했습니다.

최하단에 Ref를 만났을때 useEffect 안에 담긴 Intersection Observer API 함수가 실행되고
함수가 실행될시에 새로운 데이터를 추가 해주는 방식을 사용하여 구현하였습니다.

~~⚙️개선점: 컨텐츠가 새로 나타날때 레이아웃이 깨지는 문제가 있습니다. 이 부분에 대해서 레이아웃이 깨지지 않도록 수정 예정입니다.~~

---

### 📎 router 를 이용한 Detail 페이지

Data 에서 받아온 고유 Id 를 useNavigate Hooks 를 이용하여 routing 시켜주었고,
Detail 컴포넌트에서 useMatch hook 을 이용하여 path 값과 data 값을 Match 시켜주었습니다.
Data에서 Data Id 와 useMatch 의 값이 일치하는 데이터를 찾아 그 데이터가 존재할시에 데이터를 map 함수를 이용하여 랜더링 해주었습니다.

⚙️개선점: 현재의 방식은 새로 고침 할시에 데이터가 날아가버리는 문제점이 있습니다. 매치 시켜 받은 데이터를 캐싱하도록 수정 예정입니다.

---

### 📎 search 기능으로 원하는 포켓몬을 찾을수 있다.

recoil 에서 받아온 데이터르 filter 함수를 이용하여 filtering 하였고, input의 value 와 data 의 name이 일치 하는 항목을 출력해주는 방식을 사용했습니다.

---

### 📎 Type 별로 포켓몬을 보여주는 기능.

Type Button 을 클릭시 useNavigate Hooks 을 이용하여 type button 을 click 시 path/type 상태로 만들어주고 useLocation hooks 를 이용하여 현재 path 와 data 를 filter 함수를 이용하여 필터링 시켜주어 해당 type을 랜더링 시켜주는 방식을 사용했습니다.

---

## ⚒구현 예정 추가 기능

1. ~~Type 별로 포켓몬을 보여주는 기능~~
2. 좋아하는 포켓몬을 like 하여 모아서 볼수 있는 기능

---

### Getting Started

1. `clone` the repository,

```
https://github.com/slobbie/PokemonCardBooks.git
```

2. `yarn` dependencies,

```
$ yarn
```

3. `start` the project,

```
$ yarn start
```

4. `Setting` prettier,

```
$ npx prettier --write .
```

### Commit Emoji

|   emoji    | commit message |       when to use it        |
| :--------: | :------------: | :-------------------------: |
|   :tada:   |     Start      |        프로젝트 시작        |
| :sparkles: |      Feat      |      새로운 기능 추가       |
|   :bug:    |      Fix       |          버그 수정          |
| :recycle:  |    Refactor    |        코드 리팩터링        |
| :lipstick: |     Style      |   스타일 추가 및 업데이트   |
| :package:  |     Chore      |   패키지 추가 및 업데이트   |
|  :books:   |      Docs      | 그 외 문서 추가 및 업데이트 |

### <br/>

###
