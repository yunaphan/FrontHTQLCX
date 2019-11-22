<template>
<div>
    <v-row>
        <v-col cols="12" sm="12">
            Danh sách phản ánh của người dân
        </v-col>
        <v-col cols="12" sm="12">
            <v-data-table
                :headers="headers"
                :items="phananh"
            >
                
            </v-data-table>
        </v-col>
    </v-row>
</div>
</template>

<script>
export default {
    data()
    {
        return {
            headers: [
                {text: 'Họ & Tên', value: 'name', align: 'center', sortable: false},
                {text: 'Giới tính', value: 'Gender', align: 'center', sortable: false},
                {text: 'Địa chỉ', value: 'address'},
                {text: 'Số điện thoại', value: 'phone'},
                {text: 'Nội dung', value: 'content'},
                {text: '', value: 'action', align: 'center', sortable: false}
            ]
        }
    }
}
</script>