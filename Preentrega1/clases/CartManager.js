import fs from "fs";

class CartManager {
    constructor() {
        this.file = "carts.json";
        if (!fs.existsSync(this.file)) {
            fs.writeFileSync(this.file, JSON.stringify([]));
        }
    }

    getCarts() {
        return JSON.parse(fs.readFileSync(this.file, "utf-8"));
    }

    getCartById(id) {
        const carts = this.getCarts();
        return carts.find((cart) => cart.id === id);
    }

    createCart() {
        const carts = this.getCarts();
        const newCart = { id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1, products: [] };
        carts.push(newCart);
        fs.writeFileSync(this.file, JSON.stringify(carts));
        return newCart;
    }

    addProductToCart(cartId, productId) {
        const carts = this.getCarts();
        const cart = carts.find((cart) => cart.id === cartId);
        if (cart) {
            const product = cart.products.find((prod) => prod.product === productId);
            if (product) {
                product.quantity++;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }
            fs.writeFileSync(this.file, JSON.stringify(carts));
            return cart;
        }
        return null;
    }
}

export default CartManager;