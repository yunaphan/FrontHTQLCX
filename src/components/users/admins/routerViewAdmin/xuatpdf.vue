<template>
    <div class="pdf">
        <v-btn color="success" @click="exportpdf">Download PDF</v-btn>
    </div>
</template>
<script>
import jsPDF from 'jspdf';
import 'jspdf-autotable';
export default {
    name: 'pdf',
    data(){
        return{
            thongtinxuatpdf: [{
                "STT" : '1',
                "Số hiệu": '2',
                "Tên cây xanh": 'abc',
                "Đường kính": '21',
                "Chiều cao": '21',
                "Độ rộng tán": '21',
            },
            {
                "STT" : '2',
                "Số hiệu": '3',
                "Tên cây xanh": 'abcd',
                "Đường kính": '21',
                "Chiều cao": '21',
                "Độ rộng tán": '21',
            },
            ]
        }
    },
    methods: {
        exportpdf(){
            var columns = [
                {title: "STT", dataKey: "objectid"},
                {title: "So Hieu", dataKey: "sohieu"},
                {title: "Ten Cay Xanh", dataKey: "matencx"},
                {title: "Đuong kinh", dataKey: "duongkinh"},
                {title: "Chieu Cao", dataKey: "chieucao"},
                {title: "Đo rong tan", dataKey: "dorongtan"},
            ];
            var doc = new jsPDF('p', 'pt');
            doc.setFont("Roboto-Regular");
            doc.text("Xuất file", 10, 12);
            doc.autoTable(columns, this.thongtinxuatpdf);
            doc.save('baocaocayxanh.pdf')
        }
    },

    
}
</script>