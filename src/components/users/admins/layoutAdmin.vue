<template>
<v-container class="custom" fluid grid-list-xs>
    <v-row style="height:100%;">
        <side-bar-admin style="border-radius: 0;"
        @updateClassSidebar="classActive = $event"
        ></side-bar-admin>
        <div class="routerView" :class="{active: !classActive}" >
            <router-view></router-view>
        </div>
    </v-row>  
</v-container>
    
</template>
<script>
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

    },
    created() {
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

</style>