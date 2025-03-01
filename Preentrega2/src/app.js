import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import productsRouter from "./routers/productsRouter.js";
import cartsRouter from "./routers/cartsRouter.js";
import viewsRouter from "./routers/viewsRouter.js";
import ProductManager from "./clases/ProductManager.js";

const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
    console.log("Servidor activo en el puerto: " + port);
});
const socketServer = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const PM = new ProductManager();

socketServer.on("connection", socket => {
    console.log("Nuevo cliente conectado");

    socket.emit("realtimeproducts", PM.getProducts());

    socket.on("nuevoProducto", data => {
        PM.addProduct(data);
        console.log("Se agregó un nuevo producto!");
        socketServer.emit("realtimeproducts", PM.getProducts());
    });

    socket.on("eliminarProducto", id => {
        PM.deleteProduct(id);
        console.log("Se eliminó un producto!");
        socketServer.emit("realtimeproducts", PM.getProducts());
    });
});