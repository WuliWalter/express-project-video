const mongoose = require('mongoose')
const md5 = require('../util/md5')
const baseModel = require('./baseModel')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },  
  password: {
    type: String,
    required: true,
    set: value => md5(value),
    select: false
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: null
  },
  cover:{
    type:String,
    default:null
  },
  channeldes:{
    type: String,
    default: null
  },
  ...baseModel
})

module.exports = userSchema