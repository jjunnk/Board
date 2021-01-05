# sujin
This is Sujin's portfolio


#### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


#### vue router 설치
```
npm install vue-router
```
router 폴더 생성하고 index.js 파일 생성


#### vuetify  설치
```
vue add vuetify
```
plugins 폴더 생성 > vuetify.js 파일 생성


#### firebase 설치
1. ``` npm install -g firebase-tools ```
2. 브라우저에서 파이어베이스 프로젝트 생성
3. firebase > project settings > add app (web)
4. create firestore
5. Authentication > sign-in-methos 에서 로그인 방법 선택 설정
6. terminal 로 돌아와서 firebase login
7. firebase init
8. firebase사이트 > settings > your apps > SDK snippets > config 스크립트 복사
9. firebaseConfig.js 파일 생성하여 붙여넣기
10. plugins 폴더에 firebase 파일 생성


#### Vuex 설치
```
npm i vuex --save
```
메뉴 추가기능 만들고, 하위메뉴 생성코드 작성전에 설치하기
npm 설치 후에 src > store 폴더 생성, 폴더 안에 index.js 파일 생성


#### 로그인 사용자 저장하기
1. firebase -  프로젝트 설정 - 서비스계정 - 새 비공개키 생성 버튼 클릭하여 키 파일 다운로드
2. 프로젝트 폴더 - functions 폴더 안에 key.json 이름으로 저장
3. gitignore 에 key.json 추가


#### firestore 활성화
views - board 폴더 생성, index.vue 파일 생성


#### axios 설치
```
npm install axios
```
axios라는 모듈을 사용해서 문서 내부에서 쉽게 처리


#### gcloud sdk 설치

#### cors.json 파일 생성
내용은 아래와 같이 작성
```
[
  {
    "origin": ["*"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
```

#### gsutil 사용하여 cors.json 적용하기
1. gcloud sdk shell 열기
2. cd  \google-cloud-sdk\bin
3. gsutil cors set [cors.json 파일 경로]  gs://<your-cloud-storage-bucket>


#### toast ui editor
1. 설치 : ` npm install --save @toast-ui/vue-editor `
2. plugins폴더에 editor.js 파일 추가하고 main.js 수정


#### moment로 날짜 표시
1. 설치 : ` npm i moment `
2. plugins 폴더 - moment.js 파일 추가
3. https://momentjs.com/


#### 게시물 좋아요 기능 추가
사용자를 확인하고 좋아요 횟수 추가
사용자를 저장할 공간이 필요하고 좋아요 누른 횟수도 필요




# 프로젝트 

**NO.1 BOARD WITH FIREBASE**

URL : http://sujinportfolio.gq/board/notice
개발 인원 : 1
프로젝트 기간 : 1달
기술 : Vuejs / Vuex / Vuetify / Javascript / css 
참고 사이트 : https://memi.dev/의 vue & firebase 강의

설명 :
BOARD WITH FIREBASE 는 Firebase 와 연동된 게시판입니다.
포트폴리오 사이트에 로그인한 사용자는 게시글을 작성할 수 있으며 게시글에 태그와 카테고리를 추가 및 선택할 수 있습니다. 
새로운 게시물 제목 앞에는 “new” 아이콘이 나타납니다.
게시물에서는 댓글을 작성하고 좋아요를 누를 수 있고, 게시물에도 좋아요 기능을 넣었습니다.



**NO.2 BOARD LIST  WITH FIREBASE**

URL : http://sujinportfolio.gq/board
개발 인원 : 1
프로젝트 기간 : 2일
기술 : Vuejs / Vuex / Vuetify / Javascript / css 
참고 사이트 : https://memi.dev/의 vue & firebase 강의

설명 :
BOARD LIST  WITH FIREBASE 는 Firebase 와 연동된 게시판의 목록을 나타내고 새로운 게시판을 추가하는 프로젝트입니다.
목록의 순서는 최근 생성한 게시판이 위로 올라오도록 만들어져있습니다.
게시판 목록을 보면  각 게시판의 게시물 수와 게시물 카테고리가 리스트업 되어 나타납니다.
카테고리를 클릭하면 클릭한 카테고리에 해당하는 게시물만 읽어 나타내야 하는데,
현재 정상적으로 읽어내지 못하고 있어 오류를 찾아 수정할 예정입니다.

