let indumentariaDeportiva = [
    {
      nombre: "Camiseta de Boca Juniors",
      categoria: "Ropa",
      precio: 29.999,
      stock: 10,
      imagen: "imagen1.jpg"
    },
    {
      nombre: "Botines TOTAL 90",
      categoria: "Calzado",
      precio: 79.000,
      stock: 35,
      imagen: "imagen2.jpg"
    },
    {
        nombre: "Camiseta San Lorenzo",
        categoria: "Ropa",
        precio: 29.999,
        stock: 25,
        imagen: "imagen2.jpg"
      },
      {
        nombre: "Camiseta Banfield",
        categoria: "Ropa",
        precio: 29.999,
        stock: 51,
        imagen: "imagen2.jpg"
      },
      {
        nombre: "Botines papi fulbo",
        categoria: "Calzado",
        precio: 19.000,
        stock: 5,
        imagen: "imagen2.jpg"
      },
      {
        nombre: "Short Boca Juniors",
        categoria: "Ropa",
        precio: 29.000,
        stock: 17,
        imagen: "imagen2.jpg"
      },
      {
        nombre: "Ojotas D10S",
        categoria: "Calzado",
        precio: 179.000,
        stock: 10,
        imagen: "imagen2.jpg"
      },
      {
        nombre: "Buzo entrenamiento Argentina",
        categoria: "Ropa",
        precio: 109.000,
        stock: 58,
        imagen: "imagen2.jpg"
      },
    // Agrega más elementos según tus necesidades
  ];
  
  const productosContainer = document.getElementById("productos-container");
  const carritoContainer = document.getElementById("carrito-container");
  const totalContainer = document.getElementById("total-container");
  
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
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <h3>${producto.nombre}</h3>
      <p>Categoría: ${producto.categoria}</p>
      <p>Precio: $${producto.precio.toFixed(2)}</p>
      <p>Stock: ${producto.stock}</p>
      <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
    `;
    productosContainer.appendChild(productoCard);
  });
  
  cargarDesdeStorage();
  