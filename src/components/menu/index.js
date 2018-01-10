import uav from 'uav';
import routes from 'util/routes';
import app from 'app';

function menu() {

    const component = uav.component(`
    <div class="menu">
        <input type="checkbox" class="menu-toggle">
        <div class="nav" u-for="route in Object.keys(routes)">
            <a u-onclick={go(route)}>{route.toUpperCase()}</a>
        </div>
        <div class="hamburger">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
        <div class="logo">MALTBASE</div>
    </div>`, {
        routes,
        go: route => () => {

            app.view = routes[route]();

        }
    });

    return component;

}

export default menu;
