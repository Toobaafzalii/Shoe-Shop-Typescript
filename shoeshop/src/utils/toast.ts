import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

// status: SUCCESS , FAILURE 
export const showToast = (text:string, status = "SUCCESS") => {
  const background = status !== "SUCCESS" ? "#ce4b4b" : "#7cab79";
  Toastify({
    text,
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background,
      borderRadius: "6px",
    },
    onClick: function () {},
  }).showToast();
};
