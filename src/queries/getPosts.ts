import { QueriesTypesSameAsBackend } from '@/types';

const postsEndpoint = 'https://jsonplaceholder.typicode.com/posts';

export const getPosts = async (): Promise<QueriesTypesSameAsBackend.Post[]> => {
  const response = await fetch(postsEndpoint);
  const data: QueriesTypesSameAsBackend.Post[] = await response.json();
  return data;
};
