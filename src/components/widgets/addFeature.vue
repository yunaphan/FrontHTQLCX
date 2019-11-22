<template>
  <v-row >
    <v-dialog content-class="modalThemCX"  v-model="dialog" persistent hide-overlay>
     <form v-on:submit.prevent="addFeature()" >
      <v-card >
        <v-card-title class="themcaytitle">
          <span class="headline">Thêm Cây Xanh</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12" style="padding:0;">
                <v-text-field 
                label="Số Hiệu*"
                v-model="getFeature.attributes.SoHieu" 
                required 
                hint="Nhập số hiệu cây: CT123"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" class="list_tcx">
                <v-select
                  :items="getDanhSachTenCX"
                  item-text="tencx"
                  item-value="matencx"
                  label="Tên Cây"
                  v-model="getFeature.attributes.MaTenCX"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="Kinh Độ" :value="getFeature.attributes.KinhDo"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="Vĩ Độ"  v-model="getFeature.attributes.ViDo"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Chiều cao*"
                  v-model="getFeature.attributes.ChieuCao"
                  hint="example of persistent helper text"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Đường Kính*"
                  v-model="getFeature.attributes.DuongKinh"
                  hint="example of persistent helper text"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Độ Rộng Tán*" 
                v-model="getFeature.attributes.DoRongTan"
                required></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                  :items="getDanhMucTinhTrangCX"
                  item-text="tinhtrang"
                  item-value="matinhtrang"
                  label="Tình Trạng"
                  v-model="getFeature.attributes.MaTinhTrang"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                  :items="getTuyenDuong"
                  item-text ="tenduong"
                  item-value= "maduong"
                  label="Tuyến Đường"
                  v-model="getFeature.attributes.TuyenDuong"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Thuộc tính" v-model="getFeature.attributes.ThuocTinh"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Ghi Chú" v-model="getFeature.attributes.GhiChu"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Người Cập Nhật" required v-model="getFeature.attributes.NguoiCapNhat"></v-text-field>
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
          <v-btn color="blue darken-1" text @click="showModalAddFeature(false)">Close</v-btn>
          <v-btn color="blue darken-1" type="submit" text>Thêm Cây</v-btn>
        </v-card-actions>
      </v-card>
      </form>
    </v-dialog>
  </v-row>
</template>
<script>
  import axios from 'axios'
  import { mapGetters, mapActions } from 'vuex'
  import { loadModules } from 'esri-loader'
  import { addFeatures } from '@esri/arcgis-rest-feature-layer';
  export default {
    name: "addFeature",
    data: () => {
      return {  

      }
    },
    computed: {
      ...mapGetters(['getTuyenDuong', 
      'getDanhSachTenCX', 
      'getView', 
      'getDanhMucTinhTrangCX',
      'getCurrentDay',
      'getFeatureLayer',
      'getpopuptemplate',
      'getFeature',
      ])
    },
    watch: {
      dialog(newVal){
        // console.log(newVal)
        if(newVal == true)
        {
           this.getView.on("click",async (event) => {
                    const point = {
                        type: point,
                        width:0.5,
                        longitude: event.mapPoint.longitude,
                        latitude: event.mapPoint.latitude
                    };
                    var markerSymbol = {
                        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                        color: [226, 119, 40],
                        outline: {
                          // autocasts as new SimpleLineSymbol()
                          color: [255, 255, 255],
                          width: 2
                        }
                    };  
                    
                    this.setPoint(event.mapPoint,markerSymbol)
                    this.getFeature.geometry = event.mapPoint
                    this.getFeature.attributes.ViDo = await event.mapPoint.latitude
                    this.getFeature.attributes.KinhDo = await event.mapPoint.longitude

                })
        }
        else{
          this.getView.graphics.removeAll()
        }
      }
    },
    props:["dialog"],
    methods: {
      ...mapActions([
        'commitApiTuyenDuong',
        'commitApiDanhSachTenCX', 
        'loadbasemap', 
        'commitApiDanhMucTinhTrangCX']),
      setPoint(geometry,symbol){
        loadModules(["esri/Graphic",])
        .then(([Graphic,]) => {
          var pointGraphic = new Graphic({
              geometry: geometry,
              symbol: symbol,
          });
          this.getView.graphics.removeAll()
          if(this.dialog == true)
          {
            this.getView.graphics.add(pointGraphic)
          }
          
        })
      },
      showModalAddFeature(value){
        this.$emit("showModalAddFeature", value )
      },
      apiTuyenDuong(){
        axios.get('http://113.161.225.252:8000/danh-muc-tuyen-duong/', {
          headers: {
            Authorization: "Token "+this.$store.state.token_authorzation
          }
        })
        .then((response) => {
           this.commitApiTuyenDuong(response.data)
        })
      },
      apiTenCayXanh(){
        axios.get("http://113.161.225.252:8000/ten-cay-xanh/", {
          headers: {
            Authorization: "Token "+this.$store.state.token_authorzation
          }
        })
        .then((response) =>{
          this.commitApiDanhSachTenCX(response.data)
        })
      },
      apiTinhTrangCayXanh(){
        axios.get("http://113.161.225.252:8000/trang-thai-cay-xanh/", {
          headers: {
            Authorization: "Token "+this.$store.state.token_authorzation
          }
        })
        .then((response) => {
          this.commitApiDanhMucTinhTrangCX(response.data)
        })
      },
      addFeature(){
        addFeatures({
          url: this.$store.state.BaseMap.url,
          features: [this.getFeature]
        }).then(() => {
            this.getView.graphics.removeAll()
            this.getFeatureLayer.refresh()
        })
      }
    },
    created () {
      this.apiTuyenDuong()
      this.apiTenCayXanh()
      this.apiTinhTrangCayXanh()
    },
    mounted() {
    },
  }
</script>
<style lang="css" scoped>
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
  .list_tcx{
    padding: 0 !important
  }
</style>