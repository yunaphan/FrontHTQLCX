<template>
<div>
    <h3>DANH MỤC TUYẾN ĐƯỜNG</h3>
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
        :items="listStreet"
        :search="search"
        >
        <template v-slot:item.edit="{item}">
            <button @click="detailStreet(item)"><v-icon>mdi-account-details</v-icon></button>
        </template>
        </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px">
    <v-card>
    <v-card-title>
        <span class="headline">Chi Tiết Đường {{street.tenduong}}</span>
    </v-card-title>
    <v-card-text>
        <v-container>
        <v-row>
            <v-col cols="12" sm="1"></v-col>
            <v-col cols="12" sm="10">
                <v-text-field 
                label="STT(Objectid)"
                :disabled="dialog_edit"
                v-model="street.objectid">
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="1"></v-col>
            <v-col cols="12" sm="1"></v-col>
            <v-col cols="12" sm="10">
                <v-text-field 
                label="Mã Đường"
                :disabled="dialog_edit"
                v-model="street.maduong">
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="1"></v-col>
            <v-col cols="12" sm="1"></v-col>
            <v-col cols="12" sm="10">
                <v-text-field 
                label="Tên Đường"
                :disabled="dialog_edit"
                v-model="street.tenduong">
                </v-text-field>
            </v-col>
        </v-row>
        </v-container>
    </v-card-text>
    <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="blue darken-1" text @click="openFormStreet(dialog)">Cancel</v-btn>
        <v-btn color="blue darken-1" :disabled="dialog_edit" text>Save</v-btn>
    </v-card-actions>
    </v-card>
    </v-dialog>
</div>
</template>
<script>
import axios from 'axios'
export default {
    name: "danh-muc-duong",
    data() {
        return {
          headers: [
            {text: "Objectid", value: 'objectid'},
            {text: "Mã đường", value: 'maduong'},
            {text: "Tên đường", value: 'tenduong'},
            {text: 'Chi tiết', value: 'edit', sortable: false},
          ],
          listStreet: [],
          search: '',
          dialog: false,
          street: {},
          dialog_edit: false,
        }
    },
    methods: {
      apiDanhMucStreet(){
        axios.get("http://113.161.225.252:8000/danh-muc-tuyen-duong/", {
          headers: {
            Authorization: "Token "+this.$store.state.token_authorzation
          }
        })
        .then((response) =>{
          this.listStreet = response.data
        })
      },
      openFormStreet(){
        this.dialog = !this.dialog
      },
      detailStreet(item){
        this.dialog = true
        this.street = item
        this.dialog_edit = true
      }
    },
    created() {
        this.apiDanhMucStreet()
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