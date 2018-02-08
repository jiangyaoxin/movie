//改文件是一个路由模块
//改文件是一个路由模块
//加载express
var express = require('express');
var mongoose =require('mongoose')
var Movie = require('../models/movies')
var router = express.Router();

mongoose.connect('mongodb://localhost/imooc')
//在router身上设置对应的路由和对应的处理方法
//router.get('/',控制器.方法) //正确写法,控制器方法写在控制器里
router.get('/',function(req,res) {
  Movie.fetch(function(err,movies) {
    if (err) {
      console.log(err)
    } else {
      res.render('index', {
        title: '电影网站首页',
        movies: movies
      })
    }
  })
})

router.get('/movie/:id',function(req,res) {
  var id = req.params.id
  Movie.findById(id, function(err,movie) {
    res.render('detail', {
      title: 'imooc' + movie.title,
      movie: movie
    })
  })
})

//向外暴露模块
module.exports = router;
