import { Router } from "express";
import { productsModel } from "../models/products.model.js";

const router = Router();

router.get("/", async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;
    
    const filter = query ? { $or: [{ category: query }, { status: query === "true" }] } : {};

    const options = {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
    };

    const products = await productsModel.paginate(filter, options);

    res.json({
        status: "success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}` : null,
        nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}` : null,
    });
});

export default router;

// import { Router } from "express";
// import ProductManager from "../clases/ProductManager.js";

// const productsRouter = Router();
// const PM = new ProductManager();

// productsRouter.get("/", async (req, res) => {
//     const products = PM.getProducts();
//     res.json(products);
// });

// productsRouter.get("/:pid", (req, res) => {
//     const product = PM.getProductById(Number(req.params.pid));
//     if (product) {
//         res.json(product);
//     } else {
//         res.status(404).json({ error: "Producto no encontrado" });
//     }
// });

// productsRouter.post("/", (req, res) => {
//     const { title, description, code, price, status, stock, category, thumbnails } = req.body;
//     if (!title || !description || !code || !price || !stock || !category) {
//         return res.status(400).json({ error: "Faltan campos obligatorios" });
//     }
//     const newProduct = PM.addProduct({ title, description, code, price, status, stock, category, thumbnails });
//     res.status(201).json(newProduct);
// });

// productsRouter.put("/:pid", (req, res) => {
//     const updatedProduct = PM.updateProduct(Number(req.params.pid), req.body);
//     if (updatedProduct) {
//         res.json(updatedProduct);
//     } else {
//         res.status(404).json({ error: "Producto no encontrado" });
//     }
// });

// productsRouter.delete("/:pid", (req, res) => {
//     const deleted = PM.deleteProduct(Number(req.params.pid));
//     if (deleted) {
//         res.json({ message: "Producto eliminado" });
//     } else {
//         res.status(404).json({ error: "Producto no encontrado" });
//     }
// });

// export default productsRouter;