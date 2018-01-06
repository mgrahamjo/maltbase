import uav from 'uav';
import app from 'app';
import routes from 'util/routes';
import router from 'uav-router';

function sidebar(group, view) {

    sidebar.component = uav.component(`
    <div class="sidebar">
        <div class="nav-item logo"><strong>MALT</strong>BASE</div>
        <div u-for="group in Object.keys(routes)">
            <div u-class="nav-group {activeGroup === group && 'active'}">
                <div class="nav-item nav-group-name" u-onclick={toggleGroup(group)}>
                    <span u-class="{routes[group].icon}"></span> {routes[group].name}
                </div>
                <div class="nav-group-items" u-for="view in Object.keys(routes[group].views)">
                    <div u-class="nav-item {activeView === view && 'active'}" u-onclick={go(view)}>
                        <span class="ion-ios-arrow-forward"></span> {routes[group].views[view].name}
                    </div>
                </div>
            </div>
        </div>
    </div>`, {
        activeGroup: group,
        activeView: view,
        toggleGroup: groupId => () => {

            if (sidebar.component.activeGroup === groupId) {

                sidebar.component.activeGroup = null;

            } else {

                sidebar.component.activeGroup = groupId;

            }

        },
        go: viewId => () => {

            sidebar.component.activeView = viewId;

            const groupId = sidebar.component.activeGroup;

            router.url.set({groupId, viewId});

            app.view = routes[groupId].views[viewId].view();

        },
        routes
    });

    return sidebar.component;

}

export default sidebar;
