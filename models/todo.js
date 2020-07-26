//定義一筆資料的最小單位
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name: {
    type: String,
    required:true
  }
})

module.exports = mongoose.model('Todo', todoSchema)
