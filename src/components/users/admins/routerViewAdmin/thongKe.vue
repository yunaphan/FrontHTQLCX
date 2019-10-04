<template>
    <div>
        <div style=" width: 100%;">
            <v-row with="100%">
                <v-col cols="12" md="12" sm="12"><p style="text-decoration: underline;">thống kê</p></v-col>
            </v-row>
        </div>
        <div style=" width: 100%;">
            <v-row with="100%">
                <v-col cols="12" md="1" sm="1">
                </v-col>
                <v-col cols="12" md="2" sm="2">
                    <v-select
                        :items="listStreet"
                        item-text="tenduong"
                        item-value="maduong"
                        label="Tuyến Đường"
                        v-model="TuyenDuong"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="2" sm="2">
                    <v-select
                        :items="listTreeStatus"
                        item-text="tinhtrang"
                        item-value="matinhtrang"
                        label="Tình Trạng"
                        v-model="MaTinhTrang"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="2" sm="2">
                    <v-select
                        :items="listTreeName"
                        item-text="tencx"
                        item-value="matencx"
                        label="Tên Cây Xanh"
                        v-model="MaTenCX"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="5" sm="5">
                    <v-btn color="success" style="margin-top: 12px;" @click="thongkeketxuat()">Hiển thị</v-btn>
                    <v-btn color="success" style="margin: 12px 0 0 12px;" @click="resetthongke()"> Khôi phục</v-btn>
                    <v-btn color="success" style="margin: 12px 0 0 12px;" @click="xuatthongke()">
                        <download-excel
                            :data   = "result_list"
                            :fields = "json_fields"
                            :fetch = "xuatthongke"
                            worksheet = "cây xanh"
                            name = "Thống kê cây xanh"
                            footer ="Người thống kê: Phan Thị Thủy Tiên"
                        >
                        In Báo Cáo
                        </download-excel>
                    </v-btn>
                </v-col>
            </v-row>
        </div>
        <p style="text-decoration: underline;">danh sách cây theo tiêu chí thống kê</p>
        <div>
            <v-data-table
                :headers="headers"
                :items="result_list"
            >
            </v-data-table>
        </div>
        <div>
            
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import JsonExcel from 'vue-json-excel' 
export default {
    name: "thong-ke",
    data(){
        return{
            headers: [
                {text: 'Objetctid', value: 'objectid'},
                {text: 'Số Hiệu', value: 'sohieu'},
                {text: 'Tên Cây Xanh', value: 'matencx'},
                {text: 'Đường Kính', value: 'duongkinh'},
                {text: 'Chiều Cao', value: 'chieucao'},
                {text: 'Độ Rộng Tán', value: 'dorongtan'},
                {text: 'Ngày Trồng', value: 'ngaytrong'},
                {text: 'Ngày Cập Nhật', value: 'ngaycapnhat'},
                {text: 'Thuộc Tính', value: 'thuoctinh'},
                {text: 'Ghi Chú', value: 'ghichu'},
                {text: 'Tình Trạng', value: 'matinhtrang'},
                {text: 'Tuyến Đường', value: 'tuyenduong'},
                {text: 'Người Cập Nhật', value: 'nguoicapnhat'}
            ],
            listStreet: [],
            TuyenDuong: null,
            listTreeStatus: [],
            MaTinhTrang: null,
            listTreeName: [],
            MaTenCX: null,
            listCX: [],
            result_list: [],
            json_fields: {
                "STT" : 'objectid',
                "Số hiệu": 'sohieu',
                "Tên cây xanh": 'matencx',
                "Đường kính": 'duobgkinh',
                "Chiều cao": 'chieucao',
                "Độ rộng tán": 'dorongtan',
                "Ngày trồng": 'ngaytrong',
                "Ngày cập nhật": 'ngaycapnhat',
                "Thuộc tính": 'thuoctinh',
                "Ghi chú": 'ghichu',
                "Tình Trạng": {
                    field: 'matinhtrang',
                    callback: (value) => {
                        console.log("value", value)
                    }
                    },
                "Tuyến đường": 'tuyenduong',
                "Người Cập Nhật": 'nguoicapnhat'
            }

        }
    },
    components: {
        "downloadExcel" : JsonExcel ,
    },
    methods: {
        apiDanhMucStreet(){
            axios.get("http://113.161.225.252:8000/danh-muc-tuyen-duong/", {
            headers: {
                Authorization: "Token 638635059406d15db24dfecb856f414042a465ce"
            }
            })
            .then((response) =>{
            this.listStreet = response.data
            })
        },
        apiDanhSachTinhTrangCX(){
            axios.get("http://113.161.225.252:8000/trang-thai-cay-xanh/", {
            headers: {
                Authorization: "Token 638635059406d15db24dfecb856f414042a465ce"
            }
            })
            .then((response) =>{
                this.listTreeStatus = response.data
            })
        },
        apiDanhSachTenCX(){
            axios.get("http://113.161.225.252:8000/ten-cay-xanh/", {
            headers: {
                Authorization: "Token 638635059406d15db24dfecb856f414042a465ce"
            }
            })
            .then((response) =>{
                this.listTreeName = response.data
            })
        },
        thongkeketxuat(){
            axios.get("http://113.161.225.252:8000/cay-xanh/", {
            headers: {
                Authorization: "Token 638635059406d15db24dfecb856f414042a465ce"
            }
            })
            .then((response) =>{
                this.listCX = response.data
                if((this.MaTenCX == "" || this.MaTenCX == null) 
                    && (this.MaTinhTrang == "" || this.MaTinhTrang == null)
                    && (this.TuyenDuong == "" || this.TuyenDuong == null))
                {
                    this.result_list = this.listCX
                }
                else if((this.MaTenCX != "" || this.MaTenCX != null) 
                    && (this.MaTinhTrang == "" || this.MaTinhTrang == null)
                    && (this.TuyenDuong == "" || this.TuyenDuong == null)){
                       this.result_list = this.listCX.filter((value, index, array)=>{
                            return array[index].matencx == this.MaTenCX 
                        })
                }
                else if((this.MaTenCX == "" || this.MaTenCX == null) 
                    && (this.MaTinhTrang != "" || this.MaTinhTrang != null)
                    && (this.TuyenDuong == "" || this.TuyenDuong == null)){
                        this.result_list = this.listCX.filter((value, index, array)=>{
                            return array[index].matinhtrang == this.MaTinhTrang 
                        })
                }
                else if((this.MaTenCX == "" || this.MaTenCX == null) 
                    && (this.MaTinhTrang == "" || this.MaTinhTrang == null)
                    && (this.TuyenDuong != "" || this.TuyenDuong != null)){
                        this.result_list = this.listCX.filter((value, index, array)=>{
                            return array[index].tuyenduong == this.TuyenDuong 
                        })
                }
                else if((this.MaTenCX != "" || this.MaTenCX != null) 
                    && (this.MaTinhTrang != "" || this.MaTinhTrang != null)
                    && (this.TuyenDuong == "" || this.TuyenDuong == null)){
                        this.result_list = this.listCX.filter((value, index, array)=>{
                            return array[index].matencx == this.MaTenCX && array[index].matinhtrang == this.MaTinhTrang
                        })
                }
                else if((this.MaTenCX == "" || this.MaTenCX == null) 
                    && (this.MaTinhTrang != "" || this.MaTinhTrang != null)
                    && (this.TuyenDuong != "" || this.TuyenDuong != null)){
                        this.result_list = this.listCX.filter((value, index, array)=>{
                            return array[index].matinhtrang == this.MaTinhTrang && array[index].tuyenduong == this.TuyenDuong
                        })
                }
                else if((this.MaTenCX != "" || this.MaTenCX != null) 
                    && (this.MaTinhTrang == "" || this.MaTinhTrang == null)
                    && (this.TuyenDuong != "" || this.TuyenDuong != null)){
                        this.result_list = this.listCX.filter((value, index, array)=>{
                            return array[index].matencx == this.MaTenCX && array[index].tuyenduong == this.TuyenDuong
                        })
                }
                else if((this.MaTenCX != "" || this.MaTenCX != null) 
                    && (this.MaTinhTrang != "" || this.MaTinhTrang != null)
                    && (this.TuyenDuong != "" || this.TuyenDuong != null)){
                    this.result_list = this.listCX.filter((value, index, array)=>{
                        return array[index].matencx == this.MaTenCX && array[index].matinhtrang == this.MaTinhTrang
                            && array[index].tuyenduong == this.TuyenDuong
                        })
                    console.log(this.result_list)
                }
            })
        },
        resetthongke(){
            this.TuyenDuong = null
            this.MaTinhTrang = null
            this.MaTenCX = null
            this.result_list = []
        },
        async xuatthongke(){
            if(this.result_list == []){
                console.log("abc")
            }
            else
            {
                return this.result_list
            }
        }

    },
    created() {
        this.apiDanhMucStreet()
        this.apiDanhSachTinhTrangCX()
        this.apiDanhSachTenCX()
    },    
}
</script>