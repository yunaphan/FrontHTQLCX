<template>
  <v-row >
    <v-dialog content-class="modalThemCX"  v-model="dialogSearch" persistent hide-overlay>
     <form >
      <v-card >
        <v-card-title class="themcaytitle">
          <span class="headline">Tra cứu thông tin cây xanh</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-select
                  :items="quanhuyenlist"
                  item-text="tenquanhuyen"
                  item-value="maquanhuyen"
                  v-model="maquanhuyen"
                  @change="FilterQH()"
                  label="Quận Huyện"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-select
                  :items="phuongxalist"
                  item-text="tenphuongxa"
                  item-value="maphuongxa"
                  v-model="maphuongxa"
                  label="Phường Xã"
                  @change="FilterPX()"
                ></v-select>
              </v-col>
              <!-- <v-col cols="12" sm="12" md="12">
                <v-select
                  :items="tuyenduonglist"
                  item-text="tenduong"
                  item-value="maduong"
                  v-model="maduong"
                  label="Tuyến Đường"
                  @change="FilterTD()"
                ></v-select>
              </v-col> -->
              <v-col cols="12" sm="12" md="12">
                <v-card>
                  <v-text-field 
                    v-model="search_key"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details>
                  </v-text-field>
                </v-card>
              </v-col>
              <v-col cols="12" sm="12">
                  <ul>
                      <li v-for="(search, index) in $store.state.BaseMap.searchs" :key="index">
                        {{search.attributes.SoHieu }} - {{search.attributes.MaTenCX}}  <v-btn icon @click="goTo(search)"> <v-icon>mdi-chevron-right</v-icon></v-btn>
                      </li>
                  </ul>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('showModalSearchFeatures',false)">Close</v-btn>
          <v-btn color="blue darken-1" type="submit" text>Tìm Kiếm</v-btn>
        </v-card-actions>
      </v-card>
      </form>
    </v-dialog>
  </v-row>
