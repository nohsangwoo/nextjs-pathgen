```
██╗     ██╗   ██╗██████╗  ██████╗ ██╗
██║     ██║   ██║██╔══██╗██╔════╝ ██║
██║     ██║   ██║██║  ██║██║  ███╗██║
██║     ██║   ██║██║  ██║██║   ██║██║
███████╗╚██████╔╝██████╔╝╚██████╔╝██║
╚══════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝
Manage your API routes effortlessly with Pathgen CLI
```

# pathgen

**[Korean](#korean) | [English](#english)**

---

## Korean

### pathgen 소개

`pathgen`은 Next.js 개발자를 위해 설계된 CLI 도구로, `src/app/api` 디렉토리 내의 기존 `route.ts` 파일을 기반으로 API 경로를 자동으로 탐색하고 구조화된 객체로 변환하여 타입 지원과 중앙 관리를 가능하게 합니다. 이를 통해 `apiRoutes.api.admin.products`와 같은 방식으로 API 경로에 접근할 수 있습니다.

#### 주요 기능
- Next.js API 디렉토리 내 `route.ts` 파일을 기반으로 API 경로를 탐색 및 구조화
- TypeScript 인터페이스와 라우트 객체를 생성하여 타입 안전성과 자동 완성 지원
- 중첩된 경로 지원 (예: `/api/admin/products` → `apiRoutes.api.admin.products`)
- 가볍고 Next.js 프로젝트에 쉽게 통합 가능

### 설치

`pathgen`은 전역 설치 또는 프로젝트의 개발 의존성으로 설치할 수 있습니다.

#### 전역 설치
```bash
npm install -g pathgen
```

#### 로컬 설치 (프로젝트 권장)
```bash
npm install --save-dev pathgen
```

### 사용법

설치 후 `pathgen` 명령어를 통해 도구를 실행할 수 있으며, 입력 디렉토리와 출력 파일을 커스터마이징할 수 있는 옵션을 제공합니다.

#### 기본 명령어
기본 설정으로 API 경로를 탐색 및 생성:
```bash
pathgen
```
- 기본 API 디렉토리: `./src/app/`
- 기본 출력 파일: `./src/lib/apiRoutes.ts`

#### 사용자 지정 옵션
커스텀 API 디렉토리나 출력 파일 지정:
```bash
pathgen --dir ./custom/app --output ./custom/apiRoutes.ts
```
- `--dir`: `route.ts` 파일을 탐색할 디렉토리 경로 (기본: `./src/app/`)
- `--output`: 생성된 TypeScript 파일 경로 (기본: `./src/lib/apiRoutes.ts`)

#### 예제
Next.js 프로젝트의 API 구조가 다음과 같다고 가정:
```
src/app/api/
├── admin/
│   └── products/
│       └── route.ts
├── users/
│   └── route.ts
└── route.ts
```

`pathgen` 실행 시 다음과 같은 파일이 생성됨:
```typescript
// src/lib/apiRoutes.ts
interface ApiRoutes {
  admin: {
    products: string;
  };
  users: string;
  "": string;
}

export const apiRoutes: ApiRoutes = {
  admin: {
    products: "/api/admin/products"
  },
  users: "/api/users",
  "": "/api"
};
```

코드에서 사용 예시:
```typescript
import { apiRoutes } from "@/lib/apiRoutes";

console.log(apiRoutes.admin.products); // "/api/admin/products"
console.log(apiRoutes.users);          // "/api/users"
console.log(apiRoutes[""]);            // "/api"
```

### 요구 사항
- Node.js (v14 이상)
- `route.ts` 파일이 포함된 Next.js 프로젝트 (기본적으로 `src/app/` 디렉토리 사용)

### 옵션
| 옵션          | 설명                              | 기본값                 |
|---------------|-----------------------------------|-----------------------|
| `-d, --dir`   | `route.ts` 파일을 탐색할 디렉토리 경로 | `./src/app/`          |
| `-o, --output`| 생성된 라우트 파일 경로           | `./src/lib/apiRoutes.ts` |
| `-v, --version`| 버전 번호 표시                  | -                     |
| `-h, --help`   | 도움말 정보 표시                | -                     |

### 개발

도구에 기여하거나 수정하려면:

1. 저장소 복제:
   ```bash
   git clone https://github.com/nohsangwoo/nextjs-pathgen
   cd nextjs-pathgen
   ```

2. 의존성 설치:
   ```bash
   npm install
   ```

3. 프로젝트 빌드:
   ```bash
   npm run build
   ```

4. 로컬 테스트:
   ```bash
   npm link
   pathgen --dir ./test/app --output ./test/output.ts
   ```

### 라이선스

이 프로젝트는 [MIT License](LICENSE)에 따라 배포됩니다.

### 기여 방법

기여를 환영합니다! [GitHub 저장소](https://github.com/nohsangwoo/nextjs-pathgen)에서 풀 리퀘스트를 제출하거나 이슈를 열어주세요.

### 연락처

질문이나 지원이 필요하면 [milli@molluhub.com](mailto:milli@molluhub.com)으로 연락 주세요.


