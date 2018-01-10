function ajax(method) {

    return url => new Promise(resolve => {

        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.onload = () => {

            if (xhr.status === 200) {

                let data;

                try {

                    data = JSON.parse(xhr.responseText);

                } catch (err) {

                    data = xhr.responseText;

                }

                resolve(data);

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
