<template>
<div>
    <p>Quản lí trạng thái thi công</p>
    <hr>
    <v-btn
      class="ma-2"
      tile 
      outlined  
      color="success"
      :dialog="dialog"
      @click="openFormTCX()"
    >
      <v-icon left>mdi-plus</v-icon> Thêm trạng thái thi công mới 
    </v-btn>
    <v-card class="content-dashboard">
      <v-card-title>
        <div class="flex-grow-1"><span style="font-size: 16px !important; text-decoration: underline;">Danh sách trạng thái thi công</span></div>
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
        :items="dstrangthaitc"
        :search="search"
      >
        <template v-slot:item.delete="{item}">
          <button @click="xoaTTTC(item.matrangthaitc)"><v-icon>mdi-delete</v-icon></button>
        </template>
        <template v-slot:item.edit="{item}">
          <button @click="suachitietTTTC(item)"><v-icon>mdi-account-details</v-icon></button>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-if="item_edit != null" v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span v-if="edit == false" class="headline">Trạng thái</span>
          <span v-else class="headline">Cập nhật {{item_edit.trangthaitc}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field 
                label="Mã trạng thái thi công"
                :disabled="edit"
                v-model="item_edit.matrangthaitc"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field 
                label="Trạng thái"
                v-model="item_edit.trangthaitc"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="openFormTCX(dialog)">hủy</v-btn>
          <v-btn color="blue darken-1" text @click="getApiPostTTTC()"> <span v-if="edit == true"> Cập nhật</span> <span v-else> Thêm mới</span> </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>
<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
    name: "danh-muc-ten-cay-xanh",
    data() {
        return {
          headers: [
            {text: "Mã trạng thái", value: 'matrangthaitc'},
            {text: "Trạng thái", value: 'trangthaitc'},
            {text: 'Xóa', value: 'delete', sortable: false},
            {text: 'Chi tiết', value: 'edit', sortable: false},
          ],
          dstrangthaitc: [],
          search: '',
          dialog: false,
          item_edit: null,
          edit: false
        }
    },
    computed: {
      ...mapGetters(["getAction_CX"])
    },
    methods: {
      apiDanhSachTTTC(){
        axios.get("http://113.161.225.252:8000/"+"danh-muc-trang-thai-thi-cong/", {
          headers: {
            Authorization: "Token "+this.$store.state.token_authorzation
          }
        })
        .then((response) =>{
          this.dstrangthaitc = response.data
        })
      },
      openFormTCX(){
        this.dialog = !this.dialog
        this.item_edit = {}
        this.edit = false
      },
      getApiPostTTTC(){
        if(this.edit == false)
        {
          axios.post("http://113.161.225.252:8000/"+ "danh-muc-trang-thai-thi-cong/", {
            matrangthaitc: this.item_edit.matrangthaitc,
            trangthaitc: this.item_edit.trangthaitc
          },{
            headers: {
              "Authorization": "Token "+this.$store.state.token_authorzation,
              "Content-Type": 'application/json'
            }
          })
          .then(() => {
            this.apiDanhSachTTTC()
            this.dialog = false
          })
        }
        else
        {
          axios.put("http://113.161.225.252:8000/"+"danh-muc-trang-thai-thi-cong/"+this.item_edit.matrangthaitc+"/",this.item_edit,{
            headers: {
              "Authorization": "Token "+this.$store.state.token_authorzation,
              "Content-Type": 'application/json'
            }
          })
          .then(() =>{
              this.apiDanhSachTTTC()
              this.dialog = false
          })
        }
      },
      xoaTTTC(matrangthaitc){
        // if(this.getAction_CX.xoa == '2.4')
        // {
            if (confirm("Bạn có muốn xóa trạng thái "+matrangthaitc+"?")){
            axios.delete("http://113.161.225.252:8000/"+"danh-muc-trang-thai-thi-cong/"+matrangthaitc+"/", {
              headers: {
                Authorization: "Token "+this.$store.state.token_authorzation
              }
            })
            .then(() =>{
              alert("Bạn đã xóa thành công!!")
              this.apiDanhSachTTTC()
            })
          }
        // }
        // else
        // {
        //   alert('Bạn không đủ quyền để thực hiện chức năng này!')
        // }
        
      },
      suachitietTTTC(item){
        this.dialog = true
        this.item_edit  = item
        this.edit = true
      }
    },
    created() {
        this.apiDanhSachTTTC()
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