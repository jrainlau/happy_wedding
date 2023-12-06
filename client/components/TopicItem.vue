<template>
  <div class="topic-item">
    <h1 class="question">问题{{index + 1}}: {{ topic.question }}</h1>
    <h3 class="tips" v-if="topic.tips">Tips: {{ topic.tips }}</h3>
    <h1 class="answer">答案: {{ topic.answers }}</h1>
  </div>
</template>

<script>
export default {
  props: ['topic', 'index']
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