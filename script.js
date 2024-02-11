

const btnCart = document.querySelector('.btn-carrinho');
const cartCompras = document.querySelector('.cart-compras');
const btnClose = document.querySelector('.btn-fechar');


btnCart.addEventListener('click', clickCart);
btnClose.addEventListener('click', clickClose)

function clickClose() {
    cartCompras.classList.remove('active')
};

function clickCart() {
    cartCompras.classList.toggle('active');
};

document.addEventListener('DOMContentLoaded', () => {
    fatchJoias('correntes')
})


let produtosListado = [];

const urlsJson = {
    "correntes": "./data/correntes.json",
    "pingentes": "./data/pingentes.json",
    "pulseiras": "./data/pulseiras.json",
    "kitsprontos": "./data/kits.json" 
}


async function fatchJoias(modelo) {
    const todosModelos = ['correntes', 'pingentes', 'pulseiras', 'kitsprontos'];
    if(!todosModelos.includes(modelo)) return alert('invalido')

    const url = urlsJson[modelo]

    const pageResponse = await fetch(url)
    const newResponse = await pageResponse.json()

    listaProdutos(newResponse)



}

function listaProdutos(produto) {
    const contProduct = document.querySelector('.conteiner-product');

    contProduct.innerHTML = ''
    produtosListado = produto

    for(const produtos of produto) {
        const novoProduto = criarProduto(produtos);

        contProduct.innerHTML += novoProduto
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
    <button class="btn-verMais">Ver mais</button>
  </div>
</div>`
}





















// function criarProduto(produto) {
//     return `
//     <div class="item-product">
//     <img class="img-product" src="${produto.imagem}" alt="img" />
//     <p>${produto.nome}</p>
//     <div class="conteiner-preco">
//       <s>R$60,00</s>
//       <span>${produto.preco}</span>
//     </div>
//     <button class="btn-verMais">Ver mais</button>
//   </div>`
// }