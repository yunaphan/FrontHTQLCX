<template>
<div class="row">
    <v-col class="12" sm="4" md="3">
        <v-card>
            <v-card-title primary-title>
                <span style="font-size:15px;"> Danh sách quyền</span>
            </v-card-title>
            <v-card-text>
                <ul class="list-rule">
                    <li>
                        <v-checkbox label="Quyền admin" v-model="rule" value="0"></v-checkbox>
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
                <div class="row">
                    <div class="col-sm-5 col-md-4">
                        <span style="font-size:15px;">Danh mục quyền</span>
                    </div>
                   <div class="col-sm-7 col-md-8">
                       <ul class="list-function">
                           <li><input type="checkbox" class="form-check-input" id="materialUnchecked"></li>
                           <li><input type="checkbox" class="form-check-input" id="materialUnchecked"></li>
                           <li><input type="checkbox" class="form-check-input" id="materialUnchecked"></li>
                           <li><input type="checkbox" class="form-check-input" id="materialUnchecked"></li>
                           <li><input type="checkbox" class="form-check-input" id="materialUnchecked"></li>
                       </ul>
                    </div> 
                </div>
            </v-card-text>
       </v-card>
    </v-col>
</div>
</template>

<script>
export default {
   data()
   {
       return {
           rule: null,
           functions: []
       }
   }
}
</script>

<style scoped>
.list-rule {list-style: none}
.list-function {list-style: none;}
.list-function li {display: inline-block; font-size: 15px;padding: 10px}
</style>