<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      style="background-color: #e0e0e0;"
    >
      <v-list-item class="user_account">
        <v-list-item-avatar>
          <v-img src="http://localhost:8080/images/avatar.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="list-title">Phan Tiên</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
          class="close-sidebar"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item link to="/">
        <v-icon>mdi-home-map-marker</v-icon>
        <v-list-item-title> Home Map</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/admin/dash-board">
        <v-icon>mdi-view-dashboard</v-icon>
        <v-list-item-title> DashBoard</v-list-item-title>
      </v-list-item>
      <v-list-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title><v-icon>mdi-account-box-multiple</v-icon> Quản Lí Người Dùng</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item link to="/admin/user-accounts/them-nguoi-dung-moi">
          <v-list-item-title>Thêm Người Dùng</v-list-item-title>
          <v-list-item-icon><v-icon>mdi-account-plus</v-icon></v-list-item-icon>
        </v-list-item> 
        <v-list-item link to="/admin/user-accounts">
          <v-list-item-title>Danh Sách Người Dùng</v-list-item-title>
          <v-list-item-icon><v-icon>mdi-clipboard-account</v-icon></v-list-item-icon>
        </v-list-item>
      </v-list-group>
      <v-list-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title><v-icon>mdi-file-document-box-multiple-outline</v-icon> Danh Mục Quản Lý</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item link to="/admin/danh-muc-ten-cay-xanh">
          <v-list-item-title>Danh Mục Tên Cây Xanh</v-list-item-title>
          <v-list-item-icon><v-icon>mdi-barley</v-icon></v-list-item-icon>
        </v-list-item>  
        <v-list-item link to="/admin/danh-muc-tinh-trang-cay-xanh">
          <v-list-item-title>Danh Mục Tình Trạng Cây Xanh</v-list-item-title>
          <v-list-item-icon><v-icon>mdi-creation</v-icon></v-list-item-icon>
        </v-list-item>   
        <v-list-item link to="/admin/danh-muc-hinh-thuc-thi-cong">
          <v-list-item-title>Danh Mục Hình Thức Thi Công</v-list-item-title>
          <v-list-item-icon><v-icon>mdi-bug</v-icon></v-list-item-icon>
        </v-list-item>
      </v-list-group>
      <v-list-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title><v-icon>mdi-axis-arrow</v-icon> Danh Mục Hành Chính</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item link to="/admin/danh-muc-quan-huyen">
          <v-list-item-title>Danh Mục Quận Huyện</v-list-item-title>
          <v-list-item-icon><v-icon>mdi-alpha-g-box-outline</v-icon></v-list-item-icon>
        </v-list-item>
        <v-list-item link to="/admin/danh-muc-phuong-xa">
          <v-list-item-title>Danh Mục Phường Xã</v-list-item-title>
          <v-list-item-icon><v-icon>mdi-alpha-w</v-icon></v-list-item-icon>
        </v-list-item>
        <v-list-item link to="/admin/danh-muc-duong">
          <v-list-item-title>Danh Mục Tuyến Đường</v-list-item-title>
          <v-list-item-icon><v-icon>mdi-routes</v-icon></v-list-item-icon>
        </v-list-item>
      </v-list-group>
      <v-list-item link to="/admin/thong-ke">
        <v-list-item-icon><v-icon>mdi-poll</v-icon></v-list-item-icon>
        <v-list-item-title>Thống kê</v-list-item-title>
        </v-list-item>
      <v-list-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title><v-icon>mdi-calendar-blank-multiple</v-icon> Lịch thi công</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item>
          <v-list-item-title>Lập lịch thi công</v-list-item-title>
          <v-list-item-icon><v-icon>mdi-calendar-text</v-icon></v-list-item-icon>
        </v-list-item>  
        <v-list-item>
          <v-list-item-title>Lịch thi công khẩn cấp</v-list-item-title>
          <v-list-item-icon><v-icon>mdi-calendar-plus</v-icon></v-list-item-icon>
        </v-list-item>   
      </v-list-group>
      <v-list-item>
        <v-icon>mdi-comment-quote-outline</v-icon>
        <v-list-item-title> Ý kiến phản ánh</v-list-item-title>
      </v-list-item> 
    </v-navigation-drawer>
  </v-card>
</template>
<script>
  export default {
    data () {
      return {
        drawer: true,
        mini: true,
      }
    },
    watch: {
      mini(newVal) {
        this.$emit("updateClassSidebar",newVal)
      }
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
</style>