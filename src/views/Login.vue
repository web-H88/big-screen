<template>
  <div class="login-container">
    <div class="layer">
      <div class="some-space">
        <div class="form">
          <h2>11111111111111111</h2>
          <div class="item">
            <i></i>
            <input type="text">
          </div>
        </div>
        <div class="item">

        </div>
        <button></button>
        <div class="tip">
          
        </div>
      </div>
    </div>
    <modal title="提示" :content="modalContent" :visible.sync="visible" @confim="confim" />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        modalContent: "这是一段自定义模态框消息",
        visible: true
      }
    },
    methods: {
      confim (data) {
        console.log(data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {

  }
</style>