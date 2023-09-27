<script setup lang="ts">
import { ref, provide, Transition } from 'vue';
import PostsList from '@/components/posts-list/PostsList.vue';
import ActionsList from '@/components/actions-list/ActionsList.vue';

import {
  SwapPostInjectKey,
  SwapPostType,
  TimeTravelInjectKey,
  TimeTravelType,
} from '@/components/posts-explorer/injections';
import { SwapPostRecord, Post } from '@/types';
import ListSelector from '../list-selector/ListSelector.vue';
import { useScreenWidth } from '@/composables/useScreenWidth';
import { swapArrayElements } from '@/utils';
import { performTimeTravel } from '@/utils/performTimeTravel';

const { screenWidth } = useScreenWidth();

const props = defineProps<{
  getPostsOnce: () => Post[];
}>();

const posts = ref<Post[]>(props.getPostsOnce());
const swapHistory = ref<SwapPostRecord[]>([]);

const logPostSwap = (id: string | number, from: number, to: number) => {
  swapHistory.value.push({
    swapRecordId: Date.now(),
    postId: id,
    indexFrom: from,
    indexTo: to,
  });
};

const swapPost: SwapPostType = (direction, index) => {
  if (direction === 'up' && index > 0) {
    logPostSwap(posts.value[index].id, index, index - 1);
    posts.value = swapArrayElements(posts.value, index, index - 1);
  } else if (direction === 'down' && index < posts.value.length - 1) {
    logPostSwap(posts.value[index].id, index, index + 1);
    posts.value = swapArrayElements(posts.value, index, index + 1);
  }
};

const timeTravel: TimeTravelType = (index) => {
  const { newArray, newHistory } = performTimeTravel(
    posts.value,
    swapHistory.value,
    index
  );
  posts.value = newArray;
  swapHistory.value = newHistory;
};

provide(SwapPostInjectKey, swapPost);
provide(TimeTravelInjectKey, timeTravel);

const selected = ref('postList');
const isSelected = (selectedBtn: string) => selected.value === selectedBtn;
const setSelected = (newSelection: string) => (selected.value = newSelection);

const isChecked = ref(true);
</script>

<template>
  <ListSelector
    v-if="screenWidth <= 640"
    :isSelected="isSelected"
    @setSelected="setSelected"
  />
  <div :class="$style.container">
    <Transition
      :class="isSelected('actionList') ? 'active-list' : ''"
      name="listEffect"
      mode="out-in"
    >
      <PostsList
        v-if="screenWidth > 640 || isSelected('postList')"
        :class="$style.listItem"
        :posts="posts"
        :isChecked="isChecked"
        @toggleCheckbox="isChecked = !isChecked"
      />
    </Transition>
    <Transition
      :class="isSelected('actionList') ? 'active-list' : ''"
      name="listEffect"
      mode="out-in"
    >
      <ActionsList
        v-if="screenWidth > 640 || isSelected('actionList')"
        :class="$style.listItem"
        :swapHistory="swapHistory"
      />
    </Transition>
  </div>
</template>

<style lang="scss" module>
@import '@/styles/breakpoints.scss';

:global {
  .listEffect-enter-active,
  .listEffect-leave-active {
    transition: transform 0.3s ease-in-out, opacity 0.3s;
    transform-origin: top;
    transition-delay: 0.3s;
  }
  /* active list doesn't need to have initial delay */
  .listEffect-leave-active:not(.active-list),
  .listEffect-enter-active:not(.active-list) {
    transition-delay: 0s;
  }
  .listEffect-enter-from,
  .listEffect-leave-to {
    transform: scale(0.8);
    opacity: 0;
  }
  .listEffect-enter-to,
  .listEffect-leave-from {
    opacity: 1;
  }
}
.container {
  display: flex;
  gap: 8%;
  align-items: flex-start;

  @include bp-mx(mobile) {
    flex-direction: column;
    gap: 32px;
  }
}

.listItem {
  width: 50%;

  @include bp-mx(mobile) {
    width: 100%;
  }
}
</style>
