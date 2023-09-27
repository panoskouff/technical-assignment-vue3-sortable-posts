import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import { useScreenWidth } from './useScreenWidth';

describe('useScreenWidth', () => {
  it('should update screenWidth when the window is resized', async () => {
    // create a mock component that uses the useScreenWidth composable
    const TestComponent = defineComponent({
      setup() {
        const { screenWidth } = useScreenWidth();
        return { screenWidth };
      },
      render() {
        return this.screenWidth;
      },
    });

    const wrapper = mount(TestComponent);
    await nextTick();
    expect(wrapper.vm.screenWidth).toBe(window.innerWidth);

    const resizeWindow = (width: number) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });

      window.dispatchEvent(new Event('resize'));
    };

    // change the window width
    resizeWindow(800);
    await nextTick();

    expect(wrapper.vm.screenWidth).toBe(800);
  });
});
