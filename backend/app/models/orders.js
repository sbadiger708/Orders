var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

// Order Mongoose Schema
var OrderSchema = new Schema({    
    orderNumber:{type:Number, required:true, unique:true},
    userId:{type:String, required:true},
    orderDueDate:{type:Date, required:true},
    customerBuyerName:{type:String, required:true},
    customeAddress:{type:String, required:true},
    customerPhone:{type:String, required:true},
    orderTotal:{type:Number, required:true}
});
// var entitySchema = mongoose.Schema({
//     testvalue: {type: String}
// });

// entitySchema.pre('save', function(next) {
//     var doc = this;
    // counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { orderNumber: 1} }, function(error, counter)   {
    //     if(error)
    //         return next(error);
    //     doc.testvalue = counter.orderNumber;
    //     next();
    // });
// });

module.exports = counter = mongoose.model('Order', OrderSchema); 
