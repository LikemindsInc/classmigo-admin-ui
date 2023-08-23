import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

export const formatUrlName = (url: string): string => {
  const removePercentage = url.replace(/%20/g, " ");
  let removeUnderscoreHyphen = removePercentage.replace(/_/g, " ");
  removeUnderscoreHyphen = removeUnderscoreHyphen.replace(/-/g, " ");
  const decoded = decodeURIComponent(
    removeUnderscoreHyphen.replace(/\+/g, " ")
  );
  return _.capitalize(decoded);
};

export const checkFileSize = (file: any, maxSize: number): boolean => {
  return file.size <= maxSize;
};
export const convertToBase64 = (file: File): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Couldn't read file as base64."));
      }
    };
    reader.onerror = (error) => reject(error);
  });

export const checkforValidString = (value: any) =>
  value ? /^[\w ]*[a-zA-Z]+(([', -][a-zA-Z])?[a-zA-Z]*)\s*$/.test(value) : true;

export const generateRandom = (length: number) => {
  return uuidv4().slice(0, length);
};

export const formatOptions = (
  items: any[],
  label: string | string[],
  value: string | string[]
) => {
  return items?.length > 0
    ? items.map((sessionData) => {
        const newObj: Record<string, any> = {};
        if (Array.isArray(value)) {
          value.forEach((item) => {
            newObj[item] = sessionData[item];
          });
        }
        return {
          value: Array.isArray(value) ? newObj : sessionData[value],
          label: Array.isArray(label)
            ? `${sessionData[label[0]]} (${sessionData[label[1]]})`
            : sessionData[label],
        };
      })
    : [];
};

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};




//Custom Post Function

type ApiResponse<T> = {
  data: T | null;
  error: Error | null;
}

var accessToken: any = Cookies.get("user");
let token: any = ""
if (accessToken) {
  token  = JSON.parse(accessToken);
}
export async function customPost<T>(url: string, requestData: any): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios.post(url, requestData, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      }
    });
    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error as Error,
    };
  }
}