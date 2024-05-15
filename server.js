const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port to run the server on
const port = 8080;

// Create the server
http.createServer((request, response) => {
    console.log(`Request for ${request.url} received.`);

    // Set the base directory to the project folder
    const baseDir = __dirname; // __dirname points to the current directory where the script is located

    // Parse the requested URL
    let filePath = path.join(baseDir, request.url);
    if (filePath === baseDir + path.sep) {
        filePath = path.join(baseDir, 'index.html');
    }

    // Get the file extension
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Read the requested file from the file system
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found, serve 404 page
                fs.readFile(path.join(baseDir, '404.html'), (error404, content404) => {
                    if (error404) {
                        response.writeHead(500);
                        response.end(`Sorry, there was an error: ${error404.code} ..\n`);
                    } else {
                        response.writeHead(404, { 'Content-Type': 'text/html' });
                        response.end(content404, 'utf-8');
                    }
                });
            } else {
                response.writeHead(500);
                response.end(`Sorry, there was an error: ${error.code} ..\n`);
            }
        } else {
            // Serve the requested file
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
