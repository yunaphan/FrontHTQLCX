<template>
<v-layout row id="content">
    <side-bar 
        :ClassActive="ClassActive" 
        @showMini="showSidebar" 
        id="sidebar"
        @showModalAddFeature = "showModalAddFeature"
        @showModalSearchFeatures="dialogSearch = $event"
    >
    </side-bar>
    <add-feature :dialog="dialog" @showModalAddFeature = "showModalAddFeature" ></add-feature>
    <update-feature></update-feature>
    <search-features :dialogSearch= "dialogSearch" @showModalSearchFeatures= "dialogSearch = $event"></search-features>
    <div id="viewDiv" :class="{active: ClassActive}" ></div>
</v-layout>
</template>
<script>
import { mapActions} from 'vuex'
export default {
    data(){
        return{
            ClassActive: false,
            dialog: false,
            dialogSearch: false,
        }
    },
    components:{
        "side-bar": () => import('@/components/widgets/sidebar.vue'),
        "add-feature": () => import("@/components/widgets/addFeature.vue"),
        "update-feature":() => import('@/components/widgets/updateFeature.vue'),
        "search-features":() => import('@/components/widgets/searchFeatures.vue'),
    },
    methods: {
        ...mapActions([
            "loadbasemap", 
        ]),
        showSidebar(value){
            this.ClassActive = !value
        },
        showModalAddFeature(val){
            this.dialog = val
            console.log(val)
        },
    },
    created() {
        this.loadbasemap()
    },
}
</script>
<style>
    html, body, #content, #viewDiv,#app{
        width: 100%;
        height: 100%;
        padding: 0;
        margin:0;
        overflow-y: hidden !important;
    }

    #sidebar{
        border-radius: 0;
    }
</style>