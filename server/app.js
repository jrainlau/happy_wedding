import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import router from './router.js'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express();
app.use(cors()); // 允许跨域请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.join(__dirname, '../dist')))

app.use('/api', router);

const { mongoUsername, mongoPassword, adminAuth } = process.env

// 数据库连接字符串（请将 <user> 和 <password> 替换为实际的用户名和密码）
const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@vedgy.nkpqlht.mongodb.net/happyWedding?retryWrites=true&w=majority`

// 配置选项
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// 连接数据库
mongoose.connect(uri, options)
  .then(async () => {
    console.log('成功连接到 MongoDB 数据库')

    // 启动服务器
    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`, {
        mongoUsername,
        mongoPassword,
        adminAuth
      });
    });
  })
  .catch(error => console.error('连接到 MongoDB 数据库失败：', error));
