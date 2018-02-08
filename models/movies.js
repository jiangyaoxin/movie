//Schema函数进行编译，生成函数
var mongoose =require('mongoose')
var movieSchema = require('../schemas/movies')

//var db = mongoose.connect('mongodb://localhost/imooc') //连接数据库
var Movie = mongoose.model('Movies', movieSchema)

module.exports = Movie