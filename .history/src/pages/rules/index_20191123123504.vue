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
                    <div class="col-sm-4 col-md-3 col-lg-2">
                        <span style="font-size:15px;">Danh mục quyền</span>
                    </div>
                    <div class="col-sm-8-col-md-9 col-lg-10">
                        <div class="row">
                            <div class="col-sm-2">Xem</div>
                        </div>
                        <div class="row">
                            <div class="col-sm-2">Thêm</div>
                        </div>
                        <div class="row">
                            <div class="col-sm-2">Sửa</div>
                        </div>
                        <div class="row">
                            <div class="col-sm-2">Xóa</div>
                        </div>
                        <div class="row">
                            <div class="col-sm-2">Xuất</div>
                        </div>
                    </div>
                   
                </div>
            </v-card-title>
            <v-card-text>
                <div class="row">
                    <v-col cols="12" md="3">
                        <span>Quản lý user</span>
                    </v-col>
                    <v-col cols="12" md="9">
                        <div class="row">
                            <v-col cols="12" md="3">
                                <input type="checkbox">
                            </v-col>
                             <v-col cols="12" md="3">
                                <input type="checkbox">
                            </v-col>
                             <v-col cols="12" md="3">
                                <input type="checkbox">
                            </v-col>
                             <v-col cols="12" md="3">
                                <input type="checkbox">
                            </v-col>
                        </div>
                    </v-col>
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
</style>