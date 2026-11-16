# HTML 入门：页面的内容与结构

## 1. HTML 是什么

HTML 是一种标记语言，用元素描述“这段内容是什么”。例如 `h1` 表示一级标题，`p` 表示段落，`a` 表示链接。它本身不负责复杂的程序逻辑。

```html
<p class="intro">我正在学习 Web。</p>
```

- `<p>` 是开始标签，`</p>` 是结束标签，两者之间是内容。
- 标签、属性和内容一起构成这个 HTML 元素。
- `class="intro"` 是属性，可供 CSS 选择元素，也可以供 JavaScript 使用。
- `img`、`input` 等是空元素，不包含子内容，也不需要结束标签。

元素可以嵌套，但要合理闭合：`<p>学习 <strong>HTML</strong></p>`。不要把标题等块级结构放进 `p` 中；浏览器可能自动修正文档，导致解析结果与源码不同。

## 2. 一个完整页面的骨架

HTML 文件使用 UTF-8 编码，基本结构如下：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <title>我的第一个网页</title>
  </head>
  <body>
    <h1>我的学习笔记</h1>
    <p>今天开始学习 HTML。</p>
    <a href="https://www.runoob.com/">去菜鸟教程学习</a>
  </body>
</html>
```

| 部分 | 作用 |
| --- | --- |
| `<!doctype html>` | 让浏览器使用标准模式解析页面 |
| `html lang="zh-CN"` | 根元素，并声明页面主要语言为简体中文 |
| `head` | 存放标题、编码、资源引用等元信息 |
| `meta` | 提供页面的元数据，例如字符编码、页面描述，供浏览器或搜索引擎等读取 |
| `title` | 浏览器标签页标题 |
| `body` | 页面展示的主要内容 |

### meta：描述页面本身的信息

`meta` 放在 `head` 中，用于提供页面的元数据，也就是“关于页面的信息”，不直接显示为正文内容。

```html
<meta charset="UTF-8">
<meta name="description" content="记录 HTML、CSS 和 JavaScript 的学习笔记">
```

- `charset="UTF-8"`：声明页面的字符编码，帮助浏览器正确解读文字；文件本身也应保存为 UTF-8。
- `name="description"`：表示这是一条页面描述，`content` 是描述的具体内容，可供搜索引擎等读取。

## 3. 常用元素与属性

同类元素分开看，重点记住各自表达的含义：

| 用途 | 元素 | 作用与区别 | 示例 |
| --- | --- | --- | --- |
| 标题 | `h1` ～ `h6` | 从一级到六级，表达内容层级；字号由 CSS 控制 | `<h1>Web 笔记</h1><h2>HTML</h2>` |
| 段落 | `p` | 一段完整文本，浏览器默认按段落换行 | `<p>今天学习 HTML。</p>` |
| 重要内容 | `strong` | 表示内容重要，默认通常加粗 | `<strong>请先保存文件</strong>` |
| 语气强调 | `em` | 强调语气，默认通常斜体；与 `strong` 的重要性含义不同 | `<p>我说的是<em>今天</em>。</p>` |
| 链接 | `a` | 用 `href` 指定跳转地址，也能用 `#id` 跳到页内位置 | `<a href="https://example.com/">访问网站</a>` |
| 图片 | `img` | `src` 指定图片路径，`alt` 描述图片内容；纯装饰图片用空 `alt` | `<img src="cat.jpg" alt="一只橘猫">` |
| 无序列表 | `ul` | 列表项不强调先后顺序，默认显示项目符号 | `<ul><li>HTML</li><li>CSS</li></ul>` |
| 有序列表 | `ol` | 列表项有顺序含义，默认显示编号 | `<ol><li>保存</li><li>刷新</li></ol>` |
| 列表项 | `li` | 表示列表中的一项，放在 `ul` 或 `ol` 内 | `<li>学习 JavaScript</li>` |
| 页头 / 区域头部 | `header` | 放标题、标识、介绍等；也可以作为某个内容区域的头部 | `<header><h1>学习笔记</h1></header>` |
| 导航区 | `nav` | 放主要导航链接，不必把所有链接都包在其中 | `<nav><a href="/">首页</a></nav>` |
| 主内容区 | `main` | 页面主体内容，通常只有一个可见的 `main` | `<main><h1>HTML 笔记</h1></main>` |
| 页脚 / 区域尾部 | `footer` | 放版权、作者、相关信息等；也可以属于某个内容区域 | `<footer>作者：Mathrix</footer>` |
| 通用块容器 | `div` | 没有特殊语义，默认独占一行，常用于分组或布局 | `<div class="actions">按钮区域</div>` |
| 通用行内容器 | `span` | 没有特殊语义，默认不另起一行，常标记文本的一部分 | `<p>次数：<span id="count">0</span></p>` |
| 操作按钮 | `button` | 触发操作；`type="button"` 为普通按钮，`type="submit"` 用于提交表单 | `<button type="button">打招呼</button>` |
| 表单 | `form` | 组织待提交的控件；`action` 指定提交地址，`method` 指定提交方式 | `<form action="/search" method="get">...</form>` |
| 控件标签 | `label` | 说明输入项含义，用 `for` 关联控件的 `id` | `<label for="nickname">昵称</label>` |
| 输入控件 | `input` | 用 `type` 决定输入形式，如 `text` 文本、`checkbox` 复选框、`radio` 单选框 | `<input id="nickname" name="nickname" type="text">` |

