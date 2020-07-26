//程式的入口
//載入所需套件
const express = require('express')
const mongoose = require('mongoose')

const app = express()

        //連線到 db 
mongoose.connect('mongodb://localhost/todo-list', {useNewUrlParser:true, useUnifiedTopology:true})

//取得 db 連線狀態參數
const db = mongoose.connection
db.on('error', () => { 
  console.log('mongodb error!')
})

//做完一次就會被移除
db.once('open', () => { 
  console.log('mongodb connected!')
})

app.get('/', (req, res) => { 
  res.send('hello world!')
})

app.listen(3000, () => { 
  console.log('App is running on http://localhost:3000.')
})