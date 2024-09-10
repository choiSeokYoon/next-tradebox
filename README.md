# TradeBox


---

## 프로젝트 소개

**TradeBox는 사용자가 교환하고 싶은 물건을 게시하고, 다른 사용자와 물건을 교환할 수 있도록 도와주는 프로젝트입니다.**

### 개발 기간
- **7월 28일 ~ 8월 9일**

### 배포 링크
- **[TradeBox 웹사이트](https://next-tradebox.vercel.app/)**

### 기술 스택
<p align="center">
   <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/SUPABASE-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Tanstack--Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" />
  <img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Material--UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" />
</p>




### 주요기능
- 이메일과 OTP 인증을 통해 회원가입한 후, 로그인 시 토큰을 쿠키에 저장합니다.
- 게시물 조회/등록/수정/삭제(이미지 업로드) 기능이 있습니다.
- 전체 게시물, 관심있는 게시물, 유저 게시물, 카테고리 별로 조회합니다.
- 관심있는 게시물을 등록합니다.
- 게시물을 검색합니다.
- 실시간으로 유저와 채팅방을 개설하고 채팅할 수 있습니다.
- 유저 프로필(닉네임) 변경할 수 있습니다.
- 반응형으로 모바일,템플릿,PC에 맞는 UI를 제공합니다.
---



## 시작 가이드

### 테스트 아이디
- **ID: testid1@test.com, PW: test**  
- **ID: testid2@test.com, PW: test**
-  supabase 무료 버전으로 회원가입이 시간별로 인증요청에 제한이 있어 인증절차가 실패 할 수 있습니다. 인증 실패 시 테스트 아이디로 로그인 해주세요

### 요구사항
- **node.js 18.x 이상**

### 구동법
```bash
$ git clone https://github.com/choiSeokYoon/next-tradebox.git
$ cd next-tradebox
$ npm install
$ npm run dev
```


### .env
```plaintext
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_HOST=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_SUPABASE_DB_PASSWORD=
NEXT_PUBLIC_STORAGE_BUCKET=
```
---

### 경험
- Next.js를 이용하여 서버 사이드 렌더링과 클라이언트 사이드 렌더링을 조합하고, App Router를 사용하여 라우팅하며 메타 태그를 활용하여 SEO를 개선 하였습니다.
- Supabase가 제공하는 OTP 및 Authentication 를 이용하여 회원 인증 및 관리를 수행했습니다.
- Supabase로 서버와 데이터베이스를 구축하고 Realtime을 이용하여 실시간 채팅 방 개설 및 채팅 구현
- Tailwind를 활용해서 UI와 반응형 페이지 구성


