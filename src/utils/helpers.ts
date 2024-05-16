export const splitByChunks = <T>(arr: T[], chunkSize: number): T[][] => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
};

export const cutString = (str: string, maxLength: number) => {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength - 3) + '...';
  }
};
