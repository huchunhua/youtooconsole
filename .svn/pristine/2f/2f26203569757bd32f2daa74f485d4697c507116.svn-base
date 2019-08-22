import Vue from 'vue'
import Utils from '@/utils/index'
import store from '@/store/index'
import Router from 'vue-router'

Vue.use(Router);

let routes = [];
const routeContext = require.context('./modules', true, /\.js$/);
routeContext.keys().forEach(route => {
    routes = [...routes, ...(routeContext(route).default || routeContext(route))]
});
routes.sort(function(a,b){
    return a["sort"]-b["sort"];
});
const router = new Router({mode: 'history', routes: routes});
router.beforeEach((to, from, next) => {
    store.dispatch("common/setFullScreen", false);
    if (to.meta.title) document.title = to.meta.title;
    // if(Utils.common.test.open) Utils.cookie.set('token', Utils.common.test.token);
    // if (to.meta.requireAuth) {
    //     if (Utils.cookie.get('token')) {
    //         next();
    //     } else {
    //         router.push({name: 'Login'});
    //     }
    //     return;
    // }
    next();
});
export {router,routes};