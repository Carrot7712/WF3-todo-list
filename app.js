//程式的入口
//載入所需套件
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const Todo = require('./models/todo')

const app = express()

//連線到 db
mongoose.connect('mongodb://localhost/todo-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

//取得 db 連線狀態參數
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

//做完一次就會被移除
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  //拿到全部的 Todo 資料
  Todo.find()
    .lean()
    .then((todos) => res.render('index', { todos }))
    .catch((error) => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000.')
})
