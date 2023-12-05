<template>
  <h1 class="title" :class="{'is-touching': isTouching}">Happy Wedding</h1>
  <Topics />
  <div class="figure-0" :class="{'is-touching': isTouching}"></div>
  <div class="figure-1" :class="{'is-touching': isTouching}"></div>
  <div class="figure-2" :class="{'is-touching': isTouching}"></div>
  <Timer :class="{'is-touching': isTouching}" />
</template>
<script>
import Topics from './components/Topics.vue'
import Timer from './components/Timer.vue'

import eventBus from './eventBus'

export default {
  components: {
    Topics,
    Timer,
  },
  data() {
    return {
      isTouching: false,
    }
  },
  mounted() {
    eventBus.on('TOUCH_MOVE', () => {
      this.isTouching = true
    })
    eventBus.on('TOUCH_END', () => {
      this.isTouching = false
    })
  }
}
</script>

<style lang="less">
* {
  transition: all .3s linear;
}
.title {
  position: absolute;
  top: -30px;
  z-index: 100;
  font-family: qiaruchujian;
  font-size: 8rem;
  margin: 0;
  color: var(--maillard-4);
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: var(--maillard-1);
  &.is-touching {
    transform: translateY(-10px);
  }
}

.timer {
  position: absolute;
  z-index: 10;
  right: 0;
  bottom: 0;
  &.is-touching {
    transform: translate(10px, 10px);
  }
}

.figure-0 {
  background-image: url(/src/assets/img-3.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: left top;
  width: 200px;
  height: 200px;
  position: absolute;
  z-index: 10;
  left: 30px;
  top: 80px;
  transform: rotate(-25deg);
  &.is-touching {
    transform: rotate(-35deg);
  }
}

.figure-1 {
  background-image: url(/src/assets/img-4.png);
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: left bottom;
  width: 400px;
  height: 300px;
  position: absolute;
  z-index: 10;
  left: 10px;
  bottom: 0px;
  &.is-touching {
    transform: translate(-10px, 10px);
  }
}

.figure-2 {
  background-image: url(/src/assets/img-5.png);
  background-size: 90%;
  background-repeat: no-repeat;
  background-position: right top;
  width: 450px;
  height: 200px;
  position: absolute;
  z-index: 10;
  right: 10px;
  top: 0;
  &.is-touching {
    transform: translate(10px, -10px);
  }
}
</style>
