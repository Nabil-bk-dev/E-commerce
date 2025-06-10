import { productModel } from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find();
};

export const seedInitialProducts = async () => {
    const products = [
    {
        title: "Écouteurs Bluetooth",
        image: "https://example.com/images/ecouteurs.jpg",
        price: 29.99,
        stock: 50
    },
    {
        title: "Clavier Mécanique RGB",
        image: "https://example.com/images/clavier.jpg",
        price: 79.99,
        stock: 30
    },
    {
        title: "Souris Gamer",
        image: "https://example.com/images/souris.jpg",
        price: 39.99,
        stock: 60
    },
    {
        title: "Webcam HD 1080p",
        image: "https://example.com/images/webcam.jpg",
        price: 49.99,
        stock: 20
    },
    {
        title: "Casque Audio Studio",
        image: "https://example.com/images/casque.jpg",
        price: 99.99,
        stock: 15
    },
    {
        title: "Support d’ordinateur portable",
        image: "https://example.com/images/support.jpg",
        price: 25.99,
        stock: 40
    },
    {
        title: "Chargeur USB-C Rapide",
        image: "https://example.com/images/chargeur.jpg",
        price: 19.99,
        stock: 100
    },
    {
        title: "Tapis de souris XXL",
        image: "https://example.com/images/tapis.jpg",
        price: 14.99,
        stock: 75
    },
    {
        title: "Lampe LED de bureau",
        image: "https://example.com/images/lampe.jpg",
        price: 34.99,
        stock: 25
    },
    {
        title: "Enceinte Bluetooth Portable",
        image: "https://example.com/images/enceinte.jpg",
        price: 59.99,
        stock: 35
    }
    ];
    const existingProdeucts = await getAllProducts();
    if(existingProdeucts.length === 0){
        await productModel.insertMany(products);
    }
}