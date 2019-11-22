<template>
<div>
    <h3>DANH MỤC TÊN CÂY XANH</h3>
    <hr>
    <v-btn
      class="ma-2"
      tile 
      outlined  
      color="success"
      :dialog="dialog"
      @click="openFormTCX()"
    >
      <v-icon left>mdi-plus</v-icon> Thêm Tên Cây Xanh Mới 
    </v-btn>
    <v-card class="content-dashboard">
      <v-card-title>
        <div class="flex-grow-1"><span style="font-size: 16px !important; text-decoration: underline;">Danh sách tên cây xanh</span></div>
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
        :items="listTreeName"
        :search="search"
        show-select
      >
        <template v-slot:item.delete="{item}">
          <button @click="deleteTCX(item.matencx)"><v-icon>mdi-delete</v-icon></button>
        </template>
        <template v-slot:item.edit="{item}">
          <button @click="editDetailTCX(item)"><v-icon>mdi-account-details</v-icon></button>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-if="item_edit != null" v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span v-if="edit == false" class="headline">Tên Cây Mới</span>
          <span v-else class="headline">Cập nhật {{item_edit.tencx}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field 
                label="Mã Tên Cây Xanh"
                :disabled="edit"
                v-model="item_edit.matencx"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field 
                label="Tên Cây Xanh"
                v-model="item_edit.tencx"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="openFormTCX(dialog)">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="apiThemTenCX()"> <span v-if="edit == true"> Cập nhật</span> <span v-else> Thêm mới</span> </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>
<script>
import axios from 'axios'
export default {
    name: "danh-muc-ten-cay-xanh",
    data() {
        return {
          headers: [
            {text: "Mã Tên Cây Xanh", value: 'matencx'},
            {text: "Tên Cây Xanh", value: 'tencx'},
            {text: 'Xóa', value: 'delete', sortable: false},
            {text: 'Chi tiết', value: 'edit', sortable: false},
          ],
          listTreeName: [],
          search: '',
          dialog: false,
          item_edit: null,
          edit: false
        }
    },
    methods: {
      apiDanhSachTenCX(){
        axios.get("http://113.161.225.252:8000/ten-cay-xanh/", {
          headers: {
            Authorization: "Token "+this.$store.state.token_authorzation
          }
        })
        .then((response) =>{
          this.listTreeName = response.data
        })
      },
      openFormTCX(){
        this.dialog = !this.dialog
        this.item_edit = {}
        this.edit = false
      },
      apiThemTenCX(){
        if(this.edit == false)
        {
          axios.post("http://113.161.225.252:8000/ten-cay-xanh/", {
            matencx: this.item_edit.matencx,
            tencx: this.item_edit.tencx
          },{
            headers: {
              "Authorization": "Token "+this.$store.state.token_authorzation,
              "Content-Type": 'application/json'
            }
          })
          .then(() => {
            this.apiDanhSachTenCX()
            this.dialog = false
          })
        }
        else
        {
          axios.put("http://113.161.225.252:8000/ten-cay-xanh/"+this.item_edit.matencx+"/",this.item_edit,{
            headers: {
              "Authorization": "Token "+this.$store.state.token_authorzation,
              "Content-Type": 'application/json'
            }
          })
          .then(() =>{
              this.apiDanhSachTenCX()
              this.dialog = false
          })
        }
      },
      deleteTCX(matencx){
        if (confirm("Bạn có muốn xóa "+matencx+"?")){
          axios.delete("http://113.161.225.252:8000/ten-cay-xanh/"+matencx+"/", {
            headers: {
              Authorization: "Token "+this.$store.state.token_authorzation
            }
          })
          .then(() =>{
            alert("Bạn đã xóa thành công!!")
            this.apiDanhSachTenCX()
          })
        }
      },
      editDetailTCX(item){
        this.dialog = true
        this.item_edit  = item
        this.edit = true
      }
    },
    created() {
        this.apiDanhSachTenCX()
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