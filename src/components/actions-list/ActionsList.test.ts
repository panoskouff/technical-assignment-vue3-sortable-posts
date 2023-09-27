import { mount } from '@vue/test-utils';
import ActionsList from '@/components/actions-list/ActionsList.vue';
import ActionCard from '@/components/action-card/ActionCard.vue';
import { SwapPostRecord } from '@/types';

describe('ActionsList.vue', () => {
  const mockSwapHistory: SwapPostRecord[] = [
    { swapRecordId: '1', postId: '1', indexFrom: 0, indexTo: 1 },
    { swapRecordId: '2', postId: '1', indexFrom: 1, indexTo: 2 },
    { swapRecordId: '3', postId: '1', indexFrom: 2, indexTo: 3 },
  ];

  it('It should render correctly for the correct props', () => {
    const wrapper = mount(ActionsList, {
      props: {
        swapHistory: mockSwapHistory,
      },
    });

    const titleElement = wrapper.find('h1');
    expect(titleElement.text()).toBe('List of actions commited');
  });

  it('It should render "No actions commited yet." if swapHistory is empty', () => {
    const wrapper = mount(ActionsList, {
      props: {
        swapHistory: [],
      },
    });

    expect(wrapper.text()).toContain('No actions commited yet.');
  });

  it('It should render an ActionCard for each SwapPostRecord', () => {
    const wrapper = mount(ActionsList, {
      props: {
        swapHistory: mockSwapHistory,
      },
      global: {
        stubs: {
          ActionCard: true, // Stubbing ActionCard to simplify the test
        },
      },
    });

    const actionCardElements = wrapper.findAllComponents(ActionCard);
    expect(actionCardElements.length).toBe(mockSwapHistory.length);
  });
});
