/* let productoDelCarrito = [];

document.addEventListener("DOMContentLoaded", () => {
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productoDelCarrito = resultObj.data.articles;
      mostrarProductoDelCarrito(productoDelCarrito);
    }
  });
});
let htmlContentToAppend = "";
function mostrarProductoDelCarrito(array) {
  for (let i = 0; i < array.length; i++) {
    let autitos = array[i];
    htmlContentToAppend += `

   
          <tr class="flexingTheDivs"> 
            <td class="flexingTheDivs">
                <img src="${
                  autitos.image
                }" alt="product image" class="flexingTheDivs" id="imgChikita">
            </td>                  
            <td class="flexingTheDivs">
                <p>${autitos.name}</p> 
            </td>
            <td class="flexingTheDivs">
                <p>${autitos.currency}${autitos.unitCost}</p> 
            </td>
            <td class="flexingTheDivs" id="tamanio">
                <input  type="number" min="0" id="cantidad" value=${
                  autitos.count
                } style="width: 5ch" ></input> 
            </td>
            <td class="flexingTheDivs" >
               <p id="subTotal">USD${autitos.unitCost * autitos.count}</p> 
            </td>
         </tr>
   
          `;
    document.getElementById("productosQueCompre").innerHTML =
      htmlContentToAppend;

    let input = document.getElementById("cantidad");
    input.addEventListener("change", (e) => {
      const subtotal = document.getElementById("subTotal");
      let costoTotal = "USD" + autitos.unitCost * input.value;
      subtotal.innerHTML = costoTotal;
    });
  }
} */

//

//
//
//
///

///

//DESAFIATE

let arrayDeLinks = [];
let arrayCarritoId = JSON.parse(localStorage.getItem("carrito"));
let envios = document.getElementsByName("envio"); /* ENTREGA6 */

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < arrayCarritoId.length; i++) {
    let id = arrayCarritoId[i];
    let link =
      `https://japceibal.github.io/emercado-api/products/` + id + `.json`;
    if (!arrayDeLinks.includes(link)) {
      arrayDeLinks.push(link);
    }
  }

  for (let i = 0; i < arrayDeLinks.length; i++) {
    let cadaLink = arrayDeLinks[i];
    getJSONData(cadaLink).then(function (resultObj) {
      if (resultObj.status === "ok") {
        let producto = resultObj.data;

        mostrarProductosElegidos(producto);
      }
    });
  }
});

let htmlContentToAppend = ""; //si descomentas el individual comenta esta linea
function mostrarProductosElegidos(producto) {
  htmlContentToAppend += `

    <tr>   
          <td class="flexingTheDivs">
              <img src="${
                producto.images[0]
              }" alt="product image" class="flexingTheDivs" id="imgChikita">
          </td>                  
          <td class="flexingTheDivs">
              <p>${producto.name}</p> 
          </td>
          <td class="flexingTheDivs">
              <p>USD $${Math.round(producto.cost / 40)}</p> 
          </td>
          
          <td class="flexingTheDivs" id="tamanio">
              <input type="number" min="1" id="cantidades${
                producto.id
              }" value="1" style="width: 5ch"  onchange="calculoSubtotal(${
    producto.id
  }, ${producto.cost})"></input> 
          </td>
          <td class="flexingTheDivs">
              <p>USD</p> 
          </td>
          <td class="flexingTheDivs" >
             <p class="mostrarSubtotales" id="subTotales${
               producto.id
             }">${Math.round(producto.cost / 40)}</p> 
          </td>
          <td class="flexingTheDivs" >
          <button class="basura" onclick = "deleteProduct(${producto.id})">
          <span id="boot-icon" class="bi bi-trash" style="font-size: 17px; opacity: 1; color: rgb(252, 131, 131); -webkit-text-stroke: 0px rgb(0, 0, 0);"></span>
          </button>
          </td>
          
      </tr>
        `;

  document.getElementById("productosQueCompre").innerHTML = htmlContentToAppend;
  sumaSubtotales();
}

function calculoSubtotal(id, cost) {
  let cantidad = parseInt(document.getElementById(`cantidades${id}`).value); //llamo al valor del input especifico con el {id}

  let subt = Math.round(cantidad * (cost / 40));
  document.getElementById(`subTotales${id}`).innerHTML = subt; //mustro el resultado
  sumaSubtotales(); //llamo a la funcion del el calculo  de la entrega 6
}

