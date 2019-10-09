(function (jsPDFAPI) {
var font = 'undefined';
var callAddFont = function () {
this.addFileToVFS('sans-serif-normal.ttf', font);
this.addFont('sans-serif-normal.ttf', 'sans-serif', 'normal');
};
jsPDFAPI.events.push(['addFonts', callAddFont])
 })(jsPDF.API);