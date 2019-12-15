<template>
<v-container class="custom" fluid grid-list-xs>
    <v-row style="height:100%;">
        <div class="side-bar" :class="{'active': classActive}">
            <side-bar-admin style="border-radius: 0;"
                @updateClassSidebar="classActive = $event"
                >
            </side-bar-admin>
        </div>
        <div class="routerView" :class="{active: !classActive}" >
            <router-view></router-view>
        </div>
    </v-row> 
    <v-overlay :value="$store.state.loading">
        <v-progress-circular indeterminate size="50"></v-progress-circular>
    </v-overlay> 
</v-container>
    
</template>
<script>
import axios from 'axios'
import {mapActions} from 'vuex'
export default {
    components: {
        "side-bar-admin": require('@/components/users/admins/sidebarAdmin.vue').default,
    },
    data(){
        return{
            classActive: true
        }
    },
    // watch: {
    //     classActive(newVal){
    //         console.log('admin',newVal)
    //     }
    // },
    methods: {
        ...mapActions(["commitAction_CX",
        "commitAction_tinhtrang_cx", 
        "commitAction_thicong",
        "commitAction_nd",
        "commitAction_tttc",
        ])
    },
    created() {
        axios.post(this.$store.state.api_url+ 'infomations-by-token/',{
            key: this.$session.get('key')
        },
        {
            headers: {
                Authorization: "Token "+ this.$store.state.token_authorzation
            }
        }).then((response) => {
            console.log('test', response.data)
            axios.get(this.$store.state.api_url + 'quyen-nguoi-dung/?maquyen='+response.data.quyen,
            {
                headers: {
                    Authorization: "Token "+this.$store.state.token_authorzation
                }
            }).then((response) => {
                // console.log('rule',response.data[0].quyen_nguoi_dung)
                response.data[0].quyen_nguoi_dung.forEach((object) => {
                    // const id_cn = object.xem.slice(0,1);
                    // console.log(object)
                    if(object.machucnang == 2)
                    {
                        this.commitAction_CX({
                            xem: object.xem,
                            them: object.them,
                            sua: object.sua,
                            xoa: object.xoa,
                            xuat: object.xuat,
                        })
                    }
                    if(object.machucnang == 3) 
                    {
                        this.commitAction_tinhtrang_cx({
                            xem: object.xem,
                            them: object.them,
                            sua: object.sua,
                            xoa: object.xoa,
                            xuat: object.xuat,
                        })
                    }
                    if(object.machucnang == 7)
                    {
                        this.commitAction_thicong({
                            xem: object.xem,
                            them: object.them,
                            sua: object.sua,
                            xoa: object.xoa,
                            xuat: object.xuat,
                        })
                    }
                    if(object.machucnang == 9)
                    {
                        this.commitAction_tttc({
                            xem: object.xem,
                            them: object.them,
                            sua: object.sua,
                            xoa: object.xoa,
                            xuat: object.xuat,
                        })
                    }
                    if(object.machucnang == 10)
                    {
                        this.commitAction_nd({
                            xem: object.xem,
                            them: object.them,
                            sua: object.sua,
                            xoa: object.xoa,
                            xuat: object.xuat,
                        })
                        console.log('luân khùng',object)
                    }
                    
                })
                // response.data[1].forEach((rule) => {
                //     console.log(rule)
                // })
            })
            
        })
        if(!this.$session.has('key'))
        {
            this.$router.push('/login')
        }
    },
}
</script>
<style lang="css">
    .routerView{
        width: calc(100% - 80px);
        transition-duration: .3s;
        padding: 12px;
    }
    .routerView.active{
        width: calc(100% - 256px);
        transition-duration: .3s;
        padding: 12px;
    }
    .container.custom {height: 100%;padding-top:0;padding-bottom: 0;}
    .side-bar {width: 256px}
    .side-bar.active {width: 80px;}
    
</style>