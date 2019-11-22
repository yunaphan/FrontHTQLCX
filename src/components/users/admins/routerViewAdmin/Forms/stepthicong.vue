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
                            <v-stepper-step :complete="e1 > 1" step="1">Cây cần thi công</v-stepper-step>
                            <v-divider></v-divider>

                            <v-stepper-step :complete="e1 > 2" step="2">Người thi công</v-stepper-step>
                            <v-divider></v-divider>

                            <v-stepper-step :complete="e1 > 3" step="3">Hình thức thi công</v-stepper-step>
                            <v-divider></v-divider>

                            <v-stepper-step step="4">Hoàn thành</v-stepper-step>
                        </v-stepper-header>
                        <v-stepper-items>
                            <v-stepper-content step="1">
                                <v-card class="mb-12" >
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-select
                                                :items="tuyenduong"
                                                v-model="selectTD"
                                                item-text="tenduong"
                                                item-value="maduong"
                                                label="Tuyến đường"
                                                @change="FilterTD()"
                                            ></v-select>
                                        </v-col>
                                       
                                        <v-col cols="12" sm="12">
                                            <v-data-table
                                            v-model="selectedcx"
                                            :headers="headerstablecx"
                                            :items="itemscx"
                                            item-key="sohieu"
                                            show-select
                                            :items-per-page="5"
                                        >
                                        </v-data-table>
                                        </v-col>
                                    </v-row>
                                </v-card>
                                <v-btn color="primary" @click="e1 = 2" class="ac-1"><v-icon>mdi-arrow-right</v-icon></v-btn>
                            </v-stepper-content>
                            <v-stepper-content step="2">
                                <v-card class="mb-12" color="lighten-1" height="250px">
                                    <v-data-table
                                        v-model="selecteduser"
                                        :headers="headerstableuser"
                                        :items="users"
                                        item-key="username"
                                        show-select
                                        :items-per-page="5"
                                    >
                                    </v-data-table>
                                </v-card>
                                <v-btn color="primary" @click="e1 = 1"><v-icon>mdi-arrow-left</v-icon></v-btn>
                                <v-btn color="primary" @click="e1 = 3" class="ac-1"><v-icon>mdi-arrow-right</v-icon></v-btn>
                            </v-stepper-content>
                            <v-stepper-content step="3">
                                <v-card class="mb-12" color="lighten-1" height="250px" style="padding:12px;">
                                    <v-select
                                        :items="danhmuchttc"
                                        item-text="tenloai"
                                        item-value="maloai"
                                        v-model="MaLoai"
                                        label="Hình thức thi công"
                                    ></v-select>
                                    <v-textarea
                                        label="Ghi chú"
                                        height="200px"
                                        v-model="ghichu"
                                    ></v-textarea>
                                </v-card>
                                <v-btn color="primary" @click="e1 = 2"><v-icon>mdi-arrow-left</v-icon></v-btn>
                                <v-btn color="primary" @click="e1 = 4" class="ac-1"><v-icon>mdi-arrow-right</v-icon></v-btn>
                            </v-stepper-content>
                            <v-stepper-content step="4">
                            {{selectedcx}} {{selecteduser}} {{MaLoai}} {{ghichu}}
                                <v-card class="mb-12"color="grey lighten-1" height="250px"></v-card>
                                <v-btn color="primary" @click="e1 = 3"><v-icon>mdi-arrow-left</v-icon></v-btn>
                            </v-stepper-content>
                        </v-stepper-items>
                </v-stepper>
                </v-col>
            </v-row>
        </v-container>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('closeDialog',false)">Close</v-btn>
        <v-btn color="blue darken-1" text >Save</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import  axios from 'axios'
export default {
    props:["dialog", "dateFormattedStart", "dateFormattedEnd"],
    data()
    {
        return {
            e1: 0,
            search: '',
            headerstablecx: [
                {text: 'Số hiệu', value: 'sohieu', align: 'center', sortable: false},
                {text: 'Mã tên cây xanh', value: 'matencx', align: 'center'},
                {text: "Ngày trồng", value: 'ngaytrong', align: 'center'},
                {text: 'Ngày cập nhật', value: 'ngaycapnhat'}
            ],
            itemscx: [],
            itemcx_tmp: [],
            danhmuchttc: [],
            MaLoai: "",
            selectedcx: [],
            users: [],
            headerstableuser: [
                {text: 'Họ', value: 'firstname', align: 'center', sortable: false},
                {text: 'Chữ lót', value: 'middlename', align: 'center'},
                {text: "Tên", value: 'lastname', align: 'center'},
                {text: "Tài Khoản", value: 'username', align: 'center'},
                {text: 'Số điện thoại', value: 'phone'},
                {text: 'Email', value: 'email', align: 'center'},
                {text: "Địa chỉ", value: 'diachi', align: 'center'},
            ],
            selecteduser: [],
            tuyenduong: [],
            selectTD: null

        }
    },
    methods: {
        getCX()
        {   
            axios.get("http://113.161.225.252:8000/cay-xanh/",
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
            axios.get("http://113.161.225.252:8000/hinh-thuc-thi-cong/",{
                headers: {
                    Authorization: "Token "+this.$store.state.token_authorzation
                }
            })
            .then((response) => {
                this.danhmuchttc = response.data
            })
        },
        getApiDanhSachNguoiThiCong(){
            axios.get("http://113.161.225.252:8000/user/",{
                headers: {
                    Authorization: "Token "+this.$store.state.token_authorzation
                }
            })
            .then((response) => {
                this.users = response.data
            })
        },
        getTuyenDuong()
        {
            axios.get("http://113.161.225.252:8000/danh-muc-tuyen-duong/",{
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
        }
    },
    created() {
        this.getCX()
        this.getApiHinhThucThiCong()
        this.getApiDanhSachNguoiThiCong()
        this.getTuyenDuong()
    },
}
</script>