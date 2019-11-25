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