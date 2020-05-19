<template>
  <div class="bac">
    <div class="continer">
      <div class="login-p">
        <h2>LOGIN</h2>
      </div>
      <el-form ref="refFrom" :rules="fromRules" :model="loginFrom" class="forms" label-width="0">
        <el-form-item prop="username">
          <el-input v-model="loginFrom.username" prefix-icon="iconfont icon-mima"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" v-model="loginFrom.password" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>

        <el-form-item class="btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginFrom: {
        username: "",
        password: ""
      },
      fromRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入名字", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    reset() {
      this.$refs.refFrom.resetFields();
    },
    login() {
      this.$refs.refFrom.validate(async val => {
        if (val === "false") return;
        const { data: res } = await this.$http.post("login", this.loginFrom);
        if (res.meta.status != 200) {
          this.$message.error("登录失败");
        } else {
          this.$message.success("登录成功");
          window.sessionStorage.setItem("token", res.data.token);
          this.$router.push("manage");
        }
      });
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
.bac {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(135deg, #3498db, #e74c3c, #e67e22);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.continer {
  margin: 100px auto;
  width: 500px;
  height: 300px;
  border-radius: 20px;
  background: #dff9fb;
  position: relative;
}
.forms {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
}
.btn {
  display: flex;
  justify-content: center;
}
.login-p {
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 10px 0;
}
</style>