게시판 아이디 입력란에 게시판 페이지 링크에 들어갈 게시판 아이디 명을 입력하고,
추가하기 버튼을 누르면 새 게시판을 추가/작성하는 페이지로 이동합니다.



**NO.3 칼로리 다이어리 Calorie Diary**

- URL : https://sujinportfolio.gq/project/calorie-Diary
- 개발 인원 : 1
- 프로젝트 기간 : 3일
- 기술 : Vuejs / Vuetify /  Javascript / css 

- 설명 :
칼로리 다이어리 Calorie Diary 는 평소에 식단관리나 운동에 관심이 많다보니,
칼로리 기록 어플을 이용하곤 하는데 대부분 식사 시간을 기록하는 기능이 없어서 직접 만들어본 프로젝트 입니다.
아침,점심,저녁 식사에 데이터를 추가하면 제일 아래 하단에 총 칼로리와 영양섭취량이 계산되어 나타납니다.
데이터 저장 기능은 따로 없습니다.
반복되는 코드가 많아서 이 부분은 개선해야할 사항입니다.
입력란에 텍스트를 입력하지 않고 + 버튼을 클릭하거나, 칼로리와 영양섭취량 입력란에 숫자가 아닌 문자를 입력하고
추가 버튼(+)을 클릭하면 “음식 데이터를 추가해주세요” 라는 alert창이 뜹니다.


**NO.4 PUNCH GAME**

- URL : https://sujinportfolio.gq/project/punch-game
- 개발 인원 : 1
- 프로젝트 기간 : 1일
- 기술 :  Vuejs /  Javascript / css 

- 설명 :
PUNCH 버튼을 클릭할때마다  빨간색 바의 넓이가 점점 줄어들고,
빨간색 바가 전부 없어지면 펀치백이 폭발하는 게임입니다.
빨간색 바 영역은 width의 크기와 이미지 파일 이름은 데이터로 불러와 집니다.
PUNCH 버튼을 클릭하면 함수가 작동하고, 그때마다 width로 지정된 데이터 값이 - 10 퍼센트씩 줄어듭니다.
데이터의 값이 0에 달하게 되면 이미지 파일 이름이 변경됩니다.
RESTART 버튼을 누르면 다시 이미지 파일 명과 빨간색 바 영역의 넓이가 복구됩니다. 



**NO.5 FASTEST CLICK GAME**

- URL : https://sujinportfolio.gq/project/Fastest-click-Game
- 개발 인원 : 1
- 프로젝트 기간 : 1일
- 기술 :  Vuejs /  Javascript / css 
- 설명 :
Fastest Click Game은 10초 안에 얼마나 많이 클릭할 수 있는지 확인하는 게임입니다.
클릭 횟수가 10단위가 될 때마다 원의 크기가 점점 작아집니다.
원 버튼을 클릭하면 함수가 작동하여 클릭한 횟수의 숫자가 1씩 증가하고, 시간은 1초마다 줄어듭니다.
시간이 0 이 됐을 때 원 버튼은 사라지고 “Game Over” 텍스트가 나타납니다.



**NO.6 TODO LIST**

- URL : http://localhost:8080/project/todolist
- 개발 인원 : 1
- 프로젝트 기간 : 3일
- 기술 :  Vuejs / Firebase / Javascript / css 
- 설명 :
TODOLIST는 Firebase 와 연동하여 데이터가 저장되는 체크 리스트 프로젝트 입니다. 
할 일은 작성한 시간 순서대로 정렬되고 우측 상단에 총 갯수가 표시됩니다.
각 목록의 왼쪽에 있는 체크박스를 체크하면 Firestore 에 있는 데이터도 업데이트 됩니다.
추가되는 할 일은 Firestore 에 document로 저장되고, document 의 ID는 시간을 문자열로 만든 것으로 저장되어 시간 순서대로 정렬됩니다.
체크박스를 클릭하게 되면 함수가 작동하여 체크박스 true/false 값이 변경됩니다.
