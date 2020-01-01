/* eslint-disable no-useless-return */
<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 默认头像 -->
      <div class="avatar_box">
        <img src="../assets/zdl.jpg" alt="haha" />
      </div>
      <!-- 登录表单 -->
      <el-form
        label-width="0px"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <!-- 给组件添加ref='value',就可以通过this.$refs.value 或者 this.$refs[value]来获取到对应组件-->
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login('loginFormRef')">login</el-button>
          <el-button type="info" @click="resetFormData('loginFormRef')">reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 通过在el-form-item标签中 添加prop属性来制定对表单的验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置登录表单的所有内容,elememntUI写好的方法; 给指定的ref
    resetFormData(loginFormRef) {
      console.log(this.$refs)
      this.$refs[loginFormRef].resetFields()
    },
    // 需求: 点击登录之后,需要对输入的用户名和密码进行预验证,通过验证之后才通过请求发送给后台进行验证; 通过elementUI提供的函数validate进行验证
    login(loginFormRef) {
      this.$refs[loginFormRef].validate(async vaild => {
        // vaild是表单是否验证通过,是一个布尔值,通过它判断是否校验通过
        // eslint-disable-next-line no-useless-return
        if (!vaild) return
        const { data: result } = await this.$http.post('login', this.loginForm)
        if (result.meta.status !== 200) {
          // 登录失败提示登录失败的提醒
          return this.$message.error({
            message: '用户名或密码错误,请重试',
            center: true,
            duration: 800
          })
        }
        /**
         * 登录成功,提示成功,然后跳转到后台管理的主页面
         * 需求: 登录成功后将服务器返回的token保存到客户端的sessionStorang中; 在通过编程式导航跳转到后台管理的主页面 /home
         *      (因为,项目中的其他接口必须在登录成功之后才能访问,token只能在当前页面打开时有效,所以token需要保存在sessionStorang中)
         *      (我们把token保存在sessionStorang中是因为sessionStorang是会话机制的,关掉当前页面就会失效,localStorang是持久化的保存)
         *      (我们怎么知道用户是否登录就是因为我们成功请求到服务器时,服务器返回给我们的token这个令牌,我们在请求的时候携带token,服务器就能够判断出来啦)
         */
        this.$message({
          message: '登录成功',
          type: 'success',
          center: true,
          duration: 800
        })
        console.log(result)
        window.sessionStorage.setItem('token', result.data.token) // 登录成功保存服务器返回的token
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
  position: relative;
  .login_box {
    width: 450px;
    height: 300px;
    background-color: aliceblue;
    border-radius: 5px;
    /* 水平垂直居中 */
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar_box {
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 5px;
      background-color: #2b4b6b;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .login_form {
      transform: translateY(60%);
      margin: 0 auto;
      width: 90%;
      padding: 0 20px;
      box-sizing: border-box;
      .btns {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
