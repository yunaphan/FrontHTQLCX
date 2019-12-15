<template>
  <v-card class="side-bar-left">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      class="nav-drawer"
      permanent
      style="background-color: #e0e0e0;">
      <v-list-item class="user_account">
        <v-list-item-avatar>
          <v-img :src="user.duongdanavatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-title class="list-title">{{user.username}}</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
          class="close-sidebar"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item link to="/map">
        <v-icon>mdi-home-map-marker</v-icon>
        <v-list-item-title> Home Map</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/admin/dash-board">
        <v-icon>mdi-view-dashboard</v-icon>
        <v-list-item-title> DashBoard</v-list-item-title>
      </v-list-item>
      <v-list-group v-if="getAction_nd.xem == '10.1' || getAction_nd.them == '10.2'|| getAction_nd.sua == '10.3' || getAction_nd.xoa == '10.4'">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title><v-icon>mdi-account-box-multiple</v-icon> Quản lí người dùng</v-list-item-title>
          </v-list-item-content>             
        </template>
        <v-list-item v-if="getAction_nd.them == '10.2'"
          link to="/admin/user-accounts/them-nguoi-dung-moi">
          <v-list-item-title>Thêm nhân viên</v-list-item-title>
          <!--<v-list-item-icon><v-icon>mdi-account-plus</v-icon></v-list-item-icon>-->
        </v-list-item> 
        <v-list-item v-if="getAction_nd.xem == '10.1' || getAction_nd.them == '10.2'|| getAction_nd.sua == '10.3' || getAction_nd.xoa == '10.4'"
        link to="/admin/user-accounts">
          <v-list-item-title>Danh sách nhân viên</v-list-item-title>
          <!--<v-list-item-icon><v-icon>mdi-clipboard-account</v-icon></v-list-item-icon>-->
        </v-list-item>
         <v-list-item  v-if="getAction_nd.xem == '10.1' || getAction_nd.sua == '10.3'" link to="/admin/quyen-nguoi-dung">
          <v-list-item-title>Phân quyền</v-list-item-title>
          <!--<v-list-item-icon><v-icon>mdi-clipboard-account</v-icon></v-list-item-icon>-->
        </v-list-item>
      </v-list-group>
      <v-list-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title><v-icon>mdi-file-document-box-multiple-outline</v-icon> Danh mục quản lý</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item v-if="getAction_CX.xem == '2.1' || getAction_CX.them == '2.2' || getAction_CX.sua == '2.3' || getAction_CX.xoa == '2.4' " link to="/admin/danh-muc-ten-cay-xanh">
          <v-list-item-title>Danh mục tên cây xanh</v-list-item-title>
          <!--<v-list-item-icon><v-icon>mdi-barley</v-icon></v-list-item-icon>-->
        </v-list-item>  
        <v-list-item v-if="getAction_tinhtrang_cx.xem == '3.1' || getAction_tinhtrang_cx.them == '3.2' || getAction_tinhtrang_cx.sua == '3.3' || getAction_tinhtrang_cx.xoa == '3.4' " link to="/admin/danh-muc-tinh-trang-cay-xanh">
          <v-list-item-title>Danh mục tình trạng cây xanh</v-list-item-title>
          <!--<v-list-item-icon><v-icon>mdi-creation</v-icon></v-list-item-icon>-->
        </v-list-item>   
        <v-list-item v-if="getAction_thicong.xem == '7.1' || getAction_thicong.them == '7.2' || getAction_thicong.sua == '7.3' || getAction_thicong.xoa == '7.4' " link to="/admin/danh-muc-hinh-thuc-thi-cong">
          <v-list-item-title>Danh mục hình thức thi công</v-list-item-title>
          <!--<v-list-item-icon><v-icon>mdi-bug</v-icon></v-list-item-icon>-->
        </v-list-item>
        <v-list-item v-if="getAction_tttc.xem == '9.1' || getAction_tttc.them=='9.2' || getAction_tttc.sua =='9.3' || getAction_tttc.xoa=='9.4'"
        link to="/admin/danh-muc-trang-thai-thi-cong">
          <v-list-item-title>Danh mục trạng thái thi công</v-list-item-title>
          <!--<v-list-item-icon><v-icon>mdi-state-machine</v-icon></v-list-item-icon>-->
        </v-list-item>
      </v-list-group>
      <v-list-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title><v-icon>mdi-axis-arrow</v-icon> Danh mục hành chính</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item link to="/admin/danh-muc-quan-huyen">
          <v-list-item-title>Danh mục quận huyện</v-list-item-title>
          <!--<v-list-item-icon><v-icon>mdi-alpha-g-box-outline</v-icon></v-list-item-icon>-->
        </v-list-item>
        <v-list-item link to="/admin/danh-muc-phuong-xa">
          <v-list-item-title>Danh mục phường xã</v-list-item-title>
          <!--<v-list-item-icon><v-icon>mdi-alpha-w</v-icon></v-list-item-icon>-->
        </v-list-item>
        <v-list-item link to="/admin/danh-muc-duong">
          <v-list-item-title>Danh mục đường</v-list-item-title>
          <!--<v-list-item-icon><v-icon>mdi-routes</v-icon></v-list-item-icon>-->
        </v-list-item>
      </v-list-group>
      <v-list-item link to="/admin/thong-ke">
        <v-icon>mdi-poll</v-icon>
        <v-list-item-title> Thống kê</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/admin/lich-thi-cong">
        <v-icon>mdi-calendar-text</v-icon>
        <v-list-item-title>Quản lí lịch thi công</v-list-item-title>
      </v-list-item>
      <!--<v-list-item link to="/admin/phan-anh">
        <v-icon>mdi-comment-quote-outline</v-icon>
        <v-list-item-title> Ý kiến phản ánh</v-list-item-title>
      </v-list-item>--> 
       <v-list-item link @click="$session.destroy()">
        <v-icon>mdi-logout</v-icon>
        <v-list-item-title>Đăng xuất</v-list-item-title>
      </v-list-item> 
    </v-navigation-drawer>
  </v-card>
</template>
<script>
import  axios from 'axios'
import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        drawer: true,
        mini: true,
        user: {}
      }
    },
    computed: {
      ...mapGetters(["getAction_CX", 
      "getAction_tinhtrang_cx", 
      "getAction_thicong", 
      "getAction_nd",
      "getAction_tttc",])
    },
    watch: {
      mini(newVal) {
        this.$emit("updateClassSidebar",newVal)
      },
      getAction_CX(newVal)
      {
        // console.log('action',newVal)
      }
    },
    methods: {
      // api_user()
      // {
      //   axios.post()
      // }
    },
    created() {
      // console.log(this.$session.get('key'))
      axios.post("http://113.161.225.252:8000/infomations-by-token/",{
      key: this.$session.get('key')
      },
      {
        headers: {
          Authorization: "Token "+this.$store.state.token_authorzation,
         
        }
      }).then((response) => {
        this.user = response.data
      })
    },
  }
</script>
<style lang="css">
.user_account{
    background-color: #060694;
}
.list-title, .close-sidebar{
    color: #fffff8 !important
}
.side-bar-left {position: fixed;height: 100%}
.v-navigation-drawer__content::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.v-navigation-drawer__content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.v-navigation-drawer__content::-webkit-scrollbar-thumb {
  background: #6a6a6a;
}

/* Handle on hover */
.v-navigation-drawer__content::-webkit-scrollbar-thumb:hover {
  background: rgb(38, 137, 214);
}
.v-list-item__title {
    font-size: 15px !important;
}
</style>