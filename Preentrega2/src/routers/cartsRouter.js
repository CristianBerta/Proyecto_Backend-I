import { Router } from "express";
import CartManager from "../clases/CartManager.js";

const cartsRouter = Router();
const CM = new CartManager();

cartsRouter.post("/", (req, res) => {
    const newCart = CM.createCart();
    res.status(201).json(newCart);
});

cartsRouter.get("/:cid", (req, res) => {
    const cart = CM.getCartById(Number(req.params.cid));
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ error: "Carrito no encontrado" });
    }
});

cartsRouter.post("/:cid/product/:pid", (req, res) => {
    const cart = CM.addProductToCart(Number(req.params.cid), Number(req.params.pid));
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ error: "Carrito no encontrado" });
    }
});

export default cartsRouter;