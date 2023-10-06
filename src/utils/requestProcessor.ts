import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "./constants";
import Cookies from "js-cookie";

const client = axios.create({
  baseURL: BASE_URL,
});

export const request = async (options: any) => {
  var accessToken: any = Cookies.get("user");
  let token: any = "";

  if (accessToken) {
    token = JSON.parse(accessToken);
  }
  
  token !== "" &&
    (client.defaults.headers.common.Authorization = `Bearer ${token?.token}`);

  const onSuccess = (response: AxiosResponse) => {
    return response?.data;
  };

  const onError = (error: any) => {
    return Promise.reject(error.response?.data?.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export const extractErrors = (error: any) => {
  if (typeof error.response.data.error === "string")
    return [error.response.data.message || error.response.data.error];
  if (error.response) {
    if (error.response.data.message && error.response.data.message.length > 0) {
      return error.response.data.message.map((error: any) => {
        return error;
      });
    } else if (error.response.data.message) {
      return [error.response.data.message];
    } else {
      return [error.response.data.error];
    }
  } else {
    return [];
  }
};
