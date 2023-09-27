import { ref, onMounted, onUnmounted } from 'vue';

const screenWidth = ref(window.innerWidth);

export function useScreenWidth() {
  const updateWidth = () => {
    screenWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
  });

  return { screenWidth };
}
