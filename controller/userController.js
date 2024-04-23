const {User} = require('../model/index')
const {createToken} = require('../util/jwt')

// 用户注册
exports.register = async (req,res) => {
  const userModel = new User(req.body)
  const dbBack = await userModel.save()
  let user = dbBack.toJSON()
  console.log(user)
  delete user.password
  res.status(201).json({
    user
  })
}

// 用户登录
exports.login = async (req,res) =>{
  // 客户端数据验证
  // 连接数据库查询
  let dbBack = await User.findOne(req.body)
  if(!dbBack){
    res.status(402).json({error:'邮箱或者密码不正确'})
  }
  dbBack = dbBack.toJSON()
  dbBack.token = await createToken(dbBack)

  res.status(200).json(dbBack)
}

exports.list =async (req,res) => {
  console.log(req.method)
  res.send('/video-list')
}

// 用户修改
exports.update = async (req,res) => {
  // res.send(req.user.userinfo._id)
  let id = req.user.userinfo._id
  let dbBack = await User.findByIdAndUpdate(id,req.body,{new:true})
  res.status(202).json({user:dbBack})
}

exports.delete = async (req,res) => {
  res.send('delete')
}