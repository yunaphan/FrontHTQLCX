<template>
<div class="row">
    <v-col cols="12" md="12" sm="12"><p style="text-decoration: underline; padding-left: 12px;">Cập nhật chức năng theo quyền</p></v-col>
    <v-col class="12" sm="4" md="3">
        <v-card>
            <v-card-title primary-title>
                <span style="font-size:15px;"> Danh sách quyền</span>
            </v-card-title>
            <v-card-text>
                <ul class="list-rule">
                    <li v-for="(quyen, index) in quyennguoidung" :key="index">
                        <v-checkbox v-model="rule" :value="quyen.maquyen" style="display:inline-block;"></v-checkbox>
                        {{quyen.quyennguoidung}}
                    </li>
                </ul>
            </v-card-text>
        </v-card>
    </v-col>

    <v-col cols="12" sm="8" md="9">
       <v-card>
            <v-card-title primary-title>
                <div class="row">
                    <div class="col-sm-5 col-md-4">
                        <span style="font-size:15px;">Danh mục quyền</span>
                    </div>
                   <div class="col-sm-8">
                       <ul class="list-function">
                           <li>Xem</li>
                           <li>Thêm</li>
                           <li>Sửa</li>
                           <li>Xóa</li>
                           <li>Xuất File</li>
                       </ul>
                    </div> 
                   
                </div>
            </v-card-title>
            <v-card-text>
            <!--{{functions}}-->
                <div class="row" v-for="(cn,index) in chuc_nang" :key="index">
                    <div class="col-sm-5 col-md-4">
                        <span style="font-size:15px;">{{cn.chucnang}}</span>
                    </div>
                   <div class="col-sm-7 col-md-8">
                   
                       <ul class="list-function">
                           <li><input v-model="functions[index]" :disabled="cn.machucnang == 1 || cn.machucnang  == 5" :value="cn.machucnang + '.1'" type="checkbox" class="form-check-input" id="materialUnchecked"></li>
                           <li><input v-model="functions[index]" :value="cn.machucnang + '.2'" type="checkbox" class="form-check-input" id="materialUnchecked"></li>
                           <li><input v-model="functions[index]" :value="cn.machucnang + '.3'" type="checkbox" class="form-check-input" id="materialUnchecked"></li>
                           <li><input v-model="functions[index]" :value="cn.machucnang + '.4'" type="checkbox" class="form-check-input" id="materialUnchecked"></li>
                           <li><input v-model="functions[index]" :value="cn.machucnang + '.5'" type="checkbox" class="form-check-input" id="materialUnchecked"></li>
                       </ul>
                    </div> 
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue darken-1" text @click="api_update_rule()"> Cập nhật</v-btn>
            </v-card-actions>
       </v-card>
    </v-col>
</div>
</template>

