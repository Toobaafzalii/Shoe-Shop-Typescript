import {
    getAllSneakersApi,
    getBrandsApi,
    getUserInfoApi,
  } from "../api/services";
  import "../style.css";
  import {} from "../utils/constants";
  import { navigateTo } from "../utils/navigation";
  import { deleteUSerToken } from "../utils/userManager";
  
  const listSection = document.getElementById("product-list-section")as HTMLElement;
  const loadMoreButton = document.getElementById("load-more-btn") as HTMLButtonElement;
  const greetingMsg = document.getElementById("greeting-msg") as HTMLElement;
  const usernameSection = document.getElementById("user-name") as HTMLElement;
  const logOutBtn = document.getElementById("logout-btn") as HTMLButtonElement;
  const fillterSection = document.getElementById("fillter-section")as HTMLElement;
  const fakeSearchInput = document.getElementById("fake-search-input")as HTMLElement;
  const searchModal = document.getElementById("search-modal")as HTMLElement;
  const realSearchInput = document.getElementById("search-input") as HTMLInputElement;
  const backIcon = document.getElementById("back-icon") as HTMLElement;
  const searchedKeyword = document.getElementById("searched-keyword")as HTMLElement;
  const resultsFound = document.getElementById("results-found") as HTMLElement;
  const resultListsection = document.getElementById("search-result-section")as HTMLElement;
  const homePageContainer = document.getElementById("homepage-container")as HTMLElement;
  
  // Pagination page number
  let pageNumber = 0;
  let selectedBrand = "ALL";
  let searchParam = "";
  let searchPageNumber = 0;
  
  addEventListener("DOMContentLoaded", async () => {
    try {
      const userResponse = await getUserInfoApi();
      const sneakersResposne = await getSneakers();
      const filtersResponse = await getBrandsApi();
      greetings(userResponse.data.username);
      renderProductList(sneakersResposne.data.data);
      renderFilters(filtersResponse.data);
    } catch (error) {}
  });
  
  loadMoreButton.addEventListener("click", async () => {
    const response = await getSneakers();
    renderProductList(response.data.data);
  });
  logOutBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to logout?") == true) {
      onLogoutClick();
    } else {
      return;
    }
  });
  backIcon.addEventListener("click", () => {
    searchModal.classList.remove("flex");
    searchModal.classList.add("hidden");
    homePageContainer.classList.remove("hidden");
    homePageContainer.classList.add("flex");
  });
  fakeSearchInput.addEventListener("focus", () => {
    openSearchModal();
  });
  
  function openSearchModal() {
    searchModal.classList.remove("hidden");
    searchModal.classList.add("flex");
    homePageContainer.classList.remove("flex");
    homePageContainer.classList.add("hidden");
    resultListsection.innerHTML = "";
    searchPageNumber = 0;
    realSearchInput.value = "";
    resultsFound.textContent = "0 Found";
    searchedKeyword.textContent = "";
    realSearchInput.addEventListener("input", () => {
      searchParam = realSearchInput.value;
      searchedKeyword.innerHTML = `"${searchParam}"`;
      searchedApiCall(searchParam);
    });
  }
  
  async function getSneakers() {
    pageNumber++;
    const response = await getAllSneakersApi(
      pageNumber,
      null,
      selectedBrand == "ALL" ? "" : selectedBrand
    );
    if (pageNumber === response.data.totalPages) {
      loadMoreButton.classList.add("hidden");
    } else {
      loadMoreButton.classList.remove("hidden");
    }
    return response;
  }
  
  async function greetings(userName : string) {
    usernameSection.innerHTML = userName;
    const time = new Date();
    const hour = time.getHours();
  
    if (hour < 6) {
      greetingMsg.innerHTML = "<p>Good night 🌙</p>";
    } else if (hour < 12) {
      greetingMsg.innerHTML = "<p>Good morning ☀️</p>";
    } else if (hour < 18) {
      greetingMsg.innerHTML = "<p>Good afternoon 😎</p>";
    } else {
      greetingMsg.innerHTML = "<p>Good evening 👋</p>";
    }
  }
  
  function renderProductList(sneakers : IshoeData[]) {
    for (let item of sneakers) {
      let listItem = document.createElement("div");
      listItem.className = "flex flex-col justify-start items-start gap-1.5";
      let itemImg = document.createElement("img");
      itemImg.src = `${item.imageURL}`;
      itemImg.id = `${item.id}`;
      itemImg.className = " w-[182px] h-[182px] border rounded-3xl";
      let itemName = document.createElement("p");
      itemName.textContent = `${item.name}`;
      itemName.className =
        "text-xl  font-bold text-App-text-black w-full truncate";
      let itemPrice = document.createElement("span");
      itemPrice.textContent = `$ ${item.price}.00`;
      itemPrice.className = "text-base font-semibold text-App-text-black";
      listSection.appendChild(listItem);
      listItem.appendChild(itemImg);
      listItem.appendChild(itemName);
      listItem.appendChild(itemPrice);
      listItem.addEventListener("click", () => onItemClick(item.id));
    }
  }
  
  function onLogoutClick() {
    deleteUSerToken();
    navigateTo("logIn");
  }
  
  async function renderFilters(filters : Array<string>) {
    filters.unshift("ALL");
    for (const brand of filters) {
      const div = document.createElement("div");
      if (brand === "ALL") {
        div.classList.add("pointer-events-none", "bg-App-black", "text-white");
      } else {
        div.classList.add("text-App-text-black");
      }
      div.className +=
        " font-semibold  border-2 border-App-text-black rounded-3xl py-2 px-[20px] text-nowrap";
      div.textContent = brand;
      div.addEventListener("click", () => onFilterCLick(brand));
      fillterSection.append(div);
    }
  }
  
  async function onFilterCLick(brand : string) {
    const filters = fillterSection.children;
    for (const filter of filters) {
      if (filter.className.includes("bg-App-black")) {
        filter.classList.add("text-App-text-black");
        filter.classList.remove(
          "pointer-events-none",
          "text-white",
          "bg-App-black"
        );
      }
      if (filter.textContent === brand) {
        filter.classList.remove("text-App-text-black");
        filter.classList.add("pointer-events-none", "bg-App-black", "text-white");
      }
    }
    pageNumber = 0;
    selectedBrand = brand;
    const response = await getSneakers();
    listSection.innerHTML = "";
    renderProductList(response.data.data);
  }
  
  function onItemClick(id : number) {
    try {
      navigateTo("productPage", `?id=${id}`);
    } catch (error) {}
  }
  ////////////////////search section///////////////////////
  
  const debounce = (func : Function, delay = 3000) => {
    let timerId : ReturnType<typeof setTimeout> | undefined
    return (...args : any) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => func(...args), delay);
    };
  };
  
  const searchedApiCall = debounce(async () => {
    searchPageNumber = 0;
    resultListsection.innerHTML = "";
    await getSearchedSneakers();
  }, 500);
  
  async function getSearchedSneakers() {
    searchPageNumber++;
    const searchResponse = await getAllSneakersApi(
      searchPageNumber,
      null,
      searchParam
    );
    resultsFound.innerHTML = `${searchResponse.data.total} found`;
    if (searchResponse.data.data.length == 0) {
      resultListsection.innerHTML = `
          <img src="../public/PNG/empty-state.png" alt="empty-state" />
          <span
            class="text-xl font-semibold text-App-text-gray leading-6 text-center"
            >Not Found</span
          >
          <div class="w-[75%] text-center py-5">
            <span class="text-base font-semibold text-App-text-gray leading-5"
              >Sorry, the keyword you enterd cannot be found,Please check again or
              search with another keyword.</span>
          </div>`;
      resultListsection.classList.remove(
        "w-full",
        "overflow-x-scroll",
        "grid",
        "grid-cols-2",
        "gap-4",
        "px-5"
      );
      resultListsection.classList.add(
        "flex",
        "flex-col",
        "justify-between",
        "items-center",
        "mt-20"
      );
    } else {
      renderSearchList(searchResponse.data);
    }
  }
  
  function renderSearchList(searchResponse : Ishoe) {
    for (let item of searchResponse.data) {
      const itemDiv = document.createElement("div");
      itemDiv.className += "flex flex-col justify-start items-start gap-1.5";
      itemDiv.id = item.id;
      itemDiv.innerHTML = `
      <img class=" w-[182px] h-[182px] border rounded-3xl" src=${item.imageURL} alt=${item.name}/>
    <p class="text-xl  font-bold text-App-text-black w-full truncate">${item.name}</p>
    <span class="text-base font-semibold text-App-text-black">$ ${item.price}.00</span>
  `;
      resultListsection.append(itemDiv);
      resultListsection.classList.remove(
        "flex",
        "flex-col",
        "justify-between",
        "items-center",
        "mt-20"
      );
      resultListsection.classList.add(
        "w-full",
        "overflow-x-scroll",
        "grid",
        "grid-cols-2",
        "gap-4",
        "px-5"
      );
      itemDiv.addEventListener("click", () => onItemClick(item.id));
    }
    if (searchResponse.data?.totalPages > searchPageNumber) {
      const loadMoreSearchBtn = document.createElement("button");
      const loadMoreBtnContainer = document.createElement("div");
      loadMoreBtnContainer.className =
        "grid col-start-1 col-span-2 border-2 border-App-text-gray mx-auto rounded-3xl mb-2";
      loadMoreSearchBtn.className =
        "font-semibold  self-center py-2 px-[12px] text-nowrap text-App-text-gray";
      loadMoreSearchBtn.addEventListener("click", async () => {
        loadMoreBtnContainer.remove();
        await getSearchedSneakers();
      });
      loadMoreSearchBtn.textContent = "Load More";
      resultListsection.append(loadMoreBtnContainer);
      loadMoreBtnContainer.append(loadMoreSearchBtn);
    }
  }
  