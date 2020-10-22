# vuesite

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## vue router 설치
npm install vue-router
router 폴더 생성하고 index.js 파일 생성

## vuetify  설치
vue add vuetify
plugins 폴더 생성 > vuetify.js 파일 생성


## firebase 설치
1. npm install -g firebase-tools
2. 브라우저에서 파이어베이스 프로젝트 생성
3. firebase > project settings > add app (web)
4. create firestore
5. Authentication > sign-in-methos 에서 로그인 방법 선택 설정
6. terminal 로 돌아와서 firebase login
7. firebase init
8. firebase사이트 > settings > your apps > SDK snippets > config 스크립트 복사
9. firebaseConfig.js 파일 생성하여 붙여넣기
10. plugins 폴더에 firebase 파일 생성