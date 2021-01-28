function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function () {
  const base = 2000;

  let cantidad = 0;

  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;
    case "2":
      cantidad = base * 1.05;
      break;
    case "3":
      cantidad = base * 1.35;
      break;
    default:
      break;
  }

  const diferencia = new Date().getFullYear() - this.year;

  cantidad -= (diferencia * 3 * cantidad) / 100;

  if (this.tipo === "basico") {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }

  return cantidad;
};

function UI() {}

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
  const formulario = document.querySelector("#cotizar-seguro");
  const div = document.createElement("div");

  if (tipo === "error") {
    div.classList.add("error");
  } else {
    div.classList.add("correcto");
  }

  div.classList.add("mensaje", "mt-10");
  div.textContent = mensaje;

  formulario.insertBefore(div, document.querySelector("#resultado"));

  setTimeout(() => {
    div.remove();
  }, 3000);
};

UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear();
  min = max - 20;

  const seleccionarAño = document.querySelector("#year");

  for (let i = max; i > min; i--) {
    let opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    seleccionarAño.appendChild(opcion);
  }
};

UI.prototype.mostrarResultado = function (total, seguro) {
  const { marca, year, tipo } = seguro;

  let textoMarca = "";

  switch (marca) {
    case "1":
      textoMarca = "americano";
      break;
    case "1":
      textoMarca = "asiatico";
      break;
    case "1":
      textoMarca = "europeo";
      break;
    default:
      break;
  }

  const div = document.createElement("div");
  const resultado = document.querySelector("#resultado");
  spinner = document.querySelector("#cargando");

  div.classList.add("mt-10");

  div.innerHTML = `
    <p class="header">Tu resumen</p>
    <p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span></p>
    <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
    <p class="font-bold">Tipo: <span class="font-normal capitalize">${tipo}</span></p>
    <p class="font-bold">Total: <span class="font-normal">${total}</span></p>
  `;

  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";
    resultado.appendChild(div);
  }, 3000);
};

const ui = new UI();

const cotizarSeguro = (e) => {
  e.preventDefault();

  const marca = document.querySelector("#marca").value;
  const year = document.querySelector("#year").value;
  const tipo = document.querySelector("input[name='tipo']:checked").value;

  if (marca === "" || year === "" || tipo === "") {
    ui.mostrarMensaje("Todos los campos son obligatorios", "error");
    return;
  }

  ui.mostrarMensaje("Cotizando...", "exito");

  const seguro = new Seguro(marca, year, tipo);
  const total = seguro.cotizarSeguro();

  ui.mostrarResultado(total, seguro);

  const resultados = document.querySelector("#resultado div");

  if (resultados != null) {
    resultados.remove();
  }
};

const eventListeners = () => {
  const formulario = document.querySelector("#cotizar-seguro");

  document.addEventListener("DOMContentLoaded", () => {
    ui.llenarOpciones();
  });

  formulario.addEventListener("submit", cotizarSeguro);
};

eventListeners();
