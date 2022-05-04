<template>
  <div id="app">
    <TheHeader @update="updateKeyWord" @clickAddItem="addData" />
    <Post :parent-data="data" @delete="deleteData" @update="updateData" />
  </div>
</template>

<script>
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
    keyWord() {
      if (this.timeout) { clearTimeout(this.timeout); }
      this.timeout = setTimeout(() => {
        this.queryData();
      }, 300);
    },
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
      const config = {
        params: { q: this.keyWord },
      };
      try {
        const res = await this.$http.get('http://localhost:3000/posts', config);
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
    async deleteData(index) {
      try {
        const target = this.data[index];
        const id = target.id;
        await this.$http.delete(`http://localhost:3000/posts/${id}`);
        this.data.splice(index, 1);
      } catch (e) {
        console.log(e);
      }
    },
    async updateData(obj, index) {
      const target = this.data[index];
      const id = target.id;
      const url = `http://localhost:3000/posts/${id}`;
      try {
        const res = await this.$http.put(url, obj);
        this.data.splice(index, 1, res.data);
      } catch (e) {
        console.log(e);
      }
    },
  },

};
</script>
