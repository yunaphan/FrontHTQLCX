<template>
  <v-row >
    <v-dialog content-class="modalThemCX"  v-model="dialogSearch" persistent hide-overlay>
     <form class="content-form">
      <v-card style="height: 100%">
        <v-card-title class="themcaytitle">
          <span class="headline" style="font-size:16px;">Tra cứu thông tin cây xanh</span>
        </v-card-title>
        <v-card-text class="card-text">
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
                  :disabled = "disabled"
                  v-model="maphuongxa"
                  label="Phường Xã"
                  @change="FilterPX()"
                ></v-select>
              </v-col>

              <v-col cols="12" sm="12" md="12">
                <v-text-field 
                  v-model="search_key"
                  label="Tìm theo tuyến đường"
                  append-icon="mdi-magnify"
                  single-line
                  @click:append="search_TD()"
                  hide-details
                  :disabled = "disabled_search">
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <select class="select-tag" @change="FilterTenCX()" v-model="matencx">
                  <option value="null">Tên cây</option>
                  <option v-for="(tencx,index) in tencxlist" :key="index" :value="tencx.matencx"> 
                    {{tencx.tencx}}
                  </option>
                </select>
              </v-col>

              <v-col cols="12" sm="12">
                  <p v-if="data_search"><strong>Tổng số cây: </strong> {{data_search.length}} </p>
                  <ol>
                      <li v-for="(search, index) in data_search" :key="index">
                        {{search.attributes.SoHieu }} - {{search.attributes.MaTenCX}} <v-btn icon @click="goTo(search)"><v-icon>mdi-chevron-right</v-icon></v-btn>
                        <p style="margin-bottom: 0;"><small style="font-size:10px;">{{search.attributes.TuyenDuong}}</small></p>
                      <hr/>
                      </li>
                      
                  </ol>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="card-action" background-color="#333">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('showModalSearchFeatures',false)">Close</v-btn>
          <!--<v-btn color="blue darken-1" @click="dialog2 = true" text>Xuất file</v-btn>-->
        </v-card-actions>
      </v-card>
      </form>
    </v-dialog>
    <v-dialog v-model="dialog2" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card></v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import axios from "axios"
import { queryFeatures } from '@esri/arcgis-rest-feature-layer';
import  {mapActions, mapGetters} from 'vuex'
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
        search_key: "",
        data_search: this.getSearch,
        data_search_tmp: this.getSearch,
        disabled: true,
        disabled_search: true,
        dialog2: false,
        tencxlist:null,
        matencx: "null"
      }
    },
    computed: {
      ...mapGetters(["getSearch"])
    },
    watch: {
      getSearch(newVal)
      {
        this.data_search = newVal
        this.data_search_tmp = newVal
        // console.log("Bình Thúi",this.data_search.length)
        if (this.data_search.length > 0){
          this.disabled_search = false
        }
      },
      
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
            Authorization: "Token "+this.$store.state.token_authorzation
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
            Authorization: "Token "+this.$store.state.token_authorzation
          }
        })
        .then((response) =>{
          this.listxatmp = this.phuongxalist = response.data
          
        })
      },
      getApiTuyenduong(){
        axios.get("http://113.161.225.252:8000/danh-muc-tuyen-duong/", {
          headers:{
            Authorization: "Token "+this.$store.state.token_authorzation
          }
        })
        .then((response) => {
          this.tuyenduonglist = response.data
          // console.log('TD',response.data)
        })
      },
      getApiTenCX(){
        axios.get("http://113.161.225.252:8000/ten-cay-xanh/",{
          headers:{
            Authorization: "Token "+this.$store.state.token_authorzation
          }
        }).then((response)=> {
          this.tencxlist = response.data
        })
      },
      async FilterQH()
      {
        this.disabled = false
        this.phuongxalist = this.listxatmp
        this.phuongxalist = await this.phuongxalist.filter((value,index,array) => {
          return array[index].maquanhuyen == this.maquanhuyen
        })
        await queryFeatures({
          url: "https://tigis.vbgis.vn/arcgis/rest/services/NenTienGiang/QuanHuyen/MapServer/0",
          where: "MaQuanHuyen  = '"+this.maquanhuyen+"'"
        })
          .then((response) => {
            this.commitdrawGraphics({
              rings: response.features[0].geometry.rings,
              zoom: 11
            })
          
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
      FilterTenCX(){
        // console.log(()
        console.log(this.data_search_tmp, this.data_search)
        if(this.matencx == 'null')
        {
          this.data_search = this.data_search_tmp
        }
        else
        {
          this.data_search = this.data_search_tmp.filter((value, index, array)=>{
          return array[index].attributes.MaTenCX == this.matencx
        })
        }
        
      },
      search_TD()
      { 
        if(this.search_key == ""){
          this.data_search = this.getSearch
        }
        else{
          this.data_search = this.getSearch.filter((value, index, array) =>{
            return array[index].attributes.TuyenDuong == this.search_key
          })
        }
      },
      xuatFile(){
        console.log('xuat',this.data_search) 

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
      },
      openCloseDisable(){
        
      }
    },
    created() {
      this.getApiTuyenduong()
      this.getApiQuanHuyen()
      this.getApiPhuongXa()
      this.getApiTenCX()
    },
}
</script>
<style scoped>
.v-dialog.modalThemCX{overflow-y: hidden !important;}
.v-dialog{overflow-y: hidden !important;}
.card-action{position: fixed; bottom: 0; right: 0; background-color: #fff; width: 350px;}
.content-form{position:absolute; width:100%;height:100%;}
.col-sm-12.col-md-12.col-12 {padding: 0;}
.card-text{height: calc(100% - 36px); }
.v-dialog.modalThemCX.v-dialog--active.v-dialog--persistent{overflow-y: hidden !important;}
.theme--light.v-card .v-card__text{overflow-y: scroll;}
.theme--light.v-card .v-card__text::-webkit-scrollbar {width: 5px;}
.theme--light.v-card .v-card__text::-webkit-scrollbar-track {background: #f1f1f1;}
.theme--light.v-card .v-card__text::-webkit-scrollbar-thumb {background: #6a6a6a;}
.theme--light.v-card .v-card__text::-webkit-scrollbar-thumb:hover {background: rgb(38, 137, 214);}
.select-tag{
  border-bottom: 1px solid;
  padding: 2px 5px;
  width: 100%;
  }
.select-tag:focus{
  outline: none;
}
</style>