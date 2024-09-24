import "./style.css";
import "toastify-js/src/toastify.css";
import { getUserToken } from "./src/utils/userManager";
import { navigateTo } from "./src/utils/navigation";

setTimeout(changePath, 1500);

function changePath() {
  const token = getUserToken();
  if (token) {
    navigateTo("homePage");
  } else {
    navigateTo("onBoarding");
  }
}
