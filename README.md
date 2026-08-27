# 날씨 대시보드

Vue 3 수업에서 배운 문법을 단계별로 적용해 만든 날씨 애플리케이션이다. 처음에는 정해진 Mock 데이터를 화면에 표시하는 실습으로 시작했고, 이후 컴포넌트 분리, 라우팅, Pinia 상태 관리, Axios API 통신, Element Plus 적용까지 기능을 확장했다.

단순히 기온을 보여주는 데서 끝내지 않고, 사용자가 외출 전에 실제로 궁금해할 만한 내용을 보여주는 것을 목표로 했다. 현재 날씨에 따른 옷차림 추천, 비가 올 때의 우산 알림, 지역별 도시 분류, 시간대별 예보를 추가했다.

## 프로젝트 링크

- 배포 주소: [https://skala-vue-nine-zeta.vercel.app](https://skala-vue-nine-zeta.vercel.app)
- GitHub 저장소: [https://github.com/bjtomaslee-bot/skala-vue](https://github.com/bjtomaslee-bot/skala-vue)

## 주요 기능

- 특별시·광역시와 도 단위로 도시를 나누어 표시
- 도시 이름 검색 및 검색 결과 필터링
- OpenWeather API를 이용한 실시간 날씨 조회
- 섭씨와 화씨 단위 전환
- 기온에 따른 옷차림 추천
- 비가 오는 도시만 모아 보는 우산 필터
- 상세 화면에서 24시간 날씨 예보 확인
- 가장 가까운 강수 예상 시간 안내
- 존재하지 않는 주소에 대한 Not Found 화면
- Element Plus를 이용한 탭, 카드, 버튼, 입력창 구성

## 프로젝트 구조

```text
src
├── App.vue
├── main.js
├── assets
│   ├── base.css
│   └── main.css
├── components
│   ├── practices/basic
│   │   ├── SampleOne.vue
│   │   └── SampleTwo.vue
│   └── weather
│       ├── BaseDashboardCard.vue
│       ├── SearchBar.vue
│       ├── UnitToggler.vue
│       ├── WeatherCard.vue
│       └── WeatherForecast.vue
├── data
│   └── weatherData.js
├── router
│   └── index.js
├── stores
│   └── configStore.js
├── submissions
│   ├── 01-weather-mockup
│   ├── 02-weather-composition
│   └── 03-weather-component
└── views
    ├── NotFoundView.vue
    ├── WeatherAboutView.vue
    ├── WeatherDetailView.vue
    └── WeatherHomeView.vue
```

### 각 폴더의 역할

- `views`: 주소에 따라 Router가 보여주는 페이지 단위 파일이다.
- `components/weather`: 여러 화면에서 조립해서 사용하는 날씨 관련 컴포넌트이다.
- `data/weatherData.js`: 도시 이름, 지역 그룹, API 검색어를 한곳에서 관리한다.
- `stores/configStore.js`: 여러 페이지가 함께 사용하는 온도 단위와 우산 필터 상태를 관리한다.
- `router/index.js`: 홈, 상세, 소개, Not Found 화면의 주소를 연결한다.
- `submissions`: 앞의 실습 결과가 최종 코드에 덮어써지지 않도록 단계별 Hands-on 결과를 보관한다.
- `archive`: Vue 프로젝트 생성 직후의 기본 파일 중 현재 앱에서 사용하지 않는 파일을 보관한다.

### 화면이 만들어지는 흐름

```text
main.js
  └── App.vue
        └── RouterView
              ├── WeatherHomeView
              │     ├── SearchBar
              │     ├── UnitToggler
              │     └── WeatherCard
              ├── WeatherDetailView
              │     ├── UnitToggler
              │     └── WeatherForecast
              ├── WeatherAboutView
              └── NotFoundView
```

`main.js`에서 Vue 앱, Router, Pinia, Element Plus를 연결한다. `App.vue`는 내비게이션 바와 `<RouterView />`가 들어가는 가장 바깥 화면이다. Router는 현재 주소에 맞는 View를 `<RouterView />` 자리에 표시한다.

날씨 데이터는 `weatherData.js`의 도시 목록을 기준으로 OpenWeather API에 요청한다. 받아온 값은 `ref`에 저장되고, `computed`로 검색·지역·우산 조건에 맞게 가공된다. 가공된 데이터는 `props`를 통해 `WeatherCard`로 내려가 화면에 표시된다.

## 실습 진행 과정

| 단계   | 구현 내용                            | 배운 내용                                                              |
| ------ | ------------------------------------ | ---------------------------------------------------------------------- |
| 실습 1 | 한 파일에 날씨 Mockup 작성           | 템플릿, `v-bind`, `v-if`, `v-else-if`, `v-else`, `v-show`, `v-for`     |
| 실습 2 | Composition API로 상태와 이벤트 추가 | `<script setup>`, `ref`, `computed`, `v-on`, 키보드 이벤트             |
| 실습 3 | 화면을 부모·자식 컴포넌트로 분리     | `props`, `emit`, slot, 컴포넌트 등록                                   |
| 실습 4 | 여러 페이지 구성                     | Vue Router, `<RouterLink>`, `<RouterView>`, 지연 로딩, Catch-all Route |
| 실습 5 | 온도와 필터 상태 공유                | Pinia의 state, getter, action                                          |
| 실습 6 | 실제 날씨 데이터 연결                | Axios, `async/await`, 생명주기 함수, 환경변수                          |
| 실습 7 | UI와 예보 기능 확장                  | Element Plus, 예보 API, 지역별 탭, 조건부 알림                         |

## 기능에 사용한 Vue 문법

| 기능                   | 사용한 문법과 개념                            | 적용 위치                                      |
| ---------------------- | --------------------------------------------- | ---------------------------------------------- |
| 도시 목록 반복 출력    | `v-for`, `:key`                               | `WeatherHomeView.vue`                          |
| 로딩·오류·빈 결과 구분 | `v-if`, `v-else-if`, `v-else`, `v-show`       | `WeatherHomeView.vue`                          |
| 지역 탭 전환           | `ref`, `computed`, `v-model`                  | `WeatherHomeView.vue`                          |
| 검색어 전달            | `props`, `emit`, `:model-value`, `@input`     | `SearchBar.vue`                                |
| 키보드 입력 확인       | `keydown`, `keypress`, `keyup`, `console.log` | `SearchBar.vue`                                |
| 날씨 카드 표시         | `props`, 동적 속성 바인딩                     | `WeatherCard.vue`                              |
| 섭씨·화씨 변환         | Pinia getter와 action                         | `configStore.js`, `UnitToggler.vue`            |
| 우산 필터              | Pinia state와 `computed`                      | `configStore.js`, `WeatherHomeView.vue`        |
| 상세 화면 이동         | `RouterLink`, `useRoute`                      | `WeatherCard.vue`, `WeatherDetailView.vue`     |
| 실제 날씨 요청         | Axios, `async/await`, `onMounted`             | `WeatherHomeView.vue`, `WeatherDetailView.vue` |
| 예보 요청과 강수 판별  | Axios, `for` 반복문, `ref`                    | `WeatherForecast.vue`                          |

## 실습하면서 고민하고 배운 점

### 1. 실습 결과를 한 파일에 계속 덮어쓰지 않기

처음에는 새로운 실습을 할 때마다 같은 파일을 수정했다. 그러다 보니 최종 코드만 남고 `v-bind`, 디렉티브, 이벤트, 컴포넌트 분리 같은 앞 단계의 학습 결과를 확인하기 어려워졌다. 이를 해결하기 위해 초기 Hands-on 결과는 `submissions` 폴더에 단계별로 따로 보관하고, 실습 4 이후부터는 현재 애플리케이션을 계속 발전시키는 방식으로 정리했다.

이 과정에서 Git 커밋은 단순 백업이 아니라 코드가 어떻게 변화했는지 보여주는 기록이라는 점도 배웠다.

### 2. 같은 도시 데이터를 여러 View에 반복해서 쓰지 않기

홈 화면과 상세 화면을 처음 만들 때 각각의 파일에 같은 도시 목록을 작성했다. 도시를 추가하거나 이름을 바꾸려면 두 파일을 모두 수정해야 하고, 한쪽만 고치면 서로 다른 데이터가 표시되는 문제가 있었다.

그래서 공통 도시 데이터를 `weatherData.js`로 분리하고 두 View가 같은 배열을 import하도록 바꿨다. 컴포넌트를 나누는 것뿐 아니라, 여러 곳에서 사용하는 데이터도 한곳에 두는 것이 유지보수에 중요하다는 것을 알게 되었다.

### 3. Mock 데이터가 잠깐 나타나는 현상 해결하기

상세 화면에서 홈으로 돌아왔을 때 Mock 날씨가 잠깐 보인 뒤 실제 날씨로 바뀌는 현상이 있었다. 화면이 먼저 기존 배열을 출력하고 API 응답이 도착한 뒤 데이터를 교체했기 때문이다.

초기 날씨 목록을 빈 배열로 두고, API 요청 중에는 로딩 상태를 보여주도록 수정했다. 이를 통해 비동기 통신에서는 성공 데이터뿐 아니라 `loading`, `error`, 빈 결과 상태를 각각 준비해야 자연스러운 화면이 된다는 점을 배웠다.

### 4. 부모와 자식 컴포넌트의 역할 나누기

처음에는 부모·자식으로 파일을 나누면 코드만 복잡해지는 것처럼 느껴졌다. 실습하면서 부모는 데이터와 전체 흐름을 관리하고, 자식은 전달받은 값을 화면에 표시하거나 사용자 입력을 부모에게 알리는 역할이라는 것을 이해했다.

예를 들어 `WeatherHomeView`가 날씨 목록과 필터링을 담당하고, `WeatherCard`는 `props`로 받은 한 도시의 날씨를 표시한다. `SearchBar`는 검색어를 직접 변경하는 대신 `emit`으로 부모에게 입력 내용을 전달한다.

### 5. 페이지가 바뀌어도 필요한 설정 유지하기

온도 단위를 각 컴포넌트의 `ref`로만 관리하면 홈 화면과 상세 화면의 단위가 서로 달라질 수 있었다. Pinia에 `unit`을 두고 두 화면이 같은 상태를 사용하게 하면서 전역 상태가 필요한 이유를 알게 되었다.

다만 현재 상태는 페이지를 새로고침하면 초기화된다. 화면 이동 중 상태 공유와 브라우저를 다시 열어도 유지되는 저장 기능은 서로 다른 문제라는 점도 알게 되었다.

### 6. 라우팅과 데이터 전달은 별개의 문제

Router를 사용하면 화면 이동과 주소 연결은 해결되지만, 홈 화면에 있던 데이터가 상세 화면으로 자동 복사되는 것은 아니었다. 상세 화면은 주소의 도시 ID를 `useRoute()`로 확인하고, 공통 도시 데이터에서 해당 도시를 찾은 뒤 필요한 날씨를 다시 요청한다.

`route`는 현재 주소의 정보를 읽는 객체이고 `router`는 코드에서 화면 이동을 실행할 때 사용하는 객체라는 차이도 함께 배웠다. 사용하지 않는 `router`를 선언하면 편집기에서 경고가 발생하므로 실제로 필요한 것만 남겼다.

### 7. API 키 오류를 해결하며 알게 된 점

OpenWeather API 연결 과정에서 `401 Unauthorized` 오류가 발생했다. 원인은 환경변수의 공백, `.env.local`의 위치, 발급 계정의 이메일 인증이었다. `.env.local`을 프로젝트 최상위에 두고 아래와 같은 형식으로 작성한 뒤 개발 서버를 다시 시작해야 값이 반영되었다.

```env
VITE_OPENWEATHER_API_KEY=발급받은_API_키
```

Vite에서 브라우저 코드에 사용할 환경변수는 이름이 `VITE_`로 시작해야 하며, 환경변수 파일을 수정한 뒤에는 서버를 재시작해야 한다. 또한 `.env.local`은 Git에 올리지 않도록 관리해야 한다.

### 8. 도시가 많아졌을 때 화면 구성 바꾸기

도시를 계속 추가하니 카드가 아래로 너무 길어졌다. 데이터는 그대로 유지하면서 특별시·광역시와 각 도를 상위 그룹으로 묶고, Element Plus의 탭으로 선택한 그룹만 표시하도록 바꿨다. 이때 선택한 탭은 `ref`, 탭에 맞는 도시 목록은 `computed`로 처리했다.

단순히 CSS만 바꾸는 것보다 사용자가 많은 데이터를 어떻게 탐색할지를 먼저 생각해야 한다는 점을 배웠다.

### 9. 현재 날씨에서 시간대별 예보로 확장하기

현재 날씨 API만으로는 사용자가 궁금해할 “비가 언제 오는가”를 알 수 없었다. 상세 화면에 별도의 `WeatherForecast` 컴포넌트를 만들고 5일/3시간 예보 API 중 8개 항목을 받아 약 24시간의 예보를 보여주었다.

예보 배열을 반복하면서 가장 먼저 비 또는 눈이 예상되는 항목을 찾고 우산 알림으로 표시했다. API 응답은 하나의 값이 아니라 중첩된 객체와 배열이므로, 개발자 도구에서 실제 응답 구조를 확인하는 과정이 중요했다.

### 10. UI 라이브러리 적용 범위 선택하기

Element Plus의 자동 import 방식도 있지만 현재 수업에서 다루지 않은 추가 설정이 필요해 `main.js`에서 전체 라이브러리를 등록하는 방식을 사용했다. 설정은 이해하기 쉽지만 빌드 파일 크기가 커질 수 있다는 단점이 있다. 라이브러리는 화면을 빠르게 통일할 수 있지만, 편리함과 번들 크기 사이에 선택이 있다는 점을 알게 되었다.

## API 데이터 흐름

```text
weatherData.js의 도시 목록
        ↓
WeatherHomeView에서 현재 날씨 API 요청
        ↓
ref 저장 → computed로 검색·지역·우산 조건 적용
        ↓
WeatherCard에 도시별 날씨를 props로 전달

상세 주소의 cityId → 공통 도시 데이터에서 도시 찾기
        ↓
WeatherDetailView에서 현재 날씨 API 요청
        ↓
도시 검색어를 WeatherForecast에 props로 전달
        ↓
WeatherForecast에서 시간대별 예보 API 요청
```

현재 날씨는 `/data/2.5/weather`, 시간대별 예보는 `/data/2.5/forecast`를 사용한다. API의 날씨 설명은 제공되는 한국어 값을 그대로 출력한다. 일부 표현이 자연스럽지 않을 수 있어, 이후에는 날씨 코드별 한국어 문구를 직접 정의하는 방법을 고려하고 있다.

## 실행 방법

### 1. 패키지 설치

```sh
npm install
```

### 2. API 키 설정

프로젝트 최상위에 `.env.local` 파일을 만들고 다음 내용을 작성한다.

```env
VITE_OPENWEATHER_API_KEY=발급받은_API_키
```

등호 앞뒤에는 공백을 넣지 않는다. 키를 새로 발급했다면 이메일 인증과 활성화 여부도 확인한다.

### 3. 개발 서버 실행

```sh
npm run dev
```

터미널에 표시된 로컬 주소로 접속한다. 기본 설정에서는 보통 `http://localhost:5173`이다.

## 코드 검사와 빌드

```sh
npm run lint
npm run build
```

`npm run lint`는 코드 규칙 위반을 확인하고, `npm run build`는 제출 가능한 형태로 정상 빌드되는지 확인한다.

## 앞으로 보완할 점

- 날씨 코드별 자연스러운 한국어 설명 작성
- 새로고침 후에도 온도 단위와 필터 설정 유지
- 동시에 많은 도시를 요청할 때의 로딩 속도 개선
- API 요청 실패 시 도시별 재시도 기능 추가
- 필요한 Element Plus 컴포넌트만 불러와 빌드 크기 줄이기
- 모바일 화면에서 지역 탭과 날씨 카드 배치 추가 점검
