import { getProductApi } from "../api/services";
import "../style.css";
import { navigateTo } from "../utils/navigation";

const backIcon = document.getElementById("back-icon") as HTMLElement;
const ShoppingBtn = document.getElementById("shopping-btn") as HTMLButtonElement;
const plusBtn = document.getElementById("plus-count-btn") as HTMLButtonElement;
const minusBtn = document.getElementById("minus-count-btn") as HTMLButtonElement;
const productCount = document.getElementById("product-count")  as HTMLElement;
const productImg = document.getElementById("product-img") as HTMLImageElement;
const productName = document.getElementById("product-name") as HTMLElement;
const productPrice = document.getElementById("product-price") as HTMLElement;
const colorSection = document.getElementById("color-section") as HTMLElement;
const sizeSection = document.getElementById("size-section") as HTMLElement;

let count = 0;
let apiResponse: IshoeData;
let selectedColor = "";
let selectedSize = "";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const searchParams = window.location.search;
    const urlParams = new URLSearchParams(searchParams);
    const id = urlParams.get("id") as string;
    const response = await getProductApi(id);
    apiResponse = response.data;
    const { imageURL, name } = response.data;
    productImg.src = imageURL;
    productName.textContent = name;
    renderColors(apiResponse.colors);
    renderSizes(apiResponse.sizes);
  } catch (error) {}
});

backIcon.addEventListener("click", () => {
  navigateTo("homePage");
});

ShoppingBtn.addEventListener("click", () => {
  if (count > 0 && selectedColor && selectedSize) {
    alert("Added to your cart successfully!");
  }
  if (!selectedColor) {
    alert("Choose a color!!");
  }
  if (!selectedSize) {
    alert("Pick a size!!");
  }
});

plusBtn.addEventListener("click", () => {
  count++;
  productCount.innerHTML = `${count}`;
  updateTotalPrice();
});

minusBtn.addEventListener("click", () => {
  if (count !== 0) {
    count--;
    productCount.innerHTML = `${count}`;
    updateTotalPrice();
  }
});

function updateTotalPrice() {
  productPrice.textContent = `$ ${(count * apiResponse.price).toFixed(2)}`;
}

function renderColors(colors : string) {
  colorSection.innerHTML = "";
  let colorsArray = colors.split("|");
  colorsArray.forEach((color : string) => {
    const colorDiv = document.createElement("div");
    colorDiv.style.backgroundColor = color;
    colorDiv.className =
      " font-semibold flex justify-center items-center  border-[1px] border-App-text-black rounded-full min-w-11 min-h-11 text-nowrap";
    if (color == selectedColor) {
      const tick = document.createElement("img");
      tick.src = "../public/SVG/check.svg";
      tick.className = "w-6 h-6";
      colorDiv.appendChild(tick);
    }
    colorSection.append(colorDiv);
    colorDiv.addEventListener("click", () => {
      selectedColor = color;
      renderColors(colors);
    });
  });
}

function renderSizes(sizes : string) {
  sizeSection.innerHTML = "";
  let sizeArray = sizes.split("|");
  sizeArray.forEach((size : string) => {
    const sizeDiv = document.createElement("div");
    sizeDiv.textContent = size;
    sizeDiv.className = `border-[2px] border-App-text-gray text-App-text-gray  font-semibold min-w-11 min-h-11 rounded-full flex justify-center items-center tex-nowrap`;
    if (size == selectedSize) {
      sizeDiv.classList.add("bg-App-black", "text-white");
    }
    sizeSection.append(sizeDiv);
    sizeDiv.addEventListener("click", () => {
      selectedSize = size;
      renderSizes(sizes);
    });
  });
}
