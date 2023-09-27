<script setup lang="ts">
import { TransitionGroup, Transition } from 'vue';
import ActionCard from '@/components/action-card/ActionCard.vue';
import { SwapPostRecord } from '@/types';
const props = defineProps<{
  swapHistory: SwapPostRecord[];
}>();
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.titleContainer">
      <h1 :class="$style.title">List of actions commited</h1>
    </div>
    <div :class="$style.actionsContainer">
      <Transition name="action-card">
        <div v-if="props.swapHistory.length === 0">
          No actions commited yet.
        </div>
      </Transition>
      <TransitionGroup name="action-card">
        <ActionCard
          v-for="(swapRecord, index) in props.swapHistory"
          :key="swapRecord.swapRecordId"
          :post="swapRecord"
          :index="index"
        />
      </TransitionGroup>
    </div>
  </div>
</template>
<style lang="scss" module>
@import '@/styles/mixins.scss';
@import '@/styles/breakpoints.scss';

:global {
  .action-card-enter-active,
  .action-card-leave-active {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }
  .action-card-enter-from,
  .action-card-leave-to {
    transform: scale(0.8);
    opacity: 0;
  }
  .action-card-enter-to,
  .action-card-leave-from {
    transform: scale(1);
    opacity: 1;
  }
}

.container {
  display: flex;
  flex-direction: column;
  box-shadow: var(--box-shadow-standard);
  border-radius: var(--border-radius-standard);
}

.titleContainer {
  border-top-left-radius: var(--border-radius-standard);
  border-top-right-radius: var(--border-radius-standard);
  background: var(--bg-color-tertiary);
  padding: 16px;
  @include bp-mx(mobile) {
    position: sticky;
    top: var(--sticky-top-actions-list-selector);
    box-shadow: var(--box-shadow-standard);
  }
}

.title {
  font-size: var(--text-large);
  font-weight: var(--text-weight);
  color: var(--text-color-primary);
}

.actionsContainer {
  border-bottom-left-radius: var(--border-radius-standard);
  border-bottom-right-radius: var(--border-radius-standard);
  background-color: var(--bg-color-quaternary);
  padding: 16px;
}
</style>
