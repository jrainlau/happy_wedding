<template>
  <ul class="editor">
    <li class="edit-item">
      <div class="label">题目</div>
      <textarea rows="4" class="input" v-model="question"></textarea>
    </li>

    <li class="edit-item">
      <div class="label">类型</div>
      <span class="select-type" :class="{'active': type === 0}" @click="() => { type = 0 }">填空题</span>
      <span class="select-type" :class="{'active': type === 1}" @click="() => { type = 1 }">单选题</span>
      <span class="select-type" :class="{'active': type === 2}" @click="() => { type = 2 }">判断题</span>
    </li>

    <li class="edit-item">
      <div class="label">提示</div>
      <input type="text" class="input" v-model="tips" :placeholder="type === 1 ? '单选题请把正确答案写呢度' : '随便写啲乜'">
    </li>

    <li class="edit-item">
      <div class="label">答案</div>
      <input v-if="type === 0" type="text" class="input" v-model="answers[0]">
      <div class="answers-wrapper" v-if="type === 1">
        <input type="text" class="input" v-model="answers[0]" placeholder="选项 A">
        <input type="text" class="input" v-model="answers[1]" placeholder="选项 B">
        <input type="text" class="input" v-model="answers[2]" placeholder="选项 C">
        <input type="text" class="input" v-model="answers[3]" placeholder="选项 D">
      </div>
      <div class="answers-wrapper" v-if="type === 2">
        <input type="text" class="input" v-model="answers[0]" placeholder="写“对”或者“错”">
      </div>
    </li>

    <!-- <li class="edit-item">
      <div class="label">时间限制</div>
      <input type="number" class="input" v-model="timeLimit">
    </li> -->

    <li class="edit-item">
      <div class="label"></div>
      <button v-if="!isCreatingNew && allowCreateNew" class="create" @click="createNew">新建</button>
      <button class="confirm" @click="onConfirm">提交</button>
      <button v-if="!isCreatingNew" class="delete" @click="deleteTopicInfo">删除</button>
    </li>
  </ul>
</template>

<script>
import postApi from '../request'
import eventBus from '../eventBus'

export default {
  props: ['topic', 'allowCreateNew'],
  data() {
    return {
      _id: '',
      topicId: '',
      question: '',
      type: 0,
      tips: '',
      answers: [''],
      timeLimit: 60,
      isCreatingNew: false,
    }
  },
  created() {
    this.initTopicInfo()
  },
  watch: {
    type() {
      this.answers = ['']
    }
  },
  methods: {
    initTopicInfo() {
      const { _id, topicId, question, type, tips, answers, timeLimit } = this.topic
      this._id = _id
      this.topicId = topicId
      this.question = question
      this.type = type
      this.tips = tips
      this.answers = answers
      this.timeLimit = timeLimit / 1000

      this.isCreatingNew = !_id
    },
    createNew() {
      eventBus.emit('CREATE_NEW')
    },
    async editTopicInfo() {
      const res = await postApi('/edit_topic', {
        _id: this._id,
        topicId: this.topicId,
        question: this.question,
        type: this.type,
        tips: this.tips,
        answers: this.answers,
        timeLimit: this.timeLimit * 1000,
      })
      if (res.code === 0) {
        console.log(res)
        alert('掂嗮！')
        eventBus.emit('REFRESH_TOPICS')
      }
    },
    async deleteTopicInfo() {
      const res = await postApi('/delete_topic', {
        id: this._id,
      })
      if (res.code === 0) {
        console.log(res)
        alert('掂嗮！')
        eventBus.emit('REFRESH_TOPICS')
      }
    },
    async addTopicInfo() {
      const res = await postApi('/add_topic', {
        topicId: this.topicId,
        question: this.question,
        type: this.type,
        tips: this.tips,
        answers: this.answers,
        timeLimit: this.timeLimit * 1000,
      })
      if (res.code === 0) {
        console.log(res)
        alert('掂嗮！')
        eventBus.emit('REFRESH_TOPICS')
      }
    },
    onConfirm() {
      if (!this.question) {
        alert('题目都冇，提交唔到喔')
        return
      }
      if (this.answers.every(answer => !answer)) {
        alert('答案都冇，提交唔到喔')
        return
      }
      if (this.isCreatingNew) {
        this.addTopicInfo()
      } else {
        this.editTopicInfo()
      }
    }
  }
}
</script>

<style lang="less">
.editor {
  padding: 0;
  list-style: none;
  font-size: 36px;
  * {
    font-family: qiaruchujian;
  }
  .edit-item {
    display: flex;
    margin-bottom: 15px;
    .label {
      width: 8em;
      text-align: right;
      margin-right: 15px;
    }
    .input {
      appearance: none;
      border: none;
      border-radius: 8px;
      padding: 5px 10px;
      outline: none;
      font-size: 24px;
      width: 20em;
      resize: none;
    }

    .select-type {
      margin-right: 15px;
      width: 5em;
      &::before {
        content: '【';
        color: transparent;
      }
      &::after {
        content: '】';
        color: transparent;
      }
    }
    .select-type.active {
      color: #fff;
      &::before {
        content: '【';
        color: #fff;
      }
      &::after {
        content: '】';
        color: #fff;
      }
    }
    input[type='radio'] {
      // visibility: hidden;
      position: absolute;
    }

    .answers-wrapper {
      display: flex;
      flex-direction: column;
      .input {
        margin-bottom: 5px;
      }
    }

    .create,
    .confirm,
    .delete {
      appearance: none;
      border: 2px solid var(--maillard-1);
      padding: 5px 30px;
      margin-right: 15px;
      font-size: 32px;
      border-radius: 8px;
      transition: all 0.1s linear;
      &:active {
        opacity: 0.7;
      }
    }

    .create {
      background-color: #fff;
    }

    .confirm {
      background-color: var(--maillard-1);
    }

    .delete {
      margin-left: 45px;
      background-color: red;
      color: var(--maillard-1);
    }
  }
}
</style>