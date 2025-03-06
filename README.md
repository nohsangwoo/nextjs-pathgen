```
██╗     ██╗   ██╗██████╗  ██████╗ ██╗
██║     ██║   ██║██╔══██╗██╔════╝ ██║
██║     ██║   ██║██║  ██║██║  ███╗██║
██║     ██║   ██║██║  ██║██║   ██║██║
███████╗╚██████╔╝██████╔╝╚██████╔╝██║
╚══════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝
Manage your API routes effortlessly with Pathgen CLI
```

### pathgen Overview

`pathgen` is a CLI tool designed for Next.js developers to automatically explore and structure API routes based on existing `route.ts` files in the `src/app/` directory, enabling type support and centralized management. This allows structured access to API paths, such as `apiRoutes.api.admin.products`.

#### Features
- Explores and structures API routes based on `route.ts` files in the Next.js directory
- Generates a TypeScript interface and route object for type safety and autocompletion
- Supports nested routes (e.g., `/api/admin/products` becomes `apiRoutes.api.admin.products`)
- Lightweight and easily integrates into any Next.js project

### Installation

You can install `pathgen` globally or as a dev dependency in your project.

#### Global Installation
```bash
npm install -g pathgen
```

#### Local Installation (Recommended for Projects)
```bash
npm install --save-dev pathgen
```

### Usage

Once installed, run the tool using the `pathgen` command. It supports options to customize the input directory and output file.

#### Basic Command
Explore and generate API routes with default settings:
```bash
pathgen
```
- Default directory: `./src/app/`
- Default output file: `./src/lib/apiRoutes.ts`

#### Custom Options
Specify a custom directory or output file:
```bash
pathgen --dir ./custom/app --output ./custom/apiRoutes.ts
```
- `--dir`: Directory path to explore for `route.ts` files (default: `./src/app/`)
- `--output`: Path to the generated TypeScript file (default: `./src/lib/apiRoutes.ts`)

#### Example
Suppose your Next.js project has the following structure:
```
src/app/api/
├── admin/
│   └── products/
│       └── route.ts
├── users/
│   └── route.ts
└── route.ts
```

Running `pathgen` will generate a file like this:
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

Now you can use it in your code:
```typescript
import { apiRoutes } from "@/lib/apiRoutes";

console.log(apiRoutes.admin.products); // "/api/admin/products"
console.log(apiRoutes.users);          // "/api/users"
console.log(apiRoutes[""]);            // "/api"
```

### Prerequisites
- Node.js (v14 or higher)
- A Next.js project with `route.ts` files (default directory: `src/app/`)

### Options
| Option         | Description                              | Default Value         |
|----------------|------------------------------------------|-----------------------|
| `-d, --dir`    | Directory path to explore for `route.ts` files | `./src/app/`          |
| `-o, --output` | Path to the generated routes file        | `./src/lib/apiRoutes.ts` |
| `-v, --version`| Show the version number                 | -                     |
| `-h, --help`   | Display help information                | -                     |

### Development

To contribute or modify the tool:

1. Clone the repository:
   ```bash
   git clone https://github.com/nohsangwoo/nextjs-pathgen
   cd nextjs-pathgen
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Test locally:
   ```bash
   npm link
   pathgen --dir ./test/app --output ./test/output.ts
   ```

### License

This project is licensed under the [MIT License](LICENSE).

### Contributing

Contributions are welcome! Please submit a pull request or open an issue on the [GitHub repository](https://github.com/nohsangwoo/nextjs-pathgen).

### Contact

For questions or support, reach out to [milli@molluhub.com](mailto:milli@molluhub.com).

