// getting elments

let responsiveIcon = document.querySelector(".responsive-icon");
let navItems = document.querySelector(".nav-items");
let cartLength = document.querySelector(".cart-length");
let productsContainer = document.querySelector(".products-container");
let modal = document.querySelector(".product-card-modal-overlay");
let cartTableTbody = document.querySelector(".cart-table-tbody");
let totalPriceCell = document.querySelector(".total-price");



// products array


// save products to loacl storage

let products; 
if (!localStorage.products) {
  products = [
    {
      id: 0,
      product_name: "prodcut 1",
      product_price: 20,
      product_image: "imgs/prodcut1/prodcut1.png",

      count: 0,

      added_to_cart: false,
    },
    {
      id: 1,
      product_name: "prodcut 2",
      product_price: 30,
      product_image: "imgs/prodcut2/prodcut2.png",

      count: 0,

      added_to_cart: false,
    },
    {
      id: 2,
      product_name: "prodcut 3",
      product_price: 40,
      product_image: "imgs/prodcut3/prodcut3.png",

      count: 0,

      added_to_cart: false,
    },
    {
      id: 3,
      product_name: "prodcut 4",
      product_price: 10,
      product_image: "imgs/prodcut4/prodcut4.png",

      count: 0,

      added_to_cart: false,
    },
    {
      id: 4,
      product_name: "prodcut 5",
      product_price: 100,
      product_image: "imgs/prodcut5/prodcut5.png",

      count: 0,
      added_to_cart: false,
    },

    {
      id: 5,
      product_name: "prodcut 6",
      product_price: 10,
      product_image: "imgs/prodcut6/prodcut6.png",

      count: 0,

      added_to_cart: false,
    },
  ];
  
} else {
  products = JSON.parse(localStorage.products);
  
  
}

let saveProductsToLocalStorage = (savedProducts) => {
  products = localStorage.setItem("products", JSON.stringify(savedProducts));
}





// save cart to local storage

let cart = [];
let savedCart;

function saveCartToLocalStorage(cart) {
  savedCart = localStorage.setItem("cart", JSON.stringify(cart));
}

!localStorage.cart? (cart = []): (cart = JSON.parse(localStorage.cart));




//get getCartLength to put it in cart
let getCartLength = (length) => {
  cartLength.innerHTML = length;
};
// make header responsive
responsiveIcon.onclick = () => {
  navItems.classList.toggle("responsive-nav-items");
};
// map prodcuts to nav dropdown
let navDropdownMenu = document.querySelector(".nav-dropdown-menu");

let row = "";
let displayProdcutsDropdownMenu = () => {
  cart.map(cartProdcut => {
     row = `
    <li class="nav-dropdown-item">
        <img src= ${cartProdcut.product_image} alt=${cartProdcut.product_name}>
        <span>${cartProdcut.product_name.slice(0,10)}..</span>
    </li>
    
    `;
  })
  navDropdownMenu.innerHTML += row;
}



let addBtns;
let prodcutCounts;
let cartProdcutsPrice;
let cartRows;
onload = () => {
  getCartLength(cart.length);
  displayProdcutsDropdownMenu();



  addBtns = document.querySelectorAll(".add");
  prodcutCounts = document.querySelectorAll(".prodcut-count");
  cartProdcutsPrice = document.querySelectorAll(".cart-product-price");
  cartRows = document.querySelectorAll(".cart-table-tbody-row");
};

let addToCard = (i) => {
  if (products[i].added_to_cart) {
  
    cart = cart.filter(product => product.id !== products[i].id)
    
    products[i].count -= 1;
    products[i].added_to_cart = false;
    addBtns[i].classList.remove("remove");
    addBtns[i].innerHTML = "add to the cart";
  } else {
    cart.push(products[i]);
    
    products[i].count += 1;
    products[i].added_to_cart = true;
    
    addBtns[i].classList.add("remove");
    addBtns[i].innerHTML = "remove from the cart";
  }
  displayProdcutsDropdownMenu();
  saveCartToLocalStorage(cart);
  getCartLength(cart.length);
};

