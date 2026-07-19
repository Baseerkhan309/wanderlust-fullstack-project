// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

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

    // suggestionsBox
    suggestionsBox.innerHTML = ""; // remove first old suggestion.

    if (suggestions.length === 0) {

      // if no suggestion : inside search bar apear
      suggestionsBox.innerHTML = `
        <div class="suggestion-item">
             No suggestions found
        </div>
    `;

      suggestionsBox.style.display = "block";
      return;

    }
    suggestions.forEach((listing) => { // if mongodb return nothing. hide dropdown

      suggestionsBox.innerHTML +=
        // data location is custom html attribute like if we search sw so it will be = sw
        `<div class="suggestion-item" data-location="${listing.location}"> 
          ${listing.location}<br>
            ${listing.title}
        </div>`
        ;

    });

    // sugesstion item is sugestion listing.if 2 listing JS create 2 divs
    document.querySelectorAll(".suggestion-item").forEach((item) => {
      item.addEventListener("click", () => {

        searchInput.value = item.dataset.location;
        suggestionsBox.style.display = "none";
        searchInput.form.submit();

      });
    });

    suggestionsBox.style.display = "block";

  });

}

document.addEventListener("click", (event) => {
  if (
    !searchInput.contains(event.target) &&
    !suggestionsBox.contains(event.target)
  ) {
    suggestionsBox.style.display = "none";
  }
});

// For Price
const priceInput = document.querySelector("#price");

if (priceInput) {
  priceInput.addEventListener("input", function () {
    if (this.value < 1) {
      this.value = "";
    }
  });
}

// For Images // Maximum 3 images validation
const imageInput = document.querySelector("#images");

if (imageInput) {

  imageInput.addEventListener("change", function () {

    if (this.files.length > 3) {

      this.classList.add("is-invalid");
      this.value = "";

    } else {

      this.classList.remove("is-invalid");

    }

  });

}