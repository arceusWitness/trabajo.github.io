(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");
  let email = document.getElementById("validationCustomUsername");
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          location.href = "paginaPrincipal.html";
          localStorage.setItem("nombreDeUsusario", email.value); //(me)if everything is right the email its gona be saved in local storage and be redirected to the main page
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
