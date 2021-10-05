// Mảng sản phẩm
const products = [
  {
    id: 0,
    url: "https://images.unsplash.com/photo-1560155016-bd4879ae8f21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80",
    name: "Avocado",
    price: 5,
    inCart: 0,
  },
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1560155016-bd4879ae8f21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80",
    name: "Mangoes",
    price: 3,
    inCart: 0,
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1560155016-bd4879ae8f21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80",
    name: "Banana",
    price: 2,
    inCart: 0,
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1560155016-bd4879ae8f21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80",
    name: "Strawberry",
    price: 6,
    inCart: 0,
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1560155016-bd4879ae8f21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80",
    name: "Orange",
    price: 4,
    inCart: 0,
  },
];

// Mảng giỏ hàng
const productsCart = [];

// Query
const listProducts = document.querySelector("#products-list");
const listProductsCart = document.querySelector("#shopping-cart");
const total = document.querySelector("#total");
const numberCart = document.querySelector("#cart-number");

// render danh sách sản phẩm
function renderProducts() {
  let renderPro = products.map((product) => {
    return `
      <div class="product">
        <div class="product-img">
          <a href="#" class="product-link">
            <img src="${product.url}" alt="" />
          </a>
          <div class="add-cart">Add to cart</div>
        </div>
        <div class="product-content">
          <div class="title">${product.name}</div>
          <div class="bottom">
            <div class="price">$${product.price}.00</div>
            <div class="quantity">Đã bán 2k</div>
          </div>
        </div>
      </div>
    `;
  });
  return (listProducts.innerHTML = renderPro.join(""));
}
renderProducts();

// render danh sách sản phẩm trong giỏ hàng
function renderProductsCart() {
  let render = productsCart.map((productCart, index) => {
    return `
      <div class="box">
        <i class="fas fa-trash" data-id="${index}"></i>
        <img src="${productCart.url}" alt="" />
        <div class="content">
          <h3>${productCart.name}</h3>
          <div class="price">$${productCart.price}.00</div>
          <div class="box-quantity">
            <div class="fas fa-minus""></div>
            <div class="number" id="number">${productCart.inCart}</div>
            <div class="fas fa-plus"></div>
          </div>
        </div>
      </div>
    `;
  });
  return (listProductsCart.innerHTML = render.join(""));
}

// Tính tổng tiền sản phẩm trong giỏ hàng
function totalPrice() {
  let s = productsCart.reduce((sum, num) => {
    return sum + num.price * num.inCart;
  }, 0);
  return (total.textContent = s);
}

// Hiển thị số sản phẩm thêm
function showNumber() {
  let showNum = productsCart.reduce((a, b) => {
    return a + b.inCart;
  }, 0);
  return (numberCart.textContent = showNum);
}

// Thêm sản phẩm vào giỏ
const btnAdd = document.querySelectorAll(".add-cart");

btnAdd.forEach((element, index) => {
  btnAdd[index].addEventListener("click", () => {
    onAddCart(products[index]);
  });
});

const onAddCart = (itemProduct) => {
  // Thêm sản phẩm vào productsCart
  const value = productsCart.findIndex((item) => itemProduct.id === item.id);
  if (value < 0) {
    itemProduct.inCart = 1;
    productsCart.push(itemProduct);
  } else {
    productsCart[value].inCart += 1;
  }
  // Hiển thị số sản phẩm
  showNumber();

  // Render sản phẩm đã thêm vào giỏ
  renderProductsCart();

  // Tính tổng tiền sản phẩm
  totalPrice();

  // Giảm số lượng sản phẩm
  const btnMinus = document.querySelectorAll(".fa-minus");
  const btnPlus = document.querySelectorAll(".fa-plus");
  const number = document.querySelector("#number");

  btnMinus.forEach((element, index) => {
    btnMinus[index].addEventListener("click", () => {
      onMinusClicked(productsCart[index]);
    });
  });

  btnPlus.forEach((element, index) => {
    btnPlus[index].addEventListener("click", () => {
      onPlusClicked(productsCart[index]);
    });
  });

  const onMinusClicked = (itemMinus) => {
    if (itemMinus.inCart > 1) {
      itemMinus.inCart -= 1;
      number.textContent = itemMinus.inCart;
      showNumber();
      totalPrice();
    } else {
      productsCart.splice(itemMinus.id, 1);
      showNumber();
      renderProductsCart();
      totalPrice();
    }
  };

  const onPlusClicked = (itemPlus) => {
    if (itemPlus.inCart >= 1) {
      itemPlus.inCart += 1;
      number.textContent = itemPlus.inCart;
      showNumber();
      totalPrice();
    }
  };
};

// Xóa sản phẩm trong giỏ hàng
function deleteProduct() {
  listProductsCart.addEventListener("click", (event) => {
    const btnDelete = event.target;
    const id = +btnDelete.dataset.id;
    if (id >= 0) {
      productsCart.splice(id, 1);
      renderProductsCart();
      totalPrice();
      showNumber();
    }
  });
}
deleteProduct();
