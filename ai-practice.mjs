const ENDPOINT_STORAGE_KEY = "python-ai-endpoint-v1";
const dayCatalog = {
  1: {
    title: "认识 Python 和程序",
    topic: "程序、顺序执行、print()",
    goals: ["知道程序会按顺序执行", "会用 print() 输出文字", "能读懂最简单的 3 行程序"]
  },
  2: {
    title: "变量",
    topic: "变量与赋值",
    goals: ["理解变量是用来保存数据的", "会写 name = 'Tom' 这种赋值", "能区分变量名和字符串内容"]
  },
  3: {
    title: "数据类型",
    topic: "字符串、整数、浮点数",
    goals: ["知道 str/int/float 的基本区别", "能判断一个值更像哪种类型", "理解引号对字符串的重要性"]
  },
  4: {
    title: "输入输出",
    topic: "input() 与 print()",
    goals: ["知道 input() 是接收输入", "会把输入保存到变量", "会把变量再输出出来"]
  },
  5: {
    title: "运算符",
    topic: "加减乘除与比较",
    goals: ["会写基本算术运算", "能理解表达式的结果", "知道比较运算会得到真假结果"]
  },
  6: {
    title: "条件判断",
    topic: "if / else",
    goals: ["知道条件成立和不成立会走不同分支", "会写最简单的 if else", "能看懂缩进结构"]
  },
  7: {
    title: "成绩程序",
    topic: "条件判断综合练习",
    goals: ["能把输入和条件判断组合起来", "会根据分数输出不同结果", "知道程序分支是为了解决真实小问题"]
  },
  8: {
    title: "循环",
    topic: "for 与重复执行",
    goals: ["知道循环是重复执行代码", "会写最简单的 for 循环", "能看懂 range() 的基本用法"]
  },
  9: {
    title: "列表",
    topic: "list 基础",
    goals: ["知道列表可以存多个数据", "会取出简单列表元素", "会用 append() 增加元素"]
  },
  10: {
    title: "字典",
    topic: "dict 键值对",
    goals: ["知道字典是 key-value 结构", "会通过键取值", "能区分列表和字典的使用场景"]
  },
  11: {
    title: "字符串处理",
    topic: "字符串常见操作",
    goals: ["知道字符串能切片或拼接", "会用简单方法处理文本", "能把字符串处理和输入输出结合起来"]
  },
  12: {
    title: "循环练习",
    topic: "循环综合",
    goals: ["会在循环里做简单判断或输出", "能读懂循环题", "知道什么时候该重复执行"]
  },
  13: {
    title: "函数概念",
    topic: "def 与函数作用",
    goals: ["知道函数是把重复任务打包", "会写最简单的 def", "知道调用函数和定义函数的区别"]
  },
  14: {
    title: "函数参数",
    topic: "参数与返回值入门",
    goals: ["知道参数是传入函数的数据", "会写带 1 到 2 个参数的函数", "能理解不同输入会得到不同结果"]
  },
  15: {
    title: "阶段复习",
    topic: "第 1 到 14 天综合复习",
    goals: ["能把变量、判断、循环、函数连起来", "能复述基础语法的作用", "能完成一题小综合"]
  },
  16: {
    title: "模块导入",
    topic: "import 基础",
    goals: ["知道 import 是引入外部模块", "会写简单 import 语句", "理解代码可以拆到不同文件或模块"]
  },
  17: {
    title: "文件读写",
    topic: "open/read/write",
    goals: ["知道程序可以读文件写文件", "会看懂最基础的文件操作代码", "知道文件路径和内容是两回事"]
  },
  18: {
    title: "异常处理",
    topic: "try / except",
    goals: ["知道报错不一定要让程序直接停掉", "会写最简单的 try except", "理解异常处理是为了让程序更稳"]
  },
  19: {
    title: "函数工作流",
    topic: "函数拆分流程",
    goals: ["知道可以把一段流程拆成多个函数", "理解主流程和子函数的关系", "会为小步骤起函数名"]
  },
  20: {
    title: "文件项目",
    topic: "文件处理小项目",
    goals: ["能把输入、文件、函数串成小项目", "知道程序不止一屏代码", "能理解项目任务分解"]
  },
  21: {
    title: "调试",
    topic: "定位错误与修复",
    goals: ["知道先看报错信息", "会检查变量和值", "能做最基本的排错思路整理"]
  },
  22: {
    title: "迷你程序",
    topic: "小型综合程序",
    goals: ["能读懂小型多步骤程序", "知道输入处理、判断、循环如何配合", "能做简单功能补全"]
  },
  23: {
    title: "第 3 周复习",
    topic: "模块、文件、异常、调试综合",
    goals: ["复盘第 16 到 22 天内容", "能分清每个知识点的角色", "能完成一个偏综合型回答"]
  },
  24: {
    title: "类和对象",
    topic: "class、对象、属性",
    goals: ["知道类像模板", "知道对象是具体实例", "会写带简单属性的类"]
  },
  25: {
    title: "项目结构",
    topic: "文件拆分与项目骨架",
    goals: ["知道入口文件和功能文件可以分开", "理解项目结构比乱堆代码更清晰", "能举出拆分模块的理由"]
  },
  26: {
    title: "代码规范",
    topic: "命名、格式、可读性",
    goals: ["知道代码不只是能跑，还要好读", "能识别糟糕命名", "能给出更清晰的写法建议"]
  },
  27: {
    title: "成绩管理项目",
    topic: "综合项目结构化思考",
    goals: ["能围绕真实小项目思考输入、存储、输出", "知道功能拆分的重要性", "能写简单伪代码或步骤"]
  },
  28: {
    title: "记账本项目",
    topic: "小项目设计",
    goals: ["理解项目功能点拆分", "能思考需要哪些数据", "知道如何把功能组织成步骤"]
  },
  29: {
    title: "重构复习",
    topic: "重构与整理",
    goals: ["知道重构是优化结构不是乱改功能", "能发现重复代码", "能提出更清晰的拆分建议"]
  },
  30: {
    title: "总结与下一步",
    topic: "路线总结与下一阶段计划",
    goals: ["能复盘 30 天学了什么", "知道下一步怎么练", "能说明自己目前薄弱点和方向"]
  }
};

