var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var port = process.env.PORT || 3040
var app = express()
var dir = path.join(__dirname, './view/page/')
 
// 使用html模板，需增加  app.engine('html', require('ejs').__express);使用EJS或jade模板，不用配置该项。
 
app.set('views', dir)// 设置模板相对路径(相对当前目录)
app.set('view engine', 'pug')// 设置模板引擎
 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
/*通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。
将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了。
注意：express 4.x版本之后值保留了express.static这个方法，其他方法都分为中间件另外安装引入
*/
app.use(express.static(path.join(__dirname, 'public')));
 
var index = require('./router/index')
var admin = require('./router/admin')
// 首页 分割线
app.get('/',index);
 
// 详情页
app.get('/movie/:id',index);
 
// 列表页
app.get('/admin/list',admin);
app.post('/admin/list',admin);

// 后台录入页
app.get('/admin/movie', admin);

app.post('/admin/movie/new',admin);

app.get('/admin/movie/update/:id',admin);
 
app.listen(port)
console.log('Servet started on port ' + port)