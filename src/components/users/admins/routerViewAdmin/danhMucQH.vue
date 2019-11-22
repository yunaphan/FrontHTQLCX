<template>
<div>
    <h3>DANH MỤC QUẬN HUYỆN</h3>
    <hr>
    <v-card class="content-dashboard">
        <v-card-title>
        <div class="flex-grow-1">
            <span style="font-size: 16px !important; text-decoration: underline;">
                Danh sách hình thức thi công
            </span>
        </div>
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
        :items="listQH"
        :search="search"
        >
        <template v-slot:item.edit="{item}">
            <button @click="detailQH(item)"><v-icon>mdi-account-details</v-icon></button>
        </template>
        </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px">
    <v-card>
    <v-card-title>
        <span class="headline">Chi Tiết {{QH.loai}} {{QH.tenquanhuyen}}</span>
    </v-card-title>
    <v-card-text>
        <v-container>
        <v-row>
            <v-col cols="12" sm="6">
                <v-text-field 
                label="STT(Objectid)"
                :disabled="dialog_edit"
                v-model="QH.objectid">
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field 
                label="Mã Tỉnh"
                :disabled="dialog_edit"
                v-model="QH.matinh">
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field 
                label="Mã Quận Huyện"
                :disabled="dialog_edit"
                v-model="QH.maquanhuyen">
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field 
                label="Tên Quận Huyện"
                :disabled="dialog_edit"
                v-model="QH.tenquanhuyen">
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field 
                label="Loại QH/TX"
                :disabled="dialog_edit"
                v-model="QH.loai">
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field 
                label="Tên Không Dấu"
                :disabled="dialog_edit"
                v-model="QH.tenkhongdau">
                </v-text-field>
            </v-col>
        </v-row>
        </v-container>
    </v-card-text>
    <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="blue darken-1" text @click="openFormQH(dialog)">Cancel</v-btn>
        <v-btn color="blue darken-1" :disabled="dialog_edit" text @click="">Save</v-btn>
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
            {text: "Objectid", value: 'objectid'},
            {text: "Mã quận huyện", value: 'maquanhuyen'},
            {text: "Tên quận huyện", value: 'tenquanhuyen'},
            {text: "Mã tỉnh", value: 'matinh'},
            {text: "Loại quận huyện", value: 'loai'},
            {text: "Tên không dấu", value: 'tenkhongdau'},
            {text: 'Chi tiết', value: 'edit', sortable: false},
          ],
          listQH: [],
          search: '',
          dialog: false,
          QH: {},
          dialog_edit: false,
        }
    },
    methods: {
      apiDanhMucQH(){
        axios.get("http://113.161.225.252:8000/danh-muc-quan-huyen/", {
          headers: {
            Authorization: "Token "+this.$store.state.token_authorzation
          }
        })
        .then((response) =>{
          this.listQH = response.data
        })
      },
      openFormQH(){
        this.dialog = !this.dialog
      },
      detailQH(item){
        this.dialog = true
        this.QH = item
        this.dialog_edit = true
      }
    },
    created() {
        this.apiDanhMucQH()
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