<template>
  <header class="header container mx-auto">
    <button
      type="button"
      value=""
      class="addItem"
      @click="$emit('clickAddItem')"
    >
      +
    </button>
    <label for="Searching">
      <input
        class="searching"
        id="Searching"
        type="text"
        placeholder="全文搜尋"
        v-model="keyWord"
        @keyup="$emit('update', keyWord)"
      />
    </label>
  </header>
</template>
<script>

export default {
  name: 'the-header',
  data() {
    return {
      keyWord: '',
    };
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
