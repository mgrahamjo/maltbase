import 'util/polyfills';
import uav from 'uav';
import router from 'uav-router';
import menu from 'components/menu';
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
    {menu}
    {view}
</div>
`, {
    menu: menu(),
    view: null
}, '#app');

router.init(params => {

    app.view = routes[params.view || 'search']();

    firebase.auth().onAuthStateChanged(user => {

        if (user) {

            // Do something for users

        } else {
            
            // firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());

        }

    });

    firebase.auth().getRedirectResult();

});

export default app;
