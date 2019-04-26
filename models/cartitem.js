var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var prodata=require('./dataSchema');
var schema = new Schema({
    User:{type:String},
        prodata: [{
            id: String,
            title: String,
            image: String,
            price: Number,
            quantity: Number,
            totalPrice: Number,
        }],
	
	totalQuantity:{type:Number},
    totalPrice:{type:Number},
    
})
module.exports=mongoose.model('cartSchema',schema);