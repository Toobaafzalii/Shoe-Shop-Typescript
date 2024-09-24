import "../style.css";
import { navigateTo } from "../utils/navigation";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const paginationSection = document.getElementById("onboarding-pagination") as HTMLElement;
const onBoardingBtn = document.getElementById("onboarding-btn") as HTMLButtonElement;
const swipperWrapper = document.getElementById("swiper-wrapper") as HTMLElement;

const swiper = new Swiper(".swiper", {
  // Optional parameters
  cssMode: true,
  mousewheel: true,
  observer: true,
  observeParents: true,
  on: {
    slideChange: (swiper) => {
      renderPagination();
      if (swiper.activeIndex + 1 == onBoardingData.length) {
        onBoardingBtn.textContent = "Get Started";
      } else {
        onBoardingBtn.textContent = "Next";
      }
    },
  },
});

// const onboardingImg = document.getElementById("onboarding-img");
// const onBoardingText = document.getElementById("onboarding-txt");

const onBoardingData = [
  {
    page: 0,
    imgSrc: "../public/PNG/onBoarding1.png",
    text: "We provide high quality products just for you",
  },
  {
    page: 1,
    imgSrc: "../public/PNG/onBoarding2.png",
    text: "Your satisfaction is our number one periority",
  },
  {
    page: 2,
    imgSrc: "../public/PNG/onBoarding3.png",
    text: "Let’s fulfill your fashion needs with shoearight now!",
  },
];

function renderPagination() {
  paginationSection.innerHTML = "";
  for (let data of onBoardingData) {
    let node = `<div id='pagination-${data.page}' class=" w-8 ${
      data.page !== swiper.activeIndex ? " bg-gray-400" : " bg-App-black"
    }  h-1"></div>`;
    paginationSection.innerHTML += node;
  }
}

function renderPage() {
  for (let item of onBoardingData) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const text = document.createElement("div");
    text.textContent = item.text;
    text.className =
      "text-[32px] font-semibold leading-10 flex justify-center items-center text-center mt-8 px-6";
    img.src = item.imgSrc;
    img.className = "w-full h-[560px]";
    div.className = "swiper-slide";
    div.append(img);
    div.append(text);
    swipperWrapper.append(div);
  }
}
addEventListener("DOMContentLoaded", () => {
  renderPagination();
  renderPage();
  swiper.update();
});

onBoardingBtn.addEventListener("click", () => changeOnboardingData());

function changeOnboardingData() {
  if (swiper.activeIndex + 1 === onBoardingData.length) {
    navigateTo("logIn");
    return;
  }
  swiper.slideNext();
}
