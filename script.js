const livros = [
    {titulo: "Dom Casmurro", disponivel: false, autor: "Machado de Assis", descricao: "Clássico de Machado de Assis.", imagem: "https://upload.wikimedia.org/wikipedia/commons/0/05/DomCasmurroMachadodeAssis.jpg"},
    {titulo: "Harry Potter", disponivel: true, autor: "J.K. Rowling", descricao: "Livro de magia e aventura.", imagem: "https://upload.wikimedia.org/wikipedia/pt/3/3a/Harry_Potter_and_the_Deathly_Hallows_-_Part_2.jpg"},
    {titulo: "Senhor dos Anéis", disponivel: true, autor: "J.R.R. Tolkien", descricao: "Fantasia épica.", imagem: "https://upload.wikimedia.org/wikipedia/pt/5/59/The_Lord_of_the_Rings_The_Two_Towers.jpg"},
    {titulo: "O Pequeno Príncipe", disponivel: true, autor: "Antoine de Saint-Exupéry", descricao: "Livro filosófico.", imagem: "https://upload.wikimedia.org/wikipedia/pt/4/47/O-pequeno-pr%C3%ADncipe.jpg"},
    {titulo: "Percy Jackson", disponivel: false, autor: "Rick Riordan", descricao: "Mitologia grega moderna.", imagem: "https://grafipel.com.br/wp-content/uploads/2026/03/00137958.jpg"}
];

const container = document.getElementById("resultadosBusca");
const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modalTitulo");
const modalDescricao = document.getElementById("modalDescricao");
const closeModal = document.getElementById("closeModal");

function exibirLivros(lista) {
    container.innerHTML = ""; // Limpa a tela antes de renderizar

    lista.forEach((livro) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const titulo = document.createElement("h3");
        titulo.textContent = livro.titulo;

        const status = document.createElement("p");
        status.textContent = livro.disponivel ? "Disponível" : "Indisponível";
        status.classList.add("status");
        status.classList.add(livro.disponivel ? "disponivel" : "indisponivel");

        let capa;
        if (livro.imagem) {
            capa = document.createElement("img");
            capa.src = livro.imagem;
            capa.classList.add("capa-foto");
        } else {
            capa = document.createElement("div");
            capa.classList.add("capa");
            capa.textContent = "X";
        }

        const btnAcao = document.createElement("button");
        btnAcao.textContent = livro.disponivel ? "RESERVAR" : "RESERVADO";
        if (!livro.disponivel) btnAcao.disabled = true;

        const linkDesc = document.createElement("span");
        linkDesc.textContent = "ver descrição";
        linkDesc.classList.add("descricao-link");

        btnAcao.addEventListener("click", () => {
            livro.disponivel = false;
            exibirLivros(lista); 
        });

        linkDesc.addEventListener("click", () => {
            modalTitulo.textContent = livro.titulo;
            modalDescricao.textContent = livro.descricao;
            modal.style.display = "block";
        });

        // 3. Montagem
        card.appendChild(titulo);
        card.appendChild(status);
        card.appendChild(capa); // Adiciona a imagem ou a div com X
        card.appendChild(btnAcao);
        card.appendChild(linkDesc);

        container.appendChild(card);
    });
}

closeModal.onclick = () => {
    modal.style.display = "none";
};

document.getElementById("searchInput").addEventListener("input", (e) => {
    const termo = e.target.value.toLowerCase();
    const filtrados = livros.filter(l => l.titulo.toLowerCase().includes(termo));
    exibirLivros(filtrados);
});

exibirLivros(livros);