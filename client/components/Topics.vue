<template>
  <swiper
    ref="mySwiper"
    :effect="'cards'"
    :grabCursor="true"
    :modules="modules"
    class="topics"
    @swiper="(s) => { swiper = s }"
    @slideChange="onSlideChange"
    @touchMove="onTouchMove"
    @touchEnd="onTouchEnd"
  >
    <template v-if="isEditMode">
      <swiper-slide v-for="(topic) in topics" :key="topic._id">
        <Editor :topic="topic" :allow-create-new="topics.every(t => !!t._id)" />
      </swiper-slide>
    </template>
    <template v-else>
      <swiper-slide v-for="(topic, index) in topics" :key="topic._id">
        <TopicItem :topic="topic" :index="index" />
      </swiper-slide>
    </template>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

import TopicItem from './TopicItem.vue'
import Editor from './Editor.vue'
import eventBus from '../eventBus'
import postApi from '../request'

import { useSetup } from '../setup'

export default {
  components: {
    Swiper,
    SwiperSlide,
    TopicItem,
    Editor,
  },
  setup() {
    return {
      ...useSetup(),
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
  data() {
    return {
      swiper: null,
      topics: [],
    }
  },
  async mounted() {
    await this.getTopics()
    eventBus.on('CREATE_NEW', () => {
      this.topics.unshift({
        _id: '',
        topicId: this.topicId,
        question: '',
        type: 0,
        tips: '',
        answers: [''],
        timeLimit: 60 * 1000,
      })

      this.swiper.slideTo(0)
    })
    eventBus.on('REFRESH_TOPICS', () => {
      this.getTopics()
    })
  },
  methods: {
    async getTopics() {
      const res = await postApi('/get_topics', {
        topicId: this.topicId
      })
      if (res.code === 0) {
        this.topics = res.data
      }
    }
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