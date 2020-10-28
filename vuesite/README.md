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

## Vuex 설치
npm i vuex --save

메뉴 추가기능 만들고, 하위메뉴 생성코드 작성전에 설치하기
npm 설치 후에 src > store 폴더 생성, 폴더 안에 index.js 파일 생성



## 로그인 사용자 저장하기
1. firebase -  프로젝트 설정 - 서비스계정 - 새 비공개키 생성 버튼 클릭하여 키 파일 다운로드
2. 프로젝트 폴더 - functions 폴더 안에 key.json 이름으로 저장
3. gitignore 에 key.json 추가

## firestore 활성화
views - board 폴더 생성, index.vue 파일 생성

## axios 설치
axios라는 모듈을 사용해서 문서 내부에서 쉽게 처리

설치 방법 : npm install axios

## gcloud sdk 설치

## cors.json 파일 생성하고 내용은 아래와 같이 작성
[
  {
    "origin": ["*"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]

## gsutil 사용하여 cors.json 적용하기
1. gcloud sdk shell 열기
2. cd  \google-cloud-sdk\bin
3. gsutil cors set [cors.json 파일 경로]  gs://<your-cloud-storage-bucket>

## toast ui editor
1. 설치 : npm install --save @toast-ui/vue-editor
2. plugins폴더에 editor.js 파일 추가하고 main.js 수정

## moment로 날짜 표시
1. 설치 : npm i moment
2. plugins 폴더 - moment.js 파일 추가
3. https://momentjs.com/