<template>
  <div class="topic-item">
    <h1 class="question">问题{{index}}: 你老婆个鞋码系几多？请用二进制回答</h1>
    <h3 class="tips">Tips: 可以用表格计数法！</h3>
    <h1 class="answer">答案: 1110</h1>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="less">
.topic-item {
  padding: 30px;
  text-align: center;
  font-family: qiaruchujian;
  color: var(--maillard-1)
}
</style>