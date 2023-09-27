import { QueriesTypesSameAsBackend } from '.';

export type SwapPostRecord = {
  swapRecordId: string | number;
  postId: string | number;
  indexFrom: number;
  indexTo: number;
};

export type Post = QueriesTypesSameAsBackend.Post & { cellTitle: string };
