<template>
 <v-layout wrap v-if="tab == 1">
        <v-flex xs6 class="login-contaier">
          <v-card>
          <div class="login-content">
            <img src="http://localhost:8080/images/logoVNPT.png" width="40px">
            <h1 class="login-title">Đăng nhập</h1>
            <v-text-field
              prepend-icon="mdi-account"
              name="username"
              label="Username"
              type="text"
            >
            </v-text-field>
            <v-text-field
              prepend-icon="mdi-lock-question"
              name="password"
              label="Password"
              :type="display_password"
              :append-icon="mdiIcon"
              @click:append="appendCallback"
            >
            </v-text-field>
            <div id="changetab">
              <small @click="updateTab()">Quên mật khẩu?</small>
            </div> 
            <v-btn
             color="primary"
             class="btn-login"
             @click="login"
            >
              Đăng nhập
            </v-btn>
          </div>
          </v-card>
        </v-flex>
      </v-layout> 
</template>
<script>
import axios from 'axios'
export default {
    name:'formlogin',
    props: ["tab"],
    data()
    {
        return{
            display_password: 'password',
            mdiIcon: 'mdi-eye-off',
            eyeOpen: false,
            user:{
              username: "phantien",
              password: "123213"
            }
            
        }
    },
    methods:{
        updateTab(){
            this.$emit('updateTab', 0)
        },
        appendCallback(){
            if(this.eyeOpen == false)
            {   
              this.eyeOpen = !this.eyeOpen
              this.display_password="text"
              this.mdiIcon="mdi-eye"
            }
            else
            {
              this.eyeOpen = !this.eyeOpen
              this.display_password="password"
              this.mdiIcon="mdi-eye-off"
            }
        },
        login(){
          axios.post("http://113.161.225.252:8000/login/", this.user)
          .then((response) =>{
              this.$session.start()
              this.$session.set('key',response.data.key)
              this.$router.push('/admin')
          })
        }
    },
    beforeCreate() {
      if(!this.$session.exists()){
        this.$router.push('/login')
      }
    },
}
</script>