let modalContent;

let closeModal = () => {
  modal.style.display = "none";
};

let viewModal = (idx) => {
  modalContent = `
  <div class="product-card-modal">

  <div class="modal-head flex-between">
  <h2 class="modal-title">${products[idx].product_name}</h2>
  <button class="close-btn" onclick= closeModal()  >X</button>
  </div>
  <div class="modal-body">
  <div class="product-img-container">
    <img src=${products[idx].product_image}
     alt=${products[idx].product_name}  class="modal-img"/>
  </div>
  <p class="modal-price"> price is ${products[idx].product_price} <span class="modal-price-currency">$</span></p>


  
  </div>
   </div>

`;
  modal.innerHTML = modalContent;
  modal.style.display = "block";
};

// check the productsContainer  exists or not 
if (productsContainer) {
  
  products.map((product, idx) => {
    const productCard = `
    <div class="product-card">
  <div class="img-container  flex-center">
         <img src=${product.product_image} alt=${product.product_name} class="product-img"/>
         </div>
      <h3 class="product-name">${product.product_name}</h3>
      <p class="product-price">${product.product_price} <span class="product-price-currency">$</span></p>
     
      
       <button class="product-btn add" onclick= addToCard(${idx})>add to cart</button>
        <button class="product-btn view" onclick= viewModal(${idx})>view</button>
        </div>
       `;

       productsContainer.innerHTML += productCard;
       
      });
      

      
}
    


// cart functions


let getTotalPrice = () => {
  let sumTotalPrice = cart.reduce((total, cartProduct) => {
    return total + cartProduct.product_price * cartProduct.count;
  }, 0);

  totalPriceCell.innerHTML = `${sumTotalPrice} $`;
    saveCartToLocalStorage(cart);

};




let increaseCartProdcutCount = (idx) => {
  cart[idx].count++;
  prodcutCounts[idx].innerHTML = cart[idx].count;
  cartProdcutsPrice[idx].innerHTML = ` ${
    cart[idx].count * cart[idx].product_price
  } $`;
  getTotalPrice();
    saveCartToLocalStorage(cart);


};
let decreaseCartProdcutCount = (idx) => {
  cart[idx].count <= 1 ? removeCartProdcut(idx) : null;

  cart[idx].count--;
  prodcutCounts[idx].innerHTML = cart[idx].count;
  cartProdcutsPrice[idx].innerHTML = ` ${
    cart[idx].count * cart[idx].product_price
  } $`;
  getTotalPrice();
    saveCartToLocalStorage(cart);

};

let removeCartProdcut = (idx) => {
  cart = cart.filter((cartProdcut) => cartProdcut.id !== idx);
  cartRows[idx].style.display = "none";
  console.log(idx);
  getTotalPrice();
  getCartLength(cart.length);
    saveCartToLocalStorage(cart);


};


// check the cartTableTbody  exists or not 


if (cartTableTbody) {
  cart.map((cartProduct, idx) => {
    let productRow = `
    <tr class="cart-table-tbody-row">

        <td class="cart-product-description">
            <img src=${cartProduct.product_image} alt=${cartProduct.product_name} class="cart-table-tbody-row-img">
            <p class="cart-table-tbody-row-title"> ${cartProduct.product_name} </p>
        </td> 
        
        <td>
            <div class="cart-count-container flex-center">
                <button class="add-to-cart-btn" onclick=increaseCartProdcutCount(${idx})>+</button>
                <p class="prodcut-count">${cartProduct.count}</p>
                <button class="minus-from-cart-btn"  onclick=decreaseCartProdcutCount(${idx})>-</button>
            </div>
        </td>
        <td>
            <button  class="remove-from-cart-btn" onclick=removeCartProdcut(${idx})>X</button>
        </td>
        <td class="cart-product-price-container">
            
            <p class="cart-product-price">
                ${cartProduct.product_price} <span class="price-currency">$</span>
            </p>
        </td>
    </tr>
  
  
  `;
    cartTableTbody.innerHTML += productRow;
      getTotalPrice();

  });

}

