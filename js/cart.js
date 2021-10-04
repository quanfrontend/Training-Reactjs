const products = [
  {
    id: 0,
    img: "https://images.unsplash.com/photo-1560155016-bd4879ae8f21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80",
    title: "Avocado",
    price: 3,
    inCart: 0,
  },
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1560155016-bd4879ae8f21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80",
    title: "Mangoes",
    price: 2,
    inCart: 0,
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1560155016-bd4879ae8f21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80",
    title: "Banana",
    price: 4,
    inCart: 0,
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1560155016-bd4879ae8f21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80",
    title: "Strawberry",
    price: 6,
    inCart: 0,
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1560155016-bd4879ae8f21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80",
    title: "Orange",
    price: 5,
    inCart: 0,
  },
];
// define
const productsCart = [];
let productsLocalStorage = "products";
let cartNumberLocalStorage = "cartNumber";

// Load product ==============================
function render() {
  let productsList = document.querySelector("#products-list");
  let content = products.map((item, index) => {
    return (
      '<div class="product">' +
      '<div class="product-img">' +
      '<a href="#" class="product-link">' +
      '<img src="' +
      item.img +
      '" alt="" />' +
      "</a>" +
      '<div class="add-cart" data-id="' +
      index +
      '">Add to cart</div>' +
      "</div>" +
      '<div class="product-content">' +
      '<div class="title">' +
      item.title +
      "</div>" +
      '<div class="bottom">' +
      '<div class="price">&dollar;' +
      item.price +
      "</div>" +
      '<div class="quantity">Đã bán 2k</div>' +
      "</div>" +
      "</div>" +
      "</div>"
    );
  });
  productsList.innerHTML = content.join("");
}
render();

// showw number ===============================
const showNumber = () => {
  // select
  const btnAdd = document.querySelectorAll(".add-cart");
  const cartNumber = document.querySelector("#cart-number");
  for (let i = 0; i < btnAdd.length; i++) {
    btnAdd[i].addEventListener("click", () => {
      onAddClicked();
    });
  }
  const onLoadNumber = () => {
    let getLocalStorage = localStorage.getItem(cartNumberLocalStorage);
    if (getLocalStorage) {
      cartNumber.textContent = getLocalStorage;
    }
  };
  onLoadNumber();
  const onAddClicked = () => {
    let getLocalStorage = localStorage.getItem(cartNumberLocalStorage);
    getLocalStorage = JSON.parse(getLocalStorage);
    if (getLocalStorage) {
      localStorage.setItem(cartNumberLocalStorage, getLocalStorage + 1);
      cartNumber.textContent = getLocalStorage + 1;
    } else {
      localStorage.setItem(cartNumberLocalStorage, 1);
      cartNumber.textContent = 1;
    }
  };
};
showNumber();

// add to cart ====================
const addCart = () => {
  // select
  const btnAdd = document.querySelectorAll(".add-cart");
  const cartList = document.querySelector("#shopping-cart");
  let totalNumber = document.querySelector("#total");

  for (let i = 0; i < btnAdd.length; i++) {
    btnAdd[i].addEventListener("click", () => {
      onAddToCart(products[i]);
    });
  }
  const onAddToCart = (product) => {
    productsCart.push(product);
    setInCart(product);
    loadProductsCart();
    onTotal(product);
  };

  // set in cart ========================
  const setInCart = (product) => {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
      if (cartItems[product.id] == undefined) {
        cartItems = {
          ...cartItems,
          [product.id]: product,
        };
      }
      cartItems[product.id].inCart += 1;
    } else {
      product.inCart = 1;
      cartItems = {
        [product.id]: product,
      };
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  };

  // load products cart =====================
  const loadProductsCart = () => {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let contentCart = Object.values(cartItems).map((item, index) => {
      return `
          <div class="box" id="box">
          <i class="fas fa-trash" data-id="${index}"></i>
          <img src="${item.img}" alt="" />
          <div class="content">
          <h3>${item.title}</h3>
          <div class="price-quantity">
          <span class="price">$${item.price}/-</span>
          <span class="quantity">quantity: <input class="input-quantity" type="text" value="${item.inCart}" /></span>
          </div>
          </div>
          </div>
          `;
    });
    cartList.innerHTML = contentCart.join("");
  };

  //   delete product ==================
  cartList.addEventListener("click", (event) => {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let getCartNumber = localStorage.getItem(cartNumberLocalStorage);
    const cartNumber = document.querySelector("#cart-number");
    const btnDelete = event.target;
    const id = parseInt(btnDelete.dataset.id);
    console.log(id);
    //
    // localStorage.setItem("abc", JSON.stringify(productsCart)); //
    //
    if (id >= 0) {
      //   let get = localStorage.getItem("abc");
      //   get = JSON.parse(get);
      //   get.splice(id, 1);
      //   localStorage.setItem("abc", JSON.stringify(get));

      let cartItems = localStorage.getItem("productsInCart");
      cartItems = JSON.parse(cartItems);
      Object.values(cartItems).splice(id, 1);
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));

      //   productsCart.splice(id, 1);
      //   Object.values(cartItems);
      //   console.log(Object.values(cartItems));
      loadProductsCart();
      //   onTotal();
      localStorage.setItem(cartNumberLocalStorage, getCartNumber - 1);
      cartNumber.textContent = getCartNumber - 1;
    }
  });

  //   Total ========================
  const onTotal = (product) => {
    let total = localStorage.getItem("total");

    if (total != null) {
      total = parseInt(total);
      localStorage.setItem("total", total + product.price);
      totalNumber.textContent = localStorage.getItem("total");
    } else {
      localStorage.setItem("total", product.price);
      totalNumber.textContent = localStorage.getItem("total");
    }
  };
};
addCart();
