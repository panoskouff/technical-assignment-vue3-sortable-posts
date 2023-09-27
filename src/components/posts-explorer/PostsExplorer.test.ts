import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import PostsExplorer from '@/components/posts-explorer/PostsExplorer.vue';
import PostsList from '@/components/posts-list/PostsList.vue';
import ActionsList from '@/components/actions-list/ActionsList.vue';
import ListSelector from '../list-selector/ListSelector.vue';

describe('PostsExplorer', () => {
  let wrapper: any;

  const getPostsOnce = () => [
    { id: 1, userId: 1, cellTitle: 'Post 1', title: 'title 1', body: '' },
    { id: 2, userId: 1, cellTitle: 'Post 2', title: 'title 2', body: '' },
  ];

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('Should render correctly for the correct props', async () => {
    wrapper = mount(PostsExplorer, {
      props: { getPostsOnce },
      global: {
        mocks: {
          screenWidth: 641,
        },
      },
    });
    await nextTick();
    const PostsListsComponent = wrapper.findComponent(PostsList);
    const ActionsListComponent = wrapper.findComponent(ActionsList);

    expect(PostsListsComponent.exists()).toBe(true);
    expect(PostsListsComponent.props('isChecked')).toBe(true);
    expect(PostsListsComponent.props('posts')).toEqual(getPostsOnce());
    expect(ActionsListComponent.exists()).toBe(true);
    expect(ActionsListComponent.props('swapHistory')).toEqual([]);
  });

  it('Should render ListSelector and only the selected list if screenWidth <= 640', async () => {
    wrapper = mount(PostsExplorer, {
      props: { getPostsOnce },
      global: {
        mocks: {
          screenWidth: 640,
        },
      },
    });
    await nextTick();
    expect(wrapper.findComponent(ListSelector).exists()).toBe(true);

    const PostsListsComponent = wrapper.findComponent(PostsList);
    const ActionsListComponent = wrapper.findComponent(ActionsList);

    expect(PostsListsComponent.exists()).toBe(true);
    expect(ActionsListComponent.exists()).toBe(false);
  });

  it('Should provide swapPost and timeTravel functions', async () => {
    const wrapper = mount(PostsExplorer, {
      props: { getPostsOnce },
    });

    type WrapperVM = {
      swapPost: (direction: string, index: number) => void;
      timeTravel: (index: number) => void;
    };

    const swapPostSpy = jest.spyOn(
      wrapper.vm as unknown as WrapperVM,
      'swapPost'
    );
    const timeTravelSpy = jest.spyOn(
      wrapper.vm as unknown as WrapperVM,
      'timeTravel'
    );

    (wrapper.vm as unknown as WrapperVM).swapPost('up', 1);

    (wrapper.vm as unknown as WrapperVM).timeTravel(1);

    await wrapper.vm.$nextTick();

    expect(swapPostSpy).toHaveBeenCalled();
    expect(timeTravelSpy).toHaveBeenCalled();
  });
});
