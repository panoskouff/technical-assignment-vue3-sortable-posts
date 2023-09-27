import { swapArrayElements } from './swapArrayElements';

export type SwapRecord = {
  indexFrom: number;
  indexTo: number;
};

export function performTimeTravel<T, K extends SwapRecord>(
  arr: T[],
  history: K[],
  uptoIndex: number
): { newArray: T[]; newHistory: K[] } {
  let newArray = [...arr];
  let newHistory = [...history];

  for (let i = newHistory.length - 1; i >= uptoIndex; i--) {
    const { indexFrom, indexTo } = newHistory[i];
    newArray = swapArrayElements(newArray, indexFrom, indexTo);
  }

  newHistory.splice(uptoIndex);
  return { newArray, newHistory };
}
