let indumentariaDeportiva = [
  {
    nombre: "Camiseta de Boca Juniors",
    categoria: "Ropa",
    precio: 29.999,
    stock: 10,
    imagen: "./images/boca.jpeg"
  },
  {
    nombre: "Botines TOTAL 90",
    categoria: "Calzado",
    precio: 79.000,
    stock: 35,
    imagen: "./images/total90.jpg"
  },
  {
      nombre: "Camiseta San Lorenzo",
      categoria: "Ropa",
      precio: 29.999,
      stock: 25,
      imagen: "./images/casla.jpg"
  },
  {
      nombre: "Camiseta Banfield",
      categoria: "Ropa",
      precio: 29.999,
      stock: 51,
      imagen: "./images/banfield.jpg"
    },
    {
      nombre: "Botines papi fulbo",
      categoria: "Calzado",
      precio: 19.000,
      stock: 5,
      imagen: "./images/papi.jpg"
    },
    {
      nombre: "Short Boca Juniors",
      categoria: "Ropa",
      precio: 29.000,
      stock: 17,
      imagen: "./images/boquita.jpg"
    },
    {
      nombre: "Ojotas D10S",
      categoria: "Calzado",
      precio: 179.000,
      stock: 10,
      imagen: "./images/d10s.jpeg"
    },
    {
      nombre: "Buzo entrenamiento Argentina",
      categoria: "Ropa",
      precio: 109.000,
      stock: 58,
      imagen: "./images/argentina.jpg"
    },
];
let productosContainer = document.getElementById("productos-container");
let carritoContainer = document.getElementById("carrito-container");
let totalContainer = document.getElementById("total-container");
let finalizarCompraButton = document.getElementById("finalizar-compra");
let mensajeContainer = document.getElementById("mensaje-container");
let itemsContainer = document.getElementById("items-container");

let carrito = [];

function actualizarCarrito() {
let total = 0;

itemsContainer.innerHTML = '';
carrito.forEach(producto => {
  let carritoItem = document.createElement("div");
  carritoItem.className = "carrito-item";
  carritoItem.textContent = `${producto.nombre} - Precio: $${producto.precio.toFixed(2)}`;
  itemsContainer.appendChild(carritoItem);
  total += producto.precio;
});

totalContainer.textContent = `Total: $${total.toFixed(2)}`;
}

function agregarAlCarrito(index) {
  let producto = indumentariaDeportiva[index];
  if (producto.stock > 0) {
    carrito.push(producto);
    producto.stock--;
    actualizarCarrito();
    guardarEnStorage();
  }
  }

function finalizarCompra() {
  if (carrito.length === 0) {
    mostrarMensaje("Tu carrito está vacío. Agrega productos antes de finalizar la compra.");
    return;
  }

  let totalCompra = carrito.reduce((total, producto) => total + producto.precio, 0);
  mostrarMensaje(`Monto a pagar: $${totalCompra.toFixed(2)}`);
  mensajeContainer.textContent = "¡GRACIAS POR COMPRAR EN RASH SPORTS!";
  mensajeContainer.classList.remove("oculto");
  finalizarCompraButton.classList.add("oculto");
  carrito.length = 0;
  actualizarCarrito();
  guardarEnStorage();
}

function limpiarCarrito() {
  carrito.length = 0;
  actualizarCarrito();
  guardarEnStorage();
  finalizarCompraButton.classList.add("oculto");
  mensajeContainer.classList.add("oculto");
}

function mostrarMensaje(mensaje) {
  swal({
    text: mensaje,
    icon: "success",
  });
}

function cargarProductos() {
  productosContainer.innerHTML = "";

  indumentariaDeportiva.forEach((producto, index) => {
    let productoCard = document.createElement("div");
    productoCard.className = "producto-card";

    let imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.className = "imagen";

    let productoInfo = document.createElement("div");
    productoInfo.className = "producto-info";
    productoInfo.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio.toFixed(2)}</p>
      <p>Stock: ${producto.stock}</p>
      <button onclick="agregarAlCarrito(${index})">Agregar al Carrito</button>
    `;

    productoCard.appendChild(imagen);
    productoCard.appendChild(productoInfo);
    productosContainer.appendChild(productoCard);
  });
}

function guardarEnStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarDesdeStorage() {
  let carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito.push(...JSON.parse(carritoGuardado));
    actualizarCarrito();
    if (carrito.length > 0) {
      finalizarCompraButton.classList.remove("oculto");
    }
  }
}

cargarProductos();
cargarDesdeStorage();


finalizarCompraButton.addEventListener("click", finalizarCompra);
limpiarCarritoButton.addEventListener("click", limpiarCarrito);

function cargarDatosDesdeJSONLocal() {
  return fetch('ruta/a/tu/json.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo cargar el JSON local');
      }
      return response.json();
    })
    .then(data => {
      
      console.log('Datos cargados desde JSON local:', data);
      
    })
    .catch(error => {
      console.error('Error al cargar datos desde JSON local:', error);
    });
}
cargarDatosDesdeJSONLocal();