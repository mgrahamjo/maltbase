const http = require('http'),
    routes = require('./routes'),
    jwt = require('jsonwebtoken'),
    jwksRSA = require('jwks-rsa');

const kid = 'RTU3QkU4MTZDNDU1NDNFRTIzMzMyRkU0MUEwMDhFNDdFN0REMjBFQg';

const jwks = jwksRSA({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: 'https://maltbase.auth0.com/.well-known/jwks.json'
});

const PORT = 8081;

http.createServer((req, res) => {

    function send(status, response = {}) {

        res.setHeader('Access-Control-Allow-Headers', '*');

        res.setHeader('Access-Control-Allow-Methods', '*');

        res.setHeader('Access-Control-Allow-Origin', process.env.MALTBASE_ORIGIN || 'https://maltbase.com');

        res.writeHead(status || 404, {
            'Content-Type': 'application/json'
        });

        res.write(typeof response === 'object' ? JSON.stringify(response) : response);

        res.end();

    }

    function handleError(error, status = 404) {

        console.error(error);

        send(status, error);

    }

    if (req.method === 'OPTIONS') {

        return send(200);

    }

    if (!routes[req.method] || !routes[req.method][req.url]) {

        return handleError('not found');

    }

    const token = req.headers.authorization;
    
    if (!token) {

        return handleError('not found');

    }

    jwks.getSigningKey(kid, (error, key) => {

        if (error) {

            return handleError(error);

        }

        try {

            jwt.verify(token, key.publicKey, {
                algorithms: ['RS256'],
                audience: 'npoVqu0vKZeJgBec_S04_DjpqvntZ2xa'
            }, (error2, user) => {

                if (error2) {

                    return handleError(error2);

                }

                req.user = user;

                req.send = response => send(200, response);

                req.fail = error3 => handleError(error3, 500);

                routes[req.method][req.url](req);

            });

        } catch (error4) {

            handleError(error4);

        }

    });

}).listen(PORT);

console.log(`listening on port ${PORT}`);
