<script setup lang="ts">
defineProps<{
  isSelected: (selected: string) => boolean;
}>();

defineEmits<{
  (event: 'setSelected', value: string): void;
}>();
</script>

<template>
  <div :class="$style.listSelector">
    <button
      :class="[$style.btn, isSelected('postList') ? $style.btnActive : '']"
      @click="$emit('setSelected', 'postList')"
    >
      Post List
    </button>
    <button
      :class="[$style.btn, isSelected('actionList') ? $style.btnActive : '']"
      @click="$emit('setSelected', 'actionList')"
    >
      Action List
    </button>
  </div>
</template>

<style lang="scss" module>
@import '@/styles/breakpoints.scss';

.listSelector {
  position: sticky;
  top: var(--sticky-top-list-selector);
  z-index: var(--level-1);
  display: flex;
  justify-content: space-between;
  gap: 16px;
  background: var(--bg-color-primary);
  border-top-right-radius: var(--border-radius-standard);
  border-top-left-radius: var(--border-radius-standard);
  box-shadow: var(--box-shadow-standard);
  padding: 8px 6px;
  margin-bottom: 18px;

  &::before {
    /* add a box with the same color of the background before the
          sticky element so we dont see the other items when are
          scrolling behind */
    content: '';
    position: absolute;
    top: calc(-1 * var(--list-selector-offset-to-top));
    left: 0;
    right: 0;
    // rectangle starting point should be the top of the sticky element
    bottom: calc(100% - 1px);
    background-color: var(--bg-color-secondary);
  }
}

.btn {
  border: none;
  padding: 8px 14px;
  border-radius: var(--border-radius-standard);
  width: 50%;
  cursor: pointer;
  box-shadow: var(--box-shadow-light);
}

.btnActive {
  background-color: var(--btn-color-primary);
  color: var(--btn-primary-text-color);
}
</style>
