```
██╗     ██╗   ██╗██████╗  ██████╗ ██╗
██║     ██║   ██║██╔══██╗██╔════╝ ██║
██║     ██║   ██║██║  ██║██║  ███╗██║
██║     ██║   ██║██║  ██║██║   ██║██║
███████╗╚██████╔╝██████╔╝╚██████╔╝██║
╚══════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝
Manage your API routes effortlessly with Pathgen CLI
```

## Korean

### pathgen 소개
`pathgen`은 Next.js 개발자를 위해 설계된 CLI 도구로, `src/app/` 디렉토리 내의 기존 `route.ts` 파일을 기반으로 API 경로를 자동으로 탐색하고 구조화된 객체로 변환하여 타입 지원과 중앙 관리를 가능하게 합니다.

#### 주요 기능
- Next.js 디렉토리 내 `route.ts` 파일을 기반으로 API 경로 탐색 및 구조화
- TypeScript 인터페이스와 라우트 객체 생성으로 타입 안전성과 자동 완성 지원
- 중첩된 경로 지원 (예: `/api/admin/products` → `apiRoutes.api.admin.products`)
- 가볍고 Next.js 프로젝트에 쉽게 통합 가능

### 설치
#### 전역 설치
```bash
npm install -g pathgen
```

#### 로컬 설치 (프로젝트 권장)
```bash
npm install --save-dev pathgen
```

### 사용법
#### 기본 명령어
```bash
npx pathgen
```
- 기본 디렉토리: `./src/app/`
- 기본 출력 파일: `./src/lib/apiRoutes.ts`

#### 사용자 지정 옵션
```bash
npx pathgen --dir ./custom/app --output ./custom/apiRoutes.ts
```
- `--dir`: `route.ts` 파일을 탐색할 디렉토리 경로 (기본: `./src/app/`)
- `--output`: 생성된 TypeScript 파일 경로 (기본: `./src/lib/apiRoutes.ts`)

#### 실행 방법
- **로컬 설치**: `npx pathgen` 또는 `npm run pathgen` (스크립트 추가 필요).
- **글로벌 설치**: `pathgen` 명령어 직접 사용.
- 참고: 로컬 설치 시 `pathgen` 단독 명령어는 동작하지 않으니 `npx`를 사용하세요.

#### 예제
```
src/app/api/
├── admin/
│   └── products/
│       └── route.ts
├── users/
│   └── route.ts
└── route.ts
```
`npx pathgen` 실행 후:
```typescript
// src/lib/apiRoutes.ts
interface ApiRoutes {
  admin: { products: string; };
  users: string;
  "": string;
}
export const apiRoutes: ApiRoutes = {
  admin: { products: "/api/admin/products" },
  users: "/api/users",
  "": "/api"
};
```

### 요구 사항
- Node.js (v14 이상)
- `route.ts` 파일이 포함된 Next.js 프로젝트

### 옵션
| 옵션          | 설명                              | 기본값                 |
|---------------|-----------------------------------|-----------------------|
| `-d, --dir`   | `route.ts` 파일을 탐색할 디렉토리 경로 | `./src/app/`          |
| `-o, --output`| 생성된 라우트 파일 경로           | `./src/lib/apiRoutes.ts` |
| `-v, --version`| 버전 번호 표시                  | -                     |
| `-h, --help`   | 도움말 정보 표시                | -                     |



