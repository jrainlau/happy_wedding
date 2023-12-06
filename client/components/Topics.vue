<template>
  <swiper
    :effect="'cards'"
    :grabCursor="true"
    :modules="modules"
    class="topics"
    @slideChange="onSlideChange"
    @touchMove="onTouchMove"
    @touchEnd="onTouchEnd"
  >
    <swiper-slide v-for="i in 20" :key="i">
      <TopicItem :index="i" />
    </swiper-slide>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

import TopicItem from './TopicItem.vue'
import eventBus from '../eventBus'

export default {
  components: {
    Swiper,
    SwiperSlide,
    TopicItem,
  },
  setup() {
    return {
      modules: [EffectCards],
      onSlideChange(s) {
        eventBus.emit('SLIDE_CHANGE')
      },
      onTouchMove() {
        eventBus.emit('TOUCH_MOVE')
      },
      onTouchEnd() {
        eventBus.emit('TOUCH_END')
      },
    };
  },
  methods: {
    
  }
};
</script>

<style lang="less">
.swiper {
  margin-top: 80px;
  width: calc(100vw - 400px);
  height: calc(100vh - 150px);
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
}

.swiper-slide:nth-child(1n) {
  background-color: var(--maillard-2);
}

.swiper-slide:nth-child(2n) {
  background-color: var(--maillard-3);
}

.swiper-slide:nth-child(3n) {
  background-color: var(--maillard-4);
}

.swiper-slide:nth-child(4n) {
  background-color: var(--maillard-5);
}

.swiper-slide:nth-child(5n) {
  background-color: var(--maillard-6);
}

</style>