<template>
<div>
    <h3 
    >CẬP NHẬT NGƯỜI DÙNG</h3>
    <hr>
    <v-row>
      <v-col cols="12" sm="3">
        <v-select
          :items="items_action"
          item-text="text"
          item-value="value"
          label="Tác vụ"
          :v-model="tacVuThucHien"
          deletable-chips
        ></v-select>
      </v-col>
      <v-col cols="12" sm="1">
        <v-btn color="success" @click="tacVuThucHien">
          <v-icon>mdi-pencil-remove-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <router-link :to="'/admin/user-accounts/them-nguoi-dung-moi/'">
      <v-btn
        class="ma-2"
        tile 
        outlined  
        color="success"
      >
        <v-icon left>mdi-plus</v-icon> Thêm Người Dùng Mới 
      </v-btn>
    </router-link>
    <v-card class="content-dashboard">
      <v-card-title>
        <div class="flex-grow-1"><span style="font-size: 16px !important; text-decoration: underline;">Danh sách người dùng</span></div>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify-minus"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
      :headers="headers"
      :items="users"
      :search = "search"
      item-key="username"
      show-select
      >
        <template v-slot:item.admin="{item}">
          <v-icon v-if="item.is_admin == true">mdi-check</v-icon>
          <v-icon v-else>mdi-alert-circle-outline</v-icon>
        </template>
        <template v-slot:item.user="{item}">
          <v-icon v-if="item.is_staff == true">mdi-check</v-icon>
          <v-icon v-else>mdi-alert-circle-outline</v-icon>
        </template>
        <template v-slot:item.active="{item}">
          <v-icon v-if="item.is_active == true">mdi-check</v-icon>
          <v-icon v-else>mdi-alert-circle-outline</v-icon>
        </template>
        <template v-slot:item.edit="{item}">
          <button><v-icon>mdi-pencil</v-icon></button>
        </template>
        <template v-slot:item.delete="{item}">
          <button @click="deleteUser(item.username)"><v-icon>mdi-delete</v-icon></button>
        </template>
        <template v-slot:item.detail="{item}">
          <button><router-link :to="'/admin/user-account/'+item.username"><v-icon>mdi-account-details</v-icon></router-link></button>
        </template>
      </v-data-table>
    </v-card>
</div>
</template>
<script>
  import axios from 'axios'
  import { mapGetters,mapActions } from 'vuex'
  export default {
    data () {
      return {
        dialogForm: false,
        search: '',
        items_action: [
          { text: "Tác vụ rỗng", value: ""},
          { text: "Thêm người dùng mới", value: ""},
          { text: "xóa người dùng đã chọn", value: ""}
        ],
        headers: [
          {text: 'Họ', value: 'firstname'},
          {text: 'Chữ lót', value: 'middlename'},
          {text: 'Tên', value: 'lastname'},
          {text: 'Tài Khoản', value: 'username'},
          {text: 'Giới Tính', value: 'gioitinh'},
          {text: 'Ngày Sinh', value: 'ngaysinh', width:"100px"},
          {text: 'Địa chỉ', value: 'diachi'},
          {text: 'Số điện thoại', value: 'phone'},
          {text: 'Mail', value: 'email'},
          {text: 'Admin', value: 'admin', sortable: false},
          {text: 'Staff', value: 'user', sortable: false},
          {text: 'Active', value: 'active', sortable: false},
          // {text: 'Sửa', value: 'edit', align: 'center', width:"40px", sortable: false},
          {text: 'Xóa', value: 'delete', align: 'center', width:"40px", sortable: false},
          {text: 'Chi tiết', value: 'detail', align: 'center', width:"40px", sortable: false},
        ],
        users: [],
      }
    },
    computed: {
      ...mapGetters(['getDanhSachNguoiDung'])
    },
    methods: {
      ...mapActions(['commitApiDanhSachNguoiDung']),
      ApiDanhSachNguoiDung(){
        axios.get('http://113.161.225.252:8000/user/', {
          headers: {
            Authorization: "Token "+this.$store.state.token_authorzation
          }
        })
        .then((response) =>{
          this.commitApiDanhSachNguoiDung(response.data)
          this.users = response.data
        })
      },
      updateformnguoidung(){
        this.dialogForm = !this.dialogForm
      },
      deleteUser(username){
        axios.delete('http://113.161.225.252:8000/user/'+username+'/' , {
          headers: {
            Authorization: "Token "+this.$store.state.token_authorzation
          }
        })
        .then(() => {
          alert("Đã xóa tài khoản", username);
          this.ApiDanhSachNguoiDung()
         
        })
      },
      tacVuThucHien(){

      }
    },
    created() {
      this.ApiDanhSachNguoiDung() 
    },
  }
</script>
<style lang="css">
    .v-card{
        margin-bottom: 12px;
    }
    .content-dashboard{
        margin-top: 12px;
    }
    .selectedAll{
      display: inline-block;
      padding-right: 20px;
    }
</style>