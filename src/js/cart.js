import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

function calculateTotalPrice() {
  const cartItems = getLocalStorage("so-cart") || [];
  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += parseFloat(item.FinalPrice) * item.Quantitiy;
  });
  return totalPrice;
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  console.log(cartItems);

  // checkout button click evnet
  document.querySelector(".checkout").addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/checkout/index.html";
  });

  if (cartItems.length === 0) {
    const emptyCartHtml = `<h2>Your cart is empty.</h2>`;
    document.querySelector(".product-list").innerHTML = emptyCartHtml;
    document.querySelector(".total-price").textContent = ''
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    const totalPrice = calculateTotalPrice();
    document.querySelector(
      ".total-price"
    ).textContent = `Total price: $${totalPrice.toFixed(2)}`;

    document.querySelectorAll(".cart-card__remove").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const id = event.target.dataset.id;
        const cart = getLocalStorage("so-cart");
        const updatedCart = cart.filter((item) => item.Id !== id);
        setLocalStorage("so-cart", updatedCart);
        renderCartContents();
      });
    });

    document.querySelector(".minus").addEventListener("click", (event) => {
      event.preventDefault();
      const id = event.target.dataset.id;
      let quantityInput = document.getElementById("quantity");
      let currentValue = parseInt(quantityInput.value, 10);

      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
        updateQuantityDecrease(id);
        renderCartContents();
      }
    });

    document.querySelector(".plus").addEventListener("click", (event) => {
      event.preventDefault();
      const id = event.target.dataset.id;
      let quantityInput = document.getElementById("quantity");
      let currentValue = parseInt(quantityInput.value, 10);
      if (currentValue <= 9) {
        quantityInput.value = currentValue + 1;
        updateQuantity(id);
        renderCartContents();
      }
    });

  }

  
  function updateQuantity(id) {
    const cart = getLocalStorage("so-cart");
    const updatedCart = cart.map((item) => {
      if (item.Id === id) {
        item.Quantitiy++;
      }
      return item;
    });
    setLocalStorage("so-cart", updatedCart);
  }

  function updateQuantityDecrease(id) {
    const cart = getLocalStorage("so-cart");
    const updatedCart = cart.map((item) => {
      if (item.Id === id) {
        item.Quantitiy--;
      }
      return item;
    });
    setLocalStorage("so-cart", updatedCart);
  }
}

function cartItemTemplate(item) {
  let imageSrc = item.Image || item.Images.PrimaryLarge;
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${imageSrc}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  
  <div class="number">
	<span class="minus" data-id="${item.Id}">-</span>
	<input type="number" id="quantity" value="${item.Quantitiy}" min="1" max="10" onKeyDown="return false"/>
	<span class="plus" data-id="${item.Id}">+</span>
  
</div>

<p class="cart-card__price">$${item.FinalPrice}</p>
  <img class="cart-card__remove" data-id="${item.Id}" alt="remove item" src="/images/trash-can-outline.png">
</li>`;

  return newItem;
}

renderCartContents();
loadHeaderFooter();
