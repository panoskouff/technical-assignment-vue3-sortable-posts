import { QueriesTypesSameAsBackend } from '@/types';

export const adaptPosts = (
  posts: QueriesTypesSameAsBackend.Post[]
) => posts.map((post) => ({
  ...post,
  cellTitle: `Post ${post.id}`,
}));

