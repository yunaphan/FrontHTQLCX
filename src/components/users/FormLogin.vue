<template>
 <v-layout wrap v-if="tab == 1">
        <v-flex xs6 class="login-contaier">
          <v-card>
          <div class="login-content">
            <img src="http://localhost:8080/images/logoVNPT.png" width="40px">
            <h1 class="login-title">Đăng Nhập</h1>
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
              :type="password"
              :append-icon="mdiIcon"
              @click:append="appendCallback"
            >
            </v-text-field>
            <div id="changetab">
              <small @click="updateTab()">Quên mật khẩu?</small>
            </div> 
            <v-btn
             color="primary"
             class="btn-login">
              Đăng Nhập
            </v-btn>
          </div>
          </v-card>
        </v-flex>
      </v-layout> 
</template>
<script>
export default {
    name:'formlogin',
    props: ["tab"],
    data()
    {
        return{
            password: 'password',
            mdiIcon: 'mdi-eye-off',
            eyeOpen: false
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
                this.password="text"
                this.mdiIcon="mdi-eye"
            }
            else
            {
                this.eyeOpen = !this.eyeOpen
                this.password="password"
                this.mdiIcon="mdi-eye-off"
            }
            
        }
    }
}
</script>