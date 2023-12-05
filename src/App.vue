<template>
  <div class="title"></div>
  <Topics />
</template>
<script>
import Topics from './components/Topics.vue'

export default {
  components: {
    Topics
  }
}
</script>

<style lang="less">
.title {
  width: 60vw;
  height: 120px;
  background-image: url(/src/assets/title.png);
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  top: 10px;
  z-index: 100;
}
</style>
