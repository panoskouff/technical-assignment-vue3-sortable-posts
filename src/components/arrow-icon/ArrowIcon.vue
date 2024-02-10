<script setup lang="ts">
  withDefaults(
    defineProps<{
      direction?: 'up' | 'down';
    }>(),
    {
      direction: 'up',
    }
  );
</script>

<template>
  <button :class="$style.container">
    <i :class="[$style.arrow, direction === 'down' ? $style.down : '']"> ^ </i>
  </button>
</template>

<style lang="scss" module>
@import '@/styles/mixins.scss';
@import '@/styles/breakpoints.scss';

.container {
  all: unset;
  cursor: pointer;
  max-height: 19px;
  // show outline if navigate with keyboard
  &:focus-visible {
    box-shadow: 0 0 0 2px #0066cc;
  }
}

.arrow {
  display: block;
  font-size: 20px;
  font-weight: bold;
  font-family: monospace;
  color: var(--btn-primary-text-color);
  padding: 7px 4px 1px 4px;
  max-height: 19px;
  line-height: 12px;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    background: var(--bg-color-quaternary);
  }
}

.down {
  transform: rotate(180deg);
}
</style>
