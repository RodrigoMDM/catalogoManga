const containerManga = document.querySelector(".container-manga") as HTMLElement;

const completoBtn = document.getElementById("completoBtn") as HTMLElement;
const comprandoBtn = document.getElementById("comprandoBtn") as HTMLElement;
const largadoBtn = document.getElementById("largadoBtn") as HTMLElement;
const pausadoBtn = document.getElementById("pausadoBtn") as HTMLElement;
const todosBtn = document.getElementById("todosBtn") as HTMLElement;

completoBtn.addEventListener("click", () => buscarMangasPorStatus("Completo"));
comprandoBtn.addEventListener("click", () => buscarMangasPorStatus("Comprando"));
largadoBtn.addEventListener("click", () => buscarMangasPorStatus("Largado"));
pausadoBtn.addEventListener("click", () => buscarMangasPorStatus("Pausado"));
todosBtn.addEventListener("click", () => buscarTodosMangas());

// Função para buscar todos os mangás ao carregar a página
async function buscarTodosMangas() {
    try {
        const busca = await fetch("https://sheet.best/api/sheets/52e3d802-5a8f-4172-9d29-b191990200a0");
        const mangas = await busca.json();

        if (!Array.isArray(mangas)) {
            throw new Error("Mangás não foram encontrados.");
        }

        containerManga.innerHTML = ""; // Limpar o conteúdo antes de adicionar mangás

        mangas.forEach(manga => {
            if (manga.N == "") {
                throw new Error("Mangá não tem número!");
            }

            containerManga.innerHTML += `
            <div class="col-8 col-md-3 col-xl-2 mx-5 mb-3 manga__item">
                    <div class="card mx-1 h-100" style="width: 18rem;">
                        <img src="${manga.Capa}" class="card-img-top"
                            alt="Capa do mangá ${manga.Mangá}, volume 1">
                        <div class="card-body">
                            <h5 class="card-title mb-2">${manga.Mangá}</h5>
                            <p class="card-text"><b>Número:</b> ${manga.Num} | <b>Última:</b> ${manga.Última}<br>
                            <b>Restante:</b> ${manga.Restantes} | <b>Status:</b> ${manga.Comprando}<br>
                            <b>Finalizada:</b> ${manga.Finalizada} <br>
                            <b>Números faltantes:</b> ${manga.Faltantes} <br> 
                            <b>OBS:</b> ${manga.OBS}
                            <p class="card-text d-none"><b>Editora:</b> ${manga.Editora}</p>
                            <img src="./img/${manga.Editora}.png" alt="Logo da editora ${manga.Editora}" height="20">
                        </div>
                        <button class="btn btn-primary rounded-0 botao-editar" type="button" data-bs-toggle="modal" data-bs-target="#editarManga">Editar</button>
                    </div>
                    
                </div>
                `;
        });
    } catch (error) {
        containerManga.innerHTML = `<p>Houve um erro ao carregar: ${error}</p>`;
    }
}

// Função para buscar os mangás por Status

async function buscarMangasPorStatus(status: string) {
    try {
        const busca = await fetch("https://sheet.best/api/sheets/52e3d802-5a8f-4172-9d29-b191990200a0");
        const mangas = await busca.json();

        if (!Array.isArray(mangas)) {
            throw new Error("Mangás não foram encontrados.");
        }

        containerManga.innerHTML = ""; // Limpar o conteúdo antes de adicionar mangás

        mangas.forEach(manga => {
            if (manga.N == "") {
                throw new Error("Mangá não tem número!");
            }

            if (manga.Comprando === status) {
                containerManga.innerHTML += `
                <div class="col-8 col-md-3 col-xl-2 mx-5 mb-3 manga__item">
                <div class="card mx-1 h-100" style="width: 18rem;">
                    <img src="${manga.Capa}" class="card-img-top"
                        alt="Capa do mangá ${manga.Mangá}, volume 1">
                    <div class="card-body">
                        <h5 class="card-title mb-2">${manga.Mangá}</h5>
                        <p class="card-text"><b>Número:</b> ${manga.Num} | <b>Última:</b> ${manga.Última}<br>
                        <b>Restante:</b> ${manga.Restantes} | <b>Status:</b> ${manga.Comprando}<br>
                        <b>Finalizada:</b> ${manga.Finalizada} <br>
                        <b>Números faltantes:</b> ${manga.Faltantes} <br> 
                        <b>OBS:</b> ${manga.OBS}
                        <p class="card-text d-none"><b>Editora:</b> ${manga.Editora}</p>
                        <img src="./img/${manga.Editora}.png" alt="Logo da editora ${manga.Editora}" height="20">
                    </div>
                    <button class="btn btn-primary rounded-0 botao-editar" type="button" data-bs-toggle="modal" data-bs-target="#editarManga">Editar</button>
                </div>
                
            </div>
                    `;
            }
        });
    } catch (error) {
        containerManga.innerHTML = `<p>Houve um erro ao carregar: ${error}</p>`;
    }
}

// Função para pesquisa de mangas

const barraDePesquisa = document.querySelector(".pesquisar__input") as HTMLInputElement;

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
    const mangas = document.querySelectorAll(".manga__item");
    const valorFiltro = barraDePesquisa.value.toLowerCase();

    mangas.forEach((manga) => {
        const mangaNome = manga.querySelector(".card-title")?.textContent.toLowerCase();
        if (mangaNome && mangaNome.includes(valorFiltro)) {
            (manga as HTMLElement).style.display = "block"; // Converter manga para HTMLElement
        } else {
            (manga as HTMLElement).style.display = "none"; // Converter manga para HTMLElement
        }
    });
}

buscarTodosMangas()