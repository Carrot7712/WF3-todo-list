//程式的入口
//載入所需套件
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser= require('body-parser')

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

//每一筆請求都需要通過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  //拿到全部的 Todo 資料
  Todo.find()
    .lean()
    .then((todos) => res.render('index', { todos }))
    .catch((error) => console.log(error))
})

//設定新增頁面的路由
app.get('/todos/new', (req, res) => {
  //請 view 引擎去拿 new 樣板
  return res.render('new')
})

// 來接住表單資料，並且把資料送往資料庫
app.post('/todos', (req, res) => {
  //截取傳過來的東西
  const name = req.body.name

  //一筆資料，目前只存在伺服器端
  const todo = new Todo({
    name,
  })

  //存回資料庫
  return todo
    .save()
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

app.get('/todos/:id', (req, res) => { 
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error=>console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000.')
})
