/* eslint-disable prefer-destructuring */
<template>
  <div id="app">
    <header class="header container mx-auto">
      <button type="button" value="" class="addItem" @click="postItem">
        <font-awesome-icon icon="plus" />
      </button>
      <label for="Searching">
        <input
          class="searching"
          id="Searching"
          type="text"
          placeholder="全文搜尋"
          v-model="keyWord"
          @keyup="searchData"
        />
      </label>
    </header>
    <Post :parent-data="data" @delete="deleteData" @update="patchData" />
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
      keyWord: '',
    };
  },
  created() {
    this.getData();
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
    searchData() {
      setTimeout(() => this.getData(), 1000);
    },
    setTimeStr() {
      const timeStr = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      return timeStr;
    },
    async postItem() {
      const config = {
        author: 'aaaaaa',
        title: 'This is title',
        content: '點選以修改內容',
        updateTime: this.setTimeStr(),
      };
      const res = await this.$http.post('http://localhost:3000/posts', config);
      this.data.push(res.data);
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
        const res = await this.$http.patch(url, data);
        this.$set(this.data, id - 1, res.data);
      } catch (e) {
        console.log(e.response);
      }
    },
  },

};
</script>
<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: {
      top: 12px;
      bottom: 18px;
    }
  }
  .addItem {
    padding: 10px 18px;
    background: {
      color: #cabfe6;
    }
    border: 0;
    border-radius: 3px;
  }
  .searching {
    padding: 7.5px 15px;
    font: {
      size: 16px;
    }
    color: #fff;
    background: {
      color: rgba(221, 221, 221, 0.39);
    }
    border: {
      width: 0;
      radius: 3px;
    }
    outline: none;
    &::placeholder {
      color: rgba(255, 255, 255, 0.596);
    }
  }
</style>
