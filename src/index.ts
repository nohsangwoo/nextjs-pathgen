#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import { program } from "commander";

// API 경로를 저장할 객체 타입
interface ApiRoute {
  [key: string]: string | ApiRoute;
}

// 경로를 항상 '/'로 결합하는 함수
function joinUrl(...parts: string[]): string {
  return parts.join("/").replace(/\/+/g, "/");
}

// API 경로를 탐색하고 객체로 변환하는 함수
function generateApiRoutes(dir: string, baseRoute: string = ""): ApiRoute {
  const routes: ApiRoute = {};
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = joinUrl(baseRoute, entry.name);

    if (entry.isDirectory()) {
      const routeFile = path.join(fullPath, "route.ts");
      if (fs.existsSync(routeFile)) {
        const routeKey = entry.name;
        
        // API 경로 생성 - api가 중복되지 않도록 처리
        let apiPath = '/';
        
        // 상대 경로에서 api가 포함된 경우 그 이후의 경로만 사용
        if (relativePath.includes('api/')) {
          const parts = relativePath.split('api/');
          apiPath += 'api/' + parts[parts.length - 1];
        } else {
          // api가 없는 경우 전체 상대 경로 사용
          apiPath += relativePath;
        }
        
        // 중복 슬래시 제거
        routes[routeKey] = apiPath.replace(/\/+/g, '/');
      } else {
        const subRoutes = generateApiRoutes(fullPath, relativePath);
        if (Object.keys(subRoutes).length > 0) {
          routes[entry.name] = subRoutes;
        }
      }
    }
  }

  return routes;
}

// 객체를 TypeScript 인터페이스 문자열로 변환하는 함수
function generateTypeScriptInterface(routes: ApiRoute, indent: string = ""): string {
  let content = "{\n";
  for (const [key, value] of Object.entries(routes)) {
    if (typeof value === "string") {
      content += `${indent}  ${key}: string;\n`;
    } else {
      content += `${indent}  ${key}: ${generateTypeScriptInterface(value, indent + "  ")};\n`;
    }
  }
  content += `${indent}}`;
  return content;
}

// API 라우트 생성 및 파일 쓰기 함수
function generateApiRoutesFile(apiDir: string, outputFile: string) {
  try {
    console.log("Generating API routes...");

    const apiRoutes = generateApiRoutes(apiDir);
    const interfaceContent = `interface ApiRoutes ${generateTypeScriptInterface(apiRoutes)}`;
    const fileContent = `// Auto-generated API routes\n${interfaceContent}\n\nexport const apiRoutes: ApiRoutes = ${JSON.stringify(apiRoutes, null, 2).replace(/\\/g, "/")};`;

    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputFile, fileContent, "utf-8");
    console.log(`API routes generated successfully at ${outputFile}`);
  } catch (error) {
    console.error("Error generating API routes:", error);
    process.exit(1);
  }
}

// CLI 설정
program
  .name("pathgen")
  .description("CLI tool to generate API routes from Next.js API directory")
  .version("1.0.0")
  .option("-d, --dir <path>", "API directory path", "src/app")
  .option("-o, --output <path>", "Output file path", "src/lib/apiRoutes.ts")
  .action((options) => {
    const apiDir = path.resolve(process.cwd(), options.dir);
    const outputFile = path.resolve(process.cwd(), options.output);
    generateApiRoutesFile(apiDir, outputFile);
  });

program.parse();