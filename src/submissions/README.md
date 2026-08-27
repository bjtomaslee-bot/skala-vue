# Hands on 제출 파일 구조

## 1. Weather Mockup

- `01-weather-mockup/WeatherMockup.vue`
- 교재 116쪽
- `v-for`, `v-if`, `v-else-if`, `v-else`, `:value`, `@input`, 이벤트 수식어 실습

## 2. Weather Composition

- `02-weather-composition/WeatherComposition.vue`
- 교재 145쪽
- 1번 실습에 `computed`, `watch`, `watchEffect`를 추가한 결과물

## 3. Weather Component

- `03-weather-component/WeatherParent.vue`
- `03-weather-component/BaseDashboardCard.vue`
- `03-weather-component/SearchBar.vue`
- `03-weather-component/WeatherCard.vue`
- 교재 178쪽
- 2번 실습을 부모·자식 컴포넌트로 분리한 결과물

## 4번 이후 누적 앱

교재 196쪽의 Weather Router부터는 현재 실행 중인 앱을 계속 확장한다.

- `../App.vue`
- `../main.js`
- `../router/`
- `../views/`
- `../components/weather/`
- `../data/`
- `../stores/`

교재 212쪽의 Weather Store, 230쪽의 Weather Axios, 249쪽의 Weather UI Library, 274쪽의 Weather Deployment도 이 앱에 이어서 적용한다.

`../components/practices/`는 중간 코드챌린지 연습 파일이므로 Hands on 제출 파일과 구분한다.

Vue 프로젝트 생성 시 자동으로 생긴 예제 파일은 `../archive/vue-starter/`로 옮겨 현재 과제 파일과 구분한다.
