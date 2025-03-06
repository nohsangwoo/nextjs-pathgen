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
  .version("1.0.0")
  .description("Generate API routes from Next.js api directory")
  .option("-d, --dir <path>", "API directory path", "./src/app/api")
  .option("-o, --output <path>", "Output file path", "./src/lib/apiRoutes.ts")
  .action((options) => {
    const apiDir = path.resolve(process.cwd(), options.dir);
    const outputFile = path.resolve(process.cwd(), options.output);
    generateRoutes(apiDir, outputFile);
  });

program.parse(process.argv);