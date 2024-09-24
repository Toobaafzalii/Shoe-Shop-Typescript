import { TOKEN_NAME } from "./constants";

export const setUserToken = (token :Itoken) => {
  localStorage.setItem(TOKEN_NAME, token);
};

export const getUserToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const deleteUSerToken = () => {
  localStorage.removeItem(TOKEN_NAME);
};
