<template>
  <div id="app">
    <Post :parent-data="data" />
  </div>
</template>

<script>
import Post from '@/components/post/Post.vue';

export default {
  name: 'App',
  components: { Post },
  data() {
    return {
      data: [],
    };
  },
  async created() {
    try {
      const res = await this.$http.get('http://localhost:3000/posts');
      this.data = res.data;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
