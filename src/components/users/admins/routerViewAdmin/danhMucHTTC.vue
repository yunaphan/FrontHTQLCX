<template>
<div>
    <p>Quản lí hình thức thi công</p>
    <hr>
    <v-btn
      class="ma-2"
      tile 
      outlined  
      color="success"
      :dialog="dialog"
      @click="openFormHTTC()"

    >
      <v-icon left>mdi-plus</v-icon> Thêm hình thức mới
    </v-btn>
    <v-card class="content-dashboard">
      <v-card-title>
        <div class="flex-grow-1"><span style="font-size: 16px !important; text-decoration: underline;">Danh sách hình thức thi công</span></div>
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
        :items="listHTTC"
        :search="search"
      >
        <template v-slot:item.delete="{item}">
          <button @click="deleteHTTC(item.maloai)"><v-icon>mdi-delete</v-icon></button>
        </template>
        <template v-slot:item.edit="{item}">
          <button @click="editDetailHTTC(item)"><v-icon>mdi-account-details</v-icon></button>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span v-if="dialog_edit == false" class="headline">Hình Thức Thi Công Mới </span>
          <span v-else class="headline">Cập Nhật Hình Thức {{HTTC.tenloai}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field 
                label="Mã Hình Thức"
                :disabled="dialog_edit"
                v-model="HTTC.maloai"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field 
                label="Hình Thức"
                v-model="HTTC.tenloai"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="openFormHTTC(dialog)">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="apiUpdateHTTC()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>
<script>
import axios from 'axios'
export default {
    name: "danh-muc-hinh-thuc-thi-cong",
    data() {
        return {
          headers: [
            {text: "Mã hình thức thi công", value: 'maloai'},
            {text: "Hình thức thi công", value: 'tenloai'},
            {text: 'Xóa', value: 'delete', sortable: false},
            {text: 'Chi tiết', value: 'edit', sortable: false},
          ],
          listHTTC: [],
          search: '',
          dialog: false,
          HTTC: {},
          dialog_edit: false,
        }
    },
    methods: {
      apiDanhMucHTTC(){
        axios.get("http://113.161.225.252:8000/hinh-thuc-thi-cong/", {
          headers: {
            Authorization: "Token "+this.$store.state.token_authorzation
          }
        })
        .then((response) =>{
          this.listHTTC = response.data
        })
      },
      openFormHTTC(){
        this.dialog = !this.dialog
        this.HTTC = {}
        this.dialog_edit = false
      },
      apiUpdateHTTC(){
        if(this.dialog_edit == false){
          axios.post("http://113.161.225.252:8000/hinh-thuc-thi-cong/", this.HTTC,{
            headers: {
              Authorization: "Token "+this.$store.state.token_authorzation
            }
          })
          .then(() => {
            this.apiDanhMucHTTC()
            this.dialog = false
          })
        }
        else{
          axios.put("http://113.161.225.252:8000/hinh-thuc-thi-cong/"+this.HTTC.maloai+"/", this.HTTC, {
            headers: {
              Authorization: "Token "+this.$store.state.token_authorzation
            }
          })
          .then((response) => {
            console.log(response.data)
            this.dialog = false
            alert("bạn đã update thành công "+ response.data.tenloai+"!")
            this.apiDanhMucHTTC()
          })
        }
      },
      deleteHTTC(maloai){
        if (confirm("Bạn có muốn xóa hình thức "+maloai+"?")){
          axios.delete("http://113.161.225.252:8000/hinh-thuc-thi-cong/"+maloai+"/", {
            headers: {
              Authorization: "Token "+this.$store.state.token_authorzation
            }
          })
          .then(() =>{
            alert("Bạn đã xóa thành công!!")
            this.apiDanhMucHTTC()
          })
        }
      },
      editDetailHTTC(item){
        this.dialog = true
        this.HTTC = item
        this.dialog_edit = true
      }
    },
    created() {
        this.apiDanhMucHTTC()
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