import mongoose, {Document,ObjectId,Schema} from "mongoose";
import {IProduct} from '../models/productModel';

const CartStatusEnum = ["active" , "completed"];

export interface ICartItem  {
    product: IProduct;
    unitPrice: number;
    quantity: number;
}

export interface ICart extends Document {
    userId: string | ObjectId;
    items: ICartItem[];
    totalAmount: number;
    status: "active" | "completed";
}

const cartItemSchema = new Schema<ICartItem>({
    product: {type: Schema.Types.ObjectId, ref: "Product", required: true},
    unitPrice: {type: Number, required:true},
    quantity: {type:Number,required:true}
});

const cartSchema = new Schema<ICart>({
    userId: { type: Schema.Types.ObjectId, ref: "User" , required: true },
    items: { type: [cartItemSchema], default: [] },
    totalAmount: { type: Number, required: true},
    status: { type: String , enum: CartStatusEnum, default: "active" }
})

export const cartModel = mongoose.model<ICart>("Cart", cartSchema);