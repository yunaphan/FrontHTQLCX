<template>
  <v-card id="side-bar">
    <v-navigation-drawer
      class="nav-content"
      permanent
      absolute
      mini-variant-width="70px"
      :mini-variant.sync="mini"
      color= "#6e6e6e2b"
     >
      <v-list-item class="user_account">
        <v-list-item-avatar>
          <v-img :src="user.duongdanavatar"/>
        </v-list-item-avatar>
        <v-list-item-title class="list-title"> {{user.username}}</v-list-item-title>
        <v-btn @click.stop = "mini = !mini" class="close-sidebar" icon><v-icon color="primary">mdi-chevron-left</v-icon></v-btn>

      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="list-item" link to="/admin/dash-board">
        <v-icon>mdi-home</v-icon>
        <v-list-item-title> Home</v-list-item-title>
      </v-list-item>

      <v-list-item class="list-item" @click="showModalSearchFeatures()">
        <v-icon >mdi-search-web</v-icon>
        <v-list-item-title >Tìm Kiếm Cây</v-list-item-title>
      </v-list-item>

      <!--<v-list-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title><v-icon>mdi-tree</v-icon> Quản Lí Cây Xanh</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item @click="showModalAddFeature()">
          <v-list-item-title >Thêm Cây Xanh</v-list-item-title>
          <v-list-item-icon>
              <v-icon >mdi-plus</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item @click="showModalSearchFeatures()">
          <v-list-item-title >Tìm Kiếm Cây</v-list-item-title>
          <v-list-item-icon>
              <v-icon >mdi-search-web</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>-->
    </v-navigation-drawer>
  </v-card>
</template>
<script>
import axios from 'axios'
export default {
  data:()=>{
    return{
      mini: true,
      user: {}
    }
  },
  props:{
    ClassActive: Boolean,
    dialog: Boolean,
    dialogSearch: Boolean,
  },
  methods: {
    showModalAddFeature(){
      this.$emit("showModalAddFeature", true )
    },
    showModalSearchFeatures(){
      this.$emit("showModalSearchFeatures", true)
    },
    api_user()
    {
       axios.post("http://113.161.225.252:8000/infomations-by-token/",{
      key: this.$session.get('key')
      },
      {
        headers: {
          Authorization: "Token "+this.$store.state.token_authorzation,
         
        }
      }).then((response) => {
        this.user = response.data
      })
    }
  },
  computed: {
    
  },  
  updated()
  {
    if(this.mini == true)
    {
      this.$emit("showMini",true)
    }
    else
    {
      this.$emit("showMini",false)
    }
  },
  created() {
    this.api_user()
  },
}
</script>
<style lang="css">
.nav-content{
  position: fixed;
  top:0;
  left: 0;
  background-color: #e0e0e0 !important;
  border-radius: 0;
}
.user_account{
  background-color: #060694;
  color: white !important
}
.list-title, .close-sidebar{
    color: #fffff8 !important
}
.v-list-item__title {
    font-size: 15px !important;
}
</style>
