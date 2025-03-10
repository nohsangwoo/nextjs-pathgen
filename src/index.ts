#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import { program } from "commander";

// API 경로를 저장할 객체 타입
interface ApiRouteNode {
  path?: string;
  routes?: { [key: string]: ApiRouteNode };
}

// 경로를 항상 '/'로 결합하는 함수
function joinUrl(...parts: string[]): string {
  return parts.join("/").replace(/\/+/g, "/");
}

// API 경로를 탐색하고 객체로 변환하는 함수
function generateApiRoutes(dir: string, baseRoute: string = ""): ApiRouteNode {
  const node: ApiRouteNode = {};
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  // 현재 디렉토리에 route.ts가 있는지 확인
  const routeFile = path.join(dir, "route.ts");
  if (fs.existsSync(routeFile)) {
    const apiPath = '/api' + (baseRoute ? '/' + baseRoute : '');
    node.path = apiPath;
  }

  // 하위 디렉토리 처리
  const subRoutes: { [key: string]: ApiRouteNode } = {};
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const fullPath = path.join(dir, entry.name);
      const subBaseRoute = baseRoute ? joinUrl(baseRoute, entry.name) : entry.name;
      const subNode = generateApiRoutes(fullPath, subBaseRoute);
      if (subNode.path || (subNode.routes && Object.keys(subNode.routes).length > 0)) {
        subRoutes[entry.name] = subNode;
      }
    }
  }

  if (Object.keys(subRoutes).length > 0) {
    node.routes = subRoutes;
  }

  return node;
}

// 객체를 TypeScript 인터페이스 문자열로 변환하는 함수
function generateTypeScriptInterface(routes: ApiRouteNode, indent: string = ""): string {
  let content = "{\n";
  if (routes.path) {
    content += `${indent}  path: string;\n`;
  }
  if (routes.routes) {
    content += `${indent}  routes: {\n`;
    for (const [key, value] of Object.entries(routes.routes)) {
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;
      content += `${indent}    ${safeKey}: ${generateTypeScriptInterface(value, indent + "    ")};\n`;
    }
    content += `${indent}  };\n`;
  }
  content += `${indent}}`;
  return content;
}

// API 라우트 생성 및 파일 쓰기 함수
function generateApiRoutesFile(apiDir: string, outputFile: string) {
  try {
    console.log("Generating API routes...");

    const apiRoutes = generateApiRoutes(apiDir);
    const interfaceContent = generateTypeScriptInterface(apiRoutes);
    const fileContent = `
      // Auto-generated API routes
      interface ApiRoutes ${interfaceContent}
      export const apiRoutes: ApiRoutes = ${JSON.stringify(apiRoutes, null, 2).replace(/\\/g, "/")};
    `;

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
  .option("-d, --dir <path>", "API directory path", "src/app/api")
  .option("-o, --output <path>", "Output file path", "src/lib/apiRoutes.ts")
  .action((options) => {
    const apiDir = path.resolve(process.cwd(), options.dir);
    const outputFile = path.resolve(process.cwd(), options.output);
    generateApiRoutesFile(apiDir, outputFile);
  });

program.parse();