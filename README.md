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

`pathgen` is a CLI tool designed for Next.js developers to automate the generation and central management of API routes from the `src/app/api` directory, enabling structured access like `apiRoutes.api.admin.products`.

#### Features
- Automatically generates API routes from your Next.js API directory.
- Creates a TypeScript interface and route object for type safety and autocompletion.
- Supports nested routes (e.g., `/api/admin/products` becomes `apiRoutes.api.admin.products`).
- Lightweight and easy to integrate into any Next.js project.

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
Generate API routes with default settings:
```bash
pathgen
```
- Default API directory: `./src/app/api`
- Default output file: `./src/lib/apiRoutes.ts`

#### Custom Options
Specify a custom API directory or output file:
```bash
pathgen --dir ./custom/api --output ./custom/apiRoutes.ts
```
- `--dir`: Path to your Next.js API directory (default: `./src/app/api`).
- `--output`: Path to the generated TypeScript file (default: `./src/lib/apiRoutes.ts`).

#### Example
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
- A Next.js project with an `src/app/api` directory (or a custom API directory)

### Options
| Option         | Description                              | Default Value         |
|----------------|------------------------------------------|-----------------------|
| `-d, --dir`    | Path to the API directory to scan       | `./src/app/api`       |
| `-o, --output` | Path to the generated routes file       | `./src/lib/apiRoutes.ts` |
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
   pathgen --dir ./test/api --output ./test/output.ts
   ```

### License

This project is licensed under the [MIT License](LICENSE).

### Contributing

Contributions are welcome! Please submit a pull request or open an issue on the [GitHub repository](https://github.com/nohsangwoo/nextjs-pathgen).

### Contact

For questions or support, reach out to [milli@molluhub.com](mailto:milli@molluhub.com).

