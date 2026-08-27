# SKALA Vue 날씨 애플리케이션

Vue 3 교재의 Hands on 실습을 순서대로 적용한 날씨 애플리케이션입니다.

## 실습 구성

- 실습 1 Weather Mockup: `src/submissions/01-weather-mockup/`
- 실습 2 Weather Composition: `src/submissions/02-weather-composition/`
- 실습 3 Weather Component: `src/submissions/03-weather-component/`
- 실습 4 이후 누적 앱: `src/App.vue`, `src/router/`, `src/views/`, `src/components/weather/`
- 실습 5 Weather Store: `src/stores/configStore.js`
- 실습 6 Weather Axios: 메인 및 상세 날씨 화면에 OpenWeather API 적용

중간 코드챌린지는 `src/components/practices/`, Vue 기본 생성 예제는 `src/archive/vue-starter/`에 분리되어 있습니다.

## 실행 방법

```sh
npm install
```

프로젝트 최상위에 `.env.local`을 만들고 OpenWeather API 키를 입력합니다.

```env
VITE_OPENWEATHER_API_KEY=발급받은_API_키
```

```sh
npm run dev
```

## 코드 검사와 빌드

```sh
npm run lint
npm run build
```

`.env.local`은 Git에 포함되지 않습니다.
