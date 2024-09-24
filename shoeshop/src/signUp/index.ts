import "../style.css";
import { navigateTo } from "../utils/navigation";
import { showToast } from "../utils/toast";
import { signUpApi } from "../api/services";
import { setUserToken } from "../utils/userManager";
import {} from "../utils/constants";

const backIcon = document.getElementById("back-icon") as HTMLElement;
const eyeIcon = document.getElementById("eye-icon") as HTMLElement;
const userInput = document.getElementById("username-input") as HTMLInputElement;
const passInput = document.getElementById("password-input") as HTMLInputElement;
const signUpBtn = document.getElementById("signup-btn") as HTMLButtonElement;
const signUpForm = document.getElementById("signup-form")as HTMLElement;

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
    signUpBtn.disabled = false;
    signUpBtn.classList.remove("bg-opacity-65");
  } else {
    signUpBtn.disabled = true;
    signUpBtn.classList.add("bg-opacity-65");
  }
}

signUpForm.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    let username = userInput.value;
    let password = passInput.value;
    let response = await signUpApi({
      username,
      password,
    });
    setUserToken(response.data.token);
    showToast("signed up");
    setTimeout(() => {
      navigateTo("homePage");
    }, 1000);
  } catch (error) {}
});
