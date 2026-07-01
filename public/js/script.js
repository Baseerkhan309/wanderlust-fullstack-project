// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");

if (searchInput) {

  searchInput.addEventListener("input", async () => {

    const query = searchInput.value.trim();

    if (query.length === 0) {
      suggestionsBox.innerHTML = "";
      return;
    }

    const response = await fetch(`/listings/suggestions?query=${query}`);

    const suggestions = await response.json();

    console.log(suggestions);

  });

}