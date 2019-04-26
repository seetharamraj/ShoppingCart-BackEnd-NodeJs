var mongoose=require('mongoose');

var mobileSchema=mongoose.Schema(
    {
        name:{type:String},
        price:{type:String},
        ram:{type:String},
        mobileDesc:{type:String},
        image:{type:String}
    } 
);
module.exports=mongoose.model('mobileSchema',mobileSchema);