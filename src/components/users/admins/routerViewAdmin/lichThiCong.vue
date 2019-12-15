<template>
    <div>
        <div class="tabs-thi-cong">
            <v-tabs class="tab-content" background-color="transparent" v-model="tabs">
                <v-tab>Lịch thi công</v-tab>
                <v-tab>Lịch thi công khẩn</v-tab>
                <v-tab>Lịch chờ thi công </v-tab>
                <v-tab>Lịch đang thi công </v-tab>
                <v-tab>Lịch thi công hoàn thành </v-tab>
                <v-tab-item>
                    <div width="100%">
                        <v-row width="100%">
                            <v-col cols="12" md="3" sm="3">
                                <v-menu
                                    ref="menu1"
                                    v-model="menu1"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                        v-model="dateFormattedStart"
                                        label="Ngày bắt đầu"
                                        hint="YYYY-MM-DD format"
                                        persistent-hint
                                        prepend-icon="mdi-calendar-range"
                                        @blur="dateStart = parseDate(dateFormattedStart)"
                                        required
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="dateStart" no-title @input="menu1 = false"></v-date-picker>
                                </v-menu> 
                            </v-col>
                            <v-col cols="12" md="3" sm="3">
                                <v-menu
                                    ref="menu2"
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                        v-model="dateFormattedEnd"
                                        label="Ngày kết thúc"
                                        prepend-icon="mdi-minus"
                                        @blur="dateEnd = parseDate(dateFormattedEnd)"
                                        required
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="dateEnd" no-title @input="menu2 = false"></v-date-picker>
                                </v-menu> 
                            </v-col>
                            <v-col cols="12" md="3" ms="3">
                                <v-btn color="success" @click="dialog=true">Thêm lịch thi công</v-btn>
                            </v-col>
                        </v-row>
                    </div>
                    <div>
                        <v-row>
                            <v-col cols="12" >
                                <v-card-title>
                                <v-spacer></v-spacer>
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-search"
                                    label="Search"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                </v-card-title>
                                <v-data-table
                                    :headers="headers_lich_thi_cong"
                                    :items="list_thi_cong"
                                    :search = "search"
                                    group-by="lichthicong"
                                    class="elevation-1"
                                    item-key="nhomthiconglich"
                                    show-group-by
                                >   
                                    <template v-slot:item.tuyenduong='{item}'>
                                            {{filterTD(item.tuyenduong)}}
                                    </template>
                                    <template v-slot:item.hinhthucthicong='{item}'>
                                            {{filterHTTC(item.hinhthucthicong)}}
                                    </template>
                                    <template v-slot:item.trangthaitc='{item}'>
                                            {{filterTTTC(item.trangthaitc)}}
                                    </template>
                                    <template v-slot:item.nhomthiconglich='{item}'>
                                            {{filterNTC(item.nhomthiconglich)}}
                                    </template>
                                    <template v-slot:item.ACTION="{item}">
                                       <button @click="openUpadteThiCong(item.macttc)">Sửa</button>
                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-row>
                    </div>
                    <div>
                       <step-thi-cong :dialog="dialog" :dateFormattedStart="dateFormattedStart" :dateFormattedEnd="dateFormattedEnd" @closeDialog="dialog = $event"/> 
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <div>
                        <v-row>
                            <v-col cols="12" >
                                <v-card-title>
                                <v-spacer></v-spacer>
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-search"
                                    label="Search"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                </v-card-title>
                                <v-data-table
                                    :headers="headers_lich_thi_cong"
                                    :items="list_thi_cong_khan"
                                    :search = "search"
                                >
                                    <template v-slot:item.tuyenduong='{item}'>
                                            {{filterTD(item.tuyenduong)}}
                                    </template>
                                    <template v-slot:item.hinhthucthicong='{item}'>
                                            {{filterHTTC(item.hinhthucthicong)}}
                                    </template>
                                    <template v-slot:item.trangthaitc='{item}'>
                                            {{filterTTTC(item.trangthaitc)}}
                                    </template>
                                    <template v-slot:item.nhomthiconglich='{item}'>
                                            {{filterNTC(item.nhomthiconglich)}}
                                    </template>
                                    <template v-slot:item.ACTION="{item}">
                                       <button @click="openUpadteThiCong(item.macttc)">Sửa</button>
                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-row>
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <div>
                        <v-row>
                            <v-col cols="12" >
                                <v-card-title>
                                <v-spacer></v-spacer>
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-search"
                                    label="Search"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                </v-card-title>
                                <v-data-table
                                    :headers="headers_lich_thi_cong"
                                    :items="list_thi_cong_cho"
                                    :search = "search"
                                >
                                    <template v-slot:item.tuyenduong='{item}'>
                                            {{filterTD(item.tuyenduong)}}
                                    </template>
                                    <template v-slot:item.hinhthucthicong='{item}'>
                                            {{filterHTTC(item.hinhthucthicong)}}
                                    </template>
                                    <template v-slot:item.trangthaitc='{item}'>
                                            {{filterTTTC(item.trangthaitc)}}
                                    </template>
                                    <template v-slot:item.nhomthiconglich='{item}'>
                                            {{filterNTC(item.nhomthiconglich)}}
                                    </template>
                                    <template v-slot:item.ACTION="{item}">
                                       <button @click="openUpadteThiCong(item.macttc)">Sửa</button>
                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-row>
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <div>
                        <v-row>
                            <v-col cols="12" >
                                <v-card-title>
                                <v-spacer></v-spacer>
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-search"
                                    label="Search"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                </v-card-title>
                                <v-data-table
                                    :headers="headers_lich_thi_cong"
                                    :items="list_thi_cong_dang_thuc_hien"
                                    :search = "search"
                                >
                                    <template v-slot:item.tuyenduong='{item}'>
                                            {{filterTD(item.tuyenduong)}}
                                    </template>
                                    <template v-slot:item.hinhthucthicong='{item}'>
                                            {{filterHTTC(item.hinhthucthicong)}}
                                    </template>
                                    <template v-slot:item.trangthaitc='{item}'>
                                            {{filterTTTC(item.trangthaitc)}}
                                    </template>
                                    <template v-slot:item.nhomthiconglich='{item}'>
                                            {{filterNTC(item.nhomthiconglich)}}
                                    </template>
                                    <template v-slot:item.ACTION="{item}">
                                       <button @click="openUpadteThiCong(item.macttc)">Sửa</button>
                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-row>
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <div>
                        <v-row>
                            <v-col cols="12" >
                                <v-card-title>
                                <v-spacer></v-spacer>
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-search"
                                    label="Search"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                </v-card-title>
                                <v-data-table
                                    :headers="headers_lich_thi_cong"
                                    :items="list_thi_cong_hoan_thanh"
                                    :search = "search"
                                >
                                    <template v-slot:item.tuyenduong='{item}'>
                                            {{filterTD(item.tuyenduong)}}
                                    </template>
                                    <template v-slot:item.hinhthucthicong='{item}'>
                                            {{filterHTTC(item.hinhthucthicong)}}
                                    </template>
                                    <template v-slot:item.trangthaitc='{item}'>
                                            {{filterTTTC(item.trangthaitc)}}
                                    </template>
                                    <template v-slot:item.nhomthiconglich='{item}'>
                                            {{filterNTC(item.nhomthiconglich)}}
                                    </template>
                                    <template v-slot:item.ACTION="{item}">
                                       <button @click="openUpadteThiCong(item.macttc)">Sửa</button>
                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-row>
                    </div>
                </v-tab-item>
            </v-tabs>
        </div>
        <v-dialog v-model="dialog_update" width="600px">
            <form @submit.prevent="update_thi_cong()">
            <v-card>
                <v-card-title>
                <span class="headline">Cập nhật thông tin lịch thi công</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field  label="Tên lịch thi công" v-model="ltc_update.lichthicong"></v-text-field>
                    <v-select
                        :items="dmtuyenduong"
                        v-model="ltc_update.tuyenduong"
                        label="Tuyến đường"
                        item-value="maduong"
                        item-text="tenduong"
                    ></v-select>
                     <v-select
                        :items="nhom_thi_cong"
                        v-model="ltc_update.nhomthiconglich"
                        label="Nhóm thi công"
                        item-value="manhomthicong"
                        item-text="tennhomthicong"
                    ></v-select>
                    <v-text-field type="textaera" label="Mô tả" v-model="ltc_update.mota"></v-text-field>
                      <v-text-field box label="Ngày bắt đầu" v-model="ltc_update.NgayBD"></v-text-field>
                    <v-text-field box label="Ngày hoàn thành" v-model="ltc_update.NgayHoanThanh"></v-text-field>
                     <v-select
                        :items="dshinhthuc"
                        v-model="ltc_update.hinhthucthicong"
                        label="Hình thức thi công"
                        item-value="maloai"
                        item-text="tenloai"
                    ></v-select>
                     <v-select
                        :items="dstrangthaitc"
                        v-model="ltc_update.trangthaitc"
                        label="Trạng thái thi công"
                        item-value="matrangthaitc"
                        item-text="trangthaitc"
                    ></v-select>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog_update = false">Đóng</v-btn>
                <v-btn color="green darken-1" type="submit" text >Lưu lại</v-btn>
                </v-card-actions>
            </v-card>
            </form>
        </v-dialog>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'lich-thi-cong',
    components: {
        'step-thi-cong': () => import('@/components/users/admins/routerViewAdmin/Forms/stepthicong.vue')
    },
    data(){
        return{
            tabs: null,
            dateStart: new Date().toISOString().substr(0, 10),
            dateEnd: new Date().toISOString().substr(0, 10),
            dateFormattedStart: this.formatDate(new Date().toISOString().substr(0, 10)),
            dateFormattedEnd: this.formatDate(new Date().toISOString().substr(0, 10)),
            menu1: false,
            menu2: false,
            menu3: false,
            dialog: false,
            dialog_update: false,
            e1: 0,
            headers_lich_thi_cong: [
                {text: 'Tên lịch thi công', value: 'lichthicong', align: 'center', sortable: false},
                {text: 'Hình thức thi công', value: 'hinhthucthicong'},
                {text: 'Tuyến đường', value: 'tuyenduong', align: 'center', sortable: false},
                {text: 'Nhóm thi công', value: 'nhomthiconglich'},
                {text: 'Ngày bắt đầu', value: "NgayBD"},
                {text: 'Ngày hoàn thành', value: 'NgayHoanThanh'},
                {text: 'Trạng thái', value: 'trangthaitc'},
                {text: 'Mô tả', value: 'mota',sortable: false},
                // {text: 'Ngày cập nhật', value: 'ngaycapnhat'},
                {text: '', value: 'ACTION'}
            ],
            list_thi_cong: [],
            list_thi_cong_khan: [],
            list_thi_cong_cho: [],
            list_thi_cong_dang_thuc_hien: [],
            list_thi_cong_hoan_thanh: [],
            nhom_thi_cong: [],
            dstrangthaitc: [],
            search: null,
            dshinhthuc: [],
            dmtuyenduong: [],
            ltc_update: {}
        }
    },
    computed: {
        computedDateFormatted () {
            return this.formatDate(this.date)
        },

    },
    watch: {
        dialog(newVal)
        {
            if(newVal == false)
            {
                this.api_lich_thi_cong()
            }
        },
        dialog_update(newVal)
        {
            if(newVal == false)
            {
                this.api_lich_thi_cong()
            }
        },
        dateStart (val) {
            this.dateFormattedStart = this.formatDate(val)
        },
        dateEnd(val){
            this.dateFormattedEnd = this.formatDate(val)
        }
    },
    methods: {
        update_thi_cong()
        {
            axios.put("http://113.161.225.252:8000/chi-tiet-lich-thi-cong/"+this.ltc_update.macttc+"/",this.ltc_update,{
                headers: {
                    Authorization: "Token "+this.$store.state.token_authorzation
                }
            }).then((response) => {
                alert('cập nhật thành công')
            })
        },
        openUpadteThiCong(id)
        {
            this.dialog_update = true
            axios.get('http://113.161.225.252:8000/chi-tiet-lich-thi-cong/'+id+'/',{
                 headers: {
                    Authorization: "Token "+this.$store.state.token_authorzation
                }
            }).then((response) => {
                this.ltc_update = response.data
            })
        },
        formatDate (date){
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${year}-${month}-${day}`
        },
        apiGetHTTC(){
            axios.get(this.$store.state.api_url+'hinh-thuc-thi-cong/',{
                headers: {
                    Authorization: "Token "+this.$store.state.token_authorzation
                }
            })
            .then((response)=>{
                this.dshinhthuc = response.data
            })
        },
        filterTTTC(id)
        {
            return this.dstrangthaitc.filter((value,index,array) => {
                return array[index].matrangthaitc == id
            })[0].trangthaitc
        },
        filterHTTC(id)
        {   
            return this.dshinhthuc.filter((value,index,array) => {
                return array[index].maloai == id
            })[0].tenloai
        },
        filterNTC(id)
        {
            return this.nhom_thi_cong.filter((value,index,array) => {
                return array[index].manhomthicong == id
            })[0].tennhomthicong
        },
        viewDay({date})
        {
            this.dialog = true
            // console.log(date)
        },
        api_lich_thi_cong()
        {
            axios.get(this.$store.state.api_url + 'nhom-thi-cong/',{
                headers: {
                    Authorization: "Token "+this.$store.state.token_authorzation
                }
            }).then((response) => {
                this.nhom_thi_cong = response.data
            })
            axios.get(this.$store.state.api_url + 'chi-tiet-lich-thi-cong/',{
                    headers: {
                        Authorization: "Token "+this.$store.state.token_authorzation
                    }
                }).then((response) => {
                this.list_thi_cong_khan = response.data.filter((value,index,array) => {
                    return array[index].trangthaitc == 1
                })
                this.list_thi_cong_cho = response.data.filter((value,index,array) => {
                    return array[index].trangthaitc == 2
                })
                this.list_thi_cong_dang_thuc_hien = response.data.filter((value,index,array) => {
                    return array[index].trangthaitc == 3
                })
                this.list_thi_cong_hoan_thanh = response.data.filter((value,index,array) => {
                    return array[index].trangthaitc == 4
                })
                this.list_thi_cong = response.data
               
                //  console.log(this.list_thi_cong)
            })
        },
        apiGetNTC(){
            axios.get(this.$store.state.api_url + 'nhom-thi-cong/',{
                headers: {
                    Authorization: "Token "+this.$store.state.token_authorzation
                }
            }).then((response) => {
                this.nhom_thi_cong = response.data
            })
        },
        apiGetTTTC(){
            axios.get(this.$store.state.api_url + 'danh-muc-trang-thai-thi-cong/',{
                headers: {
                    Authorization: "Token "+this.$store.state.token_authorzation
                }
            }).then((response) => {
                this.dstrangthaitc = response.data
            })
        },
        apiGetTD(){
            axios.get(this.$store.state.api_url+'danh-muc-tuyen-duong/',{
                headers: {
                    Authorization: "Token "+this.$store.state.token_authorzation
                }
            })
            .then((response)=>{
                this.dmtuyenduong = response.data
            })
        },
        filterTD(id)
        {
            return this.dmtuyenduong.filter((value,index,array) => {
                return array[index].maduong == id
            })[0].tenduong
        },
    },
    created() {
        this.apiGetTTTC()
        this.apiGetNTC()
        this.api_lich_thi_cong()
        this.apiGetHTTC()
        this.apiGetTD()
    },

}
</script>
<style>
.tab-content{border-radius: 10px 10px 0 0;}
.ac-1{margin-left: 12px;}
#buoc-thi-cong button{text-align:center;}
button.ma-0.v-btn.v-btn--fab.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--small{display: none !important}
</style>