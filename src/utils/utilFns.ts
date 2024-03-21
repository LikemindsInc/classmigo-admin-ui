import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

export const formatUrlName = (url: string): string => {
  const removePercentage = url.replace(/%20/g, " ");
  let removeUnderscoreHyphen = removePercentage.replace(/_/g, " ");
  removeUnderscoreHyphen = removeUnderscoreHyphen.replace(/-/g, " ");
  const decoded = decodeURIComponent(
    removeUnderscoreHyphen.replace(/\+/g, " ")
  );
  return _.capitalize(decoded);
};

export const getFirstRouteName = (url: string) => {
  const path = new URL(url).pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  const routeParts = trimmedPath.split("/");
  const firstRouteName = routeParts[0];

  const formattedRouteName = decodeURIComponent(firstRouteName)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());

  return formattedRouteName;
};

export const checkValidNumber = (number: number | string) => {
  if (typeof number === "number" && !isNaN(number) && number >= 0) {
    return true;
  }
  return false;
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
  value
    ? /^[^\s/]*[\w ]*[a-zA-Z]+(([', -][a-zA-Z])?[a-zA-Z]*)\s*$/.test(value)
    : true;

export const generateRandom = (length: number) => {
  return uuidv4().slice(0, length);
};

export const setMenuTitle = (url: string) => {
  const removePercentage = url.replace(/%20/g, " ");
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

export const formatSubscriptionOptions = (
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
          value: Array.isArray(value) ? newObj : sessionData._id,
          label: Array.isArray(label)
            ? `${sessionData[label[0]]} (${sessionData[label[1]]})`
            : sessionData.friendlyName,
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

export const formatIncomingDate = (incomingDate: string): string => {
  const newDateTime = new Date(incomingDate);

  const formattedDateTime = newDateTime.toISOString().slice(0, 16);

  return formattedDateTime;
};

//Custom Post Function

type ApiResponse<T> = {
  data: T | null;
  error: Error | null;
};

var accessToken: any = Cookies.get("user");
let token: any = "";
if (accessToken) {
  token = JSON.parse(accessToken);
}

export async function customPost<T>(
  url: string,
  requestData: any
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios.post(url, requestData, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
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

export async function customApiGet<T>(
  url: string,
  headers?: Record<string, string>
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.get(url, {
      headers: headers || {},
    });
    return response.data;
  } catch (e: any) {
    throw new Error(`Error fetching data: ${e.message}`);
  }
}

export const CalculateDiscount = (value: number, total: number) => {
  if (total === 0) {
    return 0;
  }
  return Math.floor((value / total) * 100);
};

export const generateUrlParams = (obj: any) => {
  let generatedUrl = ``;
  const arrayOfObjectKeys = Object.keys(obj);
  arrayOfObjectKeys.forEach((key) => {
    if (obj[key] || obj[key] === false) {
      generatedUrl += `${key}=${obj[key]}&`;
    }
  });
  return generatedUrl;
};

export const generateQueryKey = (baseKey: string, searchFilter: any) => {
  const searchFilterString = JSON.stringify(searchFilter);
  const queryKey = `${baseKey}-${searchFilterString}`;

  return queryKey;
};

export const convertKoboToNaira = (kobo: number) => {
  const naira = kobo / 100;

  const formattedNaira = naira.toLocaleString();

  return formattedNaira;
};

export const roundNumberDown = (points: number): number => {
  return Math.floor(points);
};

export const downloadTemplate = () => {
  const csvData = [
    ` QUESTION, EXPLANATION, OPTION1_LABEL, OPTION1_VALUE, OPTION2_LABEL, OPTION2_VALUE, OPTION3_LABEL, OPTION_3_VALUE, OPTION4_LABEL, OPTION_4_VALUE, CORRECT_OPTION, SCORE, IMAGE_LINK, ,`,
  ];

  const element = document.createElement("a");
  const file = new Blob([csvData as any], { type: "text/csv" });
  element.href = URL.createObjectURL(file);
  element.download = "template.csv";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

// export const downloadGeneralTemplate = () => {
//   const csvData = [
//     ` QUESTION, EXPLANATION, OPTION1_LABEL, OPTION1_VALUE, OPTION2_LABEL, OPTION2_VALUE, OPTION3_LABEL, OPTION_3_VALUE, OPTION4_LABEL, OPTION_4_VALUE, CORRECT_OPTION, SCORE, IMAGE_LINK, CLASS, SUBJECT`,
//   ];

//   const element = document.createElement("a");
//   const file = new Blob([csvData as any], { type: "text/csv" });
//   element.href = URL.createObjectURL(file);
//   element.download = "template.csv";
//   document.body.appendChild(element);
//   element.click();
//   document.body.removeChild(element);
// };

const downloadFile = (element: any) => {
  return new Promise<void>((resolve, reject) => {
    // Append the element to the body before clicking to ensure browser compatibility
    document.body.appendChild(element);

    element.click();

    // Listen for the download completion
    element.addEventListener("load", () => {
      resolve();
    });

    // Handle errors during the download
    element.addEventListener("error", (error: Error) => {
      reject(error);
    });
  });
};

export const downloadGeneralTemplate = async () => {
  const csvData = [
    ` QUESTION, EXPLANATION, OPTION1_LABEL, OPTION1_VALUE, OPTION2_LABEL, OPTION2_VALUE, OPTION3_LABEL, OPTION_3_VALUE, OPTION4_LABEL, OPTION_4_VALUE, CORRECT_OPTION, SCORE, IMAGE_LINK, CLASS, SUBJECT`,
  ];

  const element = document.createElement("a");
  const file = new Blob([csvData as any], { type: "text/csv" });
  element.href = URL.createObjectURL(file);
  element.download = "template.csv";

  try {
    await downloadFile(element);
    // If this block is reached, it means the download was successful
    toast.success("Download successful", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  } catch (error) {
    toast.error(
      "Something went wrong while trying to download. Consider switching browsers to see if that helps",
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      }
    );
    // Handle the error as needed (e.g., show a message to the user)
  } finally {
    document.body.removeChild(element);
  }
};
