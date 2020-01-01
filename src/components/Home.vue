<template>
  <div>
    <h2>welcome Home</h2>
    <el-button type="info" @click="checkout">退出</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  name: 'Home',
  methods: {
    // 基于token的退出功能实现
    checkout() {
      // window.sessionStorage.removeItem('token')
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped>
h2 {
  color: cadetblue;
}
</style>
