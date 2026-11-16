# CSS 入门：页面的样式与布局

## 1. CSS 是什么

CSS 是样式表语言，用来描述 HTML 元素如何显示，例如颜色、字体、尺寸、间距和布局。同一个 HTML 页面可以通过不同 CSS 呈现不同外观。

```css
p {
  color: #334155;
  line-height: 1.7;
}
```

`p` 是选择器，花括号内是声明；每条声明由属性和值组成。这里选中所有段落，设置文字颜色和行高。

## 2. 如何引入样式

| 方式 | 示例 | 使用场景 |
| --- | --- | --- |
| 外部样式表 | `<link rel="stylesheet" href="../CSS/style.css">` | 常用方式，便于多个页面复用 |
| 页面内样式 | `<style>p { color: blue; }</style>` | 在 HTML 的 `head` 中编写小例子 |
| 行内样式 | `<p style="color: blue;">内容</p>` | 临时尝试；大量使用会增加维护难度 |

本仓库使用外部样式表：[style.css](style.css)。修改它并刷新 [示例页面](../HTML/index.html)，即可观察效果。

## 3. 选择器与层叠

```css
p { color: #334155; }                 /* 元素选择器 */
.intro { font-size: 1.1rem; }         /* 类选择器，对应 class="intro" */
#count { font-weight: bold; }         /* ID 选择器，对应 id="count" */
.actions button { cursor: pointer; } /* 后代选择器 */
button:hover { background: #e2e8f0; } /* 鼠标悬停状态 */
```

### 后代选择器：选中某个元素里面的指定元素

`.actions button` 中间的**空格**表示后代关系：找到带有 `actions` 类的元素，再选中它内部所有的 `button`，不论中间嵌套了多少层。

```html
<div class="actions">
  <button>记录</button>            <!-- 会被选中：直接位于 actions 内 -->
  <div>
    <button>重置</button>          <!-- 也会被选中：隔了一层 div -->
  </div>
</div>
<button>其他操作</button>          <!-- 不会被选中：位于 actions 外 -->
```

```css
.actions button { cursor: pointer; }
```

这条规则让前两个按钮在鼠标悬停时显示手形指针，选中的是按钮，不是外层 `.actions` 容器。`cursor` 只控制指针外观，不会添加点击行为。

对照记忆：`.actions > button` 中的 `>` 表示**直接子元素**，在上例中只选中“记录”按钮。

### `:`：在选择器中引出伪类，筛选状态或条件

```css
button:hover {
  background: blue;
}
```

`button:hover` 可以拆成：`button` 指定按钮元素，`:hover` 限定“指针正悬停在它上面”。整个选择器表示“处于悬停状态的按钮”。移开指针后不再匹配这条规则，外观由其他适用样式决定。

**伪类**是以 `:` 开头、用来匹配元素状态或其他条件的选择器。名称和含义由 CSS 定义，不能随意编一个 `:某个状态` 就期望浏览器识别。

| 写法 | 匹配什么 | 示例 |
| --- | --- | --- |
| `:hover` | 指针悬停在元素上 | `button:hover { background: blue; }` |
| `:active` | 元素正在被激活，例如鼠标按住按钮期间 | `button:active { background: navy; }` |
| `:focus` | 元素获得焦点，例如通过点击或键盘 Tab 聚焦输入框 | `input:focus { outline: 2px solid blue; }` |
| `:focus-visible` | 元素获得焦点，且浏览器判断需要显示焦点提示，常见于键盘操作 | `button:focus-visible { outline: 2px solid blue; }` |
| `:disabled` | 支持禁用的控件已被禁用，例如带有 `disabled` 属性的按钮 | `button:disabled { opacity: 0.5; }` |
| `:checked` | 复选框或单选框已选中 | `input:checked { outline: 2px solid blue; }` |
| `:first-child` | 元素是父元素中的第一个子元素 | `li:first-child { font-weight: bold; }` |

所以不能一概记为“非默认状态”：`:first-child` 表达的是位置条件，控件也可能一开始就处于选中或禁用状态。

可以和前面的选择器组合，**冒号前不加空格**：

```css
.actions button:hover { background: blue; }
/* actions 容器内，当前被指针悬停的按钮 */
```

同一个元素也可以同时满足多个条件，例如 `button:hover:enabled` 表示“悬停且未被禁用的按钮”。

注意冒号所在的位置：`button:hover` 中的 `:` 引出伪类；`background: blue` 中的 `:` 则分隔属性名和值，两者用途不同。

### 层叠：多个规则同时匹配时用哪一个

多个规则可能同时作用于一个元素，这时浏览器按层叠规则决定结果。入门时，先在**来源、重要性和层叠层等条件相同**的前提下理解：

- ID 选择器的优先级高于类、属性和伪类选择器，后者又高于元素选择器。
- 优先级相同时，后出现的声明覆盖前面的同名声明。
- 字体、颜色等属性通常会继承；边距、边框等通常不会。

