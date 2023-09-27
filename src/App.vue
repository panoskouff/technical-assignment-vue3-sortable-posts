<script setup lang="ts">
import PageContainer from '@/atoms/page-container/PageContainer.vue';
import Space from '@/atoms/Space.vue';
import useWatchRequest from '@/composables/useWatchRequest';
import { adapters, getPosts } from '@/queries';
import PostsExplorer from '@/components/posts-explorer/PostsExplorer.vue';

const mockOurUserId = 1;

const posts = useWatchRequest(getPosts, {
  adapter: (posts) =>
    adapters
      .adaptPosts(posts)
      .filter((post) => post.userId === mockOurUserId)
      .filter((_, index) => index < 5),
  immediate: true,
});

const getPostsOnce = () => posts.value.adaptedData ?? [];
</script>

<template>
  <div :class="$style.container">
    <PageContainer>
      <Space :y="30" />
      <div v-if="posts.adaptedData !== null && posts.adaptedData?.length > 0">
        <PostsExplorer :getPostsOnce="getPostsOnce" />
      </div>
      <div v-else-if="posts.loading">
        <p :class="$style.loadingText">loading data..</p>
      </div>
      <div v-else-if="posts.hasError">
        {{ posts.errorMessage }}
      </div>
      <div v-else-if="posts.called && posts.adaptedData === null">
        {{ 'something went wrong :(' }}
      </div>
      <Space :y="30" />
    </PageContainer>
  </div>
</template>
<style lang="scss" module>
.container {
  background-image: linear-gradient(
    -11deg,
    var(--bg-color-primary) 0 80%,
    var(--bg-color-secondary) 80.2% 100%
  );
  background-attachment: fixed;
  min-height: 100vh; // fallback if dvh is not supported
  min-height: 100dvh;
}

.loadingText {
  color: var(--text-color-secondary);
}
</style>
