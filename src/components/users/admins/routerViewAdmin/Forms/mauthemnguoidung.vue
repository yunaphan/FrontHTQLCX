<template>
<div>
    <p>Thêm người dùng mới</p>
    <hr>
    <form 
    ref="form"
    class="form-add-user"  
    @submit.prevent="getApiAddUser()">
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
                prepend-icon="mdi-gender-male-female"
                v-model="user.gioitinh"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field 
                label="Số Điện Thoại" 
                prepend-icon="mdi-cellphone-iphone"
                :rules="phoneRules"
                :counter="10"
                required
                v-model="user.phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field 
                label="Email*"
                prepend-icon="mdi-email-multiple-outline"
                required
                :rules="emailRules"
                v-model="user.email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                 <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px">
                    <template v-slot:activator="{ on }">
                        <v-text-field
                        v-model="dateFormatted"
                        label="Ngày sinh"
                        hint="MM/DD/YYYY format"
                        persistent-hint
                        prepend-icon="mdi-calendar-range"
                        @blur="date = parseDate(dateFormatted)"
                        required
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                </v-menu> 
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field 
                label="Địa Chỉ*" 
                prepend-icon="mdi-map-marker"
                required
                v-model="user.diachi"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  prepend-icon="mdi-account-group"
                  :items="nhomthicong"
                  item-text="tennhomthicong"
                  item-value="manhomthicong"
                  v-model="user.nhomthicong"
                  label="Nhóm thi công"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field 
                label="Tài Khoản*" 
                prepend-icon="mdi-account"
                required
                v-model="user.username"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field 
                label="Password*" 
                type="password" 
                required
                prepend-icon="mdi-key"
                v-model="user.password"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  prepend-icon="mdi-account-group"
                  :items="dsquyen"
                  item-text="quyennguoidung"
                  item-value="maquyen"
                  v-model="user.quyen"
                  label="Quyền"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="2" md="4">
                <v-checkbox
                label="Kích hoạt tài khoản"
                color="primary"
                hide-details
                v-model="user.is_active"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
          <small>*Đây là trường bắt buộc</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text type="submit">Lưu</v-btn>
          <v-btn color="blue darken-1" text @click="clear">Nhập lại</v-btn>
        </v-card-actions>
      </v-card>
  </form>
</div>
</template>
<script>
  import * as firebase from 'firebase'
  import axios from 'axios'
  export default {
    name: "mau-them-nguoi-dung",
    data(){
      return {
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
        "username": "",
        "gioitinh": "",
        "ngaysinh": "",
        "diachi": "",
        "email": "",
        "password": "",
        "noti_token": "",
        "is_admin": false,
        "is_staff": false,
        "is_active": false,
        "phone": "",
        "firstname": "",
        "lastname": "",
        "middlename": "",
        "duongdanavatar": null,
        "nhomthicong": '', 
        "quyen":null
      },
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      nhomthicong: [],
      // manhomthicong: null,
      dsquyen: [],
      // maquyen: null
      }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    methods: {
      renderLogo(){
        // var storageRef = firebase.storage().ref('');
            // Create a reference to 'mountains.jpg'
        const self = this;
        const file = this.$refs.MyAvatar.files[0]
        this.user.duongdanavatar = file
        this.LOGO = URL.createObjectURL(file)
      },
      formatDate (date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
      },
      clear () {
        this.user = {
          "username": "",
          "gioitinh": "",
          "ngaysinh": "",
          "diachi": "",
          "email": "",
          "password": "",
          "noti_token": "",
          "is_admin": false,
          "is_staff": false,
          "is_active": false,
          "phone": "",
          "firstname": "",
          "lastname": "",
          "middlename": "",
          "duongdanavatar": null,
          "nhomthicong": null, 
          "quyen":null
        }
      },
      getApiAddUser() {
        // console.log(this.user)
          var storageRef = firebase.storage().ref('');
          const app = this;
          storageRef.child(app.user.duongdanavatar.name).put(app.user.duongdanavatar).then(function(snapshot) {
            var storage = firebase.storage().ref('');
              storage.child(app.user.duongdanavatar.name).getDownloadURL().then((url) => {
              const form_user = new FormData();
                console.log(url)
                form_user.append("username",app.user.username)
                form_user.append("gioitinh",app.user.gioitinh)
                form_user.append("ngaysinh",app.user.ngaysinh)
                form_user.append("diachi",app.user.diachi)
                form_user.append("email",app.user.email)
                form_user.append("password",app.user.password)
                form_user.append("duongdanavatar",url)
                form_user.append("is_admin",true)
                form_user.append("is_staff",true)
                form_user.append("is_active",true)
                form_user.append("firstname",app.user.firstname)
                form_user.append("middlename",app.user.middlename)
                form_user.append("lastname",app.user.lastname)
                form_user.append("nhomthicong",app.user.nhomthicong)
                form_user.append("quyen",app.user.quyen)
                axios.post("http://113.161.225.252:8000/user/", form_user, {
                  headers: {
                    "Authorization": "Token "+app.$store.state.token_authorzation,
                    'Content-Type': 'application/x-www-form-urlencoded',
                  }
              })
              .then((response) => {
                // console.log(response.data)
                this.newUser = response.data
                alert("Bạn đã thêm nhân viên thành công!")
                this.$router.push('/admin/user-accounts')
              }).catch((error) => {
                // console.log(error)
              })
            });
          });
          
      },
      getApiNhomTC(){
        axios.get("http://113.161.225.252:8000/nhom-thi-cong/",{
          headers:{
            Authorization: "Token "+ this.$store.state.token_authorzation
          }
        })
        .then((response)=>{
          this.nhomthicong = response.data
        })
      },
      getQuyenNguoiDung(){
        axios.get("http://113.161.225.252:8000/quyen-nguoi-dung/",{
          headers:{
            Authorization: "Token "+ this.$store.state.token_authorzation
          }
        })
        .then((response)=>{
          this.dsquyen = response.data
        })
      },
    },
    created() {
      this.getApiNhomTC()
      this.getQuyenNguoiDung()
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