//entrega 6
let subtotalTotal = document.getElementById("subtotalTotal");

let costoTotal = document.getElementById("costoTotal");

function sumaSubtotales() {
  let subtotales = document.getElementsByClassName("mostrarSubtotales"); //llamo a todos los subtotales a partir de la clase
  let sumaTotales = 0;
  for (let i = 0; i < subtotales.length; i++) {
    sumaTotales += parseInt(subtotales[i].innerHTML); // los sumo a todos
  }
  subtotalTotal.innerHTML = sumaTotales; //muestro la suma de los subtotales
  calculoDeEnvio(); //llamo a la funcion
}
let porcentaje;
function calculoDeEnvio() {
  let costoEnvio = document.getElementById("costoEnvio"); // llamo el td que tiene el costo de envio porque si lo hacia afuera no andaba
  let envios = document.getElementsByName("envio"); //name de los ratios
  for (let i = 0; i < envios.length; i++) {
    let envioreal = envios[i];
    if (envioreal.checked) {
      porcentaje = envioreal.value; //me quedo con el porcentaje que tengo que sumarle
    }
  }
  let subtotales = parseInt(subtotalTotal.innerHTML); //traigo el valor de la suma de los subtotales
  let envioCosto = Math.round((porcentaje / 100) * subtotales); //calculo el cargo de envio

  costoEnvio.innerHTML = envioCosto; //muestro el cargo de envio en el html
  costoTotal.innerHTML = envioCosto + subtotales; //calculo y mustro el costo total
}

let radaioTDeCredito = document.getElementById("TDeCredito");
let radioTBancaria = document.getElementById("TBancaria");

let input1ro = document.getElementById("input1");
let input2do = document.getElementById("input2");
let input3ro = document.getElementById("input3");
let nCuenta = document.getElementById("inputDeBancaria");

let alerta = document.getElementById("seleccionaMetodo");
alerta.style.display = "inline-block";

if (radaioTDeCredito.checked) {
  nCuenta.removeAttribute("required", "");
  nCuenta.setAttribute("disabled", "");

  input3ro.removeAttribute("disabled", "");
  input3ro.setAttribute("required", "");
  input2do.removeAttribute("disabled", "");
  input2do.setAttribute("required", "");
  input1ro.removeAttribute("disabled", "");
  input1ro.setAttribute("required", "");
}
let metodoValor;
function validar() {
  let metodoDePago = document.getElementsByName("metodoDePago");
  for (let i = 0; i < metodoDePago.length; i++) {
    const metodo = metodoDePago[i];
    if (metodo.checked) {
      metodoValor = metodo.value;
    }
    //console.log(metodoValor);
  }
  if (metodoValor == "credito") {
    nCuenta.removeAttribute("required", "");
    nCuenta.setAttribute("disabled", "");
    nCuenta.value = "";

    input3ro.removeAttribute("disabled", "");
    input3ro.setAttribute("required", "");
    input2do.removeAttribute("disabled", "");
    input2do.setAttribute("required", "");
    input1ro.removeAttribute("disabled", "");
    input1ro.setAttribute("required", "");
    if (input1ro !== "" && input2do !== "" && input3ro !== "") {
      alerta.style.display = "none";
    } else {
      alerta.style.display = "inline-block";
    }
  }
  if (metodoValor == "transferencia") {
    nCuenta.removeAttribute("disabled", "");
    nCuenta.setAttribute("required", "");

    input3ro.removeAttribute("required", "");
    input3ro.setAttribute("disabled", "");
    input3ro.value = "";
    input2do.removeAttribute("required", "");
    input2do.setAttribute("disabled", "");
    input2do.value = "";
    input1ro.removeAttribute("required", "");
    input1ro.setAttribute("disabled", "");
    input1ro.value = "";
    if (nCuenta !== "") {
      alerta.style.display = "none";
    } else {
      alerta.style.display = "inline-block";
    }
  }
}
function salioTodoBien() {
  document.getElementById("salioBien").classList.add("show");
}

//sas
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          salioTodoBien();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function deleteProduct(id) {
  let cartItems = JSON.parse(localStorage.getItem("carrito"));
  for (let prod of cartItems) {
    if (id == prod) {
      cartItems.splice(cartItems.indexOf(prod), 1);
    }
  }
  localStorage.setItem("carrito", JSON.stringify(cartItems));
  location.href = "cart.html";
}
