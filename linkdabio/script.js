/* ============================================================
   XIBIU DEMAIS — script.js
   Edite o array `products` para adicionar, remover ou alterar
   os produtos exibidos na pagina.
============================================================ */

// ============================================================
//  ARRAY DE PRODUTOS
//  Campos disponiveis:
//    id          -> numero unico (nao repita)
//    name        -> nome do produto
//    description -> descricao curta
//    tag         -> badge no canto da imagem (texto puro)
//    price       -> preco ou label (deixe "" para ocultar)
//    button      -> texto do botao CTA
//    link        -> URL de afiliado (coloque o link real aqui)
//    image       -> URL da imagem do produto ("" usa placeholder)
// ============================================================
const products = [
  {
    id: 1,
    name: "Produto queridinho da semana",
    description: "Aquele achadinho que todo mundo pergunta. Super pratico e com entrega rapida.",
    tag: "Em alta",
    price: "R$ 49,90",
    button: "Ver produto",
    link: "#",
    image: ""
  },
  {
    id: 2,
    name: "Oferta boa demais",
    description: "Preco especial por tempo limitado. Vale muito a pena conferir.",
    tag: "Promocao",
    price: "R$ 29,90",
    button: "Pegar promocao",
    link: "#",
    image: ""
  },
  {
    id: 3,
    name: "Hidratante favorito",
    description: "Pele hidratada e com otimo aroma o dia todo. Muito bem avaliado.",
    tag: "Favorito",
    price: "R$ 39,90",
    button: "Conferir agora",
    link: "#",
    image: ""
  },
  {
    id: 4,
    name: "Kit organizador de cozinha",
    description: "Bonito, pratico e super duravel. Transformou minha cozinha completamente.",
    tag: "Casa",
    price: "R$ 89,90",
    button: "Ver na loja",
    link: "#",
    image: ""
  },
  {
    id: 5,
    name: "Batom duradouro que virou febre",
    description: "Dura o dia todo e vem em 10 cores incriveis. Excelente custo-beneficio.",
    tag: "Beleza",
    price: "R$ 19,90",
    button: "Comprar agora",
    link: "#",
    image: ""
  },
  {
    id: 6,
    name: "Luminaria LED decorativa",
    description: "Iluminacao elegante para qualquer ambiente. Facil de instalar.",
    tag: "Favorito",
    price: "R$ 59,90",
    button: "Ver produto",
    link: "#",
    image: ""
  },
  {
    id: 7,
    name: "Mascara facial renovadora",
    description: "Pele renovada em 15 minutos. Resultado visivel desde a primeira aplicacao.",
    tag: "Em alta",
    price: "R$ 44,90",
    button: "Comprar agora",
    link: "#",
    image: ""
  },
  {
    id: 8,
    name: "Jogo de cama premium",
    description: "Tecido macio e fresco. Qualidade percebida na primeira noite.",
    tag: "Promocao",
    price: "R$ 129,90",
    button: "Ver oferta",
    link: "#",
    image: ""
  },
  {
    id: 9,
    name: "Perfume importado acessivel",
    description: "Fragancia marcante por um preco honesto. Duracao excelente.",
    tag: "Favorito",
    price: "R$ 79,90",
    button: "Ver produto",
    link: "#",
    image: ""
  },
  {
    id: 10,
    name: "Escova modeladora 3 em 1",
    description: "Liso, ondulado ou cachos com uma unica escova. Otimo acabamento.",
    tag: "Em alta",
    price: "R$ 99,90",
    button: "Ver produto",
    link: "#",
    image: ""
  }
];

// ============================================================
//  ESTADO
// ============================================================
let currentSearch = "";

// ============================================================
//  CRIAR CARD DE PRODUTO
// ============================================================
function createProductCard(product, index) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.style.animationDelay = `${index * 0.06}s`;
  card.setAttribute("aria-label", product.name);

  const imageContent = product.image
    ? `<img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" loading="lazy" />`
    : `<div class="card-image-placeholder" aria-hidden="true"></div>`;

  const priceHTML = product.price
    ? `<p class="card-price">${escapeHTML(product.price)}</p>`
    : "";

  card.innerHTML = `
    <div class="card-image-area">
      ${imageContent}
      <span class="card-tag">${escapeHTML(product.tag)}</span>
    </div>
    <div class="card-body">
      <h3 class="card-title">${escapeHTML(product.name)}</h3>
      <p class="card-description">${escapeHTML(product.description)}</p>
      ${priceHTML}
      <a
        href="${escapeHTML(product.link)}"
        target="_blank"
        rel="noopener noreferrer"
        class="card-cta"
        aria-label="${escapeHTML(product.button)} — ${escapeHTML(product.name)}"
      >
        ${escapeHTML(product.button)}
      </a>
    </div>
  `;

  return card;
}

// ============================================================
//  FILTRAR E RENDERIZAR
// ============================================================
function renderProducts() {
  const grid      = document.getElementById("productsGrid");
  const noResults = document.getElementById("noResults");

  const filtered = products.filter((p) =>
    currentSearch === "" ||
    p.name.toLowerCase().includes(currentSearch) ||
    p.description.toLowerCase().includes(currentSearch)
  );

  grid.innerHTML = "";

  if (filtered.length === 0) {
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
    filtered.forEach((product, index) => {
      grid.appendChild(createProductCard(product, index));
    });
  }
}

// ============================================================
//  SANITIZACAO (evitar XSS nos dados do array)
// ============================================================
function escapeHTML(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ============================================================
//  EVENTOS
// ============================================================
document.getElementById("searchInput").addEventListener("input", (e) => {
  currentSearch = e.target.value.toLowerCase().trim();
  renderProducts();
});

// ============================================================
//  INICIALIZAR
// ============================================================
renderProducts();
