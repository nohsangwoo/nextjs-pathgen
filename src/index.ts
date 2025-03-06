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
  
  // 디렉토리가 존재하는지 확인
  if (!fs.existsSync(dir)) {
    console.error(`디렉토리가 존재하지 않습니다: ${dir}`);
    return routes;
  }
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = joinUrl(baseRoute, entry.name);

    if (entry.isDirectory()) {
      const routeFile = path.join(fullPath, "route.ts");
      if (fs.existsSync(routeFile)) {
        const routeKey = entry.name;
        routes[routeKey] = joinUrl("/api", relativePath);
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

// 메인 함수
function generateRoutes(apiDir: string, outputFile: string) {
  try {
    console.log("API 경로 생성 중...");
    console.log(`API 디렉토리: ${apiDir}`);
    console.log(`출력 파일: ${outputFile}`);
    
    const apiRoutes = generateApiRoutes(apiDir);
    
    if (Object.keys(apiRoutes).length === 0) {
      console.warn("경고: API 경로를 찾을 수 없습니다. 디렉토리 경로가 올바른지 확인하세요.");
    }
    
    const interfaceContent = `interface ApiRoutes ${generateTypeScriptInterface(apiRoutes)}`;
    const fileContent = `// Auto-generated API routes\n${interfaceContent}\n\nexport const apiRoutes: ApiRoutes = ${JSON.stringify(apiRoutes, null, 2).replace(/\\/g, "/")};`;

    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputFile, fileContent, "utf-8");
    console.log(`API 경로가 성공적으로 생성되었습니다: ${outputFile}`);
  } catch (error) {
    console.error("API 경로 생성 중 오류 발생:", error);
    process.exit(1);
  }
}

// CLI 설정
program
  .version("1.0.0")
  .description("Next.js API 디렉토리에서 API 경로 생성")
  .option("-d, --dir <path>", "API 디렉토리 경로", "./src/app/api")
  .option("-o, --output <path>", "출력 파일 경로", "./src/lib/apiRoutes.ts")
  .action((options) => {
    const apiDir = path.resolve(process.cwd(), options.dir);
    const outputFile = path.resolve(process.cwd(), options.output);
    generateRoutes(apiDir, outputFile);
  });

program.parse(process.argv);