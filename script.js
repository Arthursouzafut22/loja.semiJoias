const btnCart = document.querySelector(".btn-carrinho");
const cartCompras = document.querySelector(".cart-compras");
const btnClose = document.querySelector(".btn-fechar");

btnCart.addEventListener("click", clickCart);
btnClose.addEventListener("click", clickClose);

function clickClose() {
  cartCompras.classList.remove("active");
}

function clickCart() {
  cartCompras.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  fatchJoias("correntes");
  mudarValorTotal() 
});

let produtosListado = [];

const urlsJson = {
  correntes: "./data/correntes.json",
  pingentes: "./data/pingentes.json",
  pulseiras: "./data/pulseiras.json",
  kitsprontos: "./data/kits.json",
};

async function fatchJoias(modelo) {
  const todosModelos = ["correntes", "pingentes", "pulseiras", "kitsprontos"];
  if (!todosModelos.includes(modelo)) return alert("invalido");

  const url = urlsJson[modelo];

  const pageResponse = await fetch(url);
  const newResponse = await pageResponse.json();

  listaProdutos(newResponse);
}

function listaProdutos(produto) {
  const contProduct = document.querySelector(".conteiner-product");

  contProduct.innerHTML = "";
  produtosListado = produto;

  for (const produtos of produto) {
    const novoProduto = criarProduto(produtos);

    contProduct.innerHTML += novoProduto;
  }
}

function criarProduto(produto) {
  return `
    <div class="item-product">
    <img
      class="img-product"
      src="${produto.imagem}"
      alt="img"
    />
    <p>${produto.nome}</p>

    <div class="rating">
      <input value="5" name="rate" id="star5" type="radio" >
      <label title="text" for="star5"></label >
      <input value="4" name="rate" id="star4" type="radio" >
      <label title="text" for="star4"></label>
      <input value="3" name="rate" id="star3" type="radio" checked=""/>
      <label title="text" for="star3"></label>
      <input value="2" name="rate" id="star2" type="radio" >
      <label title="text" for="star2"></label>
      <input value="1" name="rate" id="star1" type="radio" >
      <label title="text" for="star1"></label>
    </div>
    <div class="conteiner-preco">
      <s>R$60,00</s>
      <span>${produto.preco}</span>
    </div>
    <button class="btn-verMais" onclick="addProductCard(${produto.id})">Adicionar Carrinho 
    <img class="icon-card" src="img/logo/carrinho-de-compras.png" alt="" />
    </button>
  </div>
</div>`;
}

function createElementFromHTML(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  return div.firstChild;
}

function addProductCard(id) {
  const sacola = document.querySelector(".sacola");
  const produto = produtosListado.find((produto) => produto.id === id);

  const elementos = document.querySelectorAll("div[data-type]");
  const newElement = Array.from(elementos);
  const produtosString = newProductCard(produto);
  const productDiv = createElementFromHTML(produtosString);

  const encontrarElement = newElement.find((data) => {
    return data.getAttribute("[data-type]");
  });

  if (!encontrarElement) {
    sacola.appendChild(productDiv);
  } else {
    const input = encontrarElement.getElementsByTagName('input')[0];

    input.value = Number(input.value) + 1;
  }

  mudarValorTotal();
}

function newProductCard(produto) {
  return `

  <div class="product-card" id="${produto.id}" data-type="${produto.tipo}">
            <img class="img-card" src="${produto.imagem}" alt="" />
            <div class="card-info">
              <div class="cc-info">
                <p class="nome-product">
                 ${produto.nome}
                </p>
                <button class="btn-remove">
                  <img
                    class="img-lixeira"
                    src="img/logo/lixeira-de-reciclagem.png"
                    alt="lixeira"
                  />
                </button>
              </div>

              <div class="cc-info2">
                <div class="controlador-btns">
                  <button class="btn-menos" onclick="mudaQuantidadeProduto('menos', ${produto.id}, '${produto.tipo}')">
                    <img
                      src="img/logo/operacoes-de-calculo-menos-sinal (1).png"
                      alt="menod"
                    />
                  </button>
                  <input type="number" name="number" id="number" value="1" />
                  <button class="btn-mais" onclick="mudaQuantidadeProduto('mais', ${produto.id}, '${produto.tipo}')">
                    <img
                      src="img/logo/botao-de-simbolo-de-mais (1).png"
                      alt="mais"
                    />
                  </button>
                </div>
                <p class="preco-product">${produto.preco}</p>
              </div>
            </div>
         </div>`;
}

function mudaQuantidadeProduto(acao, id, tipoProduto) {
  const acoes = ["menos", "mais"];
  if (!acoes.includes(acao)) return alert("acao invalida");

  const elementCard = document.querySelectorAll("div[data-type]");
  const converteArray = Array.from(elementCard);

  const buscarElement = converteArray.find((element) => {
    const type = element.getAttribute("data-type");

    return id === Number(element.id) && tipoProduto === type;
  });

  const elementInput = buscarElement.getElementsByTagName("input")[0];

  const value = Number(elementInput.value);

  if (acao === "menos") {
    if (value === 0) return buscarElement.remove();
    elementInput.value = value - 1;
  } else {
    elementInput.value = value + 1;
  }
  mudarValorTotal()
}

function mudarValorTotal() {
  const elementos = document.querySelectorAll("div[data-type]");

  let valorTotal = 0.0;

  for (const element of elementos) {
    const preco = element.querySelector('.preco-product').innerHTML;
    const input = element.getElementsByTagName('input')[0];
    const novoPreco = Number(preco.replace(/\D/g, '').slice(0, -2));

    const valor = novoPreco * parseInt(input.value);

    valorTotal += Number(valor.toFixed(2));
  }

  const totalItem = document.querySelector('.valorFinal');
  totalItem.innerHTML = valorTotal.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
}
