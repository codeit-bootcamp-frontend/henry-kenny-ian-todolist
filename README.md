# Todo List Bunny

### tech stacks

**Language**<br>
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

**Framework**<br>
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

**Server**
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

**Collaboration Tool**<br>
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)

**Package Management**<br>
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

**Version control**<br>
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

**Bundler**<br>
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

**Deploy**<br>
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

**Others**<br>
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## UI 디자인

- neumorphic UI 디자인 적용

## 기본 기능

- 로그인, 회원가입 기능
- 반응형 레이아웃 (모바일은 ~866, 데스크탑은 867~)
- 할일 달성률을 프로그레스바로 표현
- 할일 목록
  - 평소에는 elipsis, hover 시 전부 보여주기 (hover text)
  - 목록 overflow 시 스크롤
- 할일 목록 추가/삭제/수정
- 할일 체크(Done) 기능
- 다크/라이트 모드 지원
- 추가/수정 시 모달 기능 (모달에는 확인/취소 버튼)

## 애니메이션

- 모달 애니메이션
- 프로그레스바 애니메이션 (Done 체크시 자연스럽게 늘어나도록)
- 스와이프 기능: 모바일 버전에서 밀어서 삭제 버튼 보이기 (미는 건, 데스크탑에서는 드래그 + 모바일에서는 터치 스타트/엔드)

## 컴포넌트

- 헤더
  <img width="701" alt="image" src="https://user-images.githubusercontent.com/110705019/235569503-3da0a42a-b5b7-4f3b-8b6b-e475f0afb39c.png">

  - 로고
  - 테마 토글 스위치
    <img width="408" alt="image" src="https://user-images.githubusercontent.com/110705019/235569759-28d902e6-d4f4-4fe1-939c-b4b0ff588c04.png">

- 메인

  - 프로그레스바
    <img width="467" alt="image" src="https://user-images.githubusercontent.com/110705019/235569404-27c7edb9-634c-407a-bd3e-ad46a8d9a7a8.png">

  - 할일 목록(할일 아이템 리스트 - overflow, scroll)
    <img width="698" alt="image" src="https://user-images.githubusercontent.com/110705019/235569549-866bebc6-e2eb-4f1d-8a5e-f3777564bbcc.png">

    - 할일 아이템 (input이 아니라 div로)
      - 버튼들(체크박스, 삭제, 수정)
        <img width="401" alt="image" src="https://user-images.githubusercontent.com/110705019/235570240-5de8be49-bfd9-4163-9bd1-22516a643290.png">

  - 할일 목록 추가 버튼

    <img width="373" alt="image" src="https://user-images.githubusercontent.com/110705019/235569965-4964900d-0f8f-49f8-9075-33dbb2811d3e.png">

  - 모달창
    <img width="697" alt="image" src="https://user-images.githubusercontent.com/110705019/235569667-f21a9b35-7616-46f0-a5c0-c610df6bad6e.png">

    - input으로 구현
    - 버튼들 (확인, 취소)

- 참고, 버튼 컴포넌트 2개로 (prop으로 넘겨줘서 재사용)

  - 추가/삭제/수정 버튼

    - 할일 아이템 버튼 (삭제, 수정)
    - 할일 목록 추가 버튼

  - 체크 박스 버튼

## TODO

1. 컴포넌트들 만들기

- [x] 헤더
- [x] CUD 버튼
- [x] 체크박스 버튼
- [x] 할일 아이템
- [x] 할일 아이템 리스트
- [x] 프로그레스 바
- [x] 모달
- [x] 다크모드 토글
- [x] 회원가입, 로그인 폼

2.  컴포넌트 조립 (정적인 레이아웃 구현)

- [x] 메인페이지(데스크탑)
- [ ] 메인페이지(모바일)
- [x] 로그인/회원가입(데스크탑)
- [ ] 로그인/회원가입(모바일)

3.  기능 구현

- [x] 로그인, 회원가입 기능
- [x] 프로그레스바 기능
- [ ] hover text 기능
- [ ] 할 일 추가(모달)
- [ ] 할 일 삭제, 수정 기능
- [ ] 할 일 체크 기능
- [ ] 모바일 스와이프 기능 구현

4. 애니메이션, 디자인(스타일, 배치, 테마, 반응형 등) 적용

- [ ] 모달 애니메이션
- [ ] 프로그레스바 애니메이션 (Done 체크시 자연스럽게 늘어나도록)
- [ ] 스와이프 기능: 모바일 버전에서 밀어서 삭제 버튼 보이기 (미는 건, 데스크탑에서는 드래그 + 모바일에서는 터치 스타트/엔드)
- [ ] 모바일 반응형 레이아웃(모바일은 ~866, 데스크탑은 867~)
- [ ] 다크/라이트 모드 지원
