# Vue：用模板和响应式数据组织界面

## 1. Vue 的基本思路

Vue 是用于构建用户界面的渐进式 JavaScript 框架。可以按需要逐步使用：给已有页面增加交互，或组织完整的组件化应用。这里记录 Vue 3 的组合式 API，使用 `<script setup>` 编写组件。

| 概念 | 含义 | 写法示意 |
| --- | --- | --- |
| 组件 | 可组合、可复用的一块界面及其逻辑 | `App.vue`、`Heading.vue` |
| 模板 template | 用接近 HTML 的写法描述界面，以及数据如何显示 | `<p>次数：{{ count }}</p>` |
| 响应式数据 | Vue 能追踪的数据，发生变化后用于更新相关界面 | `const count = ref(0)` |
| 指令 | Vue 模板中以 `v-` 开头、为元素附加行为的写法 | `v-if`、`v-for`、`v-model` |
| props | 父组件传给子组件的输入，子组件按只读数据使用 | `<Heading text="学习笔记" />` |

## 2. 创建项目与入口结构

Vue 官方提供 `create-vue`，生成的项目使用 Vite 构建：

```sh
npm create vue@latest
```

按提示把项目名称设为 `vue-demo`。这个命令会创建新目录，不是修改现有笔记。仅理解基础组件时，可以暂不启用 TypeScript、Router、Pinia、测试等可选能力；选项可能随脚手架版本变化。

```sh
cd vue-demo
npm install
npm run dev
```

前提是已安装满足当前 `create-vue` 要求的 Node.js，具体要求见官方快速上手页。创建工具、模板与 Vite 本身的最低要求可能不同。

另一种方式是 `npm create vite@latest vue-demo -- --template vue`，直接使用 Vite 的基础 Vue 模板。两种创建方式选一种即可。

典型启动关系：`index.html` 中的 `#app` 容器 → `src/main.js` → `src/App.vue`。

```js
// src/main.js 的最简入口示意
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```

`createApp(App)` 以 `App` 组件创建应用，`.mount("#app")` 把它挂载到 HTML 中 `id="app"` 的容器内。`#app` 是 CSS 选择器的写法，这里用于找到挂载位置。

## 3. 单文件组件与计数例子

`.vue` 文件称为单文件组件（SFC），把逻辑、模板和样式放在同一个文件里。创建项目后，把 `src/App.vue` 替换为：

```vue
<script setup>
import { ref } from "vue";

const count = ref(0);

function increase() {
  count.value += 1;
}
</script>

<template>
  <main>
    <h1>学习记录</h1>
    <p>次数：{{ count }}</p>
    <button type="button" @click="increase">记录一次</button>
  </main>
</template>

<style scoped>
button {
  cursor: pointer;
}
</style>
```

| 部分 | 在这里的作用 |
| --- | --- |
| `<script setup>` | 编写组件逻辑；这里声明的顶层变量和函数可以直接在模板中使用，是 Vue 的编译期写法 |
| `import { ref } from "vue"` | 从 Vue 包中按名称导入 `ref` |
| `ref(0)` | 创建一个初始值为 0 的响应式引用对象 |
| `const count` | 保存引用对象，不能重新赋值为另一个对象，但可以修改它的 `.value` |
| `count.value += 1` | 在 JavaScript 中修改引用对象保存的值，相当于把原值加 1 |
| `<template>` | 描述组件显示的内容 |
| `{{ count }}` | 文本插值，显示当前值；模板会自动解包这里的顶层 ref，不必写 `.value` |
| `@click="increase"` | 为按钮绑定点击事件，点击时调用 `increase` |
| `<style scoped>` | 组件样式，构建时会为选择器添加作用范围约束，减少对其他组件的影响 |

点击后的过程：**事件执行 → 修改 `count.value` → Vue 追踪变化 → 更新相关界面**。不需要自己找到段落再修改文字；刷新页面后这个内存状态恢复为 0。

`.vue` 不是浏览器直接运行的文件格式，需要 Vite 配合 Vue 插件转换，访问开发服务器提供的页面即可。

## 4. 模板里常见符号与指令

以下是独立语法示意，涉及的变量和函数需要在对应组件中定义。

| 写法 | 含义 | 示例 |
| --- | --- | --- |
| `{{ 表达式 }}` | 把值显示为文本，不作为 HTML 标签解析 | `<p>{{ count }}</p>` |
| `v-bind:属性`，简写 `:属性` | 把 HTML 属性绑定到 JavaScript 表达式的结果 | `<button :disabled="isSaving">保存</button>` |
| `v-on:事件`，简写 `@事件` | 给元素绑定事件处理函数 | `<button @click="save">保存</button>` |
| `v-if` | 条件为真时渲染元素，为假时移除 | `<p v-if="isSaving">保存中</p>` |
| `v-for` | 根据数组等数据重复生成元素 | `<li v-for="item in items" :key="item.id">{{ item.name }}</li>` |
| `v-model` | 将表单值与状态双向关联：数据变化更新输入框，用户输入更新数据 | `<input v-model="nickname">` |

**静态属性与动态属性：**`disabled="isSaving"` 不会读取变量；对布尔属性 `disabled` 而言，写上该属性就表示禁用。`:disabled="isSaving"` 才根据变量的真假决定是否禁用。

`@click` 是 `v-on:click` 的简写，与 CSS 的 `@media` 不同；`:disabled` 是 `v-bind:disabled` 的简写，与 CSS 的 `:disabled` 伪类也不同，要按所在语言判断含义。

`v-for` 的 `:key` 给每项提供稳定的唯一标识，帮助 Vue 在更新列表时识别对应项；这里使用数据自身的 `id`。

## 5. props：父组件向子组件传值

```vue
<!-- Heading.vue -->
<script setup>
const props = defineProps({ text: String });
</script>

<template>
  <h1>{{ props.text }}</h1>
</template>
```

`defineProps` 声明组件可接收的属性，这里声明 `text` 为字符串。它是 `<script setup>` 中的编译器宏，不需要手动从 Vue 导入。

父组件在 `<script setup>` 中通过 `import Heading from "./Heading.vue"` 导入后，就能在模板里写 `<Heading text="学习记录" />`。

props 用于接收父组件输入；组件自己的状态可用 `ref` 管理。需要让父组件修改数据时，通常通过组件事件通知父组件，而不是直接给 props 赋值。

## 6. 参考资料

- [Vue：简介](https://cn.vuejs.org/guide/introduction)
- [Vue：快速上手](https://cn.vuejs.org/guide/quick-start)
- [Vue：响应式基础](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals)
- [Vue：模板语法](https://cn.vuejs.org/guide/essentials/template-syntax)
- [Vue：组件 props](https://cn.vuejs.org/guide/components/props)
