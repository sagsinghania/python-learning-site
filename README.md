# Python Learning Site

一个适合零基础用户的 Python 学习静态站点，包含课程首页、核心命令与常用英文、系统学习总览，以及第一周 `Day 02` 到 `Day 07` 的章节页面。

## 页面结构

- `index.html`：课程首页
- `python_basics_words.html`：核心命令和常用英文
- `python_study.html`：系统学习总览与学习路线
- `day02_variables.html`：第 2 天，变量
- `day03_types.html`：第 3 天，数据类型
- `day04_input_output.html`：第 4 天，输入输出
- `day05_operators.html`：第 5 天，运算符
- `day06_if_else.html`：第 6 天，条件判断
- `day07_score_program.html`：第 7 天，成绩判断程序

## 本地预览

在项目目录执行：

```bash
python -m http.server 8765
```

然后打开：

```text
http://127.0.0.1:8765/
```

## GitHub Pages 部署

这个项目已经是纯静态 HTML 结构，可以直接部署到 GitHub Pages。

### 方式一：从仓库根目录发布

1. 新建一个 GitHub 仓库。
2. 把当前目录下所有文件上传到仓库根目录。
3. 打开 GitHub 仓库页面。
4. 进入 `Settings`。
5. 进入 `Pages`。
6. 在 `Build and deployment` 中选择：
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/ (root)`
7. 保存后等待 GitHub 完成发布。

发布成功后，访问地址通常为：

```text
https://你的用户名.github.io/仓库名/
```

### 首页与子页面地址

- 首页：`https://你的用户名.github.io/仓库名/`
- 学习总览：`https://你的用户名.github.io/仓库名/python_study.html`
- 第 2 天：`https://你的用户名.github.io/仓库名/day02_variables.html`

## 内容特点

- 纯静态页面，无需后端
- 可直接部署到 GitHub Pages
- 使用相对路径链接，适合本地预览和在线访问
- 已适配桌面和手机浏览

## 推荐学习顺序

1. 先看 `python_basics_words.html`
2. 再看 `python_study.html`
3. 然后按顺序学习 `day02` 到 `day07`
