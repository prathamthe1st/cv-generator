function Export2Doc(element, filename = '') {
    var html = document.getElementById(element).innerHTML;

    // Prepare the final HTML with a document wrapper
    var fullHtml = `<!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <style>
                table {border-collapse: collapse; border-spacing: 0;}
                td {padding: 6px;}
            </style>
        </head>
        <body>${html}</body>
    </html>`;

    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(fullHtml);

    filename = filename ? filename + '.doc' : 'document.doc';

    var downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', fullHtml], { type: 'application/msword' });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        downloadLink.href = url;
        downloadLink.download = filename;
        downloadLink.click();
    }

    document.body.removeChild(downloadLink);
}
