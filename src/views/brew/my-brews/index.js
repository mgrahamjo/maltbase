import uav from 'uav';
import ajax from 'util/ajax';

function myBrews() {

    myBrews.component = uav.component(`
    <div class="view my-brews">
        <h2>MY BREWS</h2>
        {brews}
    </div>`, {
        brews: null
    });

    ajax.get('/my-brews').then(data => {

        myBrews.component.brews = JSON.stringify(data);

        console.log(data);

    });

    return myBrews.component;

}

export default myBrews;
