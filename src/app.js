import 'util/polyfills';
import uav from 'uav';
import router from 'uav-router';
import sidebar from 'components/sidebar';
import routes from 'util/routes';
import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyAOMtVuUPIx50vPROVW7DvuHH0qPrrFCPY',
    authDomain: 'maltbase-5cd96.firebaseapp.com',
    databaseURL: 'https://maltbase-5cd96.firebaseio.com',
    projectId: 'maltbase-5cd96',
    storageBucket: '',
    messagingSenderId: '840628496812'
};

firebase.initializeApp(config);

const app = uav.component(`
<div class="wrapper">
    {sidebar}
    {view}
</div>
`, {
    sidebar: null,
    view: null
}, '#app');

router.init(params => {

    const group = params.group || 'brew';

    const view = params.view || 'my-brews';

    app.sidebar = sidebar(group, view);

    firebase.auth().onAuthStateChanged(user => {

        if (user) {

            app.view = routes[group].views[view].view();

        } else {
            
            firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());

        }

    });

    firebase.auth().getRedirectResult();

});

export default app;