const state = {
  endpoint: getStoredEndpoint(),
  currentQuestion: null,
  currentDay: getCurrentDayContext()
};

if (state.currentDay) {
  injectStyles();
  mountPracticePanel();
}

function getCurrentDayContext() {
  const fileName = location.pathname.split("/").pop() || "";
  const match = fileName.match(/^day(\d{1,2})/i);
  if (!match) {
    return null;
  }

  const dayNumber = Number(match[1]);
  const meta = dayCatalog[dayNumber];
  if (!meta) {
    return null;
  }

  const existingPracticeTitles = Array.from(document.querySelectorAll("#practice h3"))
    .map((node) => node.textContent.trim())
    .filter(Boolean);

  return {
    dayNumber,
    fileName,
    dayTitle: meta.title,
    topic: meta.topic,
    goals: meta.goals,
    existingPracticeTitles
  };
}

function getStoredEndpoint() {
  const searchParams = new URLSearchParams(location.search);
  const queryValue = normalizeEndpoint(searchParams.get("ai_endpoint") || searchParams.get("aiEndpoint") || "");
  const globalValue = normalizeEndpoint(globalThis.__PYTHON_AI_CONFIG__?.endpoint || "");
  const metaValue = normalizeEndpoint(
    document.querySelector('meta[name="python-ai-endpoint"]')?.getAttribute("content") || ""
  );
  const storedValue = normalizeEndpoint(localStorage.getItem(ENDPOINT_STORAGE_KEY) || "");
  const sameOriginFallback = shouldUseSameOriginFallback() ? location.origin : "";
  const fileFallback = location.protocol === "file:" ? "http://127.0.0.1:3000" : "";
  const resolved = firstNonEmptyEndpoint(
    queryValue,
    globalValue,
    metaValue,
    storedValue,
    sameOriginFallback,
    fileFallback
  );

  if (queryValue) {
    localStorage.setItem(ENDPOINT_STORAGE_KEY, queryValue);
  } else if (globalValue) {
    localStorage.setItem(ENDPOINT_STORAGE_KEY, globalValue);
  } else if (metaValue) {
    localStorage.setItem(ENDPOINT_STORAGE_KEY, metaValue);
  }

  return resolved;
}