</template>
<script>
import axios from "axios"
import { queryFeatures } from '@esri/arcgis-rest-feature-layer';
import  {mapActions} from 'vuex'
export default {
    name: 'search-features',
    data(){
      return {
        tuyenduonglist: null,
        quanhuyenlist: null,
        phuongxalist: null,
        listxatmp: [],
        maquanhuyen: "",
        maphuongxa: "",
        maduong: "",
        search_key: ""
      }
    },
    props: ['dialogSearch'],
    methods: {
      ...mapActions(["commitdrawGraphics"]),
      showModalSearchFeatures(val){
        this.$emit('showModalSearchFeatures', val)
      },
      getApiQuanHuyen(){
        axios.get("http://113.161.225.252:8000/danh-muc-quan-huyen/", {
          headers:{
            Authorization: "Token 638635059406d15db24dfecb856f414042a465ce"
          }
        })
        .then((response) => {
          this.quanhuyenlist = response.data
          // console.log('QH',response.data)
        })
      },
      getApiPhuongXa(){
        axios.get("http://113.161.225.252:8000/danh-muc-phuong-xa/", {
          headers: {
            Authorization: "Token 638635059406d15db24dfecb856f414042a465ce"
          }
        })
        .then((response) =>{
          this.listxatmp = this.phuongxalist = response.data
          
        })
      },
      getApiTuyenduong(){
        axios.get("http://113.161.225.252:8000/danh-muc-tuyen-duong/", {
          headers:{
            Authorization: "Token 638635059406d15db24dfecb856f414042a465ce"
          }
        })
        .then((response) => {
          this.tuyenduonglist = response.data
          // console.log('TD',response.data)
        })
      },
      queryFeature(){
        queryFeatures({
          url: this.$store.state.BaseMap.url,                   
        })
        .then(result)
      },
      async FilterQH()
      {
        this.phuongxalist = this.listxatmp
        this.phuongxalist = await this.phuongxalist.filter((value,index,array) => {
          return array[index].maquanhuyen == this.maquanhuyen
        })
        // console.log('filter',phuongxalist)
        await queryFeatures({
          url: "https://tigis.vbgis.vn/arcgis/rest/services/NenTienGiang/QuanHuyen/MapServer/0",
          where: "MaQuanHuyen  = '"+this.maquanhuyen+"'"
        })
          .then((response) => {
            // console.log(response)
            this.commitdrawGraphics({
              rings: response.features[0].geometry.rings,
              zoom: 11
            })
          
          }).catch((err) =>  {
            console.log(err)
          })
        
      },
      FilterPX()
      {
        queryFeatures({
          url: " https://tigis.vbgis.vn/arcgis/rest/services/NenTienGiang/PhuongXa/MapServer/0",
          where: "MaPhuongXa   = '"+this.maphuongxa +"'"
        })
          .then((response) => {
            // console.log(response)
            this.commitdrawGraphics({
              rings: response.features[0].geometry.rings,
              zoom: 15
            })
          })
        
      },
      FilterTD()
      {
        this.$store.state.BaseMap.FeatureLayer.definitionExpression = "TuyenDuong  = '"+ this.maduong + "'"
      },
      goTo(search)
      {
        // console.log(search.geometry.longitude, search.geometry.latitude)
        // this.$store.state.BaseMap.view.goTo
        this.$store.state.BaseMap.view.goTo({
            x:  search.geometry.x,
            y:  search.geometry.y,
            spatialReference : {
                wkid: 102100
            },
            zoom: 15
        }) 
        console.log(search)
        this.$store.state.BaseMap.view.popup.open({
          location: search.geometry,
          features: search.attributes,
          updateLocationEnables: true,
          outFields: ["*"],
          title: "Cây xanh "+search.attributes.MaTenCX,
          content:"<table class='esri-widget__table'> " +
          "<tr><th>SoHieu  </th><td>" + search.attributes.SoHieu  + "</td></tr> " +
          "<tr><th>Tên Cây Xanh </th><td>" + search.attributes.MaTenCX  + "</td></tr> " +
          "<tr><th>DiaBan   </th><td>" + (search.attributes.DiaBan   != null ? search.attributes.DiaBan   : '(Rỗng)') + "</td></tr> " +
          "<tr><th>KinhDo </th><td>" + (search.attributes.KinhDo   != null ? search.attributes.KinhDo   : '(Rỗng)') + "</td></tr> " +
          "<tr><th>ViDo  </th><td>" + (search.attributes.ViDo    != null ? search.attributes.ViDo    : '(Rỗng)') + "</td></tr> " +
          "<tr><th>DuongKinh  </th><td>" + (search.attributes.DuongKinh     != null ? search.attributes.DuongKinh     : '(Rỗng)') + "</td></tr> " +
          "<tr><th>ChieuCao  </th><td>" + (search.attributes.ChieuCao  != null ? search.attributes.ChieuCao  : '(Rỗng)') + "</td></tr> " +
          "<tr><th>DoRongTan  </th><td>" + (search.attributes.DoRongTan   != null ? search.attributes.DoRongTan   : '(Rỗng)') + "</td></tr> " +
          "<tr><th>NgayTrong  </th><td>" + (search.attributes.NgayTrong  != null ? search.attributes.NgayTrong  : '(Rỗng)') + "</td></tr> " +
          "<tr><th>NgayCapNhat  </th><td>" + (search.attributes.NgayCapNhat  != null ? search.attributes.NgayCapNhat  : '(Rỗng)') + "</td></tr> " +
          "<tr><th>ThuocTinh  </th><td>" + (search.attributes.ThuocTinh  != null ? search.attributes.ThuocTinh  : '(Rỗng)') + "</td></tr> " +
          "<tr><th>GhiChu  </th><td>" + (search.attributes.GhiChu   != null ? search.attributes.GhiChu   : '(Rỗng)') + "</td></tr> " +
          "<tr><th>TinhTrang  </th><td>" + (search.attributes.TinhTrang    != null ? search.attributes.TinhTrang    : '(Rỗng)') + "</td></tr> " +
          "<tr><th>TuyenDuong  </th><td>" + (search.attributes.TuyenDuong     != null ? search.attributes.TuyenDuong     : '(Rỗng)') + "</td></tr> " +
          "<tr><th>NguoiCapNhat  </th><td>" + (search.attributes.NguoiCapNhat  != null ? search.attributes.NguoiCapNhat  : '(Rỗng)') + "</td></tr> " +
          "</table> ",
          actions: [
                  {
                      id: "updateInfor",
                      title: "Sửa Thông Tin Cây Xanh",
                      className: "esri-icon-edit"
                  },
                  {
                      id: "viewImage",
                      title: "Xem Hình Ảnh Của Cây",
                      className: "esri-icon-media",
                  },
                  {
                      id: "delTree",
                      title: "Xóa Cây",
                      className: "esri-icon-trash",
                  }
              ]
        })
        this.$store.state.BaseMap.view.popup.highlightEnabled = true
      }
    },
    created() {
      this.getApiTuyenduong()
      this.getApiQuanHuyen()
      this.getApiPhuongXa()
    },
 
}
</script>