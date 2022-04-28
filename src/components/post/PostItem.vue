<template>
  <li class="postItem">
    <div class="postItem__head">
      <div class="profile">
        <div class="profile__imgCntr"></div>
        <h3 class="profile__author">{{ parentData.author }}</h3>
      </div>
      <div class="ctrlBar">
        <button class="ctrlBar__item">modify</button>
        <button class="ctrlBar__item">delete</button>
      </div>
    </div>
    <div class="postItem__body">
      <h2 class="postItem__title">{{ parentData.title }}</h2>
      <p class="postItem__content">{{ parentData.content }}</p>
    </div>
    <div class="postItem__foot">
      <p class="postItem__time">{{ parentData.updateTime }}</p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'post-item',
  props: {
    parentData: Object,
  },
};
</script>

<style lang="scss" scoped>
  .postItem {
    text-align: left;
    padding: 15px;
    background: {
      color: #ebecef;
    }
    border-radius: 3px;
    &__head {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }
    &__body {
      background: {
        color: #fff;
      }
      border: {
        radius: 3px;
        bottom: 1px solid #aaa;
      }
      margin: {
        top: 15px;
        bottom: 8px;
      }
      padding: 15px 20px;
    }
    &__title {
      margin-bottom: 15px;
      font: {
        size: 18px;
        weight: 600;
      }
      color: #666;
    }
    &__content {
      line-height: 1.65em;
    }
    &__time {
      color: #aaa;
      font: {
        size: 14px;
      }
    }
  }
  .profile {
    &__author {
      font: {
        weight: 600;
      }
      color: #999;
    }
  }
</style>
