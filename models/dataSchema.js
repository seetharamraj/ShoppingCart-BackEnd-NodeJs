var mongoose=require('mongoose');

var bookSchema=mongoose.Schema(
    {
        title:{type:String},
        price:{type:String},
        author:{type:String},
        bookDesc:{type:String},
        image:{type:String ,require:true},
    } 
);
module.exports=mongoose.model('bookSchema',bookSchema);