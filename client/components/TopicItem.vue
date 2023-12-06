<template>
  <div class="topic-item">
    <div class="question">
      <div class="index">问题{{index + 1}}:</div>
      <div class="text">{{ topic.question }}</div>
    </div>
    <h3 class="tips" v-if="topic.tips">Tips: {{ topic.tips }}</h3>
    <button class="show-answer" @click="() => { showAnswer = true }">开估</button>
    <h1 class="answer" :class="{ 'on-show': showAnswer }">答案: {{ topic.answers[0] }}</h1>
  </div>
</template>

<script>
export default {
  props: ['topic', 'index'],
  data() {
    return {
      showAnswer: false,
    }
  }
}
</script>

<style lang="less">
.topic-item {
  padding: 30px;
  text-align: center;
  font-family: qiaruchujian;
  color: var(--maillard-1);

  .question {
    font-size: 36px;
    text-align: left;
    font-family: qiaruchujian;
    white-space: pre-wrap;
    margin: 0;
    margin-top: 30px;
    display: flex;
    .index {
      min-width: 4em;
      text-align: right;
      margin-right: 15px;
    }
  }

  .tips {
    font-size: 32px;
    margin: 15px 0;
  }

  .show-answer {
    appearance: none;
    font-family: qiaruchujian;
    font-size: 38px;
    border: none;
    border-radius: 8px;
    padding: 10px 30px;
    background-color: var(--maillard-1);
    outline: none;
    color: var(--maillard-7);
    &:active {
      opacity: 0.7;
    }
  }

  .answer {
    visibility: hidden;
    &.on-show {
      visibility: visible;
    }
  }
}
</style>