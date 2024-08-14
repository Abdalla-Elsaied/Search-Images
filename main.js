const accesskey = "I70n6DzgGzFPTFWhbRWb_RqT1kdJ2kNN6e6vpndcF_s";

const formEl = document.querySelector("form")
const inputEL = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const ShowMore = document.getElementById("show-more-button")

let inputdata = ""
let page = 1;


async function searchImages() {
    inputdata = inputEL.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesskey}`
    const response = await fetch(url)
    const data = await response.json()
    const results = data.results
    if (page === 1) {
        searchResults.innerHTML = "";
    }
    results.map((result) => {

        const imageWarapper = document.createElement('div')
        imageWarapper.classList.add("search-result")
        const image = document.createElement("img")
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement('a')
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description
        imageWarapper.appendChild(image)
        imageWarapper.appendChild(imageLink)
        searchResults.appendChild(imageWarapper)
    })
    page++
    if (page > 1) {
        ShowMore.style.display = "block"
    }
}
formEl.addEventListener("submit", (event) => {
    event.preventDefault()
    page = 1;
    searchImages();
})
ShowMore.addEventListener("click", () => {
    searchImages();
})
