/* eslint-disable prefer-destructuring */
<template>
  <div id="app">
    <TheHeader @update="updateKeyWord" @add="postItem" />
    <Post :parent-data="data" @delete="deleteData" @update="patchData" />
  </div>
</template>

<script>
import Post from '@/components/post/Post.vue';
import TheHeader from '@/components/TheHeader.vue';

export default {
  name: 'App',
  components: { TheHeader, Post },
  data() {
    return {
      data: [],
      keyWord: '',
    };
  },
  created() {
    this.getData();
  },
  watch: {
    keyWord() {
      this.getData();
    },
  },
  methods: {
    async getData() {
      try {
        const res = await this.$http.get(`http://localhost:3000/posts${this.keyWord ? `?q=${this.keyWord}` : ''}`);
        this.data = res.data;
      } catch (e) {
        console.log(e);
      }
    },
    updateKeyWord(val) {
      this.keyWord = val;
    },
    setTimeStr() {
      const timeStr = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}${'\t'}${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      return timeStr;
    },
    async postItem() {
      const config = {
        author: 'aaaaaa',
        title: 'This is title',
        content: '點選以修改內容',
        id: this.data.length + 1,
        updateTime: this.setTimeStr(),
      };
      await this.$http.post('http://localhost:3000/posts', config);
      this.data.push(config);
    },
    async deleteData(val) {
      await this.$http.delete(`http://localhost:3000/posts/${val}`);
      this.data.splice(val - 1, 1);
    },
    async patchData(val) {
      const data = {};
      const id = val.id;
      const url = `http://localhost:3000/posts/${id}`;
      if (val.author !== this.data[id - 1].author) {
        data.author = val.author;
      }
      if (val.title !== this.data[id - 1].title) {
        data.title = val.title;
      }
      if (val.content !== this.data[id - 1].content) {
        data.content = val.content;
      }
      if (data) {
        data.updateTime = this.setTimeStr();
      }
      try {
        await this.$http.patch(url, data);
        this.getData();
      } catch (e) {
        console.log(e.response);
      }
    },
  },

};
</script>
