// DOM con los url, obtengo los arrays con getJSONData y los almaceno en 2 varibles.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (productResult) {
    console.log({ productResult });
    if (productResult.status === "ok") {
      getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (commentsResult) {
        console.log({ commentsResult });
        if (commentsResult.status === "ok") {
          //obtengo el array que contiene los comentarios del producto
          var coment_product = commentsResult.data;
          //obtengo el array que contiene los detalles del producto
          var info_producto = productResult.data;

          showMyProduct(info_producto, coment_product);
        }
      });
    }
  });
});

let productosRelacionados = [];

let infoProductsContainer = document.getElementById("product_info");
let commentsProductsContainer = document.getElementById("coments_info");

function showMyProduct(infoProducto, arrayComments) {
  let htmlContentToAppend = "";
  let htmlContentToAppend2 = "";

  htmlContentToAppend +=
    `
        <div  class="list-group-item list-group-item-action"  >
            <div class="row">
               <div>
                 <h1>` +
    infoProducto.name +
    `</h1>    
                 <h8> categoria: ` +
    infoProducto.category +
    `</h8>
    <div> 
    <div>
     <h3> Descripcion del producto:</h3> ` +
    infoProducto.description +
    `
    </div>
               
     <br><br>

      <div> <h3> precio:</h3> ` +
    infoProducto.cost +
    ` ` +
    infoProducto.currency +
    `
    <div id="carouselExampleControls" class="carousel slide reduceDivSize" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active reduceDivSize">
    <img src="img/prod${productID}_1.jpg" alt="product image"  class="img-thumbnail imagen_productos image_car">
    </div>
    <div class="carousel-item">
    <img src="img/prod${productID}_2.jpg" alt="product image"  class="img-thumbnail imagen_productos image_car">
    </div>
    <div class="carousel-item">
    <img src="img/prod${productID}_3.jpg" alt="product image"  class="img-thumbnail imagen_productos image_car">
    </div>
    <div class="carousel-item">
    <img src="img/prod${productID}_4.jpg" alt="product image"  class="img-thumbnail imagen_productos image_car">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
        
        
        <br>
        <button id="botonComprar" class="btn btn-info btn-md" style="background-color: #198754"   > COMPRAR </button>


    `;

  /* <div class="col-sm-8" style="width:20%; display:inline-block;">
        <img src="img/prod${productID}_1.jpg" alt="product image"  class="img-thumbnail imagen_productos image_car">
        </div>
        <div class="col-sm-8" style="width:20%; display:inline-block;">
        <img src="img/prod${productID}_2.jpg" alt="product image"  class="img-thumbnail imagen_productos image_car">
        </div>
        <div class="col-sm-8" style="width:20%; display:inline-block;">
        <img src="img/prod${productID}_3.jpg" alt="product image"  class="img-thumbnail imagen_productos image_car">
        </div>
        <div class="col-sm-8" style="width:20%; display:inline-block;">
        <img src="img/prod${productID}_4.jpg" alt="product image"  class="img-thumbnail imagen_productos image_car">
        </div> */

  //here begins the comment section
  for (let i = 0; i < arrayComments.length; i++) {
    let comentario = arrayComments[i];
    htmlContentToAppend2 += generarComentario(comentario);
  }

  htmlContentToAppend2 += generarComentario({
    score: parseInt(localStorage.getItem("valor")),
    description: localStorage.getItem("opina"),
    dateTime: new Date(),
    user: localStorage.getItem("nombreDeUsusario"),
  });

  infoProductsContainer.innerHTML = htmlContentToAppend;
  commentsProductsContainer.innerHTML += htmlContentToAppend2;

  //entrega 5 save the multiple id's in the same key
  document.getElementById("botonComprar").addEventListener("click", () => {
    if (localStorage.getItem("carrito")) {
      let produictosDelCarito = JSON.parse(localStorage.getItem("carrito"));
      produictosDelCarito.push(infoProducto.id);
      localStorage.setItem("carrito", JSON.stringify(produictosDelCarito));
    } else {
      localStorage.setItem("carrito", JSON.stringify([infoProducto.id]));
    }
    window.location = "categories.html";
  });
}
/* function lala() {
  localStorage.removeItem("carrito");
}
lala(); */

let botonsito = document.getElementById("tuOpinion");
let opina = document.getElementById("opinion");
let puntua = document.getElementById("valor");
botonsito.addEventListener("click", () => {
  localStorage.setItem("opina", opina.value);
  localStorage.setItem("valor", valor.value);
});
let elementoComentario = "";
function generarComentario(comentario) {
  let puntaje = "";

  for (let i = 1; i <= comentario.score; i++) {
    puntaje += `<span class="fa fa-star checked"></span> `;
  }

  for (let i = comentario.score + 1; i <= 5; i++) {
    puntaje += `<span class="fa fa-star"></span> `;
  }

  let elementoComentario =
    `
<div class="container contaenedor" >
<div class="estrellitas">` +
    puntaje +
    `
  <div class="comentario">` +
    comentario.user +
    ` comento: <br>` +
    comentario.description +
    ` </div>
    <div>
      <p>` +
    comentario.dateTime +
    `</p>
    </div>
    </div>
    </div>
    `;
  return elementoComentario;
}
// ACA EMPIEZA EL 4 =========================================
let articulosRelacionados = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function mostrarArticulosRelacionados(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let autitos = array[i];

    htmlContentToAppend +=
      `
        <div class="col-sm-8" style="width:20%; display:inline-block;  class="col" id="cajita" onclick= "setProductID(` +
      autitos.id +
      `)" >
            
                <div >
                    <img src="` +
      autitos.image +
      `" alt="product image"  class="imgRef">
                </div>
                
       <div > <p>` +
      autitos.name +
      `</p> 
                
                        </div>
                        
      
                    
            
        </div>
        `;
    document.getElementById("relacionado").innerHTML = htmlContentToAppend;
  }
}

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
      articulosRelacionados = resultObj.data.products.filter(
        (producto) => producto.id != productID
      );
      mostrarArticulosRelacionados(articulosRelacionados);
    }
  });
});
function setProductID(id) {
  localStorage.setItem("ProductID", id);
  location.href = "product-info.html";
}

/* function setIdPalCarrito(id) {
  let stringDelId = JSON.stringify(id);

  if (localStorage.getItem("carritoID") != id) {
    var existingEntries = JSON.parse(localStorage.getItem("carritoID"));
    valoresDelCarrito = localStorage.getItem("carritoID");
    valoresDelCarrito.push(stringDelId);
    localStorage.setItem("carritoID", JSON.stringify(valoresDelCarrito));
  } else {
    valoresDelCarrito = [JSON.stringify(id)];
    localStorage.setItem("carritoID", JSON.stringify(valoresDelCarrito));
  }
  location.reload();
} */
