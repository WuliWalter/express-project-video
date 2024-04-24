const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const router = require('./router')

const app = express()

// 处理静态资源
app.use(express.static('public'))

// 格式解析中间件
app.use(express.json())
app.use(express.urlencoded())

// 处理跨域中间件
app.use(cors())

// 日志中间件,dev:开发模式下记录日志
app.use(morgan('dev'))

// 路由
app.use('/api/v1',router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
