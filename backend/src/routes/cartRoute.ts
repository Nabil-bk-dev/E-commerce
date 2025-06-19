import express from 'express';
import { addItemToCart, chekout, deleteAllItemInCart, deleteItemInCart, GetActiveCartForUser, updateItemInCart } from '../services/cartService';
import validateJWT from '../middlewares/validateJWT';
import { ExtendRequest } from '../types/extendrequest';




const router = express.Router();

router.get('/',
    validateJWT,
    async (req : ExtendRequest, res ) => {
        try{
            const userId = req?.user?._id;
            const cart = await GetActiveCartForUser({userId});
            res.status(200).send(cart);
        }catch(err){
            res.status(500).send("something went wrong");
        }
});

router.post('/items',
    validateJWT,
    async (req : ExtendRequest, res ) => {
        try{
            const userId = req?.user?._id;
            const { productId, quantity } = req.body;
            const Response = await addItemToCart({userId,productId,quantity});
            res.status(Response.statusCode).send(Response.data);
        }catch(err){
            res.status(500).send("something went wong");
        }
});

router.put('/items',
    validateJWT,
    async (req : ExtendRequest, res ) => {
        try{
            const userId = req?.user?._id;
            const { productId, quantity } = req.body;
            const Response = await updateItemInCart({userId,productId,quantity});
            res.status(Response.statusCode).send(Response.data);
        }catch(err){
            res.status(500).send("someting went wrong");
        }
});

router.delete('/items/:productId',
    validateJWT,
    async(req : ExtendRequest, res)=>{
        try{
            const userId = req?.user?._id;
            const { productId } = req.params;
            const Response = await deleteItemInCart({userId,productId});
            res.status(Response.statusCode).send(Response.data);
        }catch(err){
            res.status(500).send("someting went wrong");
        }
});

router.delete('/',
    validateJWT,
    async (req : ExtendRequest, res) => {
        try{
            const userId = req?.user?._id;
            const Response = await deleteAllItemInCart({userId});
            res.status(Response.statusCode).send(Response.data);
        }catch(err){
            res.status(500).send("someting went wrong");
        }
});

router.post('/checkout',
    validateJWT,
    async (req : ExtendRequest, res) => {
        try{
            const userId = req?.user?._id;
            const {address} = req.body;
            const Response = await chekout({userId,address});
        res.status(Response.statusCode).send(Response.data);
        }catch(err){
            res.status(500).send("someting went wrong");
        }
    }
)


export default router;