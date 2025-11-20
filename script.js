var apiKey = "poner_aqui_tu_api_key";
var noticias = [];
var temporales = [];

function cargarNoticias() {
    var xhr = new XMLHttpRequest();
    var url = "https://newsapi.org/v2/top-headlines?country=us&pageSize=30&apiKey=" + apiKey;

    xhr.open("GET", url, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);

            noticias = data.articles.slice(0, 30);

            actualizarCards(NoticiasRandom6(noticias));
        } else {
            console.error("Error:", xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error("Error de conexión");
    };

    xhr.send();
}

function NoticiasRandom6(noticias) {
    var copia = noticias.slice();

    for (let i = copia.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    temporales = copia.slice(0, 6);
    return temporales;
}

function actualizarCards(noticias) {
    for (let i = 1; i <= 6; i++) {
        const card = document.getElementById(i);

        const title = card.querySelector(".cardTitle");
        const text  = card.querySelector(".cardText");
        const author = card.querySelector(".author i");

        title.textContent = noticias[i-1].title;
        text.textContent  = noticias[i-1].description;
        author.textContent = noticias[i-1].author || "Desconocido";
    }
}

function verNoticia(indice) {
    const noticia = document.getElementById("noticia");
    const contenido = temporales[indice - 1];

    const title = noticia.querySelector(".contentTitle");
    const author  = noticia.querySelector(".author i");
    const content = noticia.querySelector(".content");
    const sourceLink = noticia.querySelector(".sourceLink");

    title.textContent = contenido.title;
    author.textContent = contenido.author || "Desconocido";
    content.textContent  = contenido.content;
    sourceLink.innerHTML = "Ver noticia completa en: " + `<a href="${contenido.url}" target="_blank">Fuente</a>`;
}

cargarNoticias();