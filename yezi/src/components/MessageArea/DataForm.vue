<template>
  <form
    id="data-form-container"
    ref="form"
    @submit.prevent="handleSubmit"
    class="data-form-container"
  >
    <div class="form-item">
      <div class="input-area">
        <input
          type="text"
          maxlength="10"
          v-model="formData.nickname"
          placeholder="用户昵称"
        />
        <span class="tip">{{ formData.nickname.length }}/10</span>
      </div>
      <div class="error">{{ error.nickname }}</div>
    </div>
    <div class="form-item">
      <div class="text-area">
        <textarea
          maxlength="300"
          placeholder="输入内容"
          v-model="formData.content"
        ></textarea>
        <span class="tip">{{ formData.content.length }}/300</span>
      </div>
      <div class="error">{{ error.content }}</div>
    </div>
    <div class="form-item">
      <div class="button-area">
        <button :disabled="isSubmiting">
          {{ isSubmiting ? "提交中" : "提交" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        nickname: "",
        content: "",
        avatar:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqqpublic.qpic.cn%2Fqq_public%2F0%2F0-2697556551-E0B7287FB206326F68A0C7FD90CCDB8F%2F0%3Ffmt%3Djpg%26size%3D69%26h%3D900%26w%3D900%26ppv%3D1.jpg&refer=http%3A%2F%2Fqqpublic.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635596627&t=45c3e1c8d4f968864df322cb9e567b23"
      },
      error: {
        nickname: "",
        content: "",
      },
      isSubmiting: false,
    };
  },
  methods: {
    handleSubmit() {
      this.error.nickname = this.formData.nickname ? "" : "请填写昵称";
      this.error.content = this.formData.content ? "" : "请填写内容";
      if (this.error.nickname || this.error.content) {
        // 有错误
        return;
      }
      this.isSubmiting = true; // 正在提交，防止重复点击
      this.$emit("submit", this.formData, (successMsg) => {
        this.$showMessage({
          content: successMsg,
          type: "success",
          duration: 1000,
          container: this.$refs.form,
          callback: () => {
            this.isSubmiting = false;
            this.formData.nickname = "";
            this.formData.content = "";
          },
        });
      }); // 让父组件来处理事件
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.data-form-container {
  margin-bottom: 20px;
  overflow: hidden;
}
.form-item {
  margin-bottom: 8px;
}
.input-area {
  width: 50%;
  position: relative;
}
.text-area {
  position: relative;
}
.tip {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: #b4b8bc;
  font-size: 12px;
}
input,
textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed @gray;
  outline: none;
  color: @words;
  font-size: 14px;
  border-radius: 4px;
  &:focus {
    border-color: @primary;
  }
}
input {
  padding: 0 15px;
  height: 40px;
}
textarea {
  resize: none;
  padding: 8px 15px;
  height: 120px;
}
.error {
  margin-top: 6px;
  color: @danger;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
button {
  position: relative;
  cursor: pointer;
  border: none;
  outline: none;
  width: 100px;
  height: 34px;
  color: #fff;
  border-radius: 4px;
  background: @primary;
  &:hover {
    background: darken(@primary, 10%);
  }
  &:disabled {
    background: lighten(@primary, 20%);
    cursor: not-allowed;
  }
}
</style>
