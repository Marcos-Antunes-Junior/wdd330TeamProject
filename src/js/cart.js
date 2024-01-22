import { getLocalStorage, setLocalStorage } from './utils.mjs';
function calculateTotalPrice() {
  const cartItems = getLocalStorage('so-cart') || [];
  let totalPrice = 0;
  cartItems.forEach(item => {
    totalPrice += parseFloat(item.FinalPrice) * item.Quantitiy;
  });
  return totalPrice;

}
function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  console.log(cartItems)
  
  if(cartItems.length === 0){
  const emptyCartHtml = `<h2>Your cart is empty.</h2>`;
  document.querySelector('.product-list').innerHTML = emptyCartHtml;
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
  
    const totalPrice = calculateTotalPrice();
    document.querySelector('.total-price').textContent = `Total price: $${totalPrice.toFixed(2)}`;

    document.querySelectorAll('.cart-card__remove').forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const id = event.target.dataset.id;
        const cart = getLocalStorage('so-cart');
        const updatedCart = cart.filter(item => item.Id !== id);
        setLocalStorage('so-cart', updatedCart);
        renderCartContents();
      });
    });
  }

}

function cartItemTemplate(item) {
  
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.Quantitiy}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <img class="cart-card__remove" data-id="${item.Id}" alt="remove item" src="/images/trash-can-outline.png"></button>
</li>`;

  return newItem;
}


renderCartContents();
