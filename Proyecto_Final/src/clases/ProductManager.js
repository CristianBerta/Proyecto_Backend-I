// import fs from "fs";
import { productsModel } from "../models/products.model.js";

class ProductManager {
    //     constructor() {
    //         this.file = "products.json";
    //         if (!fs.existsSync(this.file)) {
    //             fs.writeFileSync(this.file, JSON.stringify([]));
    //         }
    //     }

    //     getProducts() {
    //         return JSON.parse(fs.readFileSync(this.file, "utf-8"));
    //     }

    async getProducts(limit, page, query, sort) {
        try {
            limit = limit ? limit : 10;
            page = page >= 1 ? page : 1;
            query = query ? query : "";
            sort = sort ? sort : "asc";
            let result;

            if (query) {
                result = await productsModel.paginate({ category: query }, { limit: limit, page: page, sort: sort, lean: true });
            } else {
                result = await productsModel.paginate({}, { limit: limit, page: page, sort: sort, lean: true });
            }

            result = { status: "success", payload: result.docs, totalPages: result.totalPages, prevPage: result.prevPage, nextPage: result.nextPage, page: result.page, hasPrevPage: result.hasPrevPage, hasNextPage: result.hasNextPage, prevLink: (result.hasPrevPage ? "/?limit=" + limit + "&page=" + (result.page - 1) : null), nextLink: (result.hasNextPage ? "/?limit=" + limit + "&page=" + (result.page + 1) : null) };

            return result;
        } catch (error) {
            return { status: "error", payload: "" }
        }
    }

//     getProductById(id) {
//         const products = this.getProducts();
//         return products.find((product) => product.id === id);
//     }
    async getProductById(id) {
        const products = await productsModel.findOne({_id:id}).lean();
        return products ? products : {"error":"No se encontró el Producto!"};
    }

//     addProduct(product) {
//         const products = this.getProducts();
//         product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
//         products.push(product);
//         fs.writeFileSync(this.file, JSON.stringify(products));
//         return product;
//     }
    async addProduct(product) {
        await productsModel.create({...product});
    }

//     updateProduct(id, updatedFields) {
//         const products = this.getProducts();
//         const index = products.findIndex((product) => product.id === id);
//         if (index !== -1) {
//             const updatedProduct = { ...products[index], ...updatedFields, id: products[index].id };
//             products[index] = updatedProduct;
//             fs.writeFileSync(this.file, JSON.stringify(products));
//             return updatedProduct;
//         }
//         return null;
//     }
    async editProduct(id, product){
        await productsModel.updateOne({_id:id},{...product});
    }

//     deleteProduct(id) {
//         const products = this.getProducts();
//         const filteredProducts = products.filter((product) => product.id !== id);
//         fs.writeFileSync(this.file, JSON.stringify(filteredProducts));
//         return products.length !== filteredProducts.length;
//     }
    async deleteProduct(id){
        await productsModel.deleteOne({_id:id});
    }
}

export default ProductManager