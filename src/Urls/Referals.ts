import { countryRequest, request } from "../utils/requestProcessor";
import { generateUrlParams } from "../utils/utilFns";

// const BASE_URL = "Agent"
export const getReferalDataUrl = (filter?: any) => {
  const generatedParam = generateUrlParams(filter);
  return request({
    url: `/agent?${generatedParam}`,
    method: "GET",
  });
};

export const getUserReferalsUrl = (code: string) => {
  return request({
    url: `/agent/${code}`,
    method: "GET",
  });
};

export const blockReferalsUrl = (code: string) => {
  return request({
    url: `/agent/${code}/block`,
    method: "PUT",
  });
};

export const unblockReferalsUrl = (code: string) => {
  return request({
    url: `/agent/${code}/unblock`,
    method: "PUT",
  });
};

export const getCountries = async (authToken: string) => {
  return countryRequest(authToken, "countries");
};

export const getStates = async (authToken: string, country: string) => {
  return countryRequest(authToken, "states", country);
};

export const getLga = async (authToken: string, state: string) => {
  return countryRequest(authToken, "cities", state);
};

export const createAgent = (data: any) => {
  return request({
    url: `/agent`,
    method: "POST",
    data,
  });
};
