// 此脚本通过 defer 加载，执行时 HTML 元素已经解析完成。
let count = 0;

const countText = document.querySelector("#count");
const learnButton = document.querySelector("#learn-button");
const resetButton = document.querySelector("#reset-button");

function renderCount() {
  countText.textContent = String(count);
}

learnButton.addEventListener("click", () => {
  count += 1;
  renderCount();
});

resetButton.addEventListener("click", () => {
  count = 0;
  renderCount();
});
