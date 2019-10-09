(function (jsPDFAPI) {
var font = 'undefined';
var callAddFont = function () {
this.addFileToVFS('Roboto-Regular-normal.ttf', font);
this.addFont('Roboto-Regular-normal.ttf', 'Roboto-Regular', 'normal');
};
jsPDFAPI.events.push(['addFonts', callAddFont])
 })(jsPDF.API);