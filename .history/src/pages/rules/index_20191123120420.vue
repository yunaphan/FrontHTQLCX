<template>
<div class="row">
    <v-col class="12" sm="4" md="3">
        <v-card>
            <v-card-title primary-title>
                <span style="font-size:15px;"> Danh sách quyền</span>
            </v-card-title>
            <v-card-text>
                <ul>
                    <li>
                        <v-radio v-model="rule" label="Quyền admin" value="value"></v-radio>
                    </li>
                </ul>
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
           rule: null
       }
   }
}
</script>