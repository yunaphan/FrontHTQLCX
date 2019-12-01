<template>
  <v-row >
    <v-dialog content-class="modalThemCX"  v-model="getStateDialogUpdate" persistent hide-overlay>
     <form v-on:submit.prevent="updateFeature()" >
      <v-card >
        <v-card-title class="themcaytitle">
          <span class="headline">Thông tin cây thứ {{getSelectedFeature.attributes.OBJECTID}} Số Hiệu:  {{getSelectedFeature.attributes.SoHieu}}</span> 
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field 
                label="Số Hiệu*" 
                required 
                hint="Nhập số hiệu cây: CT123"
                v-model="getSelectedFeature.attributes.SoHieu"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                  :items="getDanhSachTenCX"
                  item-text="tencx"
                  item-value="matencx"
                  label="Mã Tên"
                  v-model="getSelectedFeature.attributes.MaTenCX"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                  :items="getDanhMucTinhTrangCX"
                  item-text="tinhtrang"
                  item-value="matinhtrang"
                  label="Mã Tình Trạng"
                  :value="getSelectedFeature.attributes.MaTinhTrang"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="Kinh Độ" v-model="getSelectedFeature.attributes.KinhDo" disabled ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="Vĩ Độ" v-model="getSelectedFeature.attributes.ViDo" disabled ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Chiều cao*"
                  hint="Đơn vị(m)"
                  v-model="getSelectedFeature.attributes.ChieuCao"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Đường Kính*"
                  hint="Đơn vị(m)"
                  required
                  v-model="getSelectedFeature.attributes.DuongKinh"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field 
                  label="Độ Rộng Tán*" 
                  required
                  hint="Đơn vị(m)"
                  v-model="getSelectedFeature.attributes.DoRongTan"
                  ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12">
                <v-select
                  :items="getTuyenDuong"
                  item-text ="tenduong"
                  item-value= "maduong"
                  label="Tuyến Đường"
                  v-model="getSelectedFeature.attributes.TuyenDuong"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Thuộc tính" v-model="getSelectedFeature.attributes.ThuocTinh"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Ghi Chú" v-model="getSelectedFeature.attributes.GhiChu"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Người Cập Nhật*" required v-model="getSelectedFeature.attributes.NguoiCapNhat"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Ngày Trồng" v-model="getCurrentDay" disabled></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$store.state.BaseMap.dialog_update = false">Close</v-btn>
          <v-btn color="blue darken-1" type="submit" text>Lưu</v-btn>
        </v-card-actions>
      </v-card>
      </form>
    </v-dialog>
  </v-row>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: "updateFeature",
    data: () => ({
      
    }),
    computed: {
      ...mapGetters(['getTuyenDuong', 
        'getDanhSachTenCX', 
        'getView', 
        'getDanhMucTinhTrangCX',
        'getCurrentDay',
        'getFeatureLayer',
        'getpopuptemplate',
        'getStateDialogUpdate',
        'getSelectedFeature'
      ])
    },
    methods: {
      ...mapActions(['commitfeatureUpdate']),
      updateFeature()
      {
        // console.log('SELECTED',this.getSelectedFeature)
        this.commitfeatureUpdate(this.getSelectedFeature)
      }

    },
  }
</script>
<style lang="css">
  .modalThemCX{
    max-width: 350px !important;
    position: absolute;
    top: 0;
    right: 0;
    min-height: -webkit-fill-available;
    margin: 0;
  }
  .themcaytitle{
    background-color: #0277BD;
    color: #fff;
  }
</style>