import 'util/polyfills';
import uav from 'uav';
import router from 'uav-router';
import sidebar from 'components/sidebar';
import Auth0Lock from 'auth0-lock';
import routes from 'util/routes';

const app = uav.component(`
<div class="wrapper">
    {sidebar}
    {view}
</div>
`, {
    sidebar: null,
    view: null
}, '#app');

const lock = new Auth0Lock('npoVqu0vKZeJgBec_S04_DjpqvntZ2xa', 'maltbase.auth0.com', {
    autoclose: true,
    autofocus: true,
    closable: false,
    autoParseHash: false,
    responseType: 'token'
});

function handleError(error) {

    alert(error);

}

function resumeAuth() {

    lock.resumeAuth(location.hash, (error, authResult) => {

        if (error) {

            return handleError(error);

        }

        localStorage.setItem('accessToken', authResult.accessToken);

        lock.getUserInfo(authResult.accessToken, (error2, profile) => {

            if (error2) {

                return handleError(error2);

            }

            localStorage.setItem('profile', JSON.stringify(profile));

        });

    });

}

router.init(params => {

    const group = params.group || 'brew';

    const view = params.view || 'my-brews';

    app.sidebar = sidebar(group, view);

    if (localStorage.getItem('accessToken')) {

        app.view = routes[group].views[view].view();

    } else if (params.access_token) {

        resumeAuth();

    } else {

        lock.show();

    }

});

export default app;
