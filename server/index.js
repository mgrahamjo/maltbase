const http = require('http'),
    routes = require('./routes');

const PORT = 8081;

http.createServer((req, res) => {

    function send(status, response = {}) {

        res.setHeader('Access-Control-Allow-Headers', '*');

        res.setHeader('Access-Control-Allow-Methods', '*');

        res.setHeader('Access-Control-Allow-Origin', process.env.MALTBASE_ORIGIN || 'https://maltbase.com');

        res.writeHead(status || 404, {
            'Content-Type': 'application/json'
        });

        res.write(JSON.stringify(response));

        res.end();

    }

    if (!routes[req.method] || !routes[req.method][req.url]) {

        send(404);

    } else {

        send(routes[req.method][req.url](req));

    }

}).listen(PORT);

console.log(`listening on port ${PORT}`);
