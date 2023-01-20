<template>
  <div class="login">
    <div class="loginTop">欢迎登录</div>
    <div class="loginContent">
      <input
        type="text"
        name="phone"
        class="phone"
        v-model="phone"
        placeholder="请输入手机号码"
      />
      <input
        type="text"
        name="password"
        class="password"
        v-model="password"
        placeholder="请输入密码"
      />
      <button class="btn" @click="Login">登录</button>
    </div>
  </div>
</template>
<script>
import { getUser } from '@/request/api/home.js'
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods:{
    Login: async function(){
        let res = await this.$store.dispatch('getU', {phone: this.phone, password: this.password})
        console.log(res)
        if(res.data.code === 200){
            this.$store.commit('updateIsLogin', true)
            let result = await getUser(res.data.account.id)
            this.$store.commit('updateUser', result)
            this.$store.commit('updateToken', res.data.token)
            this.$router.push('/user')
        }else{
            alert("手机号码或者密码错误")
            this.password = ''
        }
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 13rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  //text-align: center;
  .loginTop {
    margin-top: 1rem;
    //height: 6rem;
    color: #fff;
  }
  .loginContent {
    width: 50%;
    height: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 2rem;
    .phone,
    .password {
      width: 5rem;
      height: 1rem;
      border: 0.02rem solid #999;
    }
    .btn {
      width: 2rem;
    }
  }
}
</style>