import fs from "fs";

class ProductManager {
    constructor() {
        this.file = "products.json";
        if (!fs.existsSync(this.file)) {
            fs.writeFileSync(this.file, JSON.stringify([]));
        }
    }

    getProducts() {
        return JSON.parse(fs.readFileSync(this.file, "utf-8"));
    }

    getProductById(id) {
        const products = this.getProducts();
        return products.find((product) => product.id === id);
    }

    addProduct(product) {
        const products = this.getProducts();
        product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        products.push(product);
        fs.writeFileSync(this.file, JSON.stringify(products));
        return product;
    }

    updateProduct(id, updatedFields) {
        const products = this.getProducts();
        const index = products.findIndex((product) => product.id === id);
        if (index !== -1) {
            const updatedProduct = { ...products[index], ...updatedFields, id: products[index].id };
            products[index] = updatedProduct;
            fs.writeFileSync(this.file, JSON.stringify(products));
            return updatedProduct;
        }
        return null;
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const filteredProducts = products.filter((product) => product.id !== id);
        fs.writeFileSync(this.file, JSON.stringify(filteredProducts));
        return products.length !== filteredProducts.length;
    }
}

export default ProductManager;