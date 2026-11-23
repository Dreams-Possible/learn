# Vite：开发服务器与构建工具

## 1. Vite 的作用

Vite 为前端项目提供开发服务器与生产构建能力。它负责让源码方便地运行、修改和发布，界面本身仍由 HTML、CSS、JavaScript 或 React、Vue 等技术描述。

| 能力 | 做什么 | 直观效果 |
| --- | --- | --- |
| 开发服务器 | 在本地通过 HTTP 提供页面和经过处理的模块 | 用终端给出的 `http://localhost:...` 地址打开项目 |
| 模块处理 | 配合相应插件，转换 JSX、Vue 单文件组件等源码 | 浏览器能运行项目中经过转换的代码 |
| 热更新 HMR | 修改源码后，尽可能只更新受影响的模块 | 保存代码后通常能直接看到变化，某些情况仍会整页刷新 |
| 生产构建 | 整理、转换、优化项目资源，默认输出到 `dist` | 得到可部署到网站服务器的文件 |

## 2. 创建与运行项目

先安装符合当前 Vite 和模板要求的 Node.js；npm 通常随 Node.js 一起安装。具体版本要求会变化，以官方指南和脚手架提示为准。

```sh
node --version
npm --version
```

这两条命令只查看已安装版本，不负责安装环境。

在打算放置项目的目录中执行，以下两个模板**按需要选一个**：

```sh
# React + JavaScript 项目
npm create vite@latest react-demo -- --template react

# Vue + JavaScript 项目
npm create vite@latest vue-demo -- --template vue
```

| 命令部分 | 含义 |
| --- | --- |
| `npm create vite@latest` | 获取并运行最新版 `create-vite` 项目生成工具 |
| `react-demo` / `vue-demo` | 新项目名称，也就是将创建的文件夹名称 |
| `--` | 分隔 npm 自己的参数与传给项目生成工具的参数 |
| `--template react` / `vue` | 选择对应的 JavaScript 模板；带 `-ts` 的模板使用 TypeScript |

**创建项目会生成一套新文件，不是给现有笔记目录自动升级框架。** 上述命令用于需要时另建示例项目，笔记本身不需要安装依赖。

以 React 项目为例，接着执行：

```sh
cd react-demo
npm install
npm run dev
```

- `cd`：进入项目目录。
- `npm install`：根据 `package.json` 等文件安装依赖。
- `npm run dev`：执行 `package.json` 中名为 `dev` 的脚本；Vite 模板通常用它启动开发服务器。

访问终端实际输出的地址。默认端口通常是 5173，端口被占用时可能改用其他端口。终端保持运行，按 `Ctrl+C` 停止服务。

## 3. 常见文件与启动关系

| 文件 / 目录 | 作用 |
| --- | --- |
| `index.html` | 网页入口，包含挂载容器和入口脚本引用；通常位于项目根目录 |
| `src/` | 组件、脚本、样式等项目源码 |
| `public/` | 需要按原样提供的静态文件，通常从网站根路径引用 |
| `package.json` | 项目依赖与脚本命令，例如 `dev`、`build` |
| `package-lock.json` | npm 的依赖锁文件，记录解析后的依赖版本，通常随项目提交 |
| `node_modules/` | 下载到本地的依赖，通常不提交到 Git |
| `vite.config.js` | Vite 配置，例如启用 React / Vue 插件；部分模板扩展名可能不同 |
| `dist/` | 构建输出，通常不手工修改 |

典型的客户端项目启动关系：

```text
index.html → src/main.jsx 或 src/main.js → App 组件 → 其他子组件
```

`index.html` 中的 `<script type="module" ...>` 表示以 JavaScript 模块方式加载入口，模块里可使用 `import` / `export` 组织代码。开发期间 Vite 会处理相关请求。

## 4. dev、build、preview 的区别

Vite 基础模板通常包含以下 npm 脚本，具体以项目的 `package.json` 为准：

| 命令 | 用途 | 结果 |
| --- | --- | --- |
| `npm run dev` | 开发时运行 | 启动开发服务器，便于修改和调试 |
| `npm run build` | 生成发布文件 | 默认输出 `dist/`，不会自动上传网站 |
| `npm run preview` | 本地检查构建产物 | 先执行构建，再启动本地预览服务；不是正式生产服务器 |

运行成功、构建成功和部署成功是不同的事：本地能打开页面，不等于已经发布到互联网；生成 `dist` 后仍需部署。

## 5. 参考资料

- [Vite：开始与项目模板](https://cn.vite.dev/guide/)
- [Vite：构建生产版本](https://cn.vite.dev/guide/build)
- [Vite：部署静态站点](https://cn.vite.dev/guide/static-deploy)
