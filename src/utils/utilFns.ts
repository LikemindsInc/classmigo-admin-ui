export const formatUrlName = (url: string): string => {
  const hasUnderscoreOrSpaceEncoding = /_|%20/.test(url);
  if (hasUnderscoreOrSpaceEncoding) {
    const removeUnderscore = url.replace(/_/g, " ");
    const decoded = decodeURIComponent(removeUnderscore.replace(/\+/g, " "));
    return decoded;
  } else {
    return url;
  }
};

export const checkFileSize = (file:any, maxSize:number):boolean => {
  return file.size <= maxSize
}

export const checkFileType = (file:any, fileType:string):boolean => {
  const currentType = file.type
  return fileType.includes(currentType)
}