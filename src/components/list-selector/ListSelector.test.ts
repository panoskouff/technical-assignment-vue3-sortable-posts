import { mount } from '@vue/test-utils';
import ListSelector from '@/components/list-selector/ListSelector.vue';

describe('ListSelector.vue', () => {
  it('should render correctly with the correct props', () => {
    const isSelectedMock = jest.fn(() => false);
    const wrapper = mount(ListSelector, {
      props: {
        isSelected: isSelectedMock,
      },
    });

    expect(wrapper.find('button').exists()).toBe(true);
  });

  it(`should set btnActive to the correct button depending which
    list is active`, () => {
    const isSelectedMock = jest.fn((selected) => selected === 'postList');
    const wrapper = mount(ListSelector, {
      props: {
        isSelected: isSelectedMock,
      },
    });

    const postListButton = wrapper.find('button:nth-child(1)');
    expect(postListButton.classes()).toContain('btnActive');

    const actionListButton = wrapper.find('button:nth-child(2)');
    expect(actionListButton.classes()).not.toContain('btnActive');
  });

  it(`should emit setSelected event with the correct value
    depending which button was pressed`, async () => {
    const isSelectedMock = jest.fn(() => false);
    const wrapper = mount(ListSelector, {
      props: {
        isSelected: isSelectedMock,
      },
    });

    await wrapper.find('button:nth-child(1)').trigger('click');
    expect(wrapper.emitted().setSelected[0]).toEqual(['postList']);

    await wrapper.find('button:nth-child(2)').trigger('click');
    expect(wrapper.emitted().setSelected[1]).toEqual(['actionList']);
  });
});
