import { Router } from "express";
import ProductManager from "../clases/ProductManager.js";

const productsRouter = Router();
const PM = new ProductManager();

productsRouter.get("/", (req, res) => {
    const products = PM.getProducts();
    res.json(products);
});

productsRouter.get("/:pid", (req, res) => {
    const product = PM.getProductById(Number(req.params.pid));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

productsRouter.post("/", (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const newProduct = PM.addProduct({ title, description, code, price, status, stock, category, thumbnails });
    res.status(201).json(newProduct);
});

productsRouter.put("/:pid", (req, res) => {
    const updatedProduct = PM.updateProduct(Number(req.params.pid), req.body);
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

productsRouter.delete("/:pid", (req, res) => {
    const deleted = PM.deleteProduct(Number(req.params.pid));
    if (deleted) {
        res.json({ message: "Producto eliminado" });
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

export default productsRouter;