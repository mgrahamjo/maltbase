import uav from 'uav';

function login() {

    login.component = uav.component(`
    <div class="login">
        <div>{foo}</div>
    </div>`, {
        foo: 'bar'
    });

    return login.component;

}

export default login;
