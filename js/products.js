//array donde se cargarán los datos recibidos:
// que ya no es de autos ahora es de lo que le pases, pero se entiende
let busqueda = document.getElementById("busqueda");
let listadoDeAutos = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function mostrarListadoDeAutos(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let autitos = array[i];

    if (
      (costo_minimo == undefined ||
        (costo_minimo != undefined &&
          parseInt(autitos.cost) >= costo_minimo)) &&
      (costo_maximo == undefined ||
        (costo_maximo != undefined && parseInt(autitos.cost) <= costo_maximo))
    ) {
      htmlContentToAppend +=
        `
        <div onclick= "setProductID(` +
        autitos.id +
        `)" class="list-group-item list-group-item-action"   >
            <div class="row">
                <div class="col-3">
                    <img src="` +
        autitos.image +
        `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>` +
        autitos.name +
        " - " +
        autitos.currency +
        autitos.cost +
        `</h4> 
                        <p> ` +
        autitos.description +
        `</p> 
                        </div>
                        <small class="text-muted">` +
        ` </small> 
      <small class="text-muted">` +
        autitos.soldCount +
        ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `;
      document.getElementById("autos-list-container").innerHTML =
        htmlContentToAppend;
    }
  }
}
/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en listadoDeAutos.
-Por último, se llama a mostrarListadoDeAutos() pasándole por parámetro categoriesArray.

*/

document.addEventListener("DOMContentLoaded", function (e) {
  //Obtiene el ID de la categoria desde el localStorage
  let catID = localStorage.getItem("catID");
  // creo una variable para almacenar el URL que corresponda
  let listaDeProductos;

  //ahora usamos if para verifical cual id tenemis
  if (catID == 101) {
    listaDeProductos = AUTOS_LISTA_URL;
  } else if (catID == 102) {
    listaDeProductos = JUGUETES_LISTA_URL;
  } else if (catID == 103) {
    listaDeProductos = MUEBLES_LISTA_URL;
  } else if (catID == 104) {
    listaDeProductos = HERRAMIENTAS_LISTA_URL;
  } else if (catID == 105) {
    listaDeProductos = COMPUTADORAS_LISTA_URL;
  } else if (catID == 106) {
    listaDeProductos = VESTIMENTA_LISTA_URL;
  } else if (catID == 107) {
    listaDeProductos = ELECTRODOMESTICOS_LISTA_URL;
  } else if (catID == 108) {
    listaDeProductos = DEPORTE_LISTA_URL;
  } else if (catID == 109) {
    listaDeProductos = CELULARES_LISTA_URL;
  }

  getJSONData(listaDeProductos).then(function (resultObj) {
    if (resultObj.status === "ok") {
      articulosRelacionados = resultObj.data.products;
      mostrarListadoDeAutos(articulosRelacionados);
    }
  });
});

let maximo = document.getElementById("costoMayor");
let minimo = document.getElementById("costoMinimo");
let filtro = document.getElementById("filtrar");
let limpiar = document.getElementById("limpiar");
//creamos dos variables con valor indefinido que nos van ayudar a darle un valor inicial a los de minimo y maximo para que al tener estos vacios se muestre la lista de productos igualmente.
let costo_minimo = undefined;
let costo_maximo = undefined;

let ascendente = document.getElementById("btnAscendente");
let descendente = document.getElementById("btnDescendente");
let relevancia = document.getElementById("btnRelevanvia");

filtro.addEventListener("click", function () {
  costo_minimo = minimo.value; //seria el valor que le ingresamos en el inmput
  costo_maximo = maximo.value;
  //ahora nos fijamos si le pasamos un valor o no si es asi toma el valor sino es igual a undefined
  if (costo_minimo != undefined && costo_minimo != "" && costo_minimo >= 0) {
    costo_minimo = costo_minimo;
  } else {
    costo_minimo = undefined;
  }

  if (costo_maximo != undefined && costo_maximo != "" && costo_maximo >= 0) {
    costo_maximo = costo_maximo;
  } else {
    costo_maximo = undefined;
  }

  //finalmente llamamos a la funcion de mostrar productos y le enviamos el array  en el que aplicara los filtros, nuestro array de productos.
  mostrarListadoDeAutos(articulosRelacionados);
});

limpiar.addEventListener("click", function () {
  minimo.value = "";
  maximo.value = "";

  costo_maximo = undefined;
  costo_minimo = undefined;

  busqueda.value = "";
  mostrarListadoDeAutos(articulosRelacionados);
});

ascendente.addEventListener("click", function () {
  // 2do: me creo un array para almacenar mi array ordenado de product
  let productoOrdenado = [];
  //3ro: asigno la lista de productos que quiero ordenar a otra variable para identificarla mas fácilmente.
  let productosAOrdenar = articulosRelacionados;
  //con ayuda de la función de JavaScript .sort() ordeno la función haciendo uso de la función anónima funtcion(a,b) que es una función comparativa que me permite ordenar el array comparando el dato a y b del array.
  productoOrdenado = productosAOrdenar.sort(function (a, b) {
    //en este caso lo comparamos por el costo de los productos a.cost – b.cost. y el return nos ayuda a devolver el producto con menor costo primero.
    return a.cost - b.cost;
  });
  //enviamos el array ordenado a la función de mostrarProductos
  mostrarListadoDeAutos(productoOrdenado);
});
relevancia.addEventListener("click", () => {
  let productoOrdenado = [];
  let productosAOrdenar = articulosRelacionados;
  productoOrdenado = productosAOrdenar.sort(function (a, b) {
    return a.soldCount - b.soldCount;
  });
  mostrarListadoDeAutos(productoOrdenado);
});

//para el descendente es lo mismo que para el ascendente pero al revés. Van primero los mas costosos.

descendente.addEventListener("click", function () {
  let productoOrdenado = [];
  let productosAOrdenar = articulosRelacionados;
  productoOrdenado = productosAOrdenar.sort(function (a, b) {
    return b.cost - a.cost;
  });
  mostrarListadoDeAutos(productoOrdenado);
});

//desafiate: crear un buscardor
busqueda.addEventListener("keyup", (e) => {
  let busco = e.target.value.toLowerCase();
  console.log(busco);
  let elementosFiltrados = [];
  elementosFiltrados = articulosRelacionados.filter((elemento) => {
    return (
      elemento.name.toLowerCase().includes(busco) ||
      elemento.description.toLowerCase().includes(busco)
    );
  });
  mostrarListadoDeAutos(elementosFiltrados);
});

/* let anchor = document.getElementById("aQueSacaLineas")
anchor.addEventListener(click, () => {
  localStorage.setItem('identificador', anchor.value);
}) */

function setProductID(id) {
  localStorage.setItem("ProductID", id);
  location.href = "product-info.html";
}
