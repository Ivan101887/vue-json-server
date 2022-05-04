<template>
  <div class="container mx-auto">
    <ul class="post">
      <PostItem
        v-for="(item, index) in parentData"
        :key="item.id"
        :parent-data="item"
        :parent-index="index"
        v-on="$listeners"
      />
    </ul>
  </div>
</template>

<script>
import PostItem from '@/components/post/PostItem.vue';

export default {
  name: 'post',
  props: {
    parentData: Array,
  },
  components: {
    PostItem,
  },
};
</script>
<style lang="scss" scoped>
  .post {
    display: grid;
    grid: {
      template-columns: repeat(3, 33.3333%);
      gap: 15px;
    }
    margin: {
      bottom: 10px;
    }
  }
</style>
