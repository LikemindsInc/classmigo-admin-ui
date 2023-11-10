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

export const countryRequest = async (
  token: string,
  url: string,
  state?: string
) => {
  const client = axios.create({
    baseURL: "https://www.universal-tutorial.com/api/",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  try {
    const response = await (state
      ? client.get(`${url}${state && `/${state}`}`)
      : client.get(url));
    return response.data;
  } catch (error: any) {
    throw new Error(`Error fetching countries: ${error.message}`);
  }
};
