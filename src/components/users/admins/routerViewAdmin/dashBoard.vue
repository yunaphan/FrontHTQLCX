<template>
<div>
    <div>
        <v-row>
            <!--<v-col cols="12" md="12" sm="12">
                <span>dashboard</span>
                <ul>
                    <li>abc</li>
                    <li>abcd</li>
                    <li>abcde</li>
                </ul>
            </v-col>-->
            <v-col 
            cols="12" 
            md="12" 
            sm="12" 
            style="margin-bottom: 12px">
                <span style="text-decoration: underline;">
                    Thông Tin Tổng Hợp
                </span>
            </v-col>
            <hr>
        </v-row>
    </div>
    <div class="content-dashboard">
        <v-row>
            <v-col cols="12" md="4" sm="4" >
                <v-card class="content-chart1 sub-content-chart1-1">
                    <div class="content-p">
                        <p class="p1">{{listcx.length}}</p>
                        <p class="p2">Cây xanh</p>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" sm="4" >
                <v-card class="content-chart1 sub-content-chart1-2">
                    <div class="content-p">
                        <p class="p1">{{this.chartOptions.xaxis.categories.length}}</p>
                        <p class="p2">Tên cây xanh</p>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" sm="4" >
                <v-card class="content-chart1 sub-content-chart1-3">
                    <div class="content-p">
                        <p class="p1">{{matinhtrang.length}}</p>
                        <p class="p2">Tình trạng cây xanh</p>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col 
            cols="12" md="12" sm="12" 
            style="margin-bottom: 12px">
                <span style="text-decoration: underline;">Biểu đồ cây xanh theo tên cây xanh</span>
            </v-col>
            <v-col cols="12" md="7" sm="7">
                <v-card>
                    <apexcharts 
                    width="100%" 
                    class="chart2" 
                    type="bar" 
                    height="300px" 
                    :options="chartOptions" 
                    :series="series">
                    </apexcharts>
                </v-card>
            </v-col>
            <v-col cols="12" md="5" sm="5">
                <v-card>
                    <apexcharts 
                    id="chart" 
                    width="100%" 
                    height="340px" 
                    class="chart2 sub-content-chart2-1" 
                    :options="pieOptions" 
                    :series="pieOptions.series1">
                    </apexcharts>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col 
            cols="12" md="12" sm="12" 
            style="margin-bottom: 12px">
                <span style="text-decoration: underline;">Biểu đồ cây xanh theo tình trạng cây xanh</span>
            </v-col>
            <v-col cols="12" md="7" sm="7">
                <v-card>
                    <apexcharts 
                    width="100%" 
                    class="chart2 sub-content-chart3-1" 
                    type="bar" 
                    height="300px" 
                    :options="chartOptionsTT" 
                    :series="seriesTT">
                    </apexcharts>
                </v-card>
            </v-col>
            <v-col cols="12" md="5" sm="5">
                <v-card>
                    <apexcharts 
                    id="chart" 
                    width="100%" 
                    height="340px" 
                    class="chart2 sub-content-chart3-2" 
                    :options="pieOptionsTT" 
                    :series="pieOptionsTT.series1">
                    </apexcharts>
                </v-card>
            </v-col>
        </v-row>
    </div>
