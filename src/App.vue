<template>
  <div id="app">
    <TheHeader @update="updateKeyWord" @clickAddItem="addData" />
    <Post :parent-data="data" @delete="deleteData" @update="updateData" />
  </div>
</template>

<script>
import _ from 'lodash';
import Post from '@/components/post/Post.vue';
import TheHeader from './components/TheHeader.vue';

export default {
  name: 'App',
  components: { Post, TheHeader },
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
    keyWord: _.debounce(function () {
      this.queryData();
    }, 600),
  },
  methods: {
    async getData() {
      try {
        const res = await this.$http.get('http://localhost:3000/posts');
        this.data = res.data;
      } catch (e) {
        console.log(e);
      }
    },
    async queryData() {
      try {
        const res = await this.$http.get(`http://localhost:3000/posts?q=${this.keyWord}`);
        this.data = res.data;
      } catch (e) {
        console.log(e);
      }
    },
    updateKeyWord(val) {
      this.keyWord = val;
    },
    async addData() {
      const config = {
        author: 'aaaaaa',
        title: 'This is title',
        content: '點選以修改內容',
        updateTime: Date.now(),
      };
      try {
        const res = await this.$http.post('http://localhost:3000/posts', config);
        this.data.push(res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async deleteData(val) {
      try {
        await this.$http.delete(`http://localhost:3000/posts/${val}`);
        this.data.splice(val - 1, 1);
      } catch (e) {
        console.log(e);
      }
    },
    async updateData(val) {
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
        data.updateTime = Date.now();
      }
      try {
        const res = await this.$http.patch(url, data);
        // this.data[id - 1] = res.data;
        this.data.splice(id - 1, 1, res.data);
      } catch (e) {
        console.log(e.response);
      }
    },
  },

};
</script>
