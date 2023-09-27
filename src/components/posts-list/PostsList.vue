<script setup lang="ts">
import { Space } from '@/atoms';
import PostCard from '@/components/post-card/PostCard.vue';
import { Post } from '@/types';
import { TransitionGroup } from 'vue';

const props = defineProps<{
  posts: Post[];
  isChecked: boolean;
}>();

defineEmits<{
  (event: 'toggleCheckbox'): void;
}>();
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <h1 :class="$style.title">Sortable Post List</h1>
      <div :class="$style.checkboxContainer">
        <label>show posts body</label>
        <input
          type="checkbox"
          :class="$style.checkbox"
          :checked="isChecked"
          @change="$emit('toggleCheckbox')"
        />
      </div>
    </div>
    <Space :y="16" />
    <TransitionGroup name="list" tag="div">
      <PostCard
        v-for="(post, index) in props.posts"
        :class="$style.postCard"
        :key="post.id"
        :cellTitle="post.cellTitle"
        :body="isChecked ? post.body : ''"
        :index="index"
        :isLast="index === props.posts.length - 1"
      />
    </TransitionGroup>
  </div>
</template>

<style lang="scss" module>
@import '@/styles/mixins.scss';
@import '@/styles/breakpoints.scss';

:global {
  .list-move {
    transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out,
      opacity 0.4s ease-in-out;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    opacity: 0.9;
  }
}

.container {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include bp-mx(mobile) {
    position: sticky;
    z-index: var(--level-1);
    top: var(--sticky-top-posts-list-selector);
    background: var(--bg-color-secondary);
    padding: 4px 10px;
    border: 4px solid var(--bg-color-primary);
    box-shadow: var(--box-shadow-standard-no-top);
    border-bottom-right-radius: var(--border-radius-standard);
    border-bottom-left-radius: var(--border-radius-standard);
  }
}

.title {
  font-size: var(--text-large);
  font-weight: var(--text-weight);
  color: var(--text-color-secondary);
}

.checkboxContainer {
  display: flex;
  align-items: center;
  gap: 4px;

  label {
    color: var(--text-color-secondary);
    font-size: var(--text-extra-small);
  }
}

.checkbox {
  cursor: pointer;
}

.postCard {
  @include bp-mx(mobile) {
    /* fix card overflowing across border-radius
      of parent sticky element */
    margin-left: 1px;
    margin-right: 1px;
  }
}

.postCard:not(:last-child) {
  margin-bottom: 16px;
}
</style>
