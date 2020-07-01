<template>
  <div class="bg">
    <!-- <el-image :src="srcBg"></el-image> -->
    <div class="login-container">
      <el-image :src="srcLogin"></el-image>
      <div class="login">
         <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <!-- <h3 class="title">Login Form</h3> -->
        </div>

        <el-form-item prop="username" size="mini">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password" size="mini">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width:50%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
          size="small"
        >登录</el-button>

        <div class="tips">
          <!-- <span style="margin-right:20px;">username: admin</span>
          <span> password: any</span>-->
        </div>
      </el-form>
      </div>
     
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (validUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能少于5位数"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin2",
        password: "admin"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      srcLogin: require("@/assets/imags/login2.png"),
      srcBg: require("@/assets/imags/login_bg.png")
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-form-item {
    width: 50%;
  }
  .el-input {
    display: inline-block;
    height: 0.234375rem;
    width: 50%;

    input {
      background: transparent;
      border: 0px;
      // background-color: blue;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 0.0625rem 0.026042rem 0.0625rem 0.078125rem;
      color: $light_gray;
      height: 0.244792rem;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.bg {
  min-height: 100%;
  width: 100%;
  max-height: 100%;
  // border: 2px solid yellow;
  overflow: hidden;
  // opacity: 0.6;
  position: relative;
  background-image: url("../../assets/imags/login_bg.png");
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;

  .login-container {
    height: 100%;
    width: 100%;
    // border: 2px solid pink;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    overflow: hidden;
    position: absolute;
    
    // background-image: url("../../assets/imags/login2.png");
    // background-position: center;
    // background-size: 50% 50%;
    // background-repeat: no-repeat;
    // background-attachment: fixed;
    .el-image {
      overflow: hidden;
      position: absolute;
      width: 50%;
      height: 50%;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto;
    }
    .login{
      overflow: hidden;
      position: absolute;
      // border: 2px solid red;
      width: 100%;
      height: 50%;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto;
    }
    .login-form {
      position: relative;
      // border: 2px solid red;
      width: 30%;
      // height: 20%;
      // max-width: 100%;
      left: 18%;
      top: 42%;
      bottom: 0;
      right: 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 0.072917rem;
      color: #fff;
      margin-bottom: 0.052083rem;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 0.03125rem 0.026042rem 0.03125rem 0.078125rem;
      color: $dark_gray;
      vertical-align: middle;
      width: 0.15625rem;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 0.135417rem;
        color: $light_gray;
        margin: 0rem auto 0.208333rem auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 0.052083rem;
      top: 0.036458rem;
      font-size: 0.083333rem;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
