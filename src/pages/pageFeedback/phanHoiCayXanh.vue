<template>
  <div id="feedback">
    <v-toolbar color="primary">
      <span style="color: #fff">Hệ thống phản ánh tình trạng cây xanh</span>
    </v-toolbar>
    <div class="content-feedback">
      <v-card width="100%" style="border-radius: 0;width: 60%; height:100%; max-height: 100%; margin: auto;padding:20px">
        <v-card-text>
          <p style="text-decoration: underline;">Thông tin cây xanh cần cập nhật</p>
          <v-text-field label="Họ và tên: "></v-text-field>
          <v-text-field label="Giới tính: "></v-text-field>
          <v-text-field label="Địa chỉ: "></v-text-field>
          <v-text-field label="Số điện thoại: "></v-text-field>
          <v-textarea label="Nội dung"></v-textarea>
          <v-text-field label="Hình ảnh: " type="file"></v-text-field>
          <v-btn color="success">Gửi phản hồi</v-btn>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "phan-hoi-tinh-trang-cay-xanh",
  data(){
    return{
    
    }
  },
  methods: {
    
  },
}
</script>
<style>
#feedback{width: 100%; height: 100%; background-image: url("http://localhost:8080/images/background_login.jpg")}
#feedback .content-feedback{width:100%; overflow-y: scroll;}
#feedback .content-feedback::-webkit-scrollbar {width: 0.5px;}
#feedback .content-feedback::-webkit-scrollbar-track {background: #f1f1f1;}
#feedback .content-feedback::-webkit-scrollbar-thumb {background: #6a6a6a;}
#feedback .content-feedback::-webkit-scrollbar-thumb:hover {background: rgb(38, 137, 214);}
</style>