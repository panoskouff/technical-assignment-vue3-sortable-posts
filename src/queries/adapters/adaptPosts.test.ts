import { adaptPosts } from '@/queries/adapters/adaptPosts';
import { QueriesTypesSameAsBackend } from '@/types';

describe('adaptPosts Adapter Function', () => {
  it('Should correctly adapt the posts', () => {
    const mockData: QueriesTypesSameAsBackend.Post[] = [
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

    const expectedAdaptedData = [
      {
        userId: 1,
        id: 1,
        title: 'Post 1 title',
        body: 'Post 1 body',
        cellTitle: 'Post 1',
      },
      {
        userId: 1,
        id: 2,
        title: 'Post 2 title',
        body: 'Post 2 body',
        cellTitle: 'Post 2',
      },
    ];

    const adaptedData = adaptPosts(mockData);

    expect(adaptedData).toEqual(expectedAdaptedData);
  });
});
