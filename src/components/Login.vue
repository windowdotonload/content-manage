<template>
  <div>
    <div class="continer">
      <p class="login">L O G I N</p>
      <div class="logic">
        <form>
          <p>username</p>
          <input v-model="user.name" name="username" type="text" />
          <p>password</p>
          <input v-model="user.password" name="password" type="password" />
          <input type='button' value="login" class='login-btn' @click="login"
          />
        </form>
      </div>
      <div>
        <!-- <p>
          还没有账号？
          <a href="/register">点击注册</a>
        </p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      user:{name:'',password:''}
    }
  },
  created(){
  },
  methods:{ 
    login(){
      this.$http.post('user',this.user).then( res => {
          if (res.data.err_code === 2) {
            // console.log(res)
            return this.$message.error('用户名或密码不能为空')
          }else{
            // console.log(res)
            if(res.data.err_code === 0) {
              this.$router.push('/manage')
              return this.$message.success('登录')
            }
            return this.$message.error('用户名或密码错误')  
          }
      })
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.continer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px auto;
  border: 1px solid black;
  border-radius: 10px;
  width: 300px;
  height: 500px;
  background-image: linear-gradient(135deg, #00cec9, #a29bfe, #3498db);
}
.login {
  height: 30%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bolder;
}
p {
  color: black;
  font-weight: bold;
}
.login-btn{
  height: 30px;
  background:#00cec9;
  border: none;
  width:80%;
  margin-left: 50%;
  transform: translate(-50%);
}
</style>