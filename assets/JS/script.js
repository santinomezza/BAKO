const viewer = document.getElementById("viewer");
const totalFrames = 24;
let currentFrame = 1;

function updateImage() {
  viewer.src = `assets/img/gorra_360_${String(currentFrame).padStart(2, "0")}.png`;
}

const hero = document.querySelector(".hero");

hero.addEventListener("mousemove", (e) => {

  const rect = hero.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const width = rect.width;

  // Calcula porcentaje horizontal del mouse
  const percent = x / width;

  // Convierte porcentaje en frame
  currentFrame = Math.ceil(percent * totalFrames);

  if (currentFrame < 1) currentFrame = 1;
  if (currentFrame > totalFrames) currentFrame = totalFrames;

  updateImage();
});



let carrito =[];

function agregarAlCarrito(nombre, precio, idCantidad) {
  
  const cantidad =parseInt(document.getElementById(idCantidad).value);
  
  if (isNaN(cantidad) || isNaN(cantidad)) {
    alert("Por favor, ingrese una cantidad válida.");
    return;
  }

  const productOExistente = carrito.find(prod => prod.nombre === nombre);

  if (productOExistente) {
    productOExistente.cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, cantidad });
  }

alert("Producto agregado al carrito");
console.log(carrito); 
}




function enviarPedido(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const direccion = document.getElementById("direccion").value;
    const correo = document.getElementById("correo").value;
    const pago = document.getElementById("pago").value;

    let mensaje = "🧢 NUEVO PEDIDO - BAKO\n\n";

    let total = 0;

    carrito.forEach(prod => {
        mensaje += `Producto: ${prod.nombre}\n`;
        mensaje += `Cantidad: ${prod.cantidad}\n`;
        mensaje += `Subtotal: $${prod.precio * prod.cantidad}\n\n`;

        total += prod.precio * prod.cantidad;
    });

    mensaje += `TOTAL: $${total}\n\n`;

    mensaje += "👤 DATOS DEL CLIENTE\n";
    mensaje += `Nombre: ${nombre} ${apellido}\n`;
    mensaje += `Dirección: ${direccion}\n`;
    mensaje += `Correo: ${correo}\n`;
    mensaje += `Pago: ${pago}`;

    const numero = "5493834340335"; // TU NUMERO CON CODIGO PAIS

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
}

function agregarAlCarrito(nombre, precio) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.push({
    nombre: nombre,
    precio: precio
  });

  localStorage.setItem("carrito", JSON.stringify(carrito));

  alert("Producto agregado al carrito 🛒");
}


function mostrarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let contenedor = document.getElementById("resumen-carrito");
  let totalElemento = document.getElementById("total");

  if (!contenedor) return;

  contenedor.innerHTML = "";
  let total = 0;

  carrito.forEach((producto, index) => {
    total += producto.precio;

    contenedor.innerHTML += `
      <div class="item-carrito">
        <p>${producto.nombre}</p>
        <p>$${producto.precio}</p>
      </div>
    `;
  });

  totalElemento.innerText = "Total: $" + total;
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);