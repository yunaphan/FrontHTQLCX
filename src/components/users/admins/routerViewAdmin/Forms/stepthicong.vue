<template>
<v-dialog id="lich-thi-cong" v-model="dialog" persistent max-width="1000">
    <v-card class="them-lich-thi-cong">
        <v-card-title>
        <span>Lịch thi công {{dateFormattedStart}} - {{dateFormattedEnd}}</span>
        </v-card-title>
        <v-card-text>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" md="12">
                    <v-stepper v-model="e1" id="buoc-thi-cong">
                        <v-stepper-header>
                            <v-stepper-step :complete="e1 > 1" step="1">Hình thức và nhóm thi công</v-stepper-step>
                            <v-divider></v-divider>

                            <v-stepper-step :complete="e1 > 2" step="2">Tuyến đường thi công</v-stepper-step>
                            <v-divider></v-divider>

                            <v-stepper-step :complete="e1 > 3" step="3">Hình thức thi công</v-stepper-step>
                            <v-divider></v-divider>
                        </v-stepper-header>
                        <v-stepper-items>
                            <v-stepper-content step="1">
                                <v-card class="mb-12" >
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <!--<v-select
                                                :items="tuyenduong"
                                                v-model="selectTD"
                                                item-text="tenduong"
                                                item-value="maduong"
                                                label="Tuyến đường"
                                                @change="FilterTD()"
                                            ></v-select>-->
                                            <v-select
                                                :items="danhmuchttc"
                                                item-text="tenloai"
                                                item-value="maloai"
                                                v-model="MaLoai"
                                                label="Hình thức thi công"
                                            ></v-select>
                                        </v-col>
                                       
                                        <v-col cols="12" sm="12">
                                            <v-data-table
                                                v-model="selecteduser"
                                                :headers="headerstableuser"
                                                :items="nhomthicong"
                                                item-key="manhomthicong"
                                                item-value="manhomthicong"
                                                show-select
                                                :single-select="true"
                                                :items-per-page="5"
                                            >
                                            </v-data-table>
                                           
                                        </v-col>
                                    </v-row>
                                </v-card>
                                <v-card-actions>
                                    <v-btn color="primary" @click="e1 = 2" class="ac-1"><v-icon>mdi-arrow-right</v-icon></v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="$emit('closeDialog',false)">Close</v-btn>
                                </v-card-actions>
                            </v-stepper-content>
                            <v-stepper-content step="2">
                                <v-card class="mb-12">
                                    <v-row>
                                        <v-col cols="12" sm="12">
                                                <v-data-table
                                                v-model="selectTD"
                                                :headers="headerstableduong"
                                                :items="tuyenduong"
                                                item-key="maduong"
                                                item-value="maduong"
                                                show-select
                                                :items-per-page="5"
                                                >
                                            </v-data-table>
                                        </v-col>
                                    </v-row>
                                </v-card>
                                <v-card-actions>
                                    <v-btn color="primary" @click="e1 = 1" class="ac-1"><v-icon>mdi-arrow-left</v-icon></v-btn>
                                    <v-btn color="primary" @click="e1 = 3" class="ac-1"><v-icon>mdi-arrow-right</v-icon></v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="$emit('closeDialog',false)">Close</v-btn>
                                </v-card-actions>
                                
                            </v-stepper-content>
                            <v-stepper-content step="3">
                                <v-card class="mb-12">
                                    <v-row>
                                        <v-col cols="12" md="6" sm="6">
                                        <v-text-field
                                        v-model="ten_lic_thi_cong"
                                        label="Tên lịch:"
                                        ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6" sm="6">
                                            <v-select
                                                :items="trangthaitc"
                                                item-text="trangthaitc"
                                                item-value="matrangthaitc"
                                                v-model="matrangthaitc"
                                                label="Trạng thái thi công"
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-textarea
                                        label="Ghi chú"
                                        height="200px"
                                        v-model="ghichu"
                                    ></v-textarea>
                                </v-card>
                                <v-card-actions>
                                    <v-btn color="primary" @click="e1 = 2" class="ac-1"><v-icon>mdi-arrow-left</v-icon></v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="$emit('closeDialog',false)">Close</v-btn>
                                    <v-btn color="blue darken-1" text @click="api_lich_thi_cong()">Save</v-btn>

                                </v-card-actions>
                            </v-stepper-content>
                        </v-stepper-items>
                </v-stepper>
                </v-col>
            </v-row>
        </v-container>
        </v-card-text>
    </v-card>
