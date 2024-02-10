<script setup lang="ts">
import { SwapPostInjectKey } from "@/components/posts-explorer/injections";
import { computed, inject } from "vue";
import { Space } from "@/atoms";
import ArrowIcon from "@/components/arrow-icon/ArrowIcon.vue";

export type PostCardBaseProps = {
  cellTitle: string;
  body?: string;
};

export type PostCardProps = PostCardBaseProps & {
  index: number;
  isLast: boolean;
};

const props = defineProps<PostCardProps>();
const swapPost = inject(SwapPostInjectKey);

const isFirst = computed(() => props.index === 0);
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.titleContainer">
      <div :class="$style.title">
        {{ cellTitle }}
      </div>
      <div :class="$style.arrowsContainer">
        <ArrowIcon v-if="!isFirst" @click="swapPost?.('up', index)" />
        <ArrowIcon
          direction="down"
          v-if="!isLast"
          @click="swapPost?.('down', index)"
        />
      </div>
    </div>

    <div v-if="body" :class="$style.body">
      <Space :y="10" />
      {{ body }}
    </div>
  </div>
</template>

<style lang="scss" module>
@import "@/styles/mixins.scss";
@import "@/styles/breakpoints.scss";

.container {
  background: var(--bg-color-tertiary);
  border-radius: var(--border-radius-standard);
  padding: 10px 8px 10px 12px;
  box-shadow: var(--box-shadow-standard);
}

.arrowsContainer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* mockup dictates that card with 1 arrow must have
  same height as the card with 2 arrows,but we don't
  have enough height if we base height on content so
  we do this  */
  min-height: 50px;
  justify-content: center;
}

.titleContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title,
.body {
  color: var(--text-color-primary);
}
</style>
