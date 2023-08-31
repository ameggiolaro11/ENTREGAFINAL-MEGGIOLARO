let indumentariaDeportiva = [
    {
      nombre: "Camiseta de Boca Juniors",
      categoria: "Ropa",
      precio: 29.999,
      stock: 10,
      imagen: "../images/boca.jpeg"
    },
    {
      nombre: "Botines TOTAL 90",
      categoria: "Calzado",
      precio: 79.000,
      stock: 35,
      imagen: "../images/boca.jpeg"
    },
    {
        nombre: "Camiseta San Lorenzo",
        categoria: "Ropa",
        precio: 29.999,
        stock: 25,
        imagen: "../images/boca.jpeg"
    },
    {
        nombre: "Camiseta Banfield",
        categoria: "Ropa",
        precio: 29.999,
        stock: 51,
        imagen: "../images/boca.jpeg"
      },
      {
        nombre: "Botines papi fulbo",
        categoria: "Calzado",
        precio: 19.000,
        stock: 5,
        imagen: "../images/boca.jpeg"
      },
      {
        nombre: "Short Boca Juniors",
        categoria: "Ropa",
        precio: 29.000,
        stock: 17,
        imagen: "../images/boca.jpeg"
      },
      {
        nombre: "Ojotas D10S",
        categoria: "Calzado",
        precio: 179.000,
        stock: 10,
        imagen: "../images/d10s.jpeg"
      },
      {
        nombre: "Buzo entrenamiento Argentina",
        categoria: "Ropa",
        precio: 109.000,
        stock: 58,
        imagen: "../images/boca.jpeg"
      },
  ];
  let productosContainer = document.getElementById("productos-container");
  let carritoContainer = document.getElementById("carrito-container");
  let totalContainer = document.getElementById("total-container");
  let finalizarCompraButton = document.getElementById("finalizar-compra");
  let mensajeContainer = document.getElementById("mensaje-container");

const carrito = [];

function actualizarCarrito() {
  carritoContainer.innerHTML = "";
  let total = 0;

  carrito.forEach(producto => {
    const carritoItem = document.createElement("div");
    carritoItem.className = "carrito-item";
    carritoItem.textContent = `${producto.nombre} - Precio: $${producto.precio.toFixed(2)}`;
    carritoContainer.appendChild(carritoItem);
    total += producto.precio;
  });

  totalContainer.textContent = `Total: $${total.toFixed(2)}`;
}

function agregarAlCarrito(index) {
  const producto = indumentariaDeportiva[index];
  if (producto.stock > 0) {
    carrito.push(producto);
    producto.stock--;
    actualizarCarrito();
    guardarEnStorage();
  }
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío. Agrega productos antes de finalizar la compra.");
    return;
  }

  const totalCompra = carrito.reduce((total, producto) => total + producto.precio, 0);
  mensajeContainer.textContent = "¡GRACIAS POR COMPRAR EN RASH SPORTS!";
  carrito.length = 0; // Vaciar el carrito
  actualizarCarrito();
  guardarEnStorage();
}

function guardarEnStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarDesdeStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito.push(...JSON.parse(carritoGuardado));
    actualizarCarrito();
  }
}

indumentariaDeportiva.forEach((producto, index) => {
    const productoCard = document.createElement("div");
    productoCard.className = "producto-card";
    productoCard.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen" />
      <div class="producto-info">
        <h3>${producto.nombre}</h3>
        <p>Categoría: ${producto.categoria}</p>
        <p>Precio: $${producto.precio.toFixed(2)}</p>
        <p>Stock: ${producto.stock}</p>
        <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
      </div>
    `;
    productosContainer.appendChild(productoCard);
  });
  
  cargarDesdeStorage();
  
  finalizarCompraButton.addEventListener("click", finalizarCompra);