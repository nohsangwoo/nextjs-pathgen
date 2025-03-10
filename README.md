```
██╗     ██╗   ██╗██████╗  ██████╗ ██╗
██║     ██║   ██║██╔══██╗██╔════╝ ██║
██║     ██║   ██║██║  ██║██║  ███╗██║
██║     ██║   ██║██║  ██║██║   ██║██║
███████╗╚██████╔╝██████╔╝╚██████╔╝██║
╚══════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝
Manage your API routes effortlessly with Pathgen CLI
```

좋아, 사용자가 제공한 기존 README 파일을 새로운 CLI 도구의 변경 사항에 맞춰서 업데이트해줄게. 새로운 CLI 도구는 `src/app/api` 디렉토리에서 `route.ts` 파일을 탐색하고, API 경로를 구조화하여 TypeScript 인터페이스로 생성하는 기능을 제공해. 아래는 기존 README를 기반으로 수정한 내용이야. 변경된 부분은 새로운 기능에 맞춰 조정했으니 확인해봐!

---

## English

### pathgen Overview
`pathgen` is a CLI tool for Next.js developers that explores and structures API routes based on existing `route.ts` files in the `src/app/api/` directory, enabling type support and centralized management.

#### Features
- Explores and structures API routes from `route.ts` files in `src/app/api/`
- Generates TypeScript interfaces and route objects for type safety and autocompletion
- Supports nested routes (e.g., `/api/admin/products` → `apiRoutes.routes.admin.routes.products.path`)
- Lightweight and easy to integrate

### Installation
#### Global Installation
```bash
npm install -g pathgen
```

#### Local Installation (Recommended)
```bash
npm install --save-dev pathgen
```

### Usage
#### Basic Command
```bash
npx pathgen
```
- Default directory: `./src/app/api/`
- Default output: `./src/lib/apiRoutes.ts`

#### Custom Options
```bash
npx pathgen --dir ./custom/app/api --output ./custom/apiRoutes.ts
```
- `--dir`: Directory to explore for `route.ts` files (default: `./src/app/api/`)
- `--output`: Generated TypeScript file path (default: `./src/lib/apiRoutes.ts`)

#### Execution Notes
- **Local Install**: Use `npx pathgen` or add `"pathgen": "pathgen"` to `package.json` scripts and run `npm run pathgen`.
- **Global Install**: Use `pathgen` directly.
- Note: With local install, `pathgen` alone won’t work; use `npx`.

#### Example
```
src/app/api/
├── admin/
│   └── products/
│       └── route.ts
├── users/
│   └── route.ts
└── route.ts
```
After `npx pathgen`:
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

### Prerequisites
- Node.js (v14 or higher)
- Next.js project with `route.ts` files in `src/app/api/`

### Options
| Option         | Description                              | Default Value         |
|----------------|------------------------------------------|-----------------------|
| `-d, --dir`    | Directory to explore for `route.ts` files | `./src/app/api/`      |
| `-o, --output` | Path to generated routes file            | `./src/lib/apiRoutes.ts` |
| `-v, --version`| Show version number                     | -                     |
| `-h, --help`   | Display help information                | -                     |

