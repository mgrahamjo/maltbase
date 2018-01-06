module.exports = async req => new Promise(resolve => {

    let body = '';

    req.on('data', chunk => {

        body += chunk;

    });

    req.on('end', () => resolve(body));

});
