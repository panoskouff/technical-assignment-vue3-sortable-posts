import { swapArrayElements } from './swapArrayElements';

describe('swapArrayElements function', () => {
  it('should swap elements at the given indices', () => {
    const initialArray = [1, 2, 3, 4, 5];
    const expectedArray = [1, 3, 2, 4, 5];
    expect(swapArrayElements(initialArray, 1, 2)).toEqual(expectedArray);
  });

  it('should return the same array if indices are out of bounds', () => {
    const initialArray = [1, 2, 3];
    expect(swapArrayElements(initialArray, 5, 6)).toEqual(initialArray);
  });

  it('should return a new array and not mutate the original', () => {
    const initialArray = [1, 2, 3];
    const swappedArray = swapArrayElements(initialArray, 0, 1);
    expect(initialArray).toEqual([1, 2, 3]);
    expect(swappedArray).not.toBe(initialArray);
  });

  it('should handle empty arrays', () => {
    const initialArray: number[] = [];
    expect(swapArrayElements(initialArray, 0, 1)).toEqual([]);
  });

  it('should return the same array when swapping an index with itself', () => {
    const initialArray = [1, 2, 3];
    expect(swapArrayElements(initialArray, 0, 0)).toEqual(initialArray);
  });
});
