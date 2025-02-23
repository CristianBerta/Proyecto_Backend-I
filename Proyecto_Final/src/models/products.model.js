import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const productsSchema = new mongoose.Schema({
    title:String,
    description:String,
    code:String,
    price:Number,
    status:Boolean,
    category:String,
    stock:Number,
    thumbnails:Array,
    carts:{
        type:Array,
        default:[]
    }
});
productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model("products", productsSchema);