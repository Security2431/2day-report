// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObjectEmpty = (objectName: Record<string, any> = {}) => {
  return Object.keys(objectName).length === 0;
};
