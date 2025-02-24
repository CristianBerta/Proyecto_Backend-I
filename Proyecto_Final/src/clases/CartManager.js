// import fs from "fs";
import { cartModel } from "../models/cart.model.js";

class CartManager {
    //     constructor() {
    //         this.file = "carts.json";
    //         if (!fs.existsSync(this.file)) {
    //             fs.writeFileSync(this.file, JSON.stringify([]));
    //         }
    //     }

    //     getCarts() {
    //         return JSON.parse(fs.readFileSync(this.file, "utf-8"));
    //     }
    async getCarts() {
        return await cartModel.find().lean().populate("products.product");
    }

    //     getCartById(id) {
    //         const carts = this.getCarts();
    //         return carts.find((cart) => cart.id === id);
    //     }
    async getCartById(id) {
        return await cartModel.find({ _id: id }).lean();
    }

    //     createCart() {
    //         const carts = this.getCarts();
    //         const newCart = { id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1, products: [] };
    //         carts.push(newCart);
    //         fs.writeFileSync(this.file, JSON.stringify(carts));
    //         return newCart;
    //     }
    async createCart() {
        await cartModel.create({ products: [] });
    }

    //     addProductToCart(cartId, productId) {
    //         const carts = this.getCarts();
    //         const cart = carts.find((cart) => cart.id === cartId);
    //         if (cart) {
    //             const product = cart.products.find((prod) => prod.product === productId);
    //             if (product) {
    //                 product.quantity++;
    //             } else {
    //                 cart.products.push({ product: productId, quantity: 1 });
    //             }
    //             fs.writeFileSync(this.file, JSON.stringify(carts));
    //             return cart;
    //         }
    //         return null;
    //     }
    async addProductToCart(cid, pid) {
        let cart = await cartModel.findOne({ _id: cid }).lean();
        let product = cart.products.find(item => item.product._id == pid);

        if (product) {
            product.quantity += 1;
        } else {
            product = { product: pid, quantity: 1 };
            cart.products.push(product);
        }

        await cartModel.updateOne({ _id: cid }, { products: cart.products });
    }

    async addProductsToCart(cid, products) {
        let cart = await cartModel.findOne({_id:cid}).lean();
        
        products.forEach(item => {            
            let product = cart.products.find(item2 => item2.product == item.product);                    

            if (product) {
                product.quantity += item.quantity;                        
            } else {
                product = {product:item.product, quantity:item.quantity};
                cart.products.push(product);
            }            
        });

        await cartModel.updateOne({_id:cid}, {products:cart.products});
    }

    async updateProductFromCart(cid, pid, quantity) {
        let cart = await cartModel.findOne({_id:cid}).lean();
        let product = cart.products.find(item => item.product._id == pid);        

        if (product) {
            product.quantity += quantity;
        } else {
            product = {product:pid, quantity:quantity};
            cart.products.push(product);
        }

        await cartModel.updateOne({_id:cid}, {products:cart.products});
    }

    async deleteProductFromCart(cid, pid) {
        let cart = await cartModel.findOne({_id:cid}).lean();
        let products = cart.products.filter(item => item._id != pid);        

        await cartModel.updateOne({_id:cid}, {products:products});
    }

    async deleteProductsFromCart(cid){
        await cartModel.updateOne({_id:cid}, {products:[]});
    }
}

export default CartManager