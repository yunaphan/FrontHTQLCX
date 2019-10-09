(function (jsPDFAPI) {
var font = 'undefined';
var callAddFont = function () {
this.addFileToVFS('Open Sans-normal.ttf', font);
this.addFont('Open Sans-normal.ttf', 'Open Sans', 'normal');
};
jsPDFAPI.events.push(['addFonts', callAddFont])
 })(jsPDF.API);