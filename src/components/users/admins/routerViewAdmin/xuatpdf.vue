<template>
    <div class="pdf">
        <v-btn color="success" @click="exportPDF">Download PDF</v-btn>
    </div>
</template>
<script>
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
        // exportpdf(){
        //     var columns = [
        //         {title: "STT", dataKey: "objectid"},
        //         {title: "So Hieu", dataKey: "sohieu"},
        //         {title: "Ten Cay Xanh", dataKey: "matencx"},
        //         {title: "Đuong kinh", dataKey: "duongkinh"},
        //         {title: "Chieu Cao", dataKey: "chieucao"},
        //         {title: "Đo rong tan", dataKey: "dorongtan"},
        //     ];
        //     var doc = new jsPDF('p', 'pt');
        //     doc.setFont("Roboto-Regular");
        //     doc.text("Xuất file", 10, 12);
        //     doc.autoTable(columns, this.thongtinxuatpdf);
        //     doc.save('baocaocayxanh.pdf')
        // },
        exportPDF(){
            var docDefinition = {
                content: [
                    {
                        // layout: 'lightHorizontalLines', // optional
                        table: {
                            // headers are automatically repeated if the table spans over multiple pages
                            // you can declare how many rows should be treated as headers
                            headerRows: 1,
                            // widths: [ 'auto' ],

                            body: [
                                [ 
                                    { 
                                        text: 'Objectid', bold: true, fontSize: 9, width: 'auto'
                                        // colSpan: 3,
                                    },
                                    { 
                                        text: 'Số Hiệu', bold: true, fontSize: 9, width: 'auto'
                                    },
                                    { 
                                        text: 'Tên cây xanh', bold: true, fontSize: 9, width: 'auto'
                                    },
                                    { 
                                        text: 'Đường kính', bold: true, fontSize: 9, width: 'auto'
                                    },
                                    { 
                                        text: 'Chiều cao', bold: true, fontSize: 9, width: 'auto'
                                    },
                                    { 
                                        text: 'Độ rộng tán', bold: true, fontSize: 9, width: 'auto'
                                    },
                                    { 
                                        text: 'Ngày trồng', bold: true, fontSize: 9, width: 'auto'
                                    },
                                    { 
                                        text: 'Ngày Cập Nhật', bold: true, fontSize: 9, width: '*'
                                    },
                                    { 
                                        text: 'Thuộc tính', bold: true, fontSize: 9, width: '*'
                                    },
                                    { 
                                        text: 'Ghi chú', bold: true, fontSize: 9, width: '*'
                                    },
                                    { 
                                        text: 'Tình trạng', bold: true, fontSize: 9, width: '*'
                                    },
                                    { 
                                        text: 'Tuyến đường', bold: true, fontSize: 9, width: '*'
                                    },
                                    { 
                                        text: 'Người cập nhật', bold: true, fontSize: 9, width: '*'
                                    },
                                    
                                ],
                               [ 'Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 1', 'Value 2', 'Value 3', 'Value 4','Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 1' ],
                               [ 'Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 1', 'Value 2', 'Value 3', 'Value 4','Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 1' ]
                            // day file tt test
                            // lam cho choboos nó tét cái này thửu xem ntn roooif xuaats thuw di/
                            //xuất thử cho bố nó xem cái cc
                            ]
                        }
                    }
                ]
            }
            pdfMake.createPdf(docDefinition).download('Thongkecayxanh.pdf');
        }
    },

    
}
</script>