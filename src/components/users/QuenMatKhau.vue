<template>
 <v-layout wrap v-if="tab==0">
        <v-flex xs6 class="login-contaier">
          <v-card>
          <div class="login-content">
            <img src="http://localhost:8080/images/logoVNPT.png" width="40px">
            <h1 class="login-title">Quên Mật Khẩu</h1>
            <small style="font-style:italic">Vui lòng điền email để được cấp lại mật khẩu!</small>
            <v-text-field
              prepend-icon="mdi-email"
              name="email"
              label="Email"    
              type="text"
            >
            </v-text-field>
            <div id="changetab">
              <small @click="updateTab()">Đăng Nhập</small>
            </div> 
            <v-btn
             color="primary"
             class="btn-login">
              Hoàn Tất
            </v-btn>
          </div>
          </v-card>
        </v-flex>
      </v-layout> 
</template>
<script>
export default {
    name:'quenmatkhau',
    props: ["tab"],
    methods:{
        updateTab(){
            this.$emit('updateTab', 1)
        }
    }
}
</script>