“独占一行”“行内显示”是默认样式，CSS 可以改变显示方式；`header`、`nav` 等语义元素本身不会自动生成布局或功能。

### 表单示例：标签、输入框和按钮怎么配合

```html
<label for="nickname">昵称</label>
<input id="nickname" name="nickname" type="text" placeholder="请输入昵称">
<button type="button">打招呼</button>
```

页面会显示“昵称”文字、一个单行文本框和一个“打招呼”按钮。

| 写法 | 在这个例子里的作用 |
| --- | --- |
| `<label ...>昵称</label>` | 给输入框一个可读的名称，告诉用户这里填写什么 |
| `for="nickname"` | 找到 `id="nickname"` 的输入框；点击“昵称”文字也能聚焦该输入框 |
| `id="nickname"` | 输入框在文档中的唯一标识，供 `label` 关联，也可供 CSS、JavaScript 定位 |
| `name="nickname"` | 表单提交时的数据字段名，例如输入 Mathrix 后可形成 `nickname=Mathrix`；不是用来关联 `label` 的 |
| `type="text"` | 让 `input` 显示为单行文本输入框 |
| `placeholder="请输入昵称"` | 输入框为空时显示的提示，输入后消失，不能代替一直可见的 `label` |
| `type="button"` | 普通按钮，不自动提交表单；“打招呼”只是按钮文字，具体行为需要 JavaScript 实现 |

这段代码没有 `form`，也没有绑定事件，所以不会提交数据或自动打招呼。若要提交，需要把控件放入表单（或显式关联表单），并设置提交按钮；`name` 才会作为对应字段名参与提交。

### id 与 class：定位单个元素和一组元素

```html
<p id="summary" class="note important">学习摘要</p>
<p class="note">另一条笔记</p>
```

`id` 在同一文档中应唯一；`class` 可以复用，一个元素可以有多个类名，用空格分隔。CSS 中用 `#summary` 选中这个 ID，用 `.note` 选中所有带该类名的元素。

## 4. 理解相对路径

普通 HTML 中，未设置 `base` 时，相对资源路径按当前文档 URL 解析。本仓库的 [index.html](index.html) 使用：

```html
<link rel="stylesheet" href="../CSS/style.css">
<script src="../JavaScript/main.js" defer></script>
```

- `./` 表示当前目录，`../` 表示上一级目录。
- 从 `HTML/index.html` 出发，先回到 `Web技术`，再进入 `CSS` 或 `JavaScript`。
- `defer` 让外部经典脚本在 HTML 解析完成后执行，方便脚本找到页面元素。
- 路径要保留 `CSS`、`JavaScript` 的大小写；部分部署环境区分大小写。

不要把本机的 `C:\...` 绝对路径写进网页，否则换台电脑后资源就找不到了。

## 5. 参考资料

- [菜鸟教程：HTML 教程](https://www.runoob.com/html/html-tutorial.html)
- [MDN：HTML 基础——创建内容](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content)
