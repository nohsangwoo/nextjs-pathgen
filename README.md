```
██╗     ██╗   ██╗██████╗  ██████╗ ██╗
██║     ██║   ██║██╔══██╗██╔════╝ ██║
██║     ██║   ██║██║  ██║██║  ███╗██║
██║     ██║   ██║██║  ██║██║   ██║██║
███████╗╚██████╔╝██████╔╝╚██████╔╝██║
╚══════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝
Manage your API routes effortlessly with Pathgen CLI
```

## English

### pathgen Overview
`pathgen` is a CLI tool for Next.js developers that explores and structures API routes based on existing `route.ts` files in the `src/app/` directory, enabling type support and centralized management.

#### Features
- Explores and structures API routes from `route.ts` files
- Generates TypeScript interfaces and route objects for type safety and autocompletion
- Supports nested routes (e.g., `/api/admin/products` → `apiRoutes.api.admin.products`)
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
- Default directory: `./src/app/`
- Default output: `./src/lib/apiRoutes.ts`

#### Custom Options
```bash
npx pathgen --dir ./custom/app --output ./custom/apiRoutes.ts
```
- `--dir`: Directory to explore for `route.ts` files (default: `./src/app/`)
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

### Prerequisites
- Node.js (v14 or higher)
- Next.js project with `route.ts` files

### Options
| Option         | Description                              | Default Value         |
|----------------|------------------------------------------|-----------------------|
| `-d, --dir`    | Directory to explore for `route.ts` files | `./src/app/`          |
| `-o, --output` | Path to generated routes file            | `./src/lib/apiRoutes.ts` |
| `-v, --version`| Show version number                     | -                     |
| `-h, --help`   | Display help information                | -                     |

