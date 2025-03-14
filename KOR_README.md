```
██╗     ██╗   ██╗██████╗  ██████╗ ██╗
██║     ██║   ██║██╔══██╗██╔════╝ ██║
██║     ██║   ██║██║  ██║██║  ███╗██║
██║     ██║   ██║██║  ██║██║   ██║██║
███████╗╚██████╔╝██████╔╝╚██████╔╝██║
╚══════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝
Manage your API routes effortlessly with Pathgen CLI
```


## pathgen

### 개요
`pathgen`은 Next.js 개발자를 위한 CLI 도구로, `src/app/api/` 디렉토리의 `route.ts` 파일을 기반으로 API 경로를 탐색하고 구조화하여 타입 지원과 중앙 집중식 관리를 가능하게 합니다.

#### 기능
- `route.ts` 파일에서 API 경로를 탐색하고 구조화
- 타입 안전성과 자동 완성을 위한 TypeScript 인터페이스 및 경로 객체 생성
- 중첩된 경로 지원 (예: `/api/admin/products` → `apiRoutes.routes.admin.routes.products.path`)
- 가볍고 통합이 쉬움

### 설치
#### 전역 설치
```bash
npm install -g pathgen
```

#### 로컬 설치 (권장)
```bash
npm install --save-dev pathgen
```

### 사용법
#### 기본 명령어
```bash
npx pathgen
```
- **기본 디렉토리**: `./src/app/api/`
- **기본 출력**: `./src/lib/apiRoutes.ts`

#### 사용자 정의 옵션
```bash
npx pathgen --dir ./custom/app/api --output ./custom/apiRoutes.ts
```
- `--dir`: `route.ts` 파일을 탐색할 디렉토리 (기본값: `./src/app/api/`)
- `--output`: 생성된 TypeScript 파일 경로 (기본값: `./src/lib/apiRoutes.ts`)

#### 실행 참고 사항
- **로컬 설치**: `npx pathgen`을 사용하거나 `package.json`의 스크립트에 `"pathgen": "pathgen"`을 추가하고 `npm run pathgen`을 실행하세요.
- **전역 설치**: `pathgen`을 직접 사용하세요.
- **참고**: 로컬 설치 시 `pathgen`만으로는 작동하지 않으며, `npx`를 사용해야 합니다.

### 예시
#### 디렉토리 구조
```
src/app/api/
├── admin/
│   └── products/
│       └── route.ts
├── users/
│   └── route.ts
└── route.ts
```

#### `npx pathgen` 실행 후 결과
```typescript
// src/lib/apiRoutes.ts
interface ApiRoutes {
  routes: {
    admin: {
      routes: {
        products: {
          path: string;
        };
      };
    };
    users: {
      path: string;
    };
    "": {
      path: string;
    };
  };
}

export const apiRoutes: ApiRoutes = {
  "routes": {
    "admin": {
      "routes": {
        "products": {
          "path": "/api/admin/products"
        }
      }
    },
    "users": {
      "path": "/api/users"
    },
    "": {
      "path": "/api"
    }
  }
};
```

### 전제 조건
- Node.js (v14 이상)
- `src/app/api/`에 `route.ts` 파일이 있는 Next.js 프로젝트

### 옵션
| 옵션           | 설명                                     | 기본값                |
|----------------|------------------------------------------|-----------------------|
| `-d, --dir`    | `route.ts` 파일을 탐색할 디렉토리         | `./src/app/api/`      |
| `-o, --output` | 생성된 경로 파일의 경로                  | `./src/lib/apiRoutes.ts` |
| `-v, --version`| 버전 번호 표시                           | -                     |
| `-h, --help`   | 도움말 정보 표시                         | -                     |
