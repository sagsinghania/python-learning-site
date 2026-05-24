import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const codexDir = path.join(process.env.USERPROFILE || "C:\\Users\\Administrator", ".codex");
const codexConfigPath = path.join(codexDir, "config.toml");
const codexAuthPath = path.join(codexDir, "auth.json");

const projectEnv = loadDotEnv(path.join(__dirname, ".env"));
const codexConfig = loadCodexConfig(codexConfigPath);
const codexAuth = loadCodexAuth(codexAuthPath);
const runtime = resolveRuntimeConfig({
  env: process.env,
  projectEnv,
  codexConfig,
  codexAuth
});

const PORT = runtime.port;
const OPENAI_API_KEY = runtime.apiKey;
const OPENAI_BASE_URL = runtime.baseUrl;
const OPENAI_MODEL = runtime.model;
const OPENAI_REASONING_EFFORT = runtime.reasoningEffort;
const CONFIG_SOURCE = runtime.configSource;
const SERVE_STATIC = runtime.serveStatic;
const ALLOWED_ORIGINS = runtime.allowedOrigins;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8"
};

const responseSchemas = {
  daily_practice_generate: {
    type: "json_schema",
    name: "daily_practice_generate",
    strict: true,
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        title: { type: "string" },
        questionType: { type: "string" },
        prompt: { type: "string" },
        starterCode: { type: "string" },
        answerFormat: { type: "string" },
        keyPoints: {
          type: "array",
          items: { type: "string" }
        },
        hints: {
          type: "array",
          items: { type: "string" }
        },
        referenceAnswer: { type: "string" },
        source: { type: "string" }
      },
      required: [
        "title",
        "questionType",
        "prompt",
        "starterCode",
        "answerFormat",
        "keyPoints",
        "hints",
        "referenceAnswer",
        "source"
      ]
    }
  },
  daily_practice_evaluate: {
    type: "json_schema",
    name: "daily_practice_evaluate",
    strict: true,
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        isCorrect: { type: "boolean" },
        score: { type: "number" },
        verdict: { type: "string" },
        strengths: {
          type: "array",
          items: { type: "string" }
        },
        issues: {
          type: "array",
          items: { type: "string" }
        },
        suggestions: {
          type: "array",
          items: { type: "string" }
        },
        idealAnswer: { type: "string" },
        source: { type: "string" }
      },
      required: [
        "isCorrect",
        "score",
        "verdict",
        "strengths",
        "issues",
        "suggestions",
        "idealAnswer",
        "source"
      ]
    }
  }
};

const server = createServer(async (request, response) => {
  try {
    addCorsHeaders(request, response);

    if (request.method === "OPTIONS") {
      response.writeHead(204);
      response.end();
      return;
    }

    const requestUrl = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

    if (requestUrl.pathname === "/api/health" && request.method === "GET") {
      sendJson(response, 200, {
        ok: true,
        configured: Boolean(OPENAI_API_KEY),
        model: OPENAI_MODEL,
        baseUrl: OPENAI_BASE_URL,
        configSource: CONFIG_SOURCE,
        serveStatic: SERVE_STATIC,
        allowedOrigins: ALLOWED_ORIGINS,
        message: OPENAI_API_KEY
          ? `AI 服务可用，当前模型为 ${OPENAI_MODEL}。`
          : "服务已启动，但还没有配置 OPENAI_API_KEY。"
      });
      return;
    }

    if (requestUrl.pathname === "/api/coach" && request.method === "POST") {
      if (!OPENAI_API_KEY) {
        sendJson(response, 503, {
          error: "OPENAI_API_KEY is not configured."
        });
        return;
      }

      const body = await readJsonBody(request);
      const { task, payload } = body || {};

      if (!responseSchemas[task]) {
        sendJson(response, 400, {
          error: `Unsupported task: ${task || "unknown"}`
        });
        return;
      }

      const promptConfig = buildPromptConfig(task, payload || {});
      const result = await runOpenAiStructuredTask({
        instructions: promptConfig.instructions,
        userText: promptConfig.userText,
        schema: responseSchemas[task]
      });

      sendJson(response, 200, result);
      return;
    }

    if (!SERVE_STATIC) {
      if (requestUrl.pathname === "/" && request.method === "GET") {
        sendJson(response, 200, {
          ok: true,
          service: "python-learning-site-ai",
          mode: "api-only",
          configured: Boolean(OPENAI_API_KEY),
          message: "API 服务正在运行。当前部署未托管前端静态页面。"
        });
        return;
      }

      sendJson(response, 404, {
        error: "Static hosting is disabled for this deployment."
      });
      return;
    }

    await serveStaticFile(requestUrl.pathname, response);
  } catch (error) {
    sendJson(response, error?.statusCode || 500, {
      error: error instanceof Error ? error.message : "Internal server error"
    });
  }
});

