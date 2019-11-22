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
                                        hint="MM/DD/YYYY format"
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
                        <v-data-table
                            :headers="headers"
                            :items="desserts"
                            loading="true"
                            search="search"
                        >
                        </v-data-table>
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
            headers: [
                {
                    text: 'Hình Thức',
                    align: 'left',
                    value: 'name',
                },
                { text: 'Calories', value: 'calories' },
                { text: 'Fat (g)', value: 'fat' },
                { text: 'Carbs (g)', value: 'carbs' },
                { text: 'Protein (g)', value: 'protein' },
                { text: 'Ghi Chú', value: 'iron' },
            ],
            desserts: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: '1%',
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: '1%',
                },
                {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: '7%',
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: '8%',
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: '16%',
                },
            ],
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
            return `${day}/${month}/${year}`
        },
    },

}
</script>
<style>
.tab-content{border-radius: 10px 10px 0 0;}
.ac-1{margin-left: 12px;}
#buoc-thi-cong button{text-align:center;}
</style>