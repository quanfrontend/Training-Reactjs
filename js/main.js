// show cart
const showCart = () => {
  const btnCart = document.querySelector("#cart-btn");
  const menuCart = document.querySelector(".shopping-cart");
  const boxMenu = document.querySelector(".navbar");
  btnCart.addEventListener("click", () => {
    menuCart.classList.toggle("active");
    boxMenu.classList.remove("active");
  });
};
showCart();
// show menu
const showMenu = () => {
  const btnMenu = document.querySelector("#menu-toggle");
  const boxMenu = document.querySelector(".navbar");
  const menuCart = document.querySelector(".shopping-cart");
  btnMenu.addEventListener("click", () => {
    boxMenu.classList.toggle("active");
    menuCart.classList.remove("active");
  });
};
showMenu();
// show cart number
// const showCartNumber = () => {
//   products = [
//     {
//       title: "Avocado",
//       tag: "avocado",
//       price: "3",
//       inCart: 0,
//     },
//     {
//       title: "Mangoes",
//       tag: "mangoes",
//       price: "2",
//       inCart: 0,
//     },
//     {
//       title: "Banana",
//       tag: "banana",
//       price: "1",
//       inCart: 0,
//     },
//     {
//       title: "Strawberry",
//       tag: "strawberry",
//       price: "5",
//       inCart: 0,
//     },
//     {
//       title: "Orange",
//       tag: "orange",
//       price: "4",
//       inCart: 0,
//     },
//   ];
//   const keyLocalStorage = "cartNumbers";
//   const btnAdd = document.querySelectorAll(".add-cart");
//   const number = document.querySelector("#cartNumber");

//   for (let i = 0; i < btnAdd.length; i++) {
//     btnAdd[i].addEventListener("click", () => {
//       onAddCart(products[i]);
//     });
//   }

//   const onLoadNumber = () => {
//     let getLocalStorage = localStorage.getItem(keyLocalStorage);
//     if (getLocalStorage) {
//       number.textContent = getLocalStorage;
//     }
//   };
//   onLoadNumber();

//   const onAddCart = (product) => {
//     let getLocalStorage = localStorage.getItem(keyLocalStorage);
//     getLocalStorage = parseInt(getLocalStorage);
//     if (getLocalStorage) {
//       localStorage.setItem(keyLocalStorage, getLocalStorage + 1);
//       number.textContent = getLocalStorage + 1;
//     } else {
//       localStorage.setItem(keyLocalStorage, 1);
//       number.textContent = 1;
//     }
//     setItems(product);
//   };
//   //   set items
//   const setItems = (product) => {
//     let cartItems = localStorage.getItem("productsInCart");
//     cartItems = JSON.parse(cartItems);

//     if (cartItems != null) {
//       if (cartItems[product.tag] == undefined) {
//         cartItems = {
//           ...cartItems,
//           [product.tag]: product,
//         };
//       }
//       cartItems[product.tag].inCart += 1;
//     } else {
//       product.inCart = 1;
//       cartItems = {
//         [product.tag]: product,
//       };
//     }

//     localStorage.setItem("productsInCart", JSON.stringify(cartItems));
//   };
// };
// showCartNumber();
// add to cart
// const onAddToCart = () {

// }
// onAddToCart();
