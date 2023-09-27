import { mount } from '@vue/test-utils';
import ArrowIcon from '@/components/arrow-icon/ArrowIcon.vue';

describe('ArrowIcon.vue', () => {
  it('It should render correctly for the correct props', () => {
    const wrapper = mount(ArrowIcon, {
      props: {
        direction: 'down',
      },
    });

    const iconElement = wrapper.find('i');
    expect(iconElement.classes()).toContain('down');
  });
});
