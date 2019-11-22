<template>
<div>
    <h3>DANH MỤC TÌNH TRẠNG CÂY XANH</h3>
    <hr>
    <v-btn
      class="ma-2"
      tile 
      outlined  
      color="success"
      :dialog="dialog"
      @click="openFormTTCX()"

    >
      <v-icon left>mdi-plus</v-icon> Thêm tình trạng mới
    </v-btn>
    <v-card class="content-dashboard">
      <v-card-title>
        <div class="flex-grow-1"><span style="font-size: 16px !important; text-decoration: underline;">Danh sách tình trạng cây xanh</span></div>
        <v-text-field
          append-icon="mdi-magnify-minus"
          label="Search"
          v-model="search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="listTreeStatus"
        :search="search"
        show-select
      >
        <template v-slot:item.delete="{item}">
          <button @click="deleteTTCX(item.matinhtrang)"><v-icon>mdi-delete</v-icon></button>
        </template>
        <template v-slot:item.edit="{item}">
          <button @click="editDetailTTCX(item)"><v-icon>mdi-account-details</v-icon></button>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span v-if="dialog_edit == false" class="headline">Tình Trạng Mới </span>
          <span v-else class="headline">Cập Nhật Tình Trạng {{status.tinhtrang}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field 
                label="Mã tình trạng"
                :disabled = "dialog_edit"
                v-model="status.matinhtrang"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field 
                label="Tình trạng"
                v-model="status.tinhtrang"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field 
                label="Ghi Chú"
                v-model="status.ghichu"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="openFormTTCX(dialog)">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="apiUpdateTTCX()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>
<script>
import axios from 'axios'
export default {
    name: "danh-muc-tinh-trang-cay-xanh",
    data() {
        return {
          headers: [
            {text: "Mã Tình Trạng", value: 'matinhtrang'},
            {text: "Tình Trạng", value: 'tinhtrang'},
            {text: "Ghi Chú", value: 'ghichu'},
            {text: 'Xóa', value: 'delete', sortable: false},
            {text: 'Chi tiết', value: 'edit', sortable: false},
          ],
          listTreeStatus: [],
          search: '',
          dialog: false,
          status: {
            ghichu: ""
          },
          edit_status: null,
          dialog_edit: false,
        }
    },
    methods: {
      apiDanhSachTinhTrangCX(){
        axios.get("http://113.161.225.252:8000/trang-thai-cay-xanh/", {
          headers: {
            Authorization: "Token "+this.$store.state.token_authorzation
          }
        })
        .then((response) =>{
          this.listTreeStatus = response.data
        })
      },
      openFormTTCX(){
        this.dialog = !this.dialog
        this.status = {
          ghichu: ""
        }
        this.dialog_edit = false
      },
      apiUpdateTTCX(){
        if(this.dialog_edit == false){
          axios.post("http://113.161.225.252:8000/trang-thai-cay-xanh/", this.status,{
            headers: {
              Authorization: "Token "+this.$store.state.token_authorzation
            }
          })
          .then(() => {
            this.apiDanhSachTinhTrangCX()
            this.dialog = false
          })
        }
        else{
          axios.put("http://113.161.225.252:8000/trang-thai-cay-xanh/"+this.status.matinhtrang+"/", this.status, {
            headers: {
              Authorization: "Token "+this.$store.state.token_authorzation
            }
          })
          .then((response) => {
            this.dialog = false
            alert("bạn đã update thành công"+ response.data.tinhtrang+"!")
            this.apiDanhSachTinhTrangCX()
          })
        }
      },
      deleteTTCX(matinhtrang){
        if (confirm("Bạn có muốn xóa tình trạng "+matinhtrang+"?")){
          axios.delete("http://113.161.225.252:8000/trang-thai-cay-xanh/"+matinhtrang+"/", {
            headers: {
              Authorization: "Token "+this.$store.state.token_authorzation
            }
          })
          .then(() =>{
            alert("Bạn đã xóa thành công!!")
            this.apiDanhSachTinhTrangCX()
          })
        }
      },
      editDetailTTCX(item){
        this.dialog = true
        this.status = item
        this.dialog_edit = true
      }
    },
    created() {
        this.apiDanhSachTinhTrangCX()
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