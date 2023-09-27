import { performTimeTravel, SwapRecord } from './performTimeTravel';

describe('performTimeTravel function', () => {
  it('should revert array state based on history up to the given index', () => {
    const arrayAfterSwaps = [2, 3, 1, 4];
    const history: SwapRecord[] = [
      { indexFrom: 0, indexTo: 1 },
      { indexFrom: 2, indexTo: 3 },
      { indexFrom: 2, indexTo: 3 },
      { indexFrom: 1, indexTo: 2 },
    ];
    const { newArray, newHistory } = performTimeTravel(
      arrayAfterSwaps,
      history,
      2
    );
    expect(newArray).toEqual([2, 1, 4, 3]);
    expect(newHistory).toEqual([
      { indexFrom: 0, indexTo: 1 },
      { indexFrom: 2, indexTo: 3 },
    ]);

    const { newArray: newArray2, newHistory: newHistory2 } = performTimeTravel(
      newArray,
      newHistory,
      0
    );
    expect(newArray2).toEqual([1, 2, 3, 4]);
    expect(newHistory2).toEqual([]);
  });

  it('should handle edge case of index out of bounds', () => {
    const initialArray = [1, 2, 3];
    const history: SwapRecord[] = [{ indexFrom: 0, indexTo: 1 }];
    const { newArray, newHistory } = performTimeTravel(
      initialArray,
      history,
      5
    );
    expect(newArray).toEqual([1, 2, 3]);
    expect(newHistory).toEqual([{ indexFrom: 0, indexTo: 1 }]);
  });

  it('should return the array and history unchanged if uptoIndex is equal to history length', () => {
    const initialArray = [1, 2, 3];
    const history: SwapRecord[] = [{ indexFrom: 0, indexTo: 1 }];
    const { newArray, newHistory } = performTimeTravel(
      initialArray,
      history,
      history.length
    );
    expect(newArray).toEqual([1, 2, 3]);
    expect(newHistory).toEqual([{ indexFrom: 0, indexTo: 1 }]);
  });
});
