<template>
<div>
    <!--<h2>DASHBOARD</h2>
    <hr>-->
    <div>
        <v-row>
            <v-col cols="12" md="12" sm="12">
                <span>Dashboard</span>
                <!--<ul>
                    <li>abc</li>
                    <li>abcd</li>
                    <li>abcde</li>
                </ul>-->
            </v-col>
            <hr>
        </v-row>
    </div>
    <div class="content-dashboard">
        
        <v-row>
            <v-col cols="12" md="4" sm="4" >
                <v-card class="content-chart1 sub-content-chart1-1">
                    <div class="content-p">
                        <p class="p1">12345</p>
                        <p class="p2">Cây xanh</p>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" sm="4" >
                <v-card class="content-chart1 sub-content-chart1-2">
                    <div class="content-p">
                        <p class="p1">14</p>
                        <p class="p2">Tên cây xanh</p>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" sm="4" >
                <v-card class="content-chart1 sub-content-chart1-3">
                    <div class="content-p">
                        <p class="p1">21</p>
                        <p class="p2">Tình trạng cây xanh</p>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="12" sm="12" style="margin-bottom: 12px"><span style="text-decoration: underline;">Thông Tin Tổng Hợp</span></v-col>
            <v-col cols="12" md="6" sm="6">
                <v-card>
                <apexcharts width="100%" class="chart2" type="bar" :options="chartOptions" :series="series"></apexcharts>
                </v-card>
            </v-col>
        </v-row>
    </div>
</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: "dashboard",
    data(){
        return{
            chartOptions: {
                chart: {
                    id: 'basic-tenCX'
                },
                xaxis: {
                    categories: [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8]
                }
            },
            series: [{
                name: 'Tên CX',
                data: [30, 40, 45, 50, 49, 60, 70, 91, 20, 21, 100, 120]
            }],
        }
    },
    computed: {
        ...mapGetters(["getDanhSachTenCX"])
    },
    methods: {
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
    .chart2::before{
        content: "Biểu đồ Cột Tên Cây Xanh";
        position:absolute;
        width: 70%;
        top: -20px;
        left: 15%;
        background-color: #030356cc;
        color: #fff;
        padding: 7px 10px;
        border: #030356cc;
        border-radius: 5px 10px;
        text-align: center;
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
    .sub-content-chart1-1::before{
        content: "Tổng số cây xanh"
    }
    .sub-content-chart1-2::before{
        content: "Tổng tên cây xanh"
    }
    .sub-content-chart1-3::before{
        content: "Tổng tình trạng cây xanh"
    }
</style>