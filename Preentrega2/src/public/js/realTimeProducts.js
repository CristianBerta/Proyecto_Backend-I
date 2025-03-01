const socket = io();

socket.on("realtimeproducts", products => {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    
    products.forEach(product => {
        let formattedPrice = new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS"
        }).format(product.price);

        let listItem = document.createElement("li");
        listItem.innerHTML = `${product.title} - ${formattedPrice} <button onclick="eliminarProducto(${product.id})">Eliminar</button>`;
        productList.appendChild(listItem);
    });
});

document.getElementById("product-form").addEventListener("submit", event => {
    event.preventDefault();

    const product = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        price: parseFloat(document.getElementById("price").value),
        category: document.getElementById("category").value,
        thumbnails: [document.getElementById("image").value]
    };

    socket.emit("nuevoProducto", product);
    event.target.reset();
});

function eliminarProducto(id) {
    socket.emit("eliminarProducto", id);
}