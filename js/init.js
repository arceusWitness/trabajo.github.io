if (localStorage.getItem("nombreDeUsusario") != null) {
  let NombreUsuario = localStorage.getItem("nombreDeUsusario");
  const contenedor = document.getElementById("dropdownMenuLink");
  contenedor.innerHTML = NombreUsuario;
}

const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";

const CART_INFO_URL =
  "https://japceibal.github.io/emercado-api/user_cart/25801.json";
/* "https://japceibal.github.io/emercado-api/user_cart/"; */
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const AUTOS_LISTA_URL =
  "https://japceibal.github.io/emercado-api/cats_products/101.json";
const JUGUETES_LISTA_URL =
  "https://japceibal.github.io/emercado-api/cats_products/102.json";
const MUEBLES_LISTA_URL =
  "https://japceibal.github.io/emercado-api/cats_products/103.json";
const HERRAMIENTAS_LISTA_URL =
  "https://japceibal.github.io/emercado-api/cats_products/104.json";
const COMPUTADORAS_LISTA_URL =
  "https://japceibal.github.io/emercado-api/cats_products/105.json";
const VESTIMENTA_LISTA_URL =
  "https://japceibal.github.io/emercado-api/cats_products/106.json";
const ELECTRODOMESTICOS_LISTA_URL =
  "https://japceibal.github.io/emercado-api/cats_products/107.json";
const DEPORTE_LISTA_URL =
  "https://japceibal.github.io/emercado-api/cats_products/108.json";
const CELULARES_LISTA_URL =
  "https://japceibal.github.io/emercado-api/cats_products/109.json";

// agarro la info del id del producto y se lo mando al PRODUCT_INFO_URL y RODUCT_INFO_COMMENTS_URL
let productID = localStorage.getItem("ProductID");

const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
const SINGLE_PRODUCT_URL = `https://japceibal.github.io/emercado-api/products/`;

const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};