不能简单记成“最后写的一定生效”。用开发者工具查看被划掉的声明和最终计算值，比不断添加 `!important` 更容易找到原因。

## 4. 盒模型、尺寸与单位

一个元素的盒子从内到外包括：**内容 content → 内边距 padding → 边框 border → 外边距 margin**。

**margin 从边框的外沿向外算，padding 则在内容与边框之间。**

```text
外边距 margin
┌──────────── 边框 border ────────────┐
│             内边距 padding          │
│          ┌────────────────┐        │
│          │  内容 content  │        │
│          └────────────────┘        │
└────────────────────────────────────┘
外边距 margin
```

例如 `padding: 10px; border: 2px solid; margin: 20px;`：内容到边框内沿留 10px，边框本身厚 2px，边框外再留 20px。即使没画边框，仍有盒子的边界，外边距从那里向外计算。相邻块元素的上下外边距有时会合并，实际间隔不一定是两者相加。

### `*`：通配选择器

```css
* {
  box-sizing: border-box;
}
```

`*` 表示选中所有元素，所以这条规则把所有元素的盒模型设为 `border-box`，让设置的宽度包含内容、内边距和边框，计算尺寸更方便。`*` 负责“选谁”，花括号里的声明负责“怎么设置”。

### 尺寸与单位

```css
main {
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
  padding: 1.5rem;
}
```

- 默认 `content-box` 下，`width` 只包含内容宽度；`border-box` 下包含内容、内边距和边框，均不包含外边距。
- `max-width` 限制最大宽度；这里的 `margin: 0 auto` 让容器在有剩余水平空间时居中。
- `%` 的参考值取决于具体属性，不能一概理解成“父元素同名尺寸的百分比”。

| 单位 | 相对什么 | 示例 |
| --- | --- | --- |
| `px` | CSS 像素，不一定对应一个物理屏幕像素 | `border: 1px solid` 设置 1 CSS 像素的边框 |
| `rem` | 在普通样式声明中，相对根元素 `html` 的字号 | 根字号为 16px 时，`padding: 1.5rem` 等于 24px |
| `em` | 设置 `font-size` 时相对父元素字号；设置 `padding` 等多数其他属性时相对本元素字号 | 元素字号为 20px 时，`padding: 1em` 等于 20px |

`rem` 可以记作“根字号的倍数”。根字号为 16px 时，`1rem = 16px`、`2rem = 32px`；若根字号改为 20px，同样的 `2rem` 就是 40px。因此 **1rem 并不固定等于 16px**。字号、间距、宽度都可以使用它。

## 5. 用 Flex 排列按钮

```css
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}
```

Flex 适合沿一个主要方向排列内容。默认主轴为横向，`gap` 设置间隙，`flex-wrap` 允许空间不足时换行。`justify-content` 管主轴对齐，`align-items` 管交叉轴对齐；主轴方向会随 `flex-direction` 改变。

### `@media`：满足条件时才应用里面的样式

CSS 中，以 `@` 开头的特殊规则称为 **at-rule（@ 规则）**。这里要把 `@media` 看作一个完整写法，表示媒体查询，可以根据视口宽度等条件决定是否应用一组样式；不能省略 `@` 写成 `media (...)`。

```css
@media (max-width: 30rem) {
  .actions {
    flex-direction: column;
    align-items: stretch;
  }
}
```

| 部分 | 含义 |
| --- | --- |
| `@media` | 开始一条媒体查询规则 |
| `(max-width: 30rem)` | 条件：浏览器视口宽度不超过 30rem，包含恰好等于的情况；不是指 `.actions` 的宽度 |
| 外层 `{ ... }` | 包住满足条件时参与生效的 CSS 规则 |
| `.actions { ... }` | 选中带有 `actions` 类的容器并设置样式 |
| `flex-direction: column` | 在已有 Flex 布局基础上，让子元素沿纵向排列 |
| `align-items: stretch` | 在这里沿水平方向拉伸未设置固定宽度的子元素，按钮因而铺满容器可用宽度 |

这里有一个单位换算的区别：**媒体查询里的 `rem` 按浏览器初始字号计算，不跟随页面 CSS 对 `html` 字号的修改**。初始字号通常为 16px，此时 `30rem = 480px`；用户的字号设置可能改变这个基准。

所以这段代码可以读作：“视口宽度不超过约 480 CSS 像素时，把按钮从横排改为竖排，并横向拉伸。”视口变宽、条件不再满足时，这组声明不再参与生效，回到其他适用规则决定的布局。

## 6. 参考资料

- [菜鸟教程：CSS 教程](https://www.runoob.com/css/css-tutorial.html)
- [MDN：CSS 基础](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content)
- [MDN：后代选择器](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Descendant_combinator)
- [MDN：CSS 数值与单位](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units)
- [W3C：媒体查询中的单位](https://www.w3.org/TR/mediaqueries-5/#units)