server.listen(PORT, () => {
  console.log(`Python Learning Site AI server running at http://localhost:${PORT}`);
});

function addCorsHeaders(request, response) {
  const requestOrigin = request.headers.origin;
  const allowOrigin = resolveCorsOrigin(requestOrigin);
  if (allowOrigin) {
    response.setHeader("Access-Control-Allow-Origin", allowOrigin);
    response.setHeader("Vary", "Origin");
  }
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

function resolveCorsOrigin(requestOrigin) {
  if (ALLOWED_ORIGINS.includes("*")) {
    return requestOrigin || "*";
  }

  if (typeof requestOrigin !== "string" || !requestOrigin.trim()) {
    return "";
  }

  return ALLOWED_ORIGINS.includes(requestOrigin.trim()) ? requestOrigin.trim() : "";
}

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(data, null, 2));
}

async function readJsonBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch {
    const error = new Error("Request body must be valid JSON.");
    error.statusCode = 400;
    throw error;
  }
}

async function serveStaticFile(requestPath, response) {
  const pathname = decodeURIComponent(requestPath);
  const normalizedPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.join(__dirname, normalizedPath);
  const resolvedPath = path.resolve(filePath);

  if (!resolvedPath.startsWith(path.resolve(__dirname))) {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  }

  let fileStats;
  try {
    fileStats = await stat(resolvedPath);
  } catch {
    const error = new Error("Not found");
    error.statusCode = 404;
    throw error;
  }

  if (!fileStats.isFile()) {
    const error = new Error("Not found");
    error.statusCode = 404;
    throw error;
  }

  const fileBuffer = await readFile(resolvedPath);
  const extension = path.extname(resolvedPath).toLowerCase();
  const contentType = mimeTypes[extension] || "application/octet-stream";
  const cacheControl = extension === ".html"
    ? "no-cache"
    : "public, max-age=3600";

  response.writeHead(200, {
    "Content-Type": contentType,
    "Cache-Control": cacheControl
  });
  response.end(fileBuffer);
}

function buildPromptConfig(task, payload) {
  switch (task) {
    case "daily_practice_generate":
      return {
        instructions: [
          "You are a Python learning coach for complete beginners.",
          "Generate one short daily exercise aligned to the learner's current day.",
          "Keep it practical, random, and slightly varied in angle each time.",
          "Do not go beyond the listed learning goals.",
          "The learner is a Chinese beginner, so explanations should be easy to follow.",
          "Return JSON only.",
          "Set source to 'Remote'."
        ].join(" "),
        userText: [
          `Task: daily_practice_generate`,
          `Day number: ${String(payload.dayNumber || "")}`,
          `Day title: ${String(payload.dayTitle || "")}`,
          `Topic: ${String(payload.topic || "")}`,
          `Goals: ${arrayToBulletLines(payload.goals)}`,
          `Existing practice summary on page: ${arrayToBulletLines(payload.existingPracticeTitles)}`,
          "",
          "Generate one beginner-friendly exercise.",
          "Constraints:",
          "- questionType must be one of: concept, code_output, code_fix, code_write",
          "- prompt should be in Chinese and specific",
          "- starterCode can be empty when not needed",
          "- answerFormat should tell the learner how to answer",
          "- keyPoints should list 2-4 judging points",
          "- hints should be 2-4 concise Chinese hints",
          "- referenceAnswer should be a short model answer or correct code"
        ].join("\n")
      };
    case "daily_practice_evaluate":
      return {
        instructions: [
          "You are a Python coach grading one beginner answer.",
          "Judge against the current day's scope only.",
          "Be strict about factual correctness but tolerant of beginner wording.",
          "If the answer is partially correct, explain what is right and what is missing.",
          "Return JSON only.",
          "Use concise Chinese feedback.",
          "Set source to 'Remote'."
        ].join(" "),
        userText: [
          `Task: daily_practice_evaluate`,
          `Day number: ${String(payload.dayNumber || "")}`,
          `Day title: ${String(payload.dayTitle || "")}`,
          `Topic: ${String(payload.topic || "")}`,
          `Goals: ${arrayToBulletLines(payload.goals)}`,
          `Question title: ${String(payload.questionTitle || "")}`,
          `Question type: ${String(payload.questionType || "")}`,
          "Question prompt:",
          String(payload.prompt || ""),
          "",
          "Starter code:",
          String(payload.starterCode || ""),
          "",
          `Expected answer format: ${String(payload.answerFormat || "")}`,
          `Key points: ${arrayToBulletLines(payload.keyPoints)}`,
          "Reference answer:",
          String(payload.referenceAnswer || ""),
          "",
          "Student answer:",
          String(payload.learnerAnswer || ""),
          "",
          "Return:",
          "- isCorrect: true only when the answer is essentially correct for the current level",
          "- score: 0-100 numeric score",
          "- verdict: short Chinese summary",
          "- strengths: 1-3 concise Chinese points",
          "- issues: 1-4 concise Chinese points",
          "- suggestions: 2-4 next-step Chinese suggestions",
          "- idealAnswer: a short corrected answer or code",
          "- source: Remote"
        ].join("\n")
      };
    default:
      throw new Error(`Unsupported task: ${task}`);
  }
}

