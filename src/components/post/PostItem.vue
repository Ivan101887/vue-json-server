<template>
  <li class="postItem">
    <div class="postItem__head">
      <div class="profile">
        <div class="profile__imgCntr">
          <font-awesome-icon icon="fa-solid fa-user" />
        </div>
        <h3 class="profile__author">
          <a href="javascript:;"> {{ parentData.author }}</a>
        </h3>
      </div>
      <div class="ctrlBar" v-if="!isModifying">
        <button
          type="button"
          class="ctrlBar__item ctrlBar__item--active"
          @click="isModifying = true"
        >
          <font-awesome-icon class="icon" icon="gear" />
        </button>
        <button
          type="button"
          class="ctrlBar__item"
          @click="$emit('delete', parentIndex)"
        >
          <font-awesome-icon class="icon" icon="trash-can" />
        </button>
      </div>
    </div>
    <div class="postItem__body" v-if="!isModifying">
      <h2 class="postItem__title">
        <a href="javascript:;"> {{ parentData.title }}</a>
      </h2>
      <p class="postItem__content">{{ parentData.content }}</p>
    </div>
    <form action="submit" class="form" v-else>
      <label for="author" class="label">
        作者:
        <input type="text" v-model="obj.author" name="author" class="input" />
      </label>
      <label for="title" class="label">
        標題:
        <input type="text" v-model="obj.title" name="title" class="input" />
      </label>
      <label for="content" class="label">
        內容:
        <textarea
          type="text"
          v-model="obj.content"
          name="content"
          class="input"
        />
      </label>
    </form>
    <div class="postItem__foot">
      <div>
        <font-awesome-icon icon="clock" />
      </div>
      <p class="postItem__time">{{ setTimeStr(parentData.updateTime) }}</p>
    </div>
    <div class="buttons" v-if="isModifying">
      <input
        type="button"
        id="confirm"
        class="btn btn-peace"
        value="確定"
        :disabled="!isConfirm"
        @click="clickConfirm"
      />
      <input
        type="button"
        id="cancel"
        class="btn btn-cancel"
        value="取消"
        @click="clickCancel"
      />
    </div>
  </li>
</template>

<script>

export default {
  name: 'post-item',
  props: {
    parentData: Object,
    parentIndex: Number,
  },
  data() {
    return {
      isModifying: false,
      isConfirm: false,
      obj: {
        author: this.parentData.author,
        title: this.parentData.title,
        content: this.parentData.content,
        updateTime: 0,
      },
    };
  },
  methods: {
    clickConfirm() {
      this.obj.updateTime = Date.now();
      this.isModifying = false;
      this.$emit('update', this.obj, this.parentIndex);
    },
    clickCancel() {
      this.obj = this.parentData;
      this.isModifying = false;
    },
    setTimeStr(t) {
      const timeStr = `
        ${new Date(t).getFullYear()}-${new Date(t).getMonth() + 1}-${new Date(t).getDate()}
        ${new Date(t).getHours()}:${new Date(t).getMinutes()}:${new Date(t).getSeconds()}
      `;
      return timeStr;
    },
  },
  watch: {
    obj: {
      handler(val) {
        const strObj = JSON.stringify(val);
        const strParent = JSON.stringify(this.parentData);
        if (strObj === strParent) {
          this.isConfirm = false;
        } else {
          this.isConfirm = true;
        }
      },
      deep: true,
    },
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
    a {
      color: inherit;
      text-decoration: none;
    }
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
      word-wrap: break-word;
    }
    &__foot {
      * {
        display: inline-block;
        vertical-align: middle;
      }
      color: #aaa;
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
      line-height: 1.56em;
    }
    &__time {
      color: #aaa;
      font: {
        size: 14px;
      }
      margin-left: 5px;
    }
  }
  .profile {
    * {
      display: inline-block;
      vertical-align: middle;
    }
    &__author {
      font: {
        weight: 600;
      }
      color: #999;
    }
    &__imgCntr {
      color: #e98898;
      background: {
        color: #ffc0cb;
      }
      height: 30px;
      width: 30px;
      padding: {
        top: 5px;
      }
      text: {
        indent: 8px;
      }
      border-radius: 50%;
      font: {
        size: 15px;
      }
      box-sizing: border-box;
      margin: {
        right: 10px;
      }
    }
  }
  .ctrlBar {
    &__item {
      background: {
        color: transparent;
      }
      border: 0;
      font: {
        size: 16px;
      }
      color: #999;
      padding: 0;
      & + & {
        margin: {
          left: 20px;
        }
      }
      &--active {
        color: #00c2e0;
      }
    }
  }
  .form {
    margin: {
      top: 15px;
      bottom: 5px;
    }
  }
  .label {
    font: {
      size: 14px;
    }
  }
  .input {
    width: 100%;
    box-sizing: border-box;
    border: {
      color: #ddd;
      radius: 0;
      style: solid;
    }
    padding: 10px;
    margin: {
      top: 10px;
      bottom: 10px;
    }
    outline: none;
    font: {
      size: 16px;
    }
  }
  textarea.input {
    height: 99px;
    resize: none;
    margin: {
      bottom: 0;
    }
  }
  .buttons {
    margin : {
      top: 15px;
    }
    text-align: center;
  }
  .btn {
    padding: 10px 15px;
    border: {
      width: 0;
      radius: 5px;
    }
    &-peace {
      background: {
        color: #00c2e0;
      }
      color: #fff;
    }
    &-cancel {
      background: {
        color: #dadada;
      }
      color: #666;
    }
    &:disabled {
      opacity: 0.5;
    }
    & + & {
      margin : {
        left: 10px;
      }
    }
  }
</style>
