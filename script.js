const livros = [
    {titulo: "Dom Casmurro", disponivel: false, autor: "Machado de Assis", descricao: "Clássico da literatura brasileira narrado por Bentinho, que relembra sua juventude e o relacionamento com Capitu. A obra explora temas como ciúme, memória, insegurança e a subjetividade da verdade, deixando o leitor refletir sobre o que realmente aconteceu.", imagem: "https://upload.wikimedia.org/wikipedia/commons/0/05/DomCasmurroMachadodeAssis.jpg"},
    {titulo: "Harry Potter", disponivel: true, autor: "J.K. Rowling", descricao: "A série acompanha Harry, um garoto que descobre ser bruxo e passa a estudar em Hogwarts. Ao lado de amigos, ele enfrenta desafios, descobre segredos do passado e luta contra o poderoso Voldemort em uma história sobre amizade, coragem e crescimento.", imagem: "https://upload.wikimedia.org/wikipedia/pt/3/3a/Harry_Potter_and_the_Deathly_Hallows_-_Part_2.jpg"},
    {titulo: "Senhor dos Anéis", disponivel: true, autor: "J.R.R. Tolkien", descricao: "Uma épica jornada na Terra Média em que Frodo precisa destruir o Um Anel para impedir que o mal domine o mundo. A história mistura aventura, amizade, coragem e sacrifício em um universo rico e detalhado que marcou a fantasia moderna.", imagem: "https://upload.wikimedia.org/wikipedia/pt/5/59/The_Lord_of_the_Rings_The_Two_Towers.jpg"},
    {titulo: "O Pequeno Príncipe", disponivel: true, autor: "Antoine de Saint-Exupéry", descricao: "Um conto sensível e filosófico que acompanha um pequeno viajante de outro planeta. Durante suas viagens, ele aprende lições profundas sobre amizade, amor, solidão e a importância de enxergar o mundo com o coração.", imagem: "https://upload.wikimedia.org/wikipedia/pt/4/47/O-pequeno-pr%C3%ADncipe.jpg"},
    {titulo: "Percy Jackson", disponivel: false, autor: "Rick Riordan", descricao: "Percy descobre ser filho de Poseidon e passa a viver aventuras em um mundo onde a mitologia grega é real. Com humor e ação, a série mostra a jornada de heróis jovens enfrentando monstros, deuses e desafios enquanto descobrem quem realmente são.", imagem: "https://grafipel.com.br/wp-content/uploads/2026/03/00137958.jpg"}
];

const container = document.getElementById("resultadosBusca");
const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modalTitulo");
const modalDescricao = document.getElementById("modalDescricao");
const closeModal = document.getElementById("closeModal");

function exibirLivros(lista) {
    container.innerHTML = "";

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