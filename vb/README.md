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

## firebase key download
프로젝트 설정 > 서비스 계정 > 새 비공개 키 생성 클릭 > 다운로드된 파일을 functions 폴더에 key.json으로 저장

Admin SDK 구성 스니펫은 복사해서 functions 폴더 안에 index.js 에 붙여넣고,
serviceAccountKey.json => kdy.json 으로 수정한다.


## firestore 시작하기
1. firebase.js 에 import 'firebase/firebase-firestore'  삽입

