const openMenu = document.getElementById("mobileNavbar");
const closeMenu = document.getElementById("mobileCloseBtn");
const menu = document.getElementById("header__menu");
const menuList = document.querySelector(".header__list");
const cartIcon = document.querySelector(".header__cart");
const cartCount = document.getElementById("cartCount");

const cartPreview = document.querySelector(".header__cartpreview");
const cartPreviewDetails = document.querySelector(
  ".header__cartpreview__details"
);
const deleteIcon = document.getElementById("deleteIcon");
//main Section
const previewImg = document.querySelector(".main__mainimg");
const imgthumbnails = document.querySelectorAll(".main__imgsThumbs__oneimg");
const plusIcon = document.getElementById("plusIcon");
const count = document.getElementById("count");
const minusIcon = document.getElementById("minusIcon");
const ctaBtn = document.querySelector(".main__btn");

let product = {
  name: "",
  price: 0,
  count: 0,
};
product.name = document.querySelector(".main__title").innerHTML;
product.price = document
  .querySelector(".main__currentprice")
  .innerHTML.slice(1);
product.count = +count.innerHTML;

// Navbar
const openMenuFcn = function () {
  menu.classList.add("header__menu--isopen");
};
const closeMenuFcn = function () {
  menu.classList.remove("header__menu--isopen");
};

openMenu.addEventListener("click", openMenuFcn);
closeMenu.addEventListener("click", closeMenuFcn);
menu.addEventListener("click", closeMenuFcn);
menuList.addEventListener("click", function (e) {
  e.stopPropagation();
});

//click on cart icon
cartIcon.addEventListener("click", function () {
  const isOpen = cartPreview.classList.contains("header__cartpreview--open");
  //if the cart icon is clicked then show the cart preview
  isOpen
    ? cartPreview.classList.remove("header__cartpreview--open")
    : //if the cart icon is clicked and the card is opened then hide it
      cartPreview.classList.add("header__cartpreview--open");
});

//Main Content
// looping on thumbnails
imgthumbnails.forEach((imgthumb) => {
  //click on the thumbnail
  imgthumb.addEventListener("click", function (e) {
    //remove the word "-thumbnail" from the src of the thumbnail to choose the img which will replace the main preview image "main__mainimg"
    const imgthumbpreviewSrc = this.src.replace(/-thumbnail/g, "");
    //remove the --active class from all the thumbnails
    imgthumbnails.forEach(function (ele) {
      ele.classList.remove("main__imgsThumbs__oneimg--active");
    });
    // add the --active class to the clicked thumbnail
    imgthumb.classList.add("main__imgsThumbs__oneimg--active");
    //change the main image "preview Image" src to the the image match the thumbnail
    previewImg.src = imgthumbpreviewSrc;
  });
});

//counter function with parameter to determine if it will work as incerment function or decrement function
let counterFcn = function (purpose) {
  if (purpose === "INC") {
    product.count += 1;
    if (product.count > 8) product.count = 8;
  } else if (purpose === "DEC") {
    product.count -= 1;
    if (product.count < 1) product.count = 0;
  }
  count.innerHTML = product.count;
};
//click on the plus add one
plusIcon.addEventListener("click", () => counterFcn("INC"));
//click on the minus remove one
minusIcon.addEventListener("click", () => counterFcn("DEC"));

// press atc btn
ctaBtn.addEventListener("click", function () {
  let { name, price, count } = product;
  let card = `<div class="header__cartpreview__card flex">
  <img class="img" src="./images/image-product-1-thumbnail.jpg" alt="">
  <div class="details">
    <p class="title">${name}</p>
    <p class="price">$${price} x ${count} <span>$${(+price * count).toFixed(2)}</span></p>
  </div>
  <button id="deleteIcon" onclick = "deleteProduct">
  <img src="./images/icon-delete.svg" alt="">
  </button>
  </div>
  <button class="btn">Checkout</button>`;
  // the inner html of the cart preview will be changed

  if (product.count > 0) {
    cartCount.style.display = "block";
    console.log(cartCount.innerHTML);
    cartCount.innerHTML = product.count;
    cartPreviewDetails.innerHTML = card;
  } else {
    cartCount.style.display = none;
  }
});

// let deleteProduct = function () {
//   cartPreviewDetails.innerHTML = `<p>Your cart is empty.</p>`;
//   product = { name: "", price: 0, count: 0 };
// cartCount.style.display = none;
//   console.log(product);
// }
