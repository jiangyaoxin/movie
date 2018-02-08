var express = require('express');
var mongoose =require('mongoose')
var Movie = require('../models/movies')
var router = express.Router()

mongoose.connect('mongodb://localhost/imooc')

router.get('/admin/movie',function(req,res) {
  res.render('admin', {
    title: '电影录入',
    movie: {
      title: '',
      director: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  });
})

//update page
router.get('/admin/movie/update/:id',function(req,res){ 
  var id = req.params.id;
  if(id){
    Movie.findById(id,function(err,movie){
      res.render('admin',{
        title:'后台更新页面',
        movie:movie
      })
    })
  } 
})

//post new movie
router.post('/admin/movie/new',function(req,res){
  var id = req.body._id;
  var _movie;
  if (id !== 'undefined' && id !== '') {
    Movie.findById(id,function(err,movie){
      if(err){
        console.log(err);
      }
      Movie.update({_id:id},{
        title: req.body.title,
        doctor: req.body.doctor,
        language: req.body.language,
        country: req.body.country,
        summary: req.body.summary,
        flash: req.body.flash,
        poster: req.body.poster,
        year: req.body.year
      },function(error) {
        console.log(error)
      })
      res.redirect('/movie/' + movie._id)
    })
  }else{
    _movie = new Movie({
      title: req.body.title,
      doctor: req.body.doctor,
      language: req.body.language,
      country: req.body.country,
      summary: req.body.summary,
      flash: req.body.flash,
      poster: req.body.poster,
      year: req.body.year
    });
    _movie.save(function(err,movie){
      if (err) {
        console.log(err);
      }
      res.redirect('/movie/' + movie._id);
    });
  }  
})

//list page
router.get('/admin/list',function(req,res) {
  Movie.fetch(function(err,movies) {
    if (err) {
      console.log(err)
    } else {
      res.render('list', {
        title: '电影网站首页',
        movies: movies
      })
    }
  })
})

//list delete movie
router.post('/admin/list',function(req,res) {
  var id = req.query.id
  console.log(id)
  if(id) {
    Movie.remove({_id: id},function(){
      console.log('删除成功')
      res.json({success:1})
    })
  }
})

//向外暴露模块
module.exports = router;
