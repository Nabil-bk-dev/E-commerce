import { cartModel } from "../models/cartModel";
import { productModel } from "../models/productModel";

interface CreateCartForUser{
    userId : string;
};

const createCartForUser = async ({userId} : CreateCartForUser) =>{
    const cart = await cartModel.create({ userId , totalAmount:0 });
    cart.save();
    return cart;
};

interface GetActiveCartForUser{
    userId : string;
};

export const GetActiveCartForUser = async ({userId} : GetActiveCartForUser) => {
    let cart = await cartModel.findOne({userId , status : "active"});
    if(!cart){
        return createCartForUser({userId});
    }
    return cart;
};

interface addItemToCart {
    userId : string;
    productId : any;
    quantity : number;
}

export const addItemToCart = async({userId,productId,quantity} : addItemToCart) => {
    const cart = await GetActiveCartForUser({userId});
    const existInCart = cart.items.find((p) => p.product.toString() === productId);
    if(existInCart){
        return {data : "Item already exist in Cart !", statusCode:400};
    }
    //recuperer le produit : 
    const product = await productModel.findById(productId);
    if(!product){
        return{ data:"product not found", statusCode:400 };
    }
    if(product.stock < quantity){
        return {data : "stock insufisant" , statusCode : 400};
    }
    cart.items.push({
        product: productId,
        unitPrice: product.price,
        quantity
    });
    // modifier total amount : 
    cart.totalAmount += product.price * quantity;

    const updateCart = await cart.save();
    return {data: updateCart, statusCode:200};
};

interface updateItemInCart {
    userId : string;
    productId : any;
    quantity : number;
}

export const updateItemInCart = async({userId,productId,quantity} : updateItemInCart) => {
    const cart = await GetActiveCartForUser({userId});
    // le produit que je veux le modifier : 
    const existInCart = cart.items.find((p) => p.product.toString() === productId);

    if(!existInCart){
        return {data:"product not exist in cart",statusCode:400};
    }

    //recuperer le produit : 
    const product = await productModel.findById(productId);
    if(!product){
        return{ data:"product not found", statusCode:400 };
    }
    if(product.stock < quantity){
        return {data : "stock insufisant" , statusCode : 400};
    }

    existInCart.quantity = quantity;

    const othersCartItems = cart.items.filter((p) => p.product.toString() !== productId);
    let total = othersCartItems.reduce((sum,product) => {
        sum += product.quantity * product.unitPrice;
        return sum;
    },0);

    total += existInCart.quantity * existInCart.unitPrice;
    cart.totalAmount = total;
    const updateCarte = await cart.save();

    return {data : updateCarte, statusCode:200};
}

interface DeleteItemInCart {
    userId : string;
    productId : any;
}

export const deleteItemInCart = async ({userId,productId}:DeleteItemInCart) => {
    const cart = await GetActiveCartForUser({userId});
    // le produit que je veux le suprimer : 
    const existInCart = cart.items.find((p) => p.product.toString() === productId);
    if(!existInCart){
        return {data:"product not exist in cart",statusCode:400};
    }
    const othersCartItems = cart.items.filter((p) => p.product.toString() !== productId);
    let total = othersCartItems.reduce((sum,product) => {
        sum += product.quantity * product.unitPrice;
        return sum;
    },0);
    cart.items = othersCartItems;
    cart.totalAmount = total;
    const updateCarte = await cart.save();
    return {data : updateCarte, statusCode:200};
}

interface DeleteAllItemInCart {
    userId : string;
}

export const deleteAllItemInCart = async ( {userId} :DeleteAllItemInCart ) => {
    const cart = await GetActiveCartForUser({userId});
    cart.items = [];
    cart.totalAmount = 0;
    const updateCarte = await cart.save();
    return {data : updateCarte, statusCode:200};
}