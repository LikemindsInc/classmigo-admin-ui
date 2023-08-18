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

export const generateRandom = (length: number) => {
  return uuidv4().slice(0, length);
};
