const app = require('app');

const apiURL = location.origin === 'https://maltbase.com' ? 'https://maltbase.com' : 'http://localhost:8081';

function ajax(method) {

    return url => new Promise(resolve => {

        const xhr = new XMLHttpRequest();

        const token = localStorage.getItem('token');

        if (!token) {

            return console.error('Tokenless request attempted.');

        }

        xhr.open(method, apiURL + url);

        xhr.setRequestHeader('Authorization', token);

        xhr.onload = () => {

            if (xhr.status === 200) {

                let data;

                try {

                    data = JSON.parse(xhr.responseText);

                } catch (err) {

                    data = xhr.responseText;

                }

                resolve(data);

            } else if (xhr.status === 404) {

                app.logout();

            } else {

                alert(xhr.responseText);

            }

        };

        xhr.send();

    });

}

ajax.get = ajax('GET');
ajax.put = ajax('PUT');
ajax.post = ajax('POST');
ajax.patch = ajax('PATCH');
ajax.delete = ajax('DELETE');

export default ajax;
