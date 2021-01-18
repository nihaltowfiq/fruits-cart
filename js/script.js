// select the elements
const addToCartButtons = document.getElementsByClassName("addToCartBtn");
const removeFromCartButtons = document.getElementsByClassName("btn-danger");
const quantityInputs = document.getElementsByClassName("cartQuantity");

// event listeners
for (let i = 0; i < addToCartButtons.length; i++) {
  let addToCartBtn = addToCartButtons[i];
  addToCartBtn.addEventListener("click", addToCart);
}

for (let i = 0; i < removeFromCartButtons.length; i++) {
  let removeFromCartBtn = removeFromCartButtons[i];
  removeFromCartBtn.addEventListener("click", removeFromCart);
}

for (let i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i];
  input.addEventListener("change", changedQuantity);
}

document.querySelector(".purchaseBtn").addEventListener("click", purchaseCart);

// funtions
function addToCart(event) {
  const buttonClicked = event.target;
  const card = buttonClicked.parentElement.parentElement;
  const title = card.querySelector(".card-title").innerText;
  const price = card.querySelector(".fruitPrice").innerText;
  const imgSrc = card.querySelector(".card-img-top").src;
  addItemToCart(title, price, imgSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imgSrc) {
  const cartItems = document.querySelector(".cartItems");
  const cartRow = document.createElement("tr");
  cartRow.className = "cartRow";
  const cartItemNames = cartItems.getElementsByClassName("cartTitle");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This Item is Already Added to the Cart!");
      return;
    }
  }
  const cartRowContent = `
    <td>
      <img class="cartImg rounded" src="${imgSrc}" alt="" />
      <span class="cartTitle">${title}</span>
    </td>
    <td class="cartPrice">$${price}</td>
    <td>
      <input class="cartQuantity" type="number" value="1" />
    </td>
    <td>
      <button class="btn btn-danger btn-sm">Remove</button>
    </td>
  `;
  cartRow.innerHTML = cartRowContent;
  cartItems.appendChild(cartRow);
  cartRow
    .querySelector(".btn-danger")
    .addEventListener("click", removeFromCart);
  cartRow
    .querySelector(".cartQuantity")
    .addEventListener("change", changedQuantity);
}

function removeFromCart(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function changedQuantity(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

const updateCartTotal = function () {
  const cartItemContainer = document.querySelector(".cartItems");
  const cartRows = cartItemContainer.getElementsByClassName("cartRow");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    const priceElement = cartRow.querySelector(".cartPrice");
    const quantityElement = cartRow.querySelector(".cartQuantity");
    const price = parseInt(priceElement.innerText.replace("$", ""));
    const quantity = quantityElement.value;
    total = total + price * quantity;
  }
  document.querySelector(".cartTotalPrice").innerText = total;
};

function purchaseCart() {
  alert("Thanks You For Your Purchase!");
  const cartItems = document.querySelector(".cartItems");

  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}
