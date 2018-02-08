//模式定义
var mongoose=require('mongoose');

var MovieSchema = new mongoose.Schema({
  title: String,
  doctor: String,
  language: String,
  country: String,
  summary: String,
  flash: String,
  poster: String,
  year: Number,
  meta:{
    creatAt:{
      type:Date,
      default:Date.now()
    },
    updateAt:{
      type:Date,
      default:Date.now()
    }
  }
}) //  定义了一个新的模型，但是此模式还未和movies集合有关联

//middleware
MovieSchema.pre('save',function(next){
  if(this.isnew){
    this.meta.creatAt=this.meta.updateAt=Date.now();
  }else{
    this.meta.updateAt=Date.now();
  }
  next()
})

//静态方法
MovieSchema.static('findByID',function(id,cb){
  return this
  .findOne({_id:id})
  .exec(cb)
})

MovieSchema.static('fetch',function(cb){
  return this
  .find({})
  .sort('meta.updateAt')
  .exec(cb)
})

module.exports = MovieSchema