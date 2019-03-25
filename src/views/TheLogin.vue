<template>
  <div class="login-container">
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <h3>登陆系统</h3>
      <template slot="prepend"><span class="fa fa-user fa-lg" style="width: 13px"></span></template>
      <el-form-item
        prop="username"
      >
        <el-input
          type="usernameword"
          v-model="ruleForm2.username"
          autocomplete="off"
          placeholder="请输入用户名"
        ><template slot="prepend"><span class="fa fa-user fa-lg" style="width: 13px"></span></template></el-input>
      </el-form-item>
      <el-form-item
        prop="password"
      >
        <el-input
          type="password"
          v-model="ruleForm2.password"
          autocomplete="off"
          placeholder="请输入密码"
        >
          <template slot="prepend"><span class="fa fa-lock fa-lg" style="width: 13px"></span></template>
          <template slot="suffix"><span class="password-eye" @click="showPassword" :class="eyeType"></span></template>
        </el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>
      <el-form-item style="width:100%">
        <el-button
          type="primary"
          @click="handleSubmit"
          style="width:100%"
          :loading="logining"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logining: false,
      ruleForm2: {
        username: '',
        password: ''
      },
      rules2: {
        username: [{ required: true, message: 'Place enter your account', trigger: 'blur' }],
        password: [{ required: true, message: 'Place enter your password', trigger: 'blur' }]
      },
      checked: false,
      pwdType: 'password',
      eyeType: 'fa fa-eye-slash fa-lg'
    }
  },
  mounted () {
    this.getCookie()
  },
  methods: {
    handleSubmit (event) {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.logining = true
          if (this.ruleForm2.username === 'admin' && this.ruleForm2.password === '123456') {
            this.logining = false
            sessionStorage.setItem('user', this.ruleForm2.username)
            // 使用cookie记住密码
            if (this.checked) {
              this.setCookie(this.ruleForm2.username, this.ruleForm2.password, 7)
            } else {
              // 如果错误那就删除
              this.deleteCookie()
            }
            this.$router.push({path: '/'})
          } else {
            this.logining = false
            this.$alert('username or password wrong!', 'info', {
              confirmButtonText: 'ok'
            })
          }
        } else {
          console.log('error submint!')
          return false
        }
      })
    },
    showPassword () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
        this.eyeType = 'fa fa-eye fa-lg'
      } else {
        this.pwdType = 'password'
        this.eyeType = 'fa fa-eye-slash fa-lg'
      }
    },
    setCookie (name, pass, days) {
      let expire = new Date()
      expire.setDate(expire.getDate() + days)
      document.cookie = `C-username=${name};expires=${expire}`
      document.cookie = `C-password=${pass};expires=${expire}`
    },
    getCookie () {
      if (document.cookie.length) {
        let arr = document.cookie.split('; ')
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split('=')
          if (arr2[0] === 'C-username') {
            this.ruleForm2.username = arr2[1]
          } else if (arr2[0] === 'C-password') {
            this.ruleForm2.password = arr2[1]
            this.rememberme = true
          }
        }
      }
    },
    deleteCookie () {
      this.setCookie('', '', -1)
    }
  }
}
</script>

<style scoped>
.login-container{
  width: 100%;
  height: 100%;
}
.login-page{
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme{
  margin: 0px 0px 15px;
  text-align: left;
}
</style>
