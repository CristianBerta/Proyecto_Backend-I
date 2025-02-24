import { Router } from "express";
//import { cartModel } from "../models/cart.model.js";
import CartManager from "../clases/CartManager.js";

const cartsRouter = Router();
const CM = new CartManager();

cartsRouter.post("/", (req, res) => {
    const newCart = CM.createCart();
    res.send({"estado":"OK", "mensaje":"El carrito se creó correctamente!"});
});

cartsRouter.get("/:cid", (req, res) => {
    const cid = req.params.cid;
    const cart = CM.getCartById(cid);
    
    res.send(cart);
});

cartsRouter.post("/:cid/product/:pid", (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    CM.addProductToCart(cid, pid);
    res.send({"estado":"OK", "mensaje":"Se agregó el Producto al Carrito!"});
});

cartsRouter.put("/:cid", async (req, res) => {
    const cid = req.params.cid;
    const products = req.body;    
    await CM.addProductsToCart(cid, products);
    res.send({"estado":"OK", "mensaje":"Se actualizó el Carrito!"});
});

cartsRouter.put("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;    
    await CM.updateProductFromCart(cid, pid, quantity);
    res.send({"estado":"OK", "mensaje":"Se actualizó el Carrito!"});
});

cartsRouter.delete("/:cid/product/:pid", (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    CM.deleteProductFromCart(cid, pid);
    res.send({"estado":"OK", "mensaje":"Se eliminó el Producto al Carrito!"});
});

cartsRouter.delete("/:cid", async (req, res) => {
    const cid = req.params.cid;
    await CM.deleteProductsFromCart(cid);
    res.send({"estado":"OK", "mensaje":"Se vacío el Carrito!"});
});

export default cartsRouter;

//--//
// router.delete("/:cid/products/:pid", async (req, res) => {
//     const { cid, pid } = req.params;

//     const cart = await cartModel.findById(cid);
//     if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

//     cart.products = cart.products.filter(p => p.product.toString() !== pid);
//     await cart.save();

//     res.json({ status: "success", cart });
// });

// router.put("/:cid", async (req, res) => {
//     const { cid } = req.params;
//     const { products } = req.body;

//     const cart = await cartModel.findByIdAndUpdate(cid, { products }, { new: true });
//     res.json({ status: "success", cart });
// });

// router.put("/:cid/products/:pid", async (req, res) => {
//     const { cid, pid } = req.params;
//     const { quantity } = req.body;

//     const cart = await cartModel.findById(cid);
//     if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

//     const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
//     if (productIndex !== -1) {
//         cart.products[productIndex].quantity = quantity;
//     }
//     await cart.save();

//     res.json({ status: "success", cart });
// });

// router.delete("/:cid", async (req, res) => {
//     const { cid } = req.params;

//     await cartModel.findByIdAndUpdate(cid, { products: [] });
//     res.json({ status: "success", message: "Carrito vaciado" });
// });

// router.get("/:cid", async (req, res) => {
//     const { cid } = req.params;

//     const cart = await cartModel.findById(cid).populate("products.product");
//     res.json({ status: "success", cart });
// });


//-----------------------------//
// import { Router } from "express";
// import CartManager from "../clases/CartManager.js";

// const cartsRouter = Router();
// const CM = new CartManager();

// cartsRouter.post("/", (req, res) => {
//     const newCart = CM.createCart();
//     res.status(201).json(newCart);
// });

// cartsRouter.get("/:cid", (req, res) => {
//     const cart = CM.getCartById(Number(req.params.cid));
//     if (cart) {
//         res.json(cart);
//     } else {
//         res.status(404).json({ error: "Carrito no encontrado" });
//     }
// });

// cartsRouter.post("/:cid/product/:pid", (req, res) => {
//     const cart = CM.addProductToCart(Number(req.params.cid), Number(req.params.pid));
//     if (cart) {
//         res.json(cart);
//     } else {
//         res.status(404).json({ error: "Carrito no encontrado" });
//     }
// });

// export default cartsRouter;