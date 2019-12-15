<template>
  <v-row justify="center">
    <v-dialog v-model="getdjalog_imagepage" width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Thư viện ảnh của cây {{getSelectedFeature.attributes.OBJECTID}} {{getSelectedFeature.attributes.SoHieu}}</span>
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="4" md="4" v-for="(item, index) in tvanh" :key="index">
                  <v-card>
                    <v-img :src="item.duongdanhinhanh" max-height="200" max-width="200" class="grey darken-4"></v-img>
                    <v-card-title style="font-size:12px;">mô tả: {{item.mota}}</v-card-title>
                  </v-card>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="$store.state.BaseMap.djalog_imagepage = false">Đóng</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import axios from 'axios'
  export default {
    name: 'images-page',
    data () {
      return {
        tvanh: [],
      }
    },
    computed: {
        ...mapGetters(["getdjalog_imagepage",
        "getSelectedFeature",
        ])
    },
    watch: {
      getSelectedFeature(newVal){
        this.getHinhAnhCay()
      }
    },
    methods: {
      ...mapActions(["commitdjalog_imagepage"]),
      getHinhAnhCay(){
        axios.get("http://113.161.225.252:8000/hinh-anh-cay/?objectid="+ this.getSelectedFeature.attributes.OBJECTID, {
            headers:{
                Authorization: "Token "+this.$store.state.token_authorzation
            }
        })
        .then((response) => {
            this.tvanh = response.data
            console.log("tvanh", response.data)
        })
      },
    },
    created() {
      // this.getHinhAnhCay()
    },
  }
</script>