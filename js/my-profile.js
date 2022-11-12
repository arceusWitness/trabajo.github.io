let fileProfile = document.getElementById("pic");
let showpicture = document.getElementById("showPic");
fileProfile.addEventListener("change", () => {
  const fR = new FileReader(); //as in file Reader
  fR.readAsDataURL(fileProfile.files[0]);

  fR.onload = () => {
    const urL = fR.result;

    localStorage.setItem("my-image", urL);
    window.location.reload();
  };
});

if (localStorage.getItem("nombreDeUsusario") != null) {
  let NombreUsuario = localStorage.getItem("nombreDeUsusario");
  const contenedor = document.getElementById("dropdownMenuLink");
  contenedor.innerHTML = NombreUsuario;
}

function loggingCorroboration() {
  if (localStorage.getItem("nombreDeUsusario") != "") {
    location.href = "my-profile.html";
  } else {
    alert("ingrese nombre de usuario");
  }
}

function saveData(e) {
  e.preventDefault();
  localStorage.setItem(
    "nombre",
    document.getElementById("validationCustom01").value
  );

  localStorage.setItem(
    "segundoNombre",
    document.getElementById("validationCustom02").value
  );

  localStorage.setItem(
    "apellido",
    document.getElementById("validationCustom03").value
  );

  localStorage.setItem(
    "segundoApellido",
    document.getElementById("validationCustom04").value
  );

  localStorage.setItem(
    "numeroDeContacto",
    document.getElementById("validationCustom06").value
  );
}

document.addEventListener("DOMContentLoaded", function (e) {
  let nombre = document.getElementById("validationCustom01");
  nombre.value = localStorage.getItem("nombre");
  let segundoNombre = document.getElementById("validationCustom02");
  segundoNombre.value = localStorage.getItem("segundoNombre");
  let apellido = document.getElementById("validationCustom03");
  apellido.value = localStorage.getItem("apellido");
  let segundoApellido = document.getElementById("validationCustom04");
  segundoApellido.value = localStorage.getItem("segundoApellido");
  let email = document.getElementById("validationCustom05");
  email.value = localStorage.getItem("nombreDeUsusario");
  let numero = document.getElementById("validationCustom06");
  numero.value = localStorage.getItem("numeroDeContacto");
  let profileImg = () => {
    return localStorage.getItem("my-image");
  };
  let showImg = () => {
    if (profileImg()) {
      showpicture.src = profileImg();
    }
  };
  showImg();
});

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
          saveData;
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
