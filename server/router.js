import express from 'express'
import {
  addTopic,
  editTopic,
  getTopics,
  deleteTopic,
} from './topics.js'

// 定义路由
const router = express.Router();

// 鉴权中间件
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (auth !== process.env.adminAuth) {
    // 返回 HTTP 401 状态码并包含错误提示
    return res.status(401).send('Unauthorized');
  }
  // 鉴权通过，继续后续处理
  next();
}

router.get('/test', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ msg: 'hello world, it\'s Happy Wedding server!' });
})

router.post('/add_topic', authMiddleware, async (req, res) => {
  const { topicId, question, type, tips, answers, timeLimit } = req.body
  const result = await addTopic({ topicId, question, type, tips, answers, timeLimit })
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(result);
})

router.post('/edit_topic', authMiddleware, async (req, res) => {
  const { _id, topicId, question, type, tips, answers, timeLimit } = req.body
  const result = await editTopic({ _id, topicId, question, type, tips, answers, timeLimit })
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(result);
})

router.post('/delete_topic', authMiddleware, async (req, res) => {
  const { id } = req.body
  const result = await deleteTopic(id)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(result);
})

router.post('/get_topics', async (req, res) => {
  const { topicId } = req.body
  const result = await getTopics(topicId)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(result);
})

export default router