</div>
</template>
<script>
// import {mapActions, mapGetters} from 'vuex'
import axios from 'axios'
export default {
    name: "dashboard",
    data(){
        return{
            // Data biểu đồ cột số lượng cây theo tên cây xanh
            chartOptions: {
                chart: {
                    id: 'basic-tenCX'
                },
                xaxis: {
                    categories: []
                }
            },
            series: [{
                name: 'Tên CX',
                data: []
            }],
            // Data biểu đồ tròn tỉ lệ cây theo tên cây xanh
            pieOptions:{
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: [],
                series1: [],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 190
                        },
                        legend: {
                            position: 'bottom',
                            show: false
                        },
                    }
                }]
            },
            listcx: [],
            listtinhtrangcx: null,
            matinhtrang: [],
            // Data biểu đồ cột số lượng cây xanh theo tình trạng cây xanh
            chartOptionsTT: {
                chart: {
                    id: 'basic-tenCX'
                },
                xaxis: {
                    categories: []
                }
            },
            seriesTT: [{
                name: 'Tình Trạng CX',
                data: []
            }],
            pieOptionsTT:{
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: [],
                series1: [],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 190
                        },
                        legend: {
                            position: 'bottom',
                            show: false
                        },
                    }
                }]
            },
        }
    },
    methods: {
        getApiCX(){
            axios.get("http://113.161.225.252:8000/cay-xanh/", {
                headers: {
                    Authorization: "Token 638635059406d15db24dfecb856f414042a465ce"
                }
            })
            .then((response) =>{
                this.listcx = response.data
                this.chartOptions.xaxis.categories.forEach((matencx) => {
                    const listcx =  response.data.filter((value,index,array) => {
                        return array[index].matencx == matencx
                    }).length
                    this.series[0].data.push(listcx)
                    console.log(this.series[0].data)
                    this.pieOptions.series1.push(listcx)
                })
                this.matinhtrang.forEach((mtt) => {
                    const listmatinhtrang = response.data.filter((value, index, array) =>{
                        return array[index].matinhtrang == mtt
                    }).length
                    this.seriesTT[0].data.push(listmatinhtrang)
                    this.pieOptionsTT.series1.push(listmatinhtrang)
                })
            })
        },
        getApiTenCX(){
            axios.get("http://113.161.225.252:8000/ten-cay-xanh/", {
                headers: {
                    Authorization: "Token 638635059406d15db24dfecb856f414042a465ce"
                }
            })
            .then( (response) =>{
                response.data.forEach((tencx) => {
                    this.chartOptions.xaxis.categories.push(tencx.matencx)
                    this.pieOptions.labels.push(tencx.matencx)
                })
            })
        },
        async getApiTinhTrangCX(){
            this.$store.state.loading = true
            await axios.get("http://113.161.225.252:8000/trang-thai-cay-xanh/", {
                headers: {
                    Authorization: "Token 638635059406d15db24dfecb856f414042a465ce"
                }
            })
            .then( (response) =>{
                this.listtinhtrangcx = response.data
                this.listtinhtrangcx.forEach((result_arr) => {
                    this.chartOptionsTT.xaxis.categories.push(result_arr.tinhtrang)
                    this.pieOptionsTT.labels.push(result_arr.tinhtrang)
                    this.matinhtrang.push(result_arr.matinhtrang) 
                    // console.log(this.pieOptionsTT.labels)
                })
            })
            this.$store.state.loading = false
        }
    },
    async created() {
        console.log('created')
         this.$store.state.loading = await true
        await this.getApiCX()
        await this.getApiTenCX()
        await this.getApiTinhTrangCX()
          this.$store.state.loading = await false
    },
}
</script>
<style lang="css">
    .v-card{
        margin-bottom: 12px;
    }
    .content-dashboard{
        margin-top: 12px;
        width: 100%
    }
    .chart2{
        position: relative;
        max-height: 300px;
        min-height:200px
    }
    .content-chart1{
        height: 120px;
    }
    .content-chart1::before{
        content: "";
        position: absolute;
        width: 60%;
        height: 50px;
        top: -8px;
        left: 19%;
        background-color: #0277bd;
        color: #fff;
        padding: 10px 10px;
        border: #0277bd;
        border-radius: 5px 10px;
        text-align: center;
        font-size: 14px;
    }
    .content-p{
        text-align: center;
        padding-top: 20px;
    }
    .content-p .p1{
        margin: 20px 0 0 5px;
        font-size: 25px;
        font-weight: 600;
    }
    .content-p .p2{
        font-weight: 100; 
        font-size: 15px; 
        margin-top: 0;
    }
    .chart2::before{
        content: "Biểu đồ số lượng cây theo tên cây xanh";
        position:absolute;
        width: 70%;
        top: -20px;
        left: 15%;
        background-color: #0277bd;
        color: #fff;
        padding: 7px 10px;
        border: #0277bd;
        border-radius: 5px 10px;
        text-align: center;
        font-size: 14px;
    }
    .sub-content-chart1-1::before{
        content: "Tổng số cây xanh"
    }
    .sub-content-chart1-2::before{
        content: "Tổng tên cây xanh"
    }
    .sub-content-chart1-3::before{
        content: "Tổng tình trạng cây xanh"
    }
    .sub-content-chart2-1::before{
        content: "Biểu đồ tỉ lệ cây theo tên cây xanh"
    }
    .sub-content-chart3-1::before{
        content: "Biểu đồ số lượng cây theo tình trạng cây xanh"
    }
    .sub-content-chart3-2::before{
        content: "Biểu đồ tỉ lệ cây theo tình trạng cây xanh"
    }
    #chart{
        padding: 5px 0 0 0;
    }
</style>