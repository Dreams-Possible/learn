# JavaScript 入门：让页面响应操作

## 1. JavaScript 是什么

JavaScript 是编程语言，可以保存数据、执行计算、判断条件、组织逻辑。在浏览器中，它还能借助浏览器提供的 DOM、事件等 API 操作页面。JavaScript 与 Java 是不同的语言。

打开浏览器开发者工具的 Console，输入下面代码并回车：

```js
console.log("你好，Web！");
```

它把信息打印到控制台，不会自动显示在网页正文中。

## 2. 变量与数据类型

```js
const learner = "Mathrix"; // 字符串；const 声明的绑定不能重新赋值
let count = 0;             // 数字；let 允许重新赋值
const isLearning = true;   // 布尔值
const topics = ["HTML", "CSS", "JavaScript"]; // 数组
const note = { title: "Web 入门", finished: false }; // 对象

count = count + 1;
topics.push("HTTP"); // const 数组的内容仍可修改
console.log(learner, count, note.title);
```

初学时优先用 `const`，确实需要重新赋值时用 `let`。`null` 表示显式的空值；`undefined` 常见于尚未赋值的变量或不存在的对象属性。

注意数字与字符串的区别：

```js
console.log(1 + 2);           // 3
console.log("1" + 2);         // "12"，字符串拼接
console.log(Number("1") + 2); // 3，显式转换后计算
console.log(1 === "1");       // false，严格相等不做隐式类型转换
```

`=` 是赋值，`===` 才是这里使用的比较运算符。输入框的 `.value` 通常是字符串，参与运算前要根据需求转换并检查；不能转换成数字的字符串可能得到 `NaN`。

## 3. 条件、循环与函数

以下代码可接在上一节变量声明之后运行：

```js
function describeProgress(times) {
  if (times > 0) {
    return `已记录 ${times} 次学习`; // 反引号中的模板字符串
  }
  return "从第一次学习开始吧";
}

for (const topic of topics) {
  console.log(`准备学习：${topic}`);
}

console.log(describeProgress(count));
```

函数把可复用的逻辑封装起来，参数接收输入，`return` 返回结果。`if` 根据条件选择执行路径，`for...of` 可以逐项遍历数组中的值。

在控制台重复粘贴同一段含 `let` / `const` 的声明，可能遇到“已声明”的错误；可以刷新页面后重试，或把代码写入独立脚本文件。

## 4. DOM 与事件

DOM（Document Object Model，文档对象模型）把页面表示成可由程序访问的对象树。`document` 和 `addEventListener` 等由浏览器环境提供，并不是所有 JavaScript 运行环境都有。

页面中有以下元素时：

```html
<p>学习次数：<span id="count">0</span></p>
<button id="learn-button" type="button">记录一次学习</button>
```

可以在 HTML 解析完成后执行：

```js
let count = 0;
const countText = document.querySelector("#count");
const learnButton = document.querySelector("#learn-button");

learnButton.addEventListener("click", () => {
  count += 1;
  countText.textContent = String(count);
});
```

执行顺序是：找到元素 → 注册点击回调 → 等待用户点击 → 更新变量 → 把最新值写回页面。`() => { ... }` 是箭头函数，这里作为事件触发后执行的回调。

仅修改变量不会自动更新普通 HTML 页面，需要显式更新 DOM。展示文本时使用 `textContent`；不要把不可信输入直接拼进 `innerHTML`。

## 5. 三种文件怎么配合

[HTML/index.html](../HTML/index.html) 用下面这行加载 [main.js](main.js)：

```html
<script src="../JavaScript/main.js" defer></script>
```

示例把更新显示的代码放进 `renderCount()` 函数，让“记录”和“重置”两个事件复用它。页面与脚本中的 `id` 必须一致。

HTML 提供元素，CSS 决定外观，JavaScript 监听事件并更新内容。这个例子把次数保存在内存变量中，刷新页面会重新执行脚本，次数回到 0。

## 6. 参考资料

- [菜鸟教程：JavaScript 教程](https://www.runoob.com/js/js-tutorial.html)
- [MDN：JavaScript 基础](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Getting_started/Your_first_website/Adding_interactivity)
