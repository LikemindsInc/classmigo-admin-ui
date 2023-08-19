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

export const convertToBase64 = (file: File): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Couldn\'t read file as base64.'));
      }
    };
    reader.onerror = (error) => reject(error);
  });


export const checkforValidString = (value:any) =>
	value
		? /^[\w ]*[a-zA-Z]+(([', -][a-zA-Z])?[a-zA-Z]*)\s*$/.test(value)
		: true;


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
            : sessionData[label]
        };
      })
    : [];
};


export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};