function arrayToBulletLines(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return "- none";
  }
  return value
    .map((item) => `- ${String(item || "").trim()}`)
    .join("\n");
}

async function runOpenAiStructuredTask({ instructions, userText, schema }) {
  const response = await fetch(`${OPENAI_BASE_URL}/responses`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      instructions,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: userText
            }
          ]
        }
      ],
      max_output_tokens: 1400,
      reasoning: {
        effort: OPENAI_REASONING_EFFORT
      },
      text: {
        format: schema
      }
    })
  });

  const data = await response.json();
  if (!response.ok) {
    const apiMessage = data?.error?.message || `OpenAI request failed with status ${response.status}`;
    const error = new Error(apiMessage);
    error.statusCode = response.status;
    throw error;
  }

  const outputText = extractOutputText(data);
  if (!outputText) {
    throw new Error("OpenAI response did not include any output text.");
  }

  try {
    return JSON.parse(outputText);
  } catch {
    throw new Error(`OpenAI returned non-JSON output: ${outputText}`);
  }
}

function extractOutputText(responseData) {
  if (typeof responseData?.output_text === "string" && responseData.output_text.trim()) {
    return responseData.output_text.trim();
  }

  const output = Array.isArray(responseData?.output) ? responseData.output : [];
  for (const item of output) {
    const content = Array.isArray(item?.content) ? item.content : [];
    for (const part of content) {
      if (typeof part?.text === "string" && part.text.trim()) {
        return part.text.trim();
      }
    }
  }

  return "";
}

function loadDotEnv(filePath) {
  const parsed = {
    port: "",
    apiKey: "",
    baseUrl: "",
    model: "",
    reasoningEffort: "",
    serveStatic: "",
    allowedOrigins: ""
  };

  try {
    const content = readFileSync(filePath, "utf8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex <= 0) {
        continue;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed.slice(separatorIndex + 1).trim();

      if (key === "PORT") {
        parsed.port = value;
      } else if (key === "OPENAI_API_KEY") {
        parsed.apiKey = value;
      } else if (key === "OPENAI_BASE_URL") {
        parsed.baseUrl = value;
      } else if (key === "OPENAI_MODEL") {
        parsed.model = value;
      } else if (key === "OPENAI_REASONING_EFFORT") {
        parsed.reasoningEffort = value;
      } else if (key === "SERVE_STATIC") {
        parsed.serveStatic = value;
      } else if (key === "ALLOWED_ORIGINS") {
        parsed.allowedOrigins = value;
      }
    }
  } catch {
    // Optional .env file. Ignore if missing.
  }

  return parsed;
}

