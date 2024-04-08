// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObjectEmpty = (objectName: Record<string, any> = {}) => {
  return Object.keys(objectName).length === 0;
};

export const getAvatarFallback = (name?: string | null) => {
  const nameSplit = name?.toUpperCase().split(" ");

  if (!nameSplit?.length) {
    return "CN";
  }

  if (nameSplit.length < 2) {
    return nameSplit[0]?.slice(0, 2);
  }

  return `${nameSplit[0]?.charAt(0)}${nameSplit[1]?.charAt(0)}`;
};
