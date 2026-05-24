# Python Learning Site

一个适合零基础用户的 Python 学习静态站点。当前版本已经包含：

- `Day 01` 到 `Day 30` 的正式学习页
- 统一的 `study_checkin.html` 打卡入口
- 每个 day 页面下方的 AI 练习模块
- 一个可单独部署的 Node AI 后端

## 结构

- `index.html`：课程首页
- `python_basics_words.html`：核心命令和常用英文
- `python_study.html`：学习总览与阶段入口
- `study_checkin.html`：30 天打卡总入口
- `day01_intro.html` 到 `day30_next_steps.html`：30 天正式学习页
- `ai-practice.mjs`：AI 练习前端脚本
- `server.mjs`：AI 后端与可选静态文件服务

## AI 练习怎么工作

前端不会直接请求模型，而是先请求后端：

- `GET /api/health`
- `POST /api/coach`

`/api/coach` 当前支持两个任务：

- `daily_practice_generate`
- `daily_practice_evaluate`

后端再转发到 OpenAI Responses API。这样做的好处是：

- 不需要把 API Key 暴露到浏览器
- 静态页和 AI 后端可以分开部署
- 本地和线上可以共用同一套接口

## 本地运行

### 只看静态页面

如果你只想预览页面，不需要 GPT：

```bash
python -m http.server 8765
```

然后打开：

```text
http://127.0.0.1:8765/
```

这种方式下 AI 练习面板仍然会显示，但只有本地 Demo fallback。

### 启用 GPT

如果你希望 AI 练习真正调用模型：

```bash
npm start
```

然后打开：

```text
http://127.0.0.1:3000/
```

后端会优先尝试读取本机已有的 Codex 配置：

- `C:\Users\Administrator\.codex\config.toml`
- `C:\Users\Administrator\.codex\auth.json`

如果这些配置不可用，就复制 `.env.example` 为 `.env`，再填写：

- `OPENAI_API_KEY`
- 可选 `OPENAI_BASE_URL`
- 可选 `OPENAI_MODEL`
- 可选 `OPENAI_REASONING_EFFORT`

## 独立部署后端

这一版后端已经支持“只跑 API，不托管静态页”。

只要设置：

```text
SERVE_STATIC=false
```

后端就会只保留 `/api/*` 接口，适合和 GitHub Pages、Netlify 之类的静态前端分开部署。

还可以通过下面这个变量限制跨域来源：

```text
ALLOWED_ORIGINS=https://yourname.github.io,https://your-domain.com
```

如果不设置，默认允许所有来源。

## 前端如何连接线上后端

AI 模块会按下面的优先级寻找后端地址：

1. URL 参数 `?ai_endpoint=...`
2. `window.__PYTHON_AI_CONFIG__.endpoint`
3. 页面里的 `<meta name="python-ai-endpoint" ...>`
4. 浏览器本地保存过的地址
5. 同源地址
6. `file://` 场景下回退到 `http://127.0.0.1:3000`

最直接的办法是：

- 打开任意 day 页面
- 展开“后端地址设置”
- 填入你的线上 API 地址

这个值会保存在当前浏览器的 `localStorage` 里，同一域名下的 day 页面都会复用。

如果你想通过链接直接指定后端，也可以这样打开：

```text
https://yourname.github.io/python-learning-site/day01_intro.html?ai_endpoint=https://your-api.example.com
```

## Render 部署

仓库里已经补了 `render.yaml`，可以直接作为 Node Web Service 部署。推荐至少设置这些环境变量：

- `OPENAI_API_KEY`
- `SERVE_STATIC=false`
- `ALLOWED_ORIGINS=https://yourname.github.io`

如果你把静态页也想一起托管在同一个 Node 服务上，可以把 `SERVE_STATIC=true`。

## GitHub Pages

这个仓库仍然可以继续部署到 GitHub Pages，但要区分两件事：

- 静态页面本身可以正常打开
- GPT 能力仍然需要单独可用的后端

也就是说：

- 没有后端时，AI 模块会显示，但只能走本地 Demo fallback
- 有后端时，填写后端地址后就能真正调用 GPT
