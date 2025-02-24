import { Router } from "express";
//import { productsModel } from "../models/products.model.js";
//import { cartModel } from "../models/cart.model.js";
import ProductManager from "../clases/ProductManager.js";

const viewsRouter = Router();
const PM = new ProductManager();

viewsRouter.get("/", async (req, res) => {
    const { limit, page, query, sort } = req.query;
    const products = await PM.getProducts(limit, page, query, sort);
    
    res.render("index", { products });
});

viewsRouter.get("/products/", async (req, res) => {
    const { limit, page, query, sort } = req.query;
    let products = await PM.getProducts(limit, page, query, sort);

    res.render("products", { products });
});

viewsRouter.get("/products/:pid", async (req, res) => {
    const { pid } = req.params;
    let product = await PM.getProductById(pid);

    res.render("products", { product });
});

viewsRouter.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});

export default viewsRouter;

//------------------//
// viewsRouter.get("/products", async (req, res) => {
//     try {
//         let { limit = 10, page = 1, sort, query } = req.query;

//         let filter = {};
//         if (query) {
//             filter = {
//                 $or: [
//                     { category: { $regex: query, $options: "i" } },
//                     { status: query === "available" }
//                 ]
//             };
//         }

//         let options = {
//             limit: parseInt(limit),
//             page: parseInt(page),
//             sort: sort ? { price: sort === "asc" ? 1 : -1 } : undefined,
//             lean: true // Convierte los documentos en objetos planos
//         };

//         const products = await productsModel.paginate(filter, options);

//         res.render("products", {
//             status: "success",
//             products: products.docs,
//             totalPages: products.totalPages,
//             prevPage: products.prevPage,
//             nextPage: products.nextPage,
//             page: products.page,
//             hasPrevPage: products.hasPrevPage,
//             hasNextPage: products.hasNextPage,
//             prevLink: products.hasPrevPage ? `/products?page=${products.prevPage}&limit=${limit}` : null,
//             nextLink: products.hasNextPage ? `/products?page=${products.nextPage}&limit=${limit}` : null
//         });
//     } catch (error) {
//         console.error("Error al obtener los productos:", error);
//         res.status(500).send("Error interno del servidor");
//     }
// });

// viewsRouter.get("/carts/:cid", async (req, res) => {
//     try {
//         const { cid } = req.params;
//         const cart = await cartModel.findById(cid).populate("products.product").lean();

//         if (!cart) {
//             return res.status(404).send("Carrito no encontrado");
//         }

//         res.render("cart", { cart });
//     } catch (error) {
//         console.error("Error al obtener el carrito:", error);
//         res.status(500).send("Error interno del servidor");
//     }
// });


//--------------------//
// import { Router } from "express";
// import ProductManager from "../clases/ProductManager.js";

// const router = Router();
// const PM = new ProductManager();

// router.get("/", (req, res) => {
//     const products = PM.getProducts();
//     res.render("home", { products });
// });

// router.get("/realtimeproducts", (req, res) => {
//     res.render("realTimeProducts");
// });

// export default router;