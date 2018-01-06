import uav from 'uav';

function myBrews() {

    myBrews.component = uav.component(`
    <div class="view my-brews">
        <h2>MY BREWS</h2>
    </div>`, {
        foo: 'bar'
    });

    return myBrews.component;

}

export default myBrews;
