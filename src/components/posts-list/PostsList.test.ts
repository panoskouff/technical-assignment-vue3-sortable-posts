import { mount } from '@vue/test-utils';
import PostsList from '@/components/posts-list/PostsList.vue';
import PostCard from '@/components/post-card/PostCard.vue';
import { Post } from '@/types';

describe('PostsList.vue', () => {
  const mockPosts: Post[] = [
    {
      userId: 1,
      id: 1,
      title: 'Title 1',
      cellTitle: 'CellTitle 1',
      body: 'Body 1',
    },
    {
      userId: 2,
      id: 2,
      title: 'Title 2',
      cellTitle: 'CellTitle 2',
      body: 'Body 2',
    },
  ];

  it('Should render correctly with the correct props', () => {
    const wrapper = mount(PostsList, {
      props: {
        posts: mockPosts,
        isChecked: true,
      },
    });

    const titleElement = wrapper.find('[class*="title"]');
    expect(titleElement.text()).toBe('Sortable Post List');
  });

  it('Should emit toggleCheckbox event when the checkbox is toggled', async () => {
    const wrapper = mount(PostsList, {
      props: {
        posts: mockPosts,
        isChecked: true,
      },
    });

    await wrapper.find('[type="checkbox"]').trigger('change');
    expect(wrapper.emitted().toggleCheckbox).toBeTruthy();
  });

  it('Should render the correct amount of PostCard with the correct props', async () => {
    const wrapper = mount(PostsList, {
      props: {
        posts: mockPosts,
        isChecked: true,
      },
    });

    const postCards = wrapper.findAllComponents(PostCard);
    expect(postCards.length).toBe(mockPosts.length);

    // validate props for each PostCard
    postCards.forEach((postCardWrapper, index) => {
      expect(postCardWrapper.props()).toEqual({
        cellTitle: mockPosts[index].cellTitle,
        body: mockPosts[index].body,
        index: index,
        isLast: index === mockPosts.length - 1,
      });
    });

    // rerender the component with checkbox unchecked
    await wrapper.setProps({ isChecked: false });
    const updatedPostCards = wrapper.findAllComponents(PostCard);

    updatedPostCards.forEach((postCardWrapper) => {
      expect(postCardWrapper.props().body).toBe('');
    });
  });
});
