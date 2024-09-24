import "../style.css";
import { showToast } from "../utils/toast";
import { logInApi } from "../api/services";
import {} from "../utils/constants";
import { setUserToken } from "../utils/userManager";
import { navigateTo } from "../utils/navigation";

const backIcon = document.getElementById("back-icon") as HTMLElement;
const eyeIcon = document.getElementById("eye-icon") as HTMLElement;
const passInput = document.getElementById("password-input") as HTMLInputElement;
const userInput = document.getElementById("username-input") as HTMLInputElement;
const logInBtn = document.getElementById("login-btn") as HTMLButtonElement;
const logInForm = document.getElementById("login-form") as HTMLElement;

backIcon.addEventListener("click", () => {
  history.back();
});

eyeIcon.addEventListener("click", () => {
  if (passInput.type == "text") passInput.type = "password";
  else passInput.type = "text";
});

userInput.addEventListener("input", () => onInputChange());
passInput.addEventListener("input", () => onInputChange());

function onInputChange() {
  console.log(userInput.value, passInput.value);
  if (
    userInput.value !== "" &&
    passInput.value !== "" &&
    passInput.value.length >= 8
  ) {
    logInBtn.disabled = false;
    logInBtn.classList.remove("bg-opacity-65");
  } else {
    logInBtn.disabled = true;
    logInBtn.classList.add("bg-opacity-65");
  }
}

logInForm.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    let username = userInput.value;
    let password = passInput.value;
    const response = await logInApi({
      username,
      password,
    });
    setUserToken(response.data.token);
    showToast("Logged in");
    setTimeout(() => {
      navigateTo("homePage");
    }, 1000);
  } catch (error) {
    console.log(error);
  }
});
