<template>
<div class="row">
    <v-col class="12" sm="4" md="3">
        <v-card>
            <v-card-title primary-title>
                <span style="font-size:15px;"> Danh sách quyền</span>
            </v-card-title>
            <v-card-text>
                <ul>
                    <li><v-checkbox label="Quyền admin" v-model="value" value="value"></v-checkbox></li>
                </ul>
            </v-card-text>
        </v-card>
    </v-col>
</div>
</template>