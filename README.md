```
██╗     ██╗   ██╗██████╗  ██████╗ ██╗
██║     ██║   ██║██╔══██╗██╔════╝ ██║
██║     ██║   ██║██║  ██║██║  ███╗██║
██║     ██║   ██║██║  ██║██║   ██║██║
███████╗╚██████╔╝██████╔╝╚██████╔╝██║
╚══════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝
Manage your API routes effortlessly with Pathgen CLI
```

---

# api-routes-generator

A CLI tool to generate and centrally manage API routes from your Next.js `src/app/api` directory, enabling structured access like `apiRoutes.api.admin.products`.

## Overview

`api-routes-generator` is a command-line tool designed for Next.js developers who want to automate the creation and management of API routes. It scans your `src/app/api` directory, generates a TypeScript file with a structured route object, and provides an easy way to access your API endpoints in a centralized manner.

### Features
- Automatically generates API routes from your Next.js API directory.
- Creates a TypeScript interface and route object for type safety and autocompletion.
- Supports nested routes (e.g., `/api/admin/products` becomes `apiRoutes.api.admin.products`).
- Lightweight and easy to integrate into any Next.js project.

## Installation

You can install `api-routes-generator` globally or as a dev dependency in your project.

### Global Installation
```bash
npm install -g api-routes-generator
```

### Local Installation (Recommended for Projects)
```bash
npm install --save-dev api-routes-generator
```

## Usage

Once installed, you can run the tool via the `api-routes-gen` command. It accepts options to customize the input directory and output file.

### Basic Command
Generate API routes with default settings:
```bash
api-routes-gen
```
- Default API directory: `./src/app/api`
- Default output file: `./src/lib/apiRoutes.ts`

### Custom Options
Specify a custom API directory or output file:
```bash
api-routes-gen --dir ./custom/api --output ./custom/apiRoutes.ts
```
- `--dir`: Path to your Next.js API directory (default: `./src/app/api`).
- `--output`: Path to the generated TypeScript file (default: `./src/lib/apiRoutes.ts`).

### Example
Suppose your Next.js project has the following API structure:
```
src/app/api/
├── admin/
│   └── products/
│       └── route.ts
├── users/
│   └── route.ts
└── route.ts
```

Running `api-routes-gen` will generate a file like this:
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

## Prerequisites
- Node.js (v14 or higher)
- A Next.js project with an `src/app/api` directory (or a custom API directory)

## Options
| Option       | Description                              | Default Value         |
|--------------|------------------------------------------|-----------------------|
| `-d, --dir`  | Path to the API directory to scan       | `./src/app/api`       |
| `-o, --output` | Path to the generated routes file      | `./src/lib/apiRoutes.ts` |
| `-v, --version` | Show the version number               | -                     |
| `-h, --help`    | Display help information              | -                     |

## Development

To contribute or modify the tool:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/api-routes-generator.git
   cd api-routes-generator
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
   api-routes-gen --dir ./test/api --output ./test/output.ts
   ```

## License

This project is licensed under the [MIT License](LICENSE).

```
MIT License

Copyright (c) 2025 LUDGI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue on the [GitHub repository](https://github.com/your-username/api-routes-generator).

## Contact

For questions or support, reach out to [milli@molluhub.com](mailto:milli@molluhub.com).

---

# nextjs-pathgen
