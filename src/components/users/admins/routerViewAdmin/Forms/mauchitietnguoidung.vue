<template>
<div>
    <h2
    >
      Chi tiết tài khoản {{user.lastname}} {{user.middlename}} {{user.firstname}} 
    </h2>
    <hr>
    <form 
    ref="form"
    class="form-add-user"  
    >
      <v-card>
        <v-card-title>
          <div class="text-center">
            <v-avatar 
            color="#0025ab2e"
            class="logo-avatar">
              <input 
              type="file" 
              ref="MyAvatar" 
              accept='image/*' 
              class="input-avatar" alt="avatar" 
              @change="renderLogo()"/>
              <img id="output" v-if="LOGO != null" :src="LOGO" alt="image avatar">
            </v-avatar>
          </div>
          <span class="headline">{{user.lastname}} {{user.middlename}} {{user.firstname}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field 
                label="Họ*" 
                required
                :rules="firstNameRules"
                :counter="30"
                v-model="user.lastname"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                label="Chữ Lót*"
                required
                :rules="firstNameRules"
                :counter="30"
                v-model="user.middlename"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                label="Tên*"
                required
                :rules="firstNameRules"
                :counter="30"
                v-model="user.firstname"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                :items="gtinh"
                label="Giới Tính"
                v-model="user.gioitinh"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field 
                label="Số Điện Thoại" 
                :rules="phoneRules"
                :counter="10"
                required
                v-model="user.phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field 
                label="Email*"
                required
                :rules="emailRules"
                v-model="user.email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field 
                label="Ngày Sinh*" 
                required
                v-model="user.ngaysinh"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field 
                label="Địa Chỉ*" 
                required
                v-model="user.diachi"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field 
                label="Tài Khoản*" 
                required
                v-model="user.username"
                disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field 
                label="Password*" 
                type="password" 
                required
                v-model="user.password"
                disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" md="1">
                <v-checkbox
                label="Active"
                color="primary"
                hide-details
                v-model="user.is_active"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="2" md="1">
                <v-checkbox
                label="Staff"
                color="primary"
                hide-details
                v-model="user.is_staff"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="2" md="1">
                <v-checkbox
                label="Admin"
                color="primary"
                hide-details
                v-model="user.is_admin"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" type="submit" @click="getApiUpdateUser()">Save As</v-btn>
          <v-btn color="blue darken-1" text @click="getApiDeleteUser()">Delete</v-btn>
        </v-card-actions>
      </v-card>
  </form>
</div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: "mau-them-nguoi-dung",
    data: () => ({
      firstNameRules: [
        v => !!v || 'Vui lòng điền vào đây',
        v => (v && v.length <= 30) || 'Tên phải nhỏ hơn 30 kí tự',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      phoneRules: [
        v => !!v || 'E-mail is required',
        v => (v.length <= 11) || 'Số điện thoại là 10 kí tự',
      ],
      gtinh: ['nam', 'nữ'],
      LOGO: null,
      newUser: null,
      user: {
        username: "",
        gioitinh: "",
        ngaysinh: "1997-04-10",
        diachi: "",
        email: "",
        password: "",
        is_admin: false,
        is_staff: false,
        is_active: false,
        phone: "",
        firstname: "",
        lastname: "",
        middlename: ""
      }
    }),
    methods: {
      renderLogo(){
        const file = this.$refs.MyAvatar.files[0]
        this.LOGO = URL.createObjectURL(file)
      },
      clear () {
        this.$refs.form.reset()
      },
      getApiDetailUser() {
        axios.get("http://113.161.225.252:8000/user/"+this.$route.params.username+"/", {
          headers: {
            "Authorization": "Token "+this.$store.state.token_authorzation,
            "Content-Type": 'application/json'
          }
        })
        .then((response) => {
          this.user = response.data
        })
      },
      getApiDeleteUser() {
        axios.delete("http://113.161.225.252:8000/user/"+this.user.username+"/", {
          headers: {
            "Authorization": "Token "+this.$store.state.token_authorzation,
            "Content-Type": 'application/json'
          }
        })
        .then((response) => {
          this.user = response.data
          this.$router.push('/admin/user-accounts')
        })
      },
      getApiUpdateUser() {
        axios.put("http://113.161.225.252:8000/user/"+this.user.username+"/", this.user, {
          headers: {
            "Authorization": "Token "+this.$store.state.token_authorzation,
            "Content-Type": 'application/json'
          }
        })
        .then(() => {
          alert("Cập Nhật thông tin "
            +this.user.lastname
            +" "+this.user.middlename+
            " "+this.user.firstname
            +" thành công!!")
        })
      },
    },
    created() {
      this.getApiDetailUser()
    },
  }
</script>
<style lang="css">
  .form-add-user{
    padding-top: 12px;
  } 
  .text-center .v-avatar{
    height: 180px !important;
    min-width: 180px !important;
    width: 180px !important;
  }
  .text-center{
    text-align: center;
  }
  .logo-avatar{
    position: relative;
  }
  .input-avatar{
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
  }
  .headline{
    padding-left: 12px;
  }
</style>