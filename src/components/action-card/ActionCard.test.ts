import { mount } from '@vue/test-utils';
import ActionCard from '@/components/action-card/ActionCard.vue';
import { TimeTravelInjectKey } from '@/components/posts-explorer/injections';
import { SwapPostRecord } from '@/types';

describe('ActionCard.vue', () => {
  const mockSwapRecord: SwapPostRecord = {
    swapRecordId: '1',
    postId: '1',
    indexFrom: 0,
    indexTo: 1,
  };
  const mockIndex = 2;

  it('Should render the component correctly with the correct props', () => {
    const wrapper = mount(ActionCard, {
      props: {
        post: mockSwapRecord,
        index: mockIndex,
      },
    });

    const textElement = wrapper.find('p');
    const btnElement = wrapper.find('button');

    const expectedText =
      `Moved Post ${mockSwapRecord.postId} from index` +
      ` ${mockSwapRecord.indexFrom} to index ${mockSwapRecord.indexTo}`;
    expect(textElement.text()).toBe(expectedText);
    expect(btnElement.text()).toBe('Time travel');
  });

  it(`It should call the injected timeTravel fn and pass the index
    when the button is clicked`, async () => {
    const mockTimeTravelFn = jest.fn();

    const wrapper = mount(ActionCard, {
      props: {
        post: mockSwapRecord,
        index: mockIndex,
      },
      global: {
        provide: {
          [TimeTravelInjectKey as symbol]: mockTimeTravelFn,
        },
      },
    });

    const btnElement = wrapper.find('button');
    await btnElement.trigger('click');

    expect(mockTimeTravelFn).toHaveBeenCalled();
    expect(mockTimeTravelFn).toHaveBeenCalledWith(mockIndex);
  });
});
