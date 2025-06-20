import { productModel } from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find();
};

export const seedInitialProducts = async () => {
    try{
        const products = [
    {
        title: "Écouteurs Bluetooth",
        image: "https://images.unsplash.com/photo-1512499617640-c2f999f62dd1?auto=format&fit=crop&w=400&q=80",
        price: 29.99,
        stock: 50
    },
    {
        title: "Clavier Mécanique RGB",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
        price: 79.99,
        stock: 30
    },
    {
        title: "Souris Gamer",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
        price: 39.99,
        stock: 60
    },
    {
        title: "Webcam HD 1080p",
        image: "https://images.unsplash.com/photo-1587825140408-f5e7a1bfc3b6?auto=format&fit=crop&w=400&q=80",
        price: 49.99,
        stock: 20
    },
    {
        title: "Casque Audio Studio",
        image: "https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=400&q=80",
        price: 99.99,
        stock: 15
    },
    {
        title: "Support d’ordinateur portable",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
        price: 25.99,
        stock: 40
    },
    {
        title: "Chargeur USB-C Rapide",
        image: "https://images.unsplash.com/photo-1523475496153-3f26e9bfbf3e?auto=format&fit=crop&w=400&q=80",
        price: 19.99,
        stock: 100
    },
    {
        title: "Tapis de souris XXL",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
        price: 14.99,
        stock: 75
    },
    {
        title: "Lampe LED de bureau",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
        price: 34.99,
        stock: 25
    },
    {
        title: "Enceinte Bluetooth Portable",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
        price: 59.99,
        stock: 35
    }
    ];
    const existingProdeucts = await getAllProducts();
    if(existingProdeucts.length === 0){
        await productModel.insertMany(products);
    }
    }catch(err){
        console.error("cannot see database",err);
    }
    
}