function shouldUseSameOriginFallback() {
  if (location.protocol === "file:") {
    return false;
  }

  const host = location.hostname.toLowerCase();
  if (!host) {
    return false;
  }

  if (host === "127.0.0.1" || host === "localhost" || host === "::1" || host.endsWith(".local")) {
    return true;
  }

  if (host.endsWith("github.io")) {
    return false;
  }

  return true;
}

function firstNonEmptyEndpoint(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
}

function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .ai-practice-panel {
      margin-top: 22px;
      padding: 22px;
      border-radius: 22px;
      border: 1px solid rgba(59, 130, 246, 0.16);
      background:
        radial-gradient(circle at top right, rgba(59, 130, 246, 0.12), transparent 28%),
        linear-gradient(180deg, rgba(14, 35, 57, 0.96), rgba(10, 25, 42, 0.98));
      box-shadow: 0 20px 55px rgba(3, 15, 30, 0.16);
    }
    .ai-practice-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .ai-practice-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 7px 12px;
      border-radius: 999px;
      background: rgba(125, 211, 252, 0.14);
      color: #1d4ed8;
      font-weight: 700;
      font-size: 0.84rem;
    }
    .ai-practice-head h3 {
      margin: 14px 0 8px;
    }
    .ai-practice-head p {
      margin: 0;
    }
    .ai-practice-status {
      min-width: 180px;
      padding: 10px 14px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.74);
      border: 1px solid rgba(125, 211, 252, 0.2);
      font-size: 0.92rem;
    }
    .ai-practice-status strong {
      display: block;
      margin-bottom: 4px;
    }
    .ai-practice-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 18px;
    }
    .ai-practice-config {
      margin-top: 18px;
      border-radius: 18px;
      border: 1px solid rgba(59, 130, 246, 0.12);
      background: rgba(255, 255, 255, 0.72);
      overflow: hidden;
    }
    .ai-practice-config summary {
      cursor: pointer;
      list-style: none;
      padding: 14px 16px;
      font-weight: 700;
    }
    .ai-practice-config summary::-webkit-details-marker {
      display: none;
    }
    .ai-practice-config-body {
      padding: 0 16px 16px;
    }
    .ai-practice-label {
      display: block;
      margin: 0 0 8px;
      font-weight: 700;
      color: #0f172a;
    }
    .ai-practice-input,
    .ai-practice-answer {
      width: 100%;
      border: 1px solid rgba(148, 163, 184, 0.5);
      border-radius: 16px;
      padding: 12px 14px;
      font: inherit;
      color: #0f172a;
      background: rgba(255, 255, 255, 0.96);
    }
    .ai-practice-answer {
      min-height: 180px;
      resize: vertical;
      margin-top: 16px;
    }
    .ai-practice-card,
    .ai-eval-card {
      margin-top: 18px;
      padding: 18px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.84);
      border: 1px solid rgba(148, 163, 184, 0.24);
    }
    .ai-practice-card h4,
    .ai-eval-card h4 {
      margin: 0 0 10px;
      color: #0f172a;
    }
    .ai-practice-card p,
    .ai-eval-card p,
    .ai-practice-card li,
    .ai-eval-card li {
      color: #334155;
    }
    .ai-pill-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 12px 0 14px;
    }
    .ai-pill {
      display: inline-flex;
      align-items: center;
      min-height: 34px;
      padding: 0 12px;
      border-radius: 999px;
      background: rgba(37, 99, 235, 0.08);
      color: #1d4ed8;
      font-size: 0.88rem;
      font-weight: 700;
    }
    .ai-code {
      margin: 14px 0 0;
      padding: 14px 16px;
      border-radius: 16px;
      background: #0f172a;
      color: #dbeafe;
      overflow-x: auto;
      white-space: pre-wrap;
      font-family: Consolas, "Courier New", monospace;
      font-size: 0.94rem;
      line-height: 1.65;
    }
    .ai-list {
      margin: 10px 0 0;
      padding-left: 18px;
    }
    .ai-muted {
      color: #64748b;
      font-size: 0.92rem;
    }
    .ai-empty {
      margin-top: 16px;
      padding: 16px 18px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.72);
      color: #475569;
    }
    .ai-eval-result {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
    .ai-score-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 86px;
      min-height: 40px;
      padding: 0 14px;
      border-radius: 999px;
      font-weight: 800;
      color: #fff;
      background: linear-gradient(135deg, #2563eb, #06b6d4);
    }
    .ai-correct {
      color: #047857;
      font-weight: 700;
    }
    .ai-incorrect {
      color: #b91c1c;
      font-weight: 700;
    }
    .ai-loading {
      opacity: 0.7;
      pointer-events: none;
    }
    @media (max-width: 720px) {
      .ai-practice-panel {
        padding: 18px;
      }
      .ai-practice-status {
        width: 100%;
      }
    }
  `;
  document.head.append(style);
}

function mountPracticePanel() {
  const practiceSection = document.querySelector("#practice");
  if (!practiceSection) {
    return;
  }

  const panel = document.createElement("div");
  panel.className = "ai-practice-panel";
  panel.innerHTML = `
    <div class="ai-practice-head">
      <div>
        <div class="ai-practice-eyebrow">AI 练习模块 / Day ${String(state.currentDay.dayNumber).padStart(2, "0")}</div>
        <h3>让模型按今天的主题随机出题，再帮你判对错</h3>
        <p>这里会优先调用 GPT 生成当日练习，并根据你的回答给出判定和建议。默认只围绕今天这页内容，不会故意跳级。</p>
      </div>
      <div class="ai-practice-status" data-status-box>
        <strong>当前后端</strong>
        <span data-status-text>等待生成练习</span>
      </div>
    </div>
    <div class="ai-practice-actions">
      <button class="button button-primary" type="button" data-generate-button>生成今日 AI 练习</button>
      <button class="button button-secondary" type="button" data-check-button>测试后端连接</button>
    </div>
    <details class="ai-practice-config">
      <summary>后端地址设置</summary>
      <div class="ai-practice-config-body">
        <label class="ai-practice-label" for="ai-endpoint-input">API 根地址</label>
        <input id="ai-endpoint-input" class="ai-practice-input" type="text" placeholder="例如 http://127.0.0.1:3000" value="${escapeHtml(state.endpoint)}" />
        <p class="ai-muted">如果你把静态页放到 GitHub Pages、后端单独跑在本地或服务器上，就在这里填后端地址。默认会用当前站点地址。</p>
      </div>
    </details>
    <div class="ai-empty" data-empty-box>先点“生成今日 AI 练习”。生成后会出现题目、答题框和判题结果。</div>
    <div data-question-root></div>
    <div data-evaluation-root></div>
  `;

  practiceSection.append(panel);

  const generateButton = panel.querySelector("[data-generate-button]");
  const checkButton = panel.querySelector("[data-check-button]");
  const endpointInput = panel.querySelector("#ai-endpoint-input");

  endpointInput.addEventListener("change", () => {
    state.endpoint = normalizeEndpoint(endpointInput.value);
    localStorage.setItem(ENDPOINT_STORAGE_KEY, state.endpoint);
    updateStatus(`后端已设置为 ${state.endpoint}`);
  });

  generateButton.addEventListener("click", async () => {
    await handleGenerate(panel);
  });

  checkButton.addEventListener("click", async () => {
    await handleHealthCheck();
  });
}

async function handleHealthCheck() {
  try {
    const endpoint = getEffectiveEndpoint();
    updateStatus("正在检查后端连接...");
    const response = await fetch(`${endpoint}/api/health`);
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.configured === false) {
      throw new Error(data.message || `健康检查失败，状态码 ${response.status}`);
    }
    updateStatus(data.message || "后端连接正常。");
  } catch (error) {
    updateStatus(`后端不可用：${error.message}`);
  }
}

async function handleGenerate(panel) {
  setLoading(panel, true);
  const emptyBox = panel.querySelector("[data-empty-box]");
  const questionRoot = panel.querySelector("[data-question-root]");
  const evaluationRoot = panel.querySelector("[data-evaluation-root]");
  questionRoot.innerHTML = "";
  evaluationRoot.innerHTML = "";

  try {
    updateStatus("正在生成题目...");
    const data = await generateQuestion();
    state.currentQuestion = data;
    emptyBox.hidden = true;
    renderQuestion(questionRoot, data, panel);
    updateStatus(`题目已生成，来源：${data.source || "Remote"}`);
  } catch (error) {
    state.currentQuestion = null;
    emptyBox.hidden = false;
    emptyBox.textContent = `生成失败：${error.message}`;
    updateStatus("生成题目失败。");
  } finally {
    setLoading(panel, false);
  }
}

async function generateQuestion() {
  const endpoint = getEffectiveEndpoint();
  const payload = {
    dayNumber: state.currentDay.dayNumber,
    dayTitle: state.currentDay.dayTitle,
    topic: state.currentDay.topic,
    goals: state.currentDay.goals,
    existingPracticeTitles: state.currentDay.existingPracticeTitles
  };

  try {
    const response = await fetch(`${endpoint}/api/coach`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task: "daily_practice_generate",
        payload
      })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || `远程服务返回 ${response.status}`);
    }

    return normalizeQuestion(data, "Remote");
  } catch (error) {
    const fallback = buildLocalQuestion(state.currentDay);
    return {
      ...fallback,
      source: `Local Demo（远程失败：${error.message}）`
    };
  }
}

function renderQuestion(root, data, panel) {
  const wrapper = document.createElement("div");
  wrapper.className = "ai-practice-card";
  wrapper.innerHTML = `
    <h4>${escapeHtml(data.title)}</h4>
    <div class="ai-pill-row">
      <span class="ai-pill">题型：${escapeHtml(formatQuestionType(data.questionType))}</span>
      <span class="ai-pill">主题：${escapeHtml(state.currentDay.topic)}</span>
      <span class="ai-pill">来源：${escapeHtml(data.source || "Remote")}</span>
    </div>
    <p>${escapeHtml(data.prompt).replace(/\n/g, "<br />")}</p>
    ${data.starterCode ? `<pre class="ai-code">${escapeHtml(data.starterCode)}</pre>` : ""}
    <p class="ai-muted">作答方式：${escapeHtml(data.answerFormat)}</p>
    <h4>判题会关注什么</h4>
    <ul class="ai-list">${data.keyPoints.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <h4>思考提示</h4>
    <ul class="ai-list">${data.hints.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <label class="ai-practice-label" for="ai-answer-box">你的答案</label>
    <textarea id="ai-answer-box" class="ai-practice-answer" placeholder="在这里写你的答案、代码或思路。代码题可以直接写 Python 代码。"></textarea>
    <div class="ai-practice-actions">
      <button class="button button-primary" type="button" data-submit-button>提交判题</button>
      <button class="button button-secondary" type="button" data-show-reference-button>查看参考答案</button>
    </div>
    <div class="ai-empty" data-reference-box hidden>参考答案：<br /><br />${escapeHtml(data.referenceAnswer).replace(/\n/g, "<br />")}</div>
  `;
  root.replaceChildren(wrapper);

  const answerBox = wrapper.querySelector("#ai-answer-box");
  const submitButton = wrapper.querySelector("[data-submit-button]");
  const showReferenceButton = wrapper.querySelector("[data-show-reference-button]");
  const referenceBox = wrapper.querySelector("[data-reference-box]");

  submitButton.addEventListener("click", async () => {
    const learnerAnswer = answerBox.value.trim();
    if (!learnerAnswer) {
      updateStatus("请先写出你的答案再提交。");
      answerBox.focus();
      return;
    }

    setLoading(panel, true);
    try {
      updateStatus("正在判题...");
      const result = await evaluateAnswer(learnerAnswer);
      renderEvaluation(panel.querySelector("[data-evaluation-root]"), result);
      updateStatus(`判题完成，来源：${result.source || "Remote"}`);
    } catch (error) {
      updateStatus(`判题失败：${error.message}`);
    } finally {
      setLoading(panel, false);
    }
  });

  showReferenceButton.addEventListener("click", () => {
    referenceBox.hidden = !referenceBox.hidden;
  });
}

async function evaluateAnswer(learnerAnswer) {
  const endpoint = getEffectiveEndpoint();
  const question = state.currentQuestion;

  try {
    const response = await fetch(`${endpoint}/api/coach`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task: "daily_practice_evaluate",
        payload: {
          dayNumber: state.currentDay.dayNumber,
          dayTitle: state.currentDay.dayTitle,
          topic: state.currentDay.topic,
          goals: state.currentDay.goals,
          questionTitle: question.title,
          questionType: question.questionType,
          prompt: question.prompt,
          starterCode: question.starterCode,
          answerFormat: question.answerFormat,
          keyPoints: question.keyPoints,
          referenceAnswer: question.referenceAnswer,
          learnerAnswer
        }
      })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || `远程服务返回 ${response.status}`);
    }

    return normalizeEvaluation(data, "Remote");
  } catch (error) {
    const fallback = buildLocalEvaluation(question, learnerAnswer);
    return {
      ...fallback,
      source: `Local Demo（远程失败：${error.message}）`
    };
  }
}

function renderEvaluation(root, result) {
  const wrapper = document.createElement("div");
  wrapper.className = "ai-eval-card";
  wrapper.innerHTML = `
    <div class="ai-eval-result">
      <div class="ai-score-badge">得分 ${Math.round(result.score)}</div>
      <div class="${result.isCorrect ? "ai-correct" : "ai-incorrect"}">${escapeHtml(result.isCorrect ? "判定：基本正确" : "判定：还不够稳")}</div>
    </div>
    <p>${escapeHtml(result.verdict)}</p>
    <h4>做得对的地方</h4>
    <ul class="ai-list">${result.strengths.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <h4>还需要修正的地方</h4>
    <ul class="ai-list">${result.issues.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <h4>下一步建议</h4>
    <ul class="ai-list">${result.suggestions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <h4>参考改写 / 标准答案</h4>
    <pre class="ai-code">${escapeHtml(result.idealAnswer)}</pre>
    <p class="ai-muted">结果来源：${escapeHtml(result.source || "Remote")}</p>
  `;
  root.replaceChildren(wrapper);
}

function buildLocalQuestion(day) {
  const pool = [
    {
      questionType: "concept",
      prompt: `用你自己的话解释：今天这一页里的“${day.topic}”主要是做什么的？请尽量说出一个用途或例子。`,
      answerFormat: "用 2 到 4 句话回答，能举一个小例子更好。",
      starterCode: "",
      keyPoints: [
        "有没有说清这个知识点的作用",
        "有没有出现明显超出今天范围的错误说法",
        "有没有举出简单例子"
      ],
      hints: ["先说它是干什么的", "再说一个简单例子", "尽量用今天的术语"],
      referenceAnswer: `“${day.topic}”主要是帮助我们${day.goals[0]}。例如，初学时我可以先写一个很小的例子，确认代码会按预期运行。`
    },
    {
      questionType: "code_write",
      prompt: `围绕今天的主题“${day.topic}”，写一个非常短的小代码例子，长度控制在 3 到 8 行。`,
      answerFormat: "直接写 Python 代码，并尽量让代码能独立表达清楚。",
      starterCode: "",
      keyPoints: [
        "代码是否围绕今天主题",
        "语法是否基本正确",
        "是否体现至少一个今天的目标"
      ],
      hints: ["别写太长", "先保证语法简单正确", "优先用今天页面刚出现过的写法"],
      referenceAnswer: buildReferenceCode(day.dayNumber)
    },
    {
      questionType: "code_output",
      prompt: `读下面这段和“${day.topic}”有关的小代码，写出它的输出结果，并简短说明为什么。\n\n${buildPredictionCode(day.dayNumber)}`,
      answerFormat: "先写输出结果，再用 1 到 2 句话解释。",
      starterCode: buildPredictionCode(day.dayNumber),
      keyPoints: [
        "输出结果是否正确",
        "解释是否抓住关键点",
        "是否没有混淆变量、条件或循环等基础概念"
      ],
      hints: ["按顺序一行一行看", "先算结果，再写解释", "不要跳步骤"],
      referenceAnswer: buildPredictionAnswer(day.dayNumber)
    }
  ];

  const pick = pool[Math.floor(Math.random() * pool.length)];
  return normalizeQuestion({
    title: `${day.title} AI 练习`,
    ...pick,
    source: "Local Demo"
  }, "Local Demo");
}

function buildLocalEvaluation(question, learnerAnswer) {
  const answer = learnerAnswer.trim();
  const reference = question.referenceAnswer || "";
  const normalizedAnswer = answer.toLowerCase();
  const normalizedReference = reference.toLowerCase();
  const matchedKeywords = question.keyPoints.filter((item) => {
    const keyword = item.split(" ")[0].toLowerCase();
    return keyword && normalizedAnswer.includes(keyword);
  });

  let score = 45;
  const strengths = [];
  const issues = [];
  const suggestions = [];

  if (question.questionType === "code_write" || question.questionType === "code_fix") {
    if (/print|if|for|def|class|=/.test(answer)) {
      score += 22;
      strengths.push("你给出了代码形式的回答，没有停留在空泛描述。");
    } else {
      issues.push("这道题更适合直接写代码，但当前回答更像口头说明。");
    }
    if (normalizedReference && answer.length >= Math.min(reference.length * 0.45, 28)) {
      score += 18;
      strengths.push("答案长度基本够用，说明你在尝试完整表达。");
    } else {
      issues.push("代码量偏少，可能还没有把关键步骤写出来。");
    }
  } else {
    if (answer.length >= 16) {
      score += 18;
      strengths.push("回答不是一句带过，基本有展开。");
    } else {
      issues.push("回答偏短，建议至少补一句原因或例子。");
    }
    if (matchedKeywords.length > 0) {
      score += 15;
      strengths.push("回答里出现了一些和判题点相关的关键词。");
    } else {
      issues.push("答案虽然有方向，但还没明显覆盖今天这题的核心点。");
    }
  }

  if (normalizedReference && overlapRatio(normalizedAnswer, normalizedReference) > 0.2) {
    score += 16;
    strengths.push("你的答案和参考答案在核心信息上有一定重合。");
  } else {
    issues.push("核心信息和参考答案还有距离，建议对照后重写一遍。");
  }

  score = Math.max(20, Math.min(96, score));
  suggestions.push("先对照“参考改写 / 标准答案”，找出你少写或写错的那一块。");
  suggestions.push(`回到页面的“${state.currentDay.dayTitle}”正文，再复述一次今天最核心的 1 到 2 个概念。`);
  if (question.questionType !== "concept") {
    suggestions.push("把答案再精简一版，只保留最关键的语句或代码，看你能不能独立重写出来。");
  }

  if (strengths.length === 0) {
    strengths.push("你已经开始作答，这一步本身就比只看不写更有训练价值。");
  }
  if (issues.length === 0) {
    issues.push("整体方向已经对了，接下来主要是把表达再收紧一些。");
  }

  return normalizeEvaluation({
    isCorrect: score >= 72,
    score,
    verdict: score >= 72 ? "核心方向基本对，已经接近今天应掌握的程度。" : "方向有一部分是对的，但关键点还不够稳。",
    strengths,
    issues,
    suggestions,
    idealAnswer: question.referenceAnswer,
    source: "Local Demo"
  }, "Local Demo");
}

function buildReferenceCode(dayNumber) {
  switch (dayNumber) {
    case 1:
      return `print("Hello")\nprint("I am learning Python")\nprint("Day 1")`;
    case 2:
      return `name = "Tom"\ncity = "Shanghai"\nprint(name)\nprint(city)`;
    case 6:
      return `score = 80\nif score >= 60:\n    print("及格")\nelse:\n    print("不及格")`;
    case 8:
      return `for i in range(3):\n    print(i)`;
    case 13:
      return `def say_hi():\n    print("Hi")\n\nsay_hi()`;
    case 24:
      return `class Student:\n    def __init__(self, name):\n        self.name = name\n\nstu = Student("Tom")\nprint(stu.name)`;
    default:
      return `print("这是一个围绕 ${dayCatalog[dayNumber]?.title || "今日主题"} 的简单例子")`;
  }
}

function buildPredictionCode(dayNumber) {
  switch (dayNumber) {
    case 1:
      return `print("Hello")\nprint("Python")`;
    case 2:
      return `name = "Amy"\nprint(name)`;
    case 6:
      return `score = 50\nif score >= 60:\n    print("及格")\nelse:\n    print("不及格")`;
    case 8:
      return `for i in range(2):\n    print("loop", i)`;
    case 9:
      return `tasks = ["读题", "写代码"]\nprint(tasks[1])`;
    case 24:
      return `class Student:\n    def __init__(self, name):\n        self.name = name\n\nstu = Student("Mia")\nprint(stu.name)`;
    default:
      return `print("Day ${String(dayNumber).padStart(2, "0")}")`;
  }
}

function buildPredictionAnswer(dayNumber) {
  switch (dayNumber) {
    case 1:
      return `输出是：\nHello\nPython\n\n原因：程序默认按顺序从上往下执行两行 print()。`;
    case 2:
      return `输出是：Amy\n\n原因：变量 name 保存了字符串 "Amy"，print(name) 会把变量里的内容输出出来。`;
    case 6:
      return `输出是：不及格\n\n原因：50 小于 60，所以 if 条件不成立，会执行 else 分支。`;
    case 8:
      return `输出是：\nloop 0\nloop 1\n\n原因：range(2) 会依次给出 0 和 1，所以循环执行两次。`;
    case 9:
      return `输出是：写代码\n\n原因：列表下标从 0 开始，tasks[1] 取的是第二个元素。`;
    case 24:
      return `输出是：Mia\n\n原因：创建对象时把 "Mia" 传给 name，最后打印的是 stu.name。`;
    default:
      return `输出是：Day ${String(dayNumber).padStart(2, "0")}\n\n原因：print() 会把括号里的内容直接输出。`;
  }
}

function normalizeQuestion(data, fallbackSource) {
  return {
    title: typeof data.title === "string" && data.title.trim() ? data.title.trim() : `${state.currentDay.dayTitle} AI 练习`,
    questionType: typeof data.questionType === "string" && data.questionType.trim() ? data.questionType.trim() : "concept",
    prompt: typeof data.prompt === "string" ? data.prompt.trim() : "",
    starterCode: typeof data.starterCode === "string" ? data.starterCode.trim() : "",
    answerFormat: typeof data.answerFormat === "string" ? data.answerFormat.trim() : "直接写出你的答案。",
    keyPoints: Array.isArray(data.keyPoints) && data.keyPoints.length ? data.keyPoints.map(String) : ["围绕今天主题作答"],
    hints: Array.isArray(data.hints) && data.hints.length ? data.hints.map(String) : ["先回忆今天正文的重点"],
    referenceAnswer: typeof data.referenceAnswer === "string" ? data.referenceAnswer.trim() : "",
    source: data.source || fallbackSource
  };
}

function normalizeEvaluation(data, fallbackSource) {
  return {
    isCorrect: Boolean(data.isCorrect),
    score: Number.isFinite(data.score) ? data.score : 0,
    verdict: typeof data.verdict === "string" ? data.verdict.trim() : "",
    strengths: Array.isArray(data.strengths) && data.strengths.length ? data.strengths.map(String) : ["已经开始动手作答。"],
    issues: Array.isArray(data.issues) && data.issues.length ? data.issues.map(String) : ["还可以再对照今天的知识点收紧答案。"],
    suggestions: Array.isArray(data.suggestions) && data.suggestions.length ? data.suggestions.map(String) : ["重写一遍并对照今天页面。"],
    idealAnswer: typeof data.idealAnswer === "string" ? data.idealAnswer.trim() : "",
    source: data.source || fallbackSource
  };
}

function formatQuestionType(value) {
  switch (value) {
    case "concept":
      return "概念解释";
    case "code_output":
      return "输出预测";
    case "code_fix":
      return "找错修正";
    case "code_write":
      return "代码编写";
    default:
      return value;
  }
}

function normalizeEndpoint(value) {
  return (value || "").trim().replace(/\/+$/, "");
}

function getEffectiveEndpoint() {
  const endpoint = normalizeEndpoint(state.endpoint);
  if (!endpoint) {
    throw new Error("请先填写后端地址。");
  }
  return endpoint;
}

function updateStatus(text) {
  const node = document.querySelector("[data-status-text]");
  if (node) {
    node.textContent = text;
  }
}

function setLoading(panel, loading) {
  panel.classList.toggle("ai-loading", loading);
}

function overlapRatio(a, b) {
  const tokensA = a.split(/[^a-zA-Z0-9_\u4e00-\u9fa5]+/).filter(Boolean);
  if (tokensA.length === 0) {
    return 0;
  }
  let hits = 0;
  for (const token of tokensA) {
    if (b.includes(token)) {
      hits += 1;
    }
  }
  return hits / tokensA.length;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
