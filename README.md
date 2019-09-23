# 프로젝트 설명
react 강좌를 수강 및 진행 과정을 적은 프로젝트
> 강의 주소: [링크](https://inflearn.com/course/react_nodebird)

# 주요 기능
- 로그인 / 로그아웃 (cookie/session 이용)
- 닉네임 변경
- 포스트 입력 (이미지 첨부 가능)
- hashtag 검색, 유저 검색
- 메인 페이지 게시글, hashtag 검색, 유저 검색 infinite scoll구현
- 팔로우, 리트윗, 댓글 달기

# change log
> **['19.09.15]** Immer 라이브러리를 통한 불변성 변수 표현으로 가독성 증가 및 코드

> **['19.09.16]** 프론트 영역에서 redux 중복 호출 막기(lastId 배열 관리)

> **['19.09.21]** 단일 post 페이지 생성 및 SEO 진행
> 커스텀 Document 생성 및 전체 페이지 react-helmet 적용

> **['19.09.22]** styled-component 및 SSR 적용
> 기타 key 중복 정리 및 오류 수정
> custom Error 페이지 생성 및 폴더 구조 변경

> **['19.09.23]** favicon 설정
> next.config.js를 통한 webpack 설정 덮어쓰기 등 기능 구현
> next-bundle-analyzer로 서버 및 클라이언트 패키지 분석
> moment tree-shaking (패키지 용량 줄이기) 적용 진행 및 gzip 압축을 통한 파일 크기 감소
> Post 내 Comment 입력 시 Post 리렌더링 방지를 위해 commentForm 분리
> Follow 버튼 입력 시 Post 리렌더링 방지를 추적하기 위한 useEffect 및 useRef로 확인 및 Follow 버튼 분리 후 me 객체 분리 호출

# 추후 수행 작업
- AWS 배포
- chrome react devtools 업데이트로 리렌더링 시 highlight 기능이 사라짐에 따라 최적화 수행의 어려움 (react-devtools 다운그레이드 혹은 기능 추가 대기)
- next 9 적용으로 인한 강의 내용 차이 파악 후 적용 (진행중)
- moment 패키지 tree shaking 미적용 이유 분석