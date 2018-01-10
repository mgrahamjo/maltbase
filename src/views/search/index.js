import uav from 'uav';
import xml2js from 'xml2js';

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
        <input class="search-box" type="text" placeholder="SEARCH RECIPES" autofocus/>
        <div class="or">OR</div>
        <div class="xml-btn" u-onclick={xml}>IMPORT BEERXML</div>
        <input type="file" accept=".xml,.beerxml" class="file-input" u-onchange={upload}/>
    </div>`, {
        xml: () => component._el.lastElementChild.click(),
        upload: e => {

            if (e.target.files.length) {

                fr.readAsText(e.target.files[0]);

            }

        }
    });

    return component;

}

export default search;
