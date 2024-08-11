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
  <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge&logo=react-query&logoColor=white" />
  <img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Material--UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" />
</p>




### 주요기능
- 이메일과 OTP 인증을 통해 회원가입 합니다
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

### ⚙요구사항
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

### 느낀점
이전까지 주로 CSR 방식의 개발해 왔습니다. 이번에 SSR개발 방식을 적용하고자 했고, SSR을 지원하는 프레임워크중 가장 생태계가 큰 Next 프레임워크를 선택하게 됐습니다. Next는 리액트와 다르게 앱 라우터를 통해 쉽게 라우팅 할 수 있었고, 복잡한 설정 없이 쉽게 CSR을 구현할 수 있어 렌더링 방식을 유연하게 선택할 수 있었습니다. 더불어 메타 태그를 이용하여 SSR의 장점인 SEO에 좀 더 효과적으로 대응할 수 있었습니다.
supabase 경우 인증 기능과 데이터베이스 관리가 편리했습니다. 인증 관련 기능을 쉽게 구현하고 관리할 수 있다는 점이 인상적이었고, 데이터베이스와 스토리지를 CLI 명령어나 추가 도구 없이 웹에서 관리할 수 있어 편리했습니다. 또한, 표준화된 코드 덕분에 커뮤니티가 적은 단점을 어느 정도 보완할 수 있었습니다.



