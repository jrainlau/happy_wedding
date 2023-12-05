<template>
  <div class="timer">
    {{ formatTime(remainingTime) }}
  </div>
</template>

<script>
import eventBus from '../eventBus'

export default {
  data() {
    return {
      remainingTime: 60,
      timer: null,
    }
  },
  mounted() {
    this.start()
    eventBus.on('TOUCH_MOVE', () => {
      this.pause()
    })
    eventBus.on('TOUCH_END', () => {
      setTimeout(() => {
        this.start()
      }, 1000);
    })
    eventBus.on('SLIDE_CHANGE', () => {
      this.reset()
    })
  },
  methods: {
    reset() {
      clearInterval(this.timer)
      this.remainingTime = 60
    },
    start() {
      clearInterval(this.timer)
      this.createTimer()
    },
    createTimer() {
      this.timer = setInterval(() => {
        this.remainingTime -= 0.01
        if (this.remainingTime <= 0) {
          this.remainingTime = 0
          clearInterval(this.timer)
        }
      }, 10);
    },
    pause() {
      clearInterval(this.timer)
    },
    formatTime(number) {
      let str = number.toFixed(2)
      const [decimal] = str.split('.')
      if (decimal.length === 1) {
        str = str.padStart(5, '0')
      }
      return str
    }
  }
}
</script>

<style lang="less">
.timer {
  font-family: qiaruchujian;
  font-size: 8rem;
  padding: 15px 0;
  color: var(--maillard-5);
  width: 300px;
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: var(--maillard-1);
}
</style>