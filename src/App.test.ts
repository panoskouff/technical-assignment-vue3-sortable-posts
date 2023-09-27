import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import PostsExplorer from '@/components/posts-explorer/PostsExplorer.vue';
import useWatchRequest from '@/composables/useWatchRequest';

jest.mock('@/composables/useWatchRequest', () => {
  return jest.fn();
});

jest.mock('@/components/posts-explorer/PostsExplorer.vue', () => ({
  name: 'PostsExplorer',
  render: () => '<div></div>',
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should show 'loading data..' when posts are in a loading state", () => {
    (useWatchRequest as jest.Mock).mockImplementation(() => ({
      loading: true,
    }));

    const wrapper = mount(App);
    expect(wrapper.text()).toContain('loading data..');
  });

  it('Should display the error message when posts.hasError is true', () => {
    (useWatchRequest as jest.Mock).mockImplementation(() => ({
      hasError: true,
      errorMessage: 'An error occurred',
    }));

    const wrapper = mount(App);
    expect(wrapper.text()).toContain('An error occurred');
  });

  it("Should show 'something went wrong :(' when posts.called is true and posts.adaptedData is null", () => {
    (useWatchRequest as jest.Mock).mockImplementation(() => ({
      called: true,
      adaptedData: null,
    }));

    const wrapper = mount(App);
    expect(wrapper.text()).toContain('something went wrong :(');
  });

  it.only('Should render the PostsExplorer component when posts are successfully loaded', () => {
    (useWatchRequest as jest.Mock).mockImplementation(() => ({
      loading: false,
      adaptedData: [{ id: '1', userId: 1 }],
    }));

    const wrapper = mount(App);
    const PostsExplorerComponent = wrapper.findComponent(PostsExplorer);

    expect(PostsExplorerComponent.exists()).toBe(true);
  });
});
