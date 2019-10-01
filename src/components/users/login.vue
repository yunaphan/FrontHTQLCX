<template>
  <div id="login">
    <v-container grid-list-xl text-center class="containerDiv">
        <FormLogin :tab="tab" @updateTab="updateTab" />
        <QuenMatKhau :tab="tab" @updateTab="updateTab"/>
    </v-container>
  </div>
</template>
<script>
import FormLogin from '@/components/users/FormLogin.vue'
import QuenMatKhau from '@/components/users/QuenMatKhau.vue'
export default {
  name: "login",
  data(){
    return{
      tab: 1
    }
  },
  components:{
    FormLogin,
    QuenMatKhau,
  },
  methods: {
    updateTab(value){
      this.tab = value
    }
  },
}
</script>
<style>
#login{
    width: 100%;
    height: 100%;
    background-image: url("http://localhost:8080/images/background_login.jpg")
}
.containerDiv{
    margin-top: 8%;
    margin-left: 27%;
}
.login-content{
    height: 350px;
    padding: 12px;
}
#changetab{
    text-decoration: underline;
    text-align: left;
    padding-left: 30px;
    font-style: italic;
}
html{
  overflow-y: hidden;
}
</style>