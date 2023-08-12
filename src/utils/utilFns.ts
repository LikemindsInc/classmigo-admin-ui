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
