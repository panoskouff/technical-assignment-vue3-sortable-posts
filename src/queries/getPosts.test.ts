import { getPosts } from '@/queries/getPosts';
import { QueriesTypesSameAsBackend } from '@/types';

describe('getPosts Function', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Should fetch posts and return them', async () => {
    const mockFetch = jest.fn();
    globalThis.fetch = mockFetch;

    const mockPosts: QueriesTypesSameAsBackend.Post[] = [
      {
        userId: 1,
        id: 1,
        title: 'Post 1 title',
        body: 'Post 1 body',
      },
      {
        userId: 1,
        id: 2,
        title: 'Post 2 title',
        body: 'Post 2 body',
      },
    ];

    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockPosts),
    } as any);

    const result = await getPosts();

    expect(mockFetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts'
    );
    expect(result).toEqual(mockPosts);
  });
});
