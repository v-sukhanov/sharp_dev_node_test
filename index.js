const http = require('http')
const fs = require('fs')
const path = require('path')

const port = process.env.PORT ?? 300;

const server = http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    })
    let filePath = path.join(__dirname, 'public', request.url === '/' ? 'index.html' : request.url)
    const ext = path.extname(filePath);
    if (!ext) {
        filePath += '.html'
    }
    fs.readFile(filePath, (err, data) => {
        if (err) {
            fs.readFile(path.join(__dirname, 'public', 'error.html', ), (err, data) => {
                if (err) {
                    response.writeHead(500)
                    response.end('Error');
                } else {
                    response.end(data);
                }

            })
        } else {
            response.end(data)
        }
    })
})


server.listen(port, () => {
    console.log('server has been started')
})


