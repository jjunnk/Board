# vb

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

## after menu data save work

1. stop run npm serve and close the browser tab

2. in the firebase realtime database, delete the data of site ref

3. then start again npm run serve and check realtime database 

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## vuetify 설치
vue add vuetify

## firebase 프로젝트 생성

## firebase 설치
npm install -g firebase-tools

firebase login

firebase init

firebase deploy

## firebase key download
프로젝트 설정 > 서비스 계정 > 새 비공개 키 생성 클릭 > 다운로드된 파일을 functions 폴더에 key.json으로 저장

Admin SDK 구성 스니펫은 복사해서 functions 폴더 안에 index.js 에 붙여넣고,
serviceAccountKey.json => kdy.json 으로 수정한다.

## firebase functions 환경설정
1. 설정 =>  firebase functions:config:set admin.email=xx@abc.com admin.db_url=https://xxx-site.firebaseio.com
2. 확인 => firebase functions:config:get
3. firebase deploy --only functions

## firestore 시작하기
1. firebase.js 에 import 'firebase/firebase-firestore'  삽입
2. functions / indes.js 파일에 event trigger 작성

## google cloud sdk 설치

## toast ui editor 설치
npm install tui-editor
https://github.com/nhn/tui.editor/tree/master/apps/vue-editor