<script>
import axios from 'axios'
export default {
   data()
   {
       return {
           rule: null,
           functions: [],
           quyennguoidung: [],
           chuc_nang: [],
           rule_function: {
               xem: 0,
               them: 0,
               sua: 0,
               xoa: 0,
               xuat: 0,
               machucnang: 0,
               maquyen: this.rule
           }
       }
   },
   watch: {
      rule(newVal)
      {
          this.api_chuc_nang_nd(newVal)
      },
      rule_function(newVal)
      {
        //   console.log('watch',newVal)
      }
   },
    methods: {
        getApiQuyenNguoiDung(){
            axios.get('http://113.161.225.252:8000/quyen-nguoi-dung/',{
                headers: {
                   "Authorization": "Token "+this.$store.state.token_authorzation,
                }
            })
            .then((response) =>{
                this.quyennguoidung = response.data
                // console.log(response.data)
            })
        },
        api_chuc_nang()
        {
            axios.get('http://113.161.225.252:8000/chuc-nang/',{
                headers: {
                   "Authorization": "Token "+this.$store.state.token_authorzation,
                } 
            }).then((response) =>{
                this.chuc_nang = response.data
                response.data.forEach((element) => {
                    this.functions.push([])
                })
                // console.log(response.data)
            })
        },
        api_chuc_nang_nd(id)
        {
            axios.get('http://113.161.225.252:8000/quyen-nguoi-dung/?maquyen='+id,{
                 headers: {
                   "Authorization": "Token "+this.$store.state.token_authorzation,
                } 
            }).then((response) => {
                // console.log(response.data)
                this.functions = []
                this.chuc_nang.forEach(() => {
                     this.functions.push([])
                })
                response.data[0].quyen_nguoi_dung.forEach((element) => {
                    this.functions[element.machucnang - 1] = [element.xem, element.them,element.sua, element.xoa, element.xuat]
                })
            })
        },
        api_rule(object)
        {
            // console.log('test lần 2',object)
            axios.get("http://113.161.225.252:8000/chuc-nang-nguoi-dung/?machucnang="+object.machucnang+'&maquyen='+object.maquyen,
                {
                    headers: {
                        "Authorization": "Token "+this.$store.state.token_authorzation,
                    } 
                }).then((response) => {
                    if(response.data.length > 0)
                    {
                        axios.put("http://113.161.225.252:8000/chuc-nang-nguoi-dung/"+response.data[0].machucnangnguoidung+"/",object,{
                            headers: {
                                "Authorization": "Token "+this.$store.state.token_authorzation,
                            } 
                        }).then(() => {
                            // console.log('put',response.data)
                        })
                    }else
                    {
                        axios.post("http://113.161.225.252:8000/chuc-nang-nguoi-dung/",object,{
                             headers: {
                                "Authorization": "Token "+this.$store.state.token_authorzation,
                            } 
                        }).then(() => {
                            // console.log('post',response.data)
                        })
                    }
                    // console.log('get',response.data.length)
            })
        },
        api_update_rule(){
            if(this.rule == null)
            {
                alert('Bạn chưa chọn quyền để cập nhật!')
            }
            else{
                this.functions.forEach((fc) => {
                    if(fc.length > 0 )
                    {
                        if(fc[0].length == 3)
                        {
                             var id_cn = fc[0].slice(0,1)
                        }
                        else
                        {
                             var id_cn = fc[0].slice(0,2)
                        }
                        const rule_function = {}
                        
                        // console.log('fc',fc)
                        // console.log('test đầu',this.rule_function)
                        rule_function.machucnang = id_cn
                        rule_function.xem = id_cn+'.0';
                        rule_function.them = id_cn+'.0';
                        rule_function.sua = id_cn+'.0';
                        rule_function.xoa = id_cn+'.0';
                        rule_function.xuat = id_cn+'.0';
                        fc.forEach((value) => {
                            // console.log(value)
                            if(value == id_cn+'.1')
                            {
                                rule_function.xem = id_cn+'.1'
                            }
                            if(value == id_cn+'.2')
                            {
                                    rule_function.them = id_cn+'.2'
                            }
                            if(value == id_cn+'.3')
                            {
                                    rule_function.sua = id_cn+'.3'
                            }
                            if(value == id_cn+'.4')
                            {
                                rule_function.xoa = id_cn+'.4'
                            }
                            if(value == id_cn+'.5')
                            {
                                    rule_function.xuat = id_cn+'.5'
                            }

                        })
                        rule_function.maquyen = this.rule
                        this.rule_function = rule_function;
                        // console.log('test lần 1',this.rule_function)
                        this.api_rule(this.rule_function)
                        
                    } 
                    
                })
                alert("Bạn đã cập nhật lại quyền!")
            }
        }
    },
    created() {
        this.getApiQuyenNguoiDung()
        this.api_chuc_nang()
    },
}
</script>

<style scoped>
.list-rule {list-style: none}
.list-function {list-style: none;}
.list-function li {display: inline-block; font-size: 15px;padding: 10px;width: 20%;text-align: center}
</style>