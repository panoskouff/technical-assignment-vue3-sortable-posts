<script setup lang="ts">
import { inject } from 'vue';
import { TimeTravelInjectKey } from '@/components/posts-explorer/injections';
import { SwapPostRecord } from '@/types';

export type ActionCardProps = {
  post: SwapPostRecord;
  index: number; // ActionCard index
};

defineProps<ActionCardProps>();

const timeTravel = inject(TimeTravelInjectKey);
</script>

<template>
  <div :class="$style.container">
    <p :class="$style.text">
      {{
        `Moved Post ${post.postId} from index ${post.indexFrom} to index ${post.indexTo}`
      }}
    </p>
    <button :class="$style.btn" @click="timeTravel?.(index)">
      Time travel
    </button>
  </div>
</template>

<style lang="scss" module>
@import '@/styles/mixins.scss';
@import '@/styles/breakpoints.scss';

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: var(--bg-color-tertiary);
  padding: 8px 6px;
  box-shadow: var(--box-shadow-standard);

  &:first-child {
    border-top-left-radius: var(--border-radius-standard);
    border-top-right-radius: var(--border-radius-standard);
  }

  &:not(:first-child) {
    margin-top: 1px;
  }

  &:last-child {
    border-bottom-left-radius: var(--border-radius-standard);
    border-bottom-right-radius: var(--border-radius-standard);
  }
}

.btn {
  flex-shrink: 0;
  border: none;
  background-color: var(--btn-color-primary);
  color: var(--btn-primary-text-color);
  padding: 8px 14px;
  border-radius: var(--border-radius-standard);
  cursor: pointer;
}

.text {
  color: var(--text-color-primary);
  font-size: var(--text-small);
}
</style>
