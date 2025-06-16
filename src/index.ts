import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import cartRoute from './routes/cartRoute';
import { seedInitialProducts } from './services/productSevice';

const app = express();
const port = 3001;

app.use(express.json());

mongoose
.connect("mongodb://localhost:27017/ecommerce")
.then(() => console.log("mongo is connected!"))
.catch((err) => console.log("failed to connect",err));

// seed products : 
seedInitialProducts();

app.use('/user',userRoute);
app.use('/product',productRoute);
app.use('/cart',cartRoute);

app.listen(port , () => {
    console.log("server runnig at : http://localhost:3001");
})