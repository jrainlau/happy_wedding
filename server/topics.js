import mongoose from 'mongoose'

const TopicSchema = new mongoose.Schema({
  topicId: Number,
  question: String, // 问题
  type: {
    type: Number,
    enum: [0, 1, 2]
  }, // 类型，可选 0-填空题，1-选择题，2-判断题
  tips: String, // 提示
  answers: {
    type: [String]
  }, // 答案，类型不限
  timeLimit: Number,
  createTime: Number,
})

const Topic = mongoose.model('Topic', TopicSchema)

export async function addTopic({ topicId, question, type, tips, answers, timeLimit }) {
  const topic = new Topic({ topicId, question, type, tips, answers, timeLimit, createTime: Date.now() })
  const res = await Topic.create(topic).catch(e => e)
  return {
    code: 0,
    data: res
  }
}

export async function getTopics(topicId) {
  const res = await Topic.find({ topicId }).catch(e => e)
  if (res) {
    return {
      code: 0,
      data: res
    }
  } else {
    return {
      code: -1,
      error: `Cannot find topic.`
    }
  }
}

export async function editTopic({ _id, topicId, question, type, tips, answers, timeLimit }) {
  const topic = await Topic.findOne({ _id }).catch(e => e)

  if (!topic._id) {
    return {
      code: -1,
      error: topic,
    }
  }
  topic.topicId = topicId
  topic.question = question
  topic.type = type
  topic.tips = tips
  topic.answers = answers
  topic.timeLimit = timeLimit

  const saveRes = await topic.save().catch(e => e)

  return {
    code: 0,
    data: saveRes,
  }
}

export async function deleteTopic(_id) {
  const res = await Topic.deleteOne({ _id }).catch(e => e)
  if (res) {
    return {
      code: 0,
      data: res
    }
  } else {
    return {
      code: -1,
      error: 'delete error'
    }
  }
}
