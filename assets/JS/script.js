// ===============================
// HERO 360° VIEWER
// ===============================

const viewer = document.getElementById("viewer");
const hero = document.querySelector(".hero");

if (viewer && hero) {
  const totalFrames = 24;
  let currentFrame = 1;

  function updateImage() {
    viewer.src = `assets/img/gorra_360_${String(currentFrame).padStart(2, "0")}.png`;
  }

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;

    currentFrame = Math.ceil(percent * totalFrames);

    if (currentFrame < 1) currentFrame = 1;
    if (currentFrame > totalFrames) currentFrame = totalFrames;

    updateImage();
  });
}





document.querySelectorAll(".card-producto").forEach(card => {

  const imagenPrincipal = card.querySelector(".imagen-principal");
  const miniaturas = card.querySelectorAll(".miniaturas img");

  miniaturas.forEach(mini => {

    mini.addEventListener("click", () => {
      imagenPrincipal.src = mini.src;
    });

  });

});

// ===============================
// CARRITO CON LOCALSTORAGE
// ===============================

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// AGREGAR PRODUCTO
function agregarAlCarrito(nombre, precio, idCantidad = null) {

  let carrito = obtenerCarrito();
  let cantidad = 1;

  if (idCantidad) {
    const input = document.getElementById(idCantidad);
    cantidad = parseInt(input.value);
    if (isNaN(cantidad) || cantidad <= 0) {
      alert("Cantidad inválida");
      return;
    }
  }

  const productoExistente = carrito.find(prod => prod.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += cantidad;
  } else {
    carrito.push({
      nombre: nombre,
      precio: precio,
      cantidad: cantidad
    });
  }

  guardarCarrito(carrito);
  alert("Producto agregado al carrito 🛒");
}

// ===============================
// MOSTRAR CARRITO EN carrito.html
// ===============================

function mostrarCarrito() {

  const contenedor = document.getElementById("resumen-carrito");
  const totalElemento = document.getElementById("total");

  if (!contenedor || !totalElemento) return;

  let carrito = obtenerCarrito();
  contenedor.innerHTML = "";

  let total = 0;

  carrito.forEach((producto, index) => {

    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    contenedor.innerHTML += `
      <div class="item-carrito">
        <p><strong>${producto.nombre}</strong></p>
        <p>Cantidad: ${producto.cantidad}</p>
        <p>Subtotal: $${subtotal}</p>
        <button onclick="eliminarProducto(${index})">Eliminar</button>
        <hr>
      </div>
    `;
  });

  totalElemento.innerText = "Total: $" + total;
}

function eliminarProducto(index) {
  let carrito = obtenerCarrito();
  carrito.splice(index, 1);
  guardarCarrito(carrito);
  mostrarCarrito();
}

// ===============================
// ENVIAR PEDIDO A WHATSAPP
// ===============================

function enviarPedido(event) {
  event.preventDefault();

  let carrito = obtenerCarrito();

  if (carrito.length === 0) {
    alert("El carrito está vacío 🛒");
    return;
  }

  const nombre = document.getElementById("nombre")?.value || "";
  const apellido = document.getElementById("apellido")?.value || "";
  const direccion = document.getElementById("direccion")?.value || "";
  const correo = document.getElementById("correo")?.value || "";
  const pago = document.getElementById("pago")?.value || "";

  let mensaje = "🧢 *NUEVO PEDIDO - BAKO*\n\n";

  let total = 0;

  carrito.forEach(prod => {
    const subtotal = prod.precio * prod.cantidad;
    total += subtotal;

    mensaje += `Producto: ${prod.nombre}\n`;
    mensaje += `Cantidad: ${prod.cantidad}\n`;
    mensaje += `Subtotal: $${subtotal}\n\n`;
  });

  mensaje += `💰 TOTAL: $${total}\n\n`;

  mensaje += "👤 *DATOS DEL CLIENTE*\n";
  mensaje += `Nombre: ${nombre} ${apellido}\n`;
  mensaje += `Dirección: ${direccion}\n`;
  mensaje += `Correo: ${correo}\n`;
  mensaje += `Pago: ${pago}\n`;

  const numero = "5493834340335"; // TU NUMERO

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
}

// ===============================
// INICIAR CUANDO CARGA LA PÁGINA
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();
});






let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar botón si ya hay productos guardados
if (carrito.length > 0) {
  document.getElementById("boton-finalizar").style.display = "block";
}

function agregarAlCarrito(nombre, precio, idCantidad) {

  const cantidad = parseInt(document.getElementById(idCantidad).value);

  if (!cantidad || cantidad <= 0) return;

  const productoExistente = carrito.find(p => p.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += cantidad;
  } else {
    carrito.push({
      nombre: nombre,
      precio: precio,
      cantidad: cantidad
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  document.getElementById("boton-finalizar").style.display = "block";

  alert("Producto añadido al carrito 🛒");
}

function irAFormulario() {
  window.location.href = "pages/formulario.html";
}

function cambiarImagen(img, idPrincipal) {
  document.getElementById(idPrincipal).src = img.src;
}



document.addEventListener("DOMContentLoaded", function(){

const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.add("nav-active");
});

menuClose.addEventListener("click", () => {
  nav.classList.remove("nav-active");
});

});
