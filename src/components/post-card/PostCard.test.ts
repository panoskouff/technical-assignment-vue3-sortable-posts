import { mount } from '@vue/test-utils';
import PostCard from '@/components/post-card/PostCard.vue';
import { SwapPostInjectKey } from '@/components/posts-explorer/injections';

describe('PostCard.vue', () => {
  const swapPostMock = jest.fn();

  it('should render correctly with the correct props', () => {
    const wrapper = mount(PostCard, {
      props: {
        cellTitle: 'Test Title',
        body: 'Test Body',
        index: 0,
        isLast: false,
      },
      global: {
        provide: {
          [SwapPostInjectKey as symbol]: swapPostMock,
        },
      },
    });

    expect(wrapper.find('[class*="title"]').text()).toContain('Test Title');
    expect(wrapper.find('[class*="body"]').text()).toBe('Test Body');
  });

  it('should render the correct ArrowIcons depending on index and isLast prop', async () => {
    const wrapper = mount(PostCard, {
      props: {
        cellTitle: 'Test Title',
        index: 1,
        isLast: false,
      },
      global: {
        provide: {
          [SwapPostInjectKey as symbol]: swapPostMock,
        },
      },
    });

    let arrowIcons = wrapper.findAllComponents({ name: 'ArrowIcon' });
    expect(arrowIcons.length).toBe(2);

    // rerender with index being 0 (should show only the 'down' arrow)
    await wrapper.setProps({ index: 0 });
    arrowIcons = wrapper.findAllComponents({ name: 'ArrowIcon' });
    expect(arrowIcons.length).toBe(1);
    expect(arrowIcons[0].props().direction).toBe('down');

    // rerender with isLast being true (should show only the 'up' arrow)
    await wrapper.setProps({ isLast: true, index: 1 });
    arrowIcons = wrapper.findAllComponents({ name: 'ArrowIcon' });
    expect(arrowIcons.length).toBe(1);
    expect(arrowIcons[0].props().direction).toBe('up');
  });

  it('should call swapPost with the correct params depending on which ArrowIcon was clicked', async () => {
    const wrapper = mount(PostCard, {
      props: {
        cellTitle: 'Test Title',
        index: 1,
        isLast: false,
      },
      global: {
        provide: {
          [SwapPostInjectKey as symbol]: swapPostMock,
        },
      },
    });

    const arrowIcons = wrapper.findAllComponents({ name: 'ArrowIcon' });

    await arrowIcons[0].trigger('click');
    expect(swapPostMock).toHaveBeenLastCalledWith('up', 1);

    await arrowIcons[1].trigger('click');
    expect(swapPostMock).toHaveBeenLastCalledWith('down', 1);
  });
});
