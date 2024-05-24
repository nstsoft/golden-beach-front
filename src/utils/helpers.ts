import { type Event } from './events';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getItemFromArray(array: any[], index: number) {
  if (array.length === 0) return undefined;
  const wrappedIndex = index % array.length;
  return array[wrappedIndex];
}

export const groupItemsByMonth = (items: Event[]) => {
  const groupedItems: { [key: string]: Event[] } = {};
  const sortedByDate = items.sort((a, b) => a.date.getTime() - b.date.getTime());
  for (const item of sortedByDate) {
    const month = `${item.date.getFullYear()}/${item.date.getMonth() + 1}/01`;
    if (!groupedItems[month]) {
      groupedItems[month] = [];
    }
    groupedItems[month].push(item);
  }
  return groupedItems;
};
