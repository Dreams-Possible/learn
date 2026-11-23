# React：用组件和状态描述界面

## 1. React 的基本思路

React 是构建用户界面的 JavaScript 库。把页面拆成组件，用数据描述每个组件当前应显示的内容，再通过状态更新驱动界面变化。

| 概念 | 含义 | 写法示意 |
| --- | --- | --- |
| 组件 Component | 一块可组合、可复用的界面，常用返回 JSX 的函数定义 | `function App() { ... }` |
| JSX | 在 JavaScript 中描述界面的语法扩展，看起来像 HTML | `<h1>学习笔记</h1>` |
| props | 父组件传给子组件的输入，在子组件中按只读数据使用 | `<Heading text="学习笔记" />` |
| state | 组件自己记住的数据，通过 React 提供的更新函数改变 | `useState(0)` |
| 事件处理 | 事件发生时执行函数，并按需要更新状态 | `<button onClick={increase}>记录</button>` |

## 2. 创建项目与入口结构

以下使用 Vite 的 JavaScript 模板，目的是理解 React 基础组件；更完整的项目还可能需要路由、数据获取等配套方案。

```sh
npm create vite@latest react-demo -- --template react
cd react-demo
npm install
npm run dev
```

`create` 生成项目，`install` 安装依赖，`run dev` 启动开发服务器。需要预先安装满足脚手架要求的 Node.js；访问终端输出的网址，不是双击 JSX 文件。

典型启动关系：`index.html` 中的 `#root` 容器 → `src/main.jsx` → `src/App.jsx`。

```jsx
// src/main.jsx 的最简入口示意
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
```

`import` 从包或文件导入功能；`createRoot` 把 React 与已有 DOM 容器连接，`render(<App />)` 在其中显示根组件。挂载容器来自 `index.html` 里的 `<div id="root"></div>`，不是 React 自动生成的标签。

## 3. 一个计数组件

创建项目后，把 `src/App.jsx` 的内容替换为：

```jsx
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount(current => current + 1);
  }

  return (
    <main>
      <h1>学习记录</h1>
      <p>次数：{count}</p>
      <button type="button" onClick={increase}>记录一次</button>
    </main>
  );
}
```

| 写法 | 在这里的作用 |
| --- | --- |
| `import { useState } from "react"` | 从 React 包导入状态 API；这里的花括号表示按名称导入 |
| `export default function App()` | 定义组件，并作为本文件的默认导出，供入口文件导入 |
| `useState(0)` | 声明一个状态，首次值为 0；它是 React 的 Hook，一类用于接入 React 能力的函数 |
| `[count, setCount]` | JavaScript 的数组解构：分别取出当前状态值和更新函数 |
| `setCount(current => current + 1)` | 根据待更新的状态计算下一值；箭头函数接收当前待处理值并返回加 1 的结果 |
| `return (...)` | 返回组件的界面描述；小括号便于把 JSX 分成多行 |
| `{count}` | 在 JSX 中插入 JavaScript 表达式的结果，这里显示当前次数 |
| `onClick={increase}` | 把函数交给 React，点击后再执行；若写成 `{increase()}` 则会在渲染时直接调用 |

点击后的过程：**事件执行 → 调用 `setCount` → React 再次运行组件函数 → 按新状态更新界面**。状态由 React 保留，不会因为组件函数再次运行就重置为 0；刷新页面后则会重新开始。

`setCount` 是请求一次状态更新，不是立刻修改当前函数里的 `count` 变量。普通 `let count = 0` 不会提供这种状态保留与更新机制。`useState` 应放在组件顶层，不放在条件分支、循环或事件回调里调用。

## 4. JSX 与 HTML 的几个区别

JSX 需要经过工具转换，它不是 HTML 字符串，也不是浏览器直接认识的新标签语言。

| 场景 | JSX 写法 | 说明 |
| --- | --- | --- |
| 设置 CSS 类 | `<p className="intro">正文</p>` | 使用 `className`，外观仍由 CSS 决定 |
| 动态内容 | `<p>{count}</p>` | 花括号内写 JavaScript 表达式 |
| 事件 | `<button onClick={increase}>记录</button>` | 事件名使用 `onClick` 这样的驼峰写法 |
| 自定义组件 | `<Heading text="笔记" />` | 组件名以大写字母开头，小写名称用于内置标签 |
| 闭合标签 | `<input type="text" />` | JSX 中包括 `input` 在内的标签都要闭合 |

组件返回的多个同级元素需要有一个共同外层，也可以用不生成额外 DOM 元素的 `<>...</>` 包起来。JSX 里的 `{}` 不是 CSS 声明块，而是切换到 JavaScript 表达式。

## 5. props：给子组件传入内容

```jsx
function Heading(props) {
  return <h1>{props.text}</h1>;
}

// 在父组件的 JSX 中使用：
// <Heading text="学习记录" />
```

父组件通过 `text="学习记录"` 传入数据，子组件通过参数 `props` 的 `text` 属性读取。传数字或变量时用花括号，例如 `<Heading text={pageTitle} />`，其中 `pageTitle` 必须已经定义。

**props 是外部输入，state 是组件自己管理的状态。** 子组件不直接修改 props；需要通知父组件时，可以由父组件传入一个回调函数。

## 6. 参考资料

- [React：快速入门](https://zh-hans.react.dev/learn)
- [React：从零开始构建应用](https://zh-hans.react.dev/learn/build-a-react-app-from-scratch)
- [React：useState](https://zh-hans.react.dev/reference/react/useState)
