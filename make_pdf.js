/**
 * Web Page: http://phantomjs.org/api/webpage/
 */
var page = require('webpage').create(),
    system = require('system'),
    url, fileName;
if (system.args.length === 1) {
    console.log("Usage: phantom  make_pdf.js  <url>  [fileName.pdf]");
    phantom.exit(0);
}
url = system.args[1];

var userCookie = '';
/**
 * addCookie: http://phantomjs.org/api/webpage/method/add-cookie.html
 */
phantom.addCookie({
    'name'     : 'user_info',   /* required property */
    'value'    : userCookie,    /* required property */
    'domain'   : '/',
    'path'     : '/',           /* required property */
    'httponly' : true,
    'secure'   : false,
    'expires'  : (new Date()).getTime() + (1000 * 60 * 60)   /* <-- expires in 1 hour */
});
page.open(url, function (status) {
    if (status === 'success') {
        console.log('pageTitle: ' + page.title);
        fileName = system.args[2] || page.title + '.pdf';
        console.log('generating: ' + fileName + '  ...');
        /**
         * docs: http://phantomjs.org/api/webpage/property/paper-size.html
         */
        page.paperSize = {
            // format: 'A3', // 'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'
            width: '297mm', // 'mm', 'cm', 'in', 'px'. No unit means 'px'.
            height: '179mm',
            margin: {
                // top: '50px',
                // left: '20px'
            },
            orientation: 'landscape', // 'portrait'(default), 'landscape'
            border: '0',
            // header: {
            //     height: "1.2cm",
            //     contents: phantom.callback(function (pageNum, numPages) {
            //         return "<h1>Header <span style='float:right'>" + pageNum + " / " + numPages + "</span></h1>";
            //     })
            // }
        };
        page.zoomFactor = 1.5; // 页面缩放
        /**
         * docs: http://phantomjs.org/api/webpage/method/render.html
         * render(filename [, {format, quality}]) {void}
         * eg: page.render('google_home.jpeg', {format: 'jpeg', quality: '100'})
         */
        page.render(fileName);
        console.log('status: done');
    } else {
        console.log('err: failed to load the page');
    }
    phantom.exit(0);
});