function resolveRuntimeConfig({ env, projectEnv, codexConfig, codexAuth }) {
  const codexProviderName = codexConfig.modelProvider;
  const codexProvider = codexProviderName ? codexConfig.providers[codexProviderName] || {} : {};

  const apiKey = firstNonEmpty(
    projectEnv.apiKey,
    codexAuth.apiKey,
    env.OPENAI_API_KEY,
    env.CODEX_OPENAI_API_KEY
  );
  const baseUrl = firstNonEmpty(
    projectEnv.baseUrl,
    codexProvider.baseUrl,
    env.OPENAI_BASE_URL,
    env.CODEX_OPENAI_BASE_URL,
    "https://api.openai.com/v1"
  ).replace(/\/+$/, "");
  const model = firstNonEmpty(
    projectEnv.model,
    codexConfig.model,
    env.OPENAI_MODEL,
    env.CODEX_OPENAI_MODEL,
    "gpt-5.4-mini"
  );
  const reasoningEffort = firstNonEmpty(
    projectEnv.reasoningEffort,
    codexConfig.reasoningEffort,
    env.OPENAI_REASONING_EFFORT,
    env.CODEX_OPENAI_REASONING_EFFORT,
    "low"
  );
  const serveStatic = parseBoolean(
    firstNonEmpty(projectEnv.serveStatic, env.SERVE_STATIC, "true"),
    true
  );
  const allowedOrigins = parseAllowedOrigins(
    firstNonEmpty(projectEnv.allowedOrigins, env.ALLOWED_ORIGINS, "*")
  );

  let configSource = "default";
  if (projectEnv.apiKey || projectEnv.baseUrl || projectEnv.model) {
    configSource = ".env";
  } else if (codexAuth.apiKey || codexProvider.baseUrl || codexConfig.model) {
    configSource = "codex-local";
  } else if (
    env.OPENAI_API_KEY ||
    env.OPENAI_BASE_URL ||
    env.OPENAI_MODEL ||
    env.OPENAI_REASONING_EFFORT ||
    env.PORT ||
    env.CODEX_OPENAI_API_KEY ||
    env.CODEX_OPENAI_BASE_URL ||
    env.CODEX_OPENAI_MODEL ||
    env.CODEX_OPENAI_REASONING_EFFORT ||
    env.CODEX_PORT
  ) {
    configSource = "process-env";
  }

  return {
    port: Number(firstNonEmpty(projectEnv.port, env.PORT, env.CODEX_PORT, "3000")),
    apiKey,
    baseUrl,
    model,
    reasoningEffort,
    configSource,
    serveStatic,
    allowedOrigins
  };
}

function loadCodexAuth(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    const parsed = JSON.parse(content);
    return {
      apiKey: typeof parsed.OPENAI_API_KEY === "string" ? parsed.OPENAI_API_KEY.trim() : ""
    };
  } catch {
    return {
      apiKey: ""
    };
  }
}

function loadCodexConfig(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    const modelProvider = matchTomlValue(content, /^model_provider\s*=\s*"([^"]+)"/m);
    const model = matchTomlValue(content, /^model\s*=\s*"([^"]+)"/m);
    const reasoningEffort = matchTomlValue(content, /^model_reasoning_effort\s*=\s*"([^"]+)"/m);
    const providerNames = [...content.matchAll(/^\[model_providers\.([^\]]+)\]\s*$/gm)].map((match) => match[1]);
    const providers = {};

    for (const providerName of providerNames) {
      const sectionMatch = content.match(
        new RegExp(`^\\[model_providers\\.${escapeRegExp(providerName)}\\]\\s*$([\\s\\S]*?)(?=^\\[[^\\]]+\\]\\s*$|\\Z)`, "m")
      );
      const sectionBody = sectionMatch?.[1] || "";
      providers[providerName] = {
        baseUrl: matchTomlValue(sectionBody, /^\s*base_url\s*=\s*"([^"]+)"/m)
      };
    }

    return {
      modelProvider,
      model,
      reasoningEffort,
      providers
    };
  } catch {
    return {
      modelProvider: "",
      model: "",
      reasoningEffort: "",
      providers: {}
    };
  }
}

function matchTomlValue(content, pattern) {
  const match = content.match(pattern);
  return match?.[1]?.trim() || "";
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function firstNonEmpty(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
}

function parseBoolean(value, fallback) {
  if (typeof value !== "string" || !value.trim()) {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) {
    return true;
  }
  if (["0", "false", "no", "off"].includes(normalized)) {
    return false;
  }
  return fallback;
}

function parseAllowedOrigins(value) {
  if (typeof value !== "string" || !value.trim()) {
    return ["*"];
  }

  const origins = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return origins.length ? origins : ["*"];
}
