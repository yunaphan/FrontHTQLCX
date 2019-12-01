<template>
    <div>
        <div class="tabs-thi-cong">
            <v-tabs class="tab-content" background-color="transparent" v-model="tabs">
                <v-tab>Lịch Thi Công</v-tab>
                <v-tab>Lịch Thi Công Khẩn</v-tab>
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
                            <v-col cols="12">
                                <v-data-table
                                    :headers="headers_lich_thi_cong"
                                    :items="list_thi_cong"
                                >
                                    <template v-slot:item.trangthaitc='{item}'>
                                            {{filterTTTC(item.trangthaitc)}}
                                    </template>
                                    <template v-slot:item.nhomthiconglich='{item}'>
                                            {{filterNTC(item.nhomthiconglich)}}
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
                    sádasd
                </v-tab-item>
            </v-tabs>
        </div>
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
            dialog: false,
            e1: 0,
            headers_lich_thi_cong: [
                {text: 'Tên lịch thi công', value: 'lichthicong', align: 'center', sortable: false},
                {text: 'Mã tuyến đường', value: 'tuyenduong', align: 'center', sortable: false},
                {text: 'Nhóm thi công', value: 'nhomthiconglich'},
                {text: 'Ngày bắt đầu', value: "NgayBD"},
                {text: 'Ngày hoàn thành', value: 'NgayHoanThanh'},
                {text: 'Trạng thái', value: 'trangthaitc'},
                {text: 'Mô tả', value: 'mota',sortable: false},

            ],
            list_thi_cong: [],
            nhom_thi_cong: [],
            dstrangthaitc: [],
        }
    },
    computed: {
        computedDateFormatted () {
            return this.formatDate(this.date)
        },
    },
    watch: {
      dateStart (val) {
        this.dateFormattedStart = this.formatDate(val)
      },
      dateEnd(val){
        this.dateFormattedEnd = this.formatDate(val)
      }
    },
    methods: {
        formatDate (date){
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${year}-${month}-${day}`
        },
        filterTTTC(id)
        {
            return this.dstrangthaitc.filter((value,index,array) => {
                return array[index].matrangthaitc == id
            })[0].trangthaitc
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
            console.log(date)
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
        // filterrenderTTTC(){
        //     const trangthai = this.dstrangthaitc.filter((matt)=>{
        //         return this.dstrangthaicx.matrangthaitc = matt
        //     })
        // }
    },
    created() {
        this.apiGetTTTC()
        this.apiGetNTC()
        this.api_lich_thi_cong()
    },

}
</script>
<style>
.tab-content{border-radius: 10px 10px 0 0;}
.ac-1{margin-left: 12px;}
#buoc-thi-cong button{text-align:center;}
</style>