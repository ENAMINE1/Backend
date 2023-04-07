const { default: mongoose } = require('mongoose');
const Schema = mongoose.Schema;
const vendorSchema=new Schema({
    vendor:{type:String,required:[true,'vendor required']},
    publishers:{type:Array,required:[true,'publishers required']},
    days_taken:{type:Array,required:[true,'days required']},
    address:{type:String,required:[true,'address required']},
    city:{type:String,required:[true,'city required']},
    state:{type:String,required:[true,'state required']},
    pincode:{type:Number,required:[true,'pincode required']},
});
const Vendor=mongoose.model('vendor',vendorSchema);
module.exports=Vendor;