/* ============================================================
   XIBIU DEMAIS — script.js
   Edite o array `products` para adicionar, remover ou alterar
   os produtos exibidos na página.
============================================================ */

// ============================================================
//  ARRAY DE PRODUTOS
//  Campos disponíveis:
//    id          → número único (não repita)
//    name        → nome do produto
//    description → descrição curta
//    tag         → badge no canto da imagem (texto puro)
//    price       → preço ou label (deixe "" para ocultar)
//    button      → texto do botão CTA
//    link        → URL de afiliado (coloque o link real aqui)
//    image       → URL da imagem do produto ("" usa placeholder)
//    category    → campo ignorado (filtros removidos, pode apagar)
// ============================================================
const products = [
  {
    id: 1,
    name: "Racco Depeeling - 1 unidade",
    description: "Espuma spray depilatoria para conferir no Mercado Livre.",
    tag: "1 unidade",
    price: "",
    button: "Ver produto",
    link: "https://meli.la/2G8vxNH",
    image: "assets/1unidade.webp",
    category: "racco"
  },
  {
    id: 2,
    name: "Racco Depeeling - 2 unidades",
    description: "Kit com 2 unidades da espuma spray depilatoria.",
    tag: "2 unidades",
    price: "",
    button: "Ver produto",
    link: "https://meli.la/1v4ctw8",
    image: "assets/2unidades.webp",
    category: "racco"
  },
  {
    id: 3,
    name: "Racco Depeeling - 3 unidades",
    description: "Kit com 3 unidades da espuma spray depilatoria.",
    tag: "3 unidades",
    price: "",
    button: "Ver produto",
    link: "https://meli.la/1GWS4JP",
    image: "assets/3unidades.webp",
    category: "racco"
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
