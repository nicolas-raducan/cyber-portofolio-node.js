const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path')

const PORT = 8080;

http
    .createServer((request, response) => {
        let filePath = '.' + request.url;
        
        if (filePath === './') {
            filePath = './index.html';
        }

        const extname = String(path.extname(filePath)).toLowerCase();

        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'application/js',
            '.css': 'text/css',
            '.png': 'image/png',
            'jpg': 'image/jpg'
        };

        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    response.writeHead(404, {'Content-Type': 'application/json'});
                    response.end('<h1> 404 - File not found</h1>', 'utf-8');
                } else {
                    response.writeHead(500);
                    response.end("Server Error" + err.code)
                }
            } else {
                response.writeHead(200, {'Content-Type': contentType});
                response.end(content, 'utf-8');
            }
        });
    })

    .listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`)
    });

        // request
        //     .on('error', err => {
        //         console.error(err);
        //     })
        //     .on('data', chunk => {
        //         body.push(chunk);
        //     })
        //     .on('end', () => {
        //         body= Buffer.concat(body).toString();

        //         response.on('error', err => {
        //             console.error(err);
        //         });
            
        //     response.statusCode = 200;
        //     response.setHeader('Content-Type', 'application/json');
            //alt 
            // response.writeHead(200, {'Content-Type': 'application/json'});


            // const responseBody = { headers, method, url, body};

            // response.end(JSON.stringify(responseBody));