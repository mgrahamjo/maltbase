import uav from 'uav';
import xml2js from 'xml2js';
import ajax from 'util/ajax';

function search() {

    const fr = new FileReader();

    fr.onloadend = e => {

        xml2js.parseString(e.target.result, (error, result) => {

            if (error) {

                return alert('Failed to parse the file.');

            }

            console.log(result);

        });

    };

    const component = uav.component(`
    <div class="search">
        <input class="search-box" type="text" placeholder="SEARCH RECIPES" autofocus u-onkeyup={search}/>
        <div class="or">OR</div>
        <div class="xml-btn" u-onclick={xml}>IMPORT BEERXML</div>
        <input type="file" accept=".xml,.beerxml" class="file-input" u-onchange={upload}/>
    </div>`, {
        xml: () => component._el.lastElementChild.click(),
        upload: e => {

            if (e.target.files.length) {

                fr.readAsText(e.target.files[0]);

            }

        },
        search: e => {

            if (e.which === 13) {

                const query = encodeURIComponent(e.target.value);

                const page = 1;

                ajax.get(`https://www.brewersfriend.com/search/index.php?q=${query}`).then(data => {

                    console.log(data);

                });

            }

        }
    });

    return component;

}

export default search;
