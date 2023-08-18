import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

export const formatUrlName = (url: string): string => {
  const hasUnderscoreOrSpaceEncoding = /_| |-/.test(url);
  if (hasUnderscoreOrSpaceEncoding) {
    let removeUnderscore = url.replace(/_/g, " ");
    removeUnderscore = removeUnderscore.replaceAll(/-/g, " ");
    const decoded = decodeURIComponent(removeUnderscore.replace(/\+/g, " "));
    return _.capitalize(decoded);
  } else {
    return _.capitalize(url);
  }
};

export const checkFileSize = (file: any, maxSize: number): boolean => {
  return file.size <= maxSize;
};



export const checkFileType = (file: any, fileType: string): boolean => {
  const currentType = file.type;
  return fileType.includes(currentType);
};



export const checkforValidString = (value: any) =>
  value ? /^[\w ]*[a-zA-Z]+(([', -][a-zA-Z])?[a-zA-Z]*)\s*$/.test(value) : true;



export const formatOptions = (
  data: any,
  labelKey: string,
  valueKey: string
) => {
  return data?.length > 0
    ? data.map((item: any) => ({
        value: valueKey ? item[valueKey] : item,
        label: item[labelKey],
      }))
    : [];
};

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error("Couldn't read file as base64."));
      }
    };
    reader.onerror = () => {
      reject(new Error("Could not read file as base64."));
    };
    reader.readAsDataURL(file);
  });
};