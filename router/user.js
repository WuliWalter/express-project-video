const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const validator = require('../middleware/validator/userValidator')
const {vertifyToken} = require('../util/jwt')

const multer = require('multer')
const upload = multer({dest:'public/'})

router
.post('/registers',validator.register,userController.register)
.post('/logins',validator.login,userController.login)
.get('/lists',vertifyToken,userController.list)
.put('/',vertifyToken,validator.update,userController.update)
// single中传入请求文件名字段
.post('/headimg',vertifyToken,upload.single('headimg'),userController.headimg)
.delete('/',userController.delete)


module.exports = router