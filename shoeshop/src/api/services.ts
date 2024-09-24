import {} from "../utils/constants";
import { api } from "./axios";
import { PATHS } from "./paths";

export async function signUpApi(data:IuserData) {
  const response = await api.post(PATHS.auth.signUp, data);
  return response;
}

export async function logInApi(data:IuserData) {
  const response = await api.post(PATHS.auth.logIn, data);
  return response;
}

export async function getUserInfoApi() {
  const response = await api.get(PATHS.user);
  return response;
}

export async function getAllSneakersApi(page:number, brand:string | null, search:string) {
  let config = `?limit=10&page=${page}`;
  if (brand) {
    config += `&brands=${brand}`;
  }
  if (search) {
    config += `&search=${search}`;
  }
  const response = await api.get(`${PATHS.sneaker.main}${config}`);
  return response;
}

export async function getBrandsApi() {
  const response = await api.get(`${PATHS.sneaker.brands}`);
  return response;
}

export async function getProductApi(id:string) {
  const response = await api.get(`${PATHS.sneaker.item.replace("id", id)}`);
  return response;
}
