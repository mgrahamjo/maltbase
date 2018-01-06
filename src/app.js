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

app.logout = () => {

    localStorage.removeItem('token');

    localStorage.removeItem('profile');

    app.load();

};

const lock = new Auth0Lock('npoVqu0vKZeJgBec_S04_DjpqvntZ2xa', 'maltbase.auth0.com', {
    display: {
        autoclose: true,
        autofocus: true,
        closable: false
    },
    auth: {
        autoParseHash: false,
        responseType: 'token id_token',
        connectionScopes: {
            google: ['openid', 'email', 'given_name', 'picture']
        }
    }
});

function handleError(error) {

    console.error(error);

    lock.show({
        flashMessage: {
            type: 'error',
            text: 'Something went wrong.'
        }
    });

}

function resumeAuth() {

    lock.resumeAuth(location.hash, (error, authResult) => {

        location.hash = '';

        if (error) {

            return handleError(error);

        }

        localStorage.setItem('token', authResult.idToken);

        localStorage.setItem('profile', JSON.stringify(authResult.idTokenPayload));

    });

}

router.init(params => {

    const group = params.group || 'brew';

    const view = params.view || 'my-brews';

    app.sidebar = sidebar(group, view);

    if (localStorage.getItem('token')) {

        app.view = routes[group].views[view].view();

    } else if (params.id_token) {

        resumeAuth();

    } else {

        lock.show();

    }

});

export default app;