</v-dialog>
</template>

<script>
import  axios from 'axios'
import moment from 'moment'
export default {
    props:["dialog", "dateFormattedStart", "dateFormattedEnd"],
    data()
    {
        return {
            single: false,
            e1: 0,
            search: '',
            headerstableduong: [
                {text: 'Mã đường', value: 'maduong', align: 'center'},
                {text: 'Tên đường', value: 'tenduong'}
            ],
            itemscx: [],
            itemcx_tmp: [],
            danhmuchttc: [],
            MaLoai: "",
            selectedcx: [],
            nhomthicong: [],
            headerstableuser: [
                {text: 'Mã nhóm thi công', value: 'manhomthicong', align: 'center', sortable: false},
                {text: 'Tên nhóm thi công', value: 'tennhomthicong', align: 'center'},
            ],
            selecteduser: null,
            tuyenduong: [],
            selectTD: null,
            trangthaitc: [],
            matrangthai: "",
            ghichu: "",
            matrangthaitc: null,
            ten_lic_thi_cong: ""
        }
    },
    methods: {
        getCX()
        {   
            axios.get(this.$store.state.api_url + "cay-xanh/",
            {
                 headers: {
                    Authorization: "Token "+this.$store.state.token_authorzation
                }
            }).then((response) => {
                this.itemscx = response.data
                this.itemcx_tmp = response.data
            })
        },
        getApiHinhThucThiCong(){
            axios.get(this.$store.state.api_url + "hinh-thuc-thi-cong/",{
                headers: {
                    Authorization: "Token "+this.$store.state.token_authorzation
                }
            })
            .then((response) => {
                this.danhmuchttc = response.data
            })
        },
        getApiDanhSachNguoiThiCong(){
            axios.get(this.$store.state.api_url + "nhom-thi-cong/",{
                headers: {
                    Authorization: "Token "+this.$store.state.token_authorzation
                }
            })
            .then((response) => {
                this.nhomthicong = response.data
                // console.log("ntc2", this.users)
                // console.log("ntc",response.data)
            })
        },
        getTuyenDuong()
        {
            axios.get(this.$store.state.api_url + "danh-muc-tuyen-duong/",{
                 headers: {
                    Authorization: "Token "+this.$store.state.token_authorzation
                }
            }).then((response) => {
                this.tuyenduong  = response.data
            })
        },
        FilterTD()
        {
            this.itemscx = this.itemcx_tmp.filter((value,index,array) => {
                return array[index].tuyenduong == this.selectTD
            })
        },
        getTrangThaiTC(){
            axios.get(this.$store.state.api_url + "danh-muc-trang-thai-thi-cong/",{
                headers: {
                    Authorization: "Token "+this.$store.state.token_authorzation
                }
            }).then((response)=>{
                this.trangthaitc = response.data
            })
        },
        api_lich_thi_cong()
        {
            this.selectTD.forEach((td) => {
                axios.post(this.$store.state.api_url + "chi-tiet-lich-thi-cong/",{
                    hinhthucthicong: this.MaLoai,
                    nhomthiconglich : this.selecteduser[0].manhomthicong,
                    tuyenduong : td.maduong,
                    lichthicong : this.ten_lic_thi_cong,
                    trangthaitc : this.matrangthaitc,
                    mota: this.ghichu,
                    NgayBD:  this.dateFormattedStart,
                    NgayHoanThanh: this.dateFormattedEnd
                },{
                    headers: {
                        Authorization: "Token "+this.$store.state.token_authorzation
                    }
                }).then((response) => {
                
                    console.log(response.data)
                })
            })
            alert('Tạo lịch thi công thành công!')
            this.$emit('closeDialog',false)
        }
    },
    created() {
        this.getCX()
        this.getApiHinhThucThiCong()
        this.getApiDanhSachNguoiThiCong()
        this.getTuyenDuong()
        this.getTrangThaiTC()
    },
}
</script>
<style>
#buoc-thi-cong button{
    margin-top:30px !important;
}
</style>