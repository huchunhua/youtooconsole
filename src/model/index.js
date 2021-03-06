import qs from 'qs'
import axios from 'axios'
import utils from '@/utils/index'
import store from '@/store/index'

let modules = [];
const modulesContext = require.context('./modules', true, /\.js$/);

modulesContext.keys().forEach(module => {
    let moduleName = module.replace('./','').replace('.js','');
    modules[moduleName] = (modulesContext(module).default || modulesContext(module));
});
axios.interceptors.request.use(
    config => {
        store.dispatch("common/onLoading");
        config.baseURL = 'http://sichuan.95504.net/v4/console';
        let _token = utils.cookie.get('token');
        if (utils.common.test.open && !_token) {
            utils.cookie.set('token', utils.common.test.token);
        }
        if (_token) {
            // if(utils.common.test.open) Toast(_token);
            if (typeof(config.data) == "undefined") {
                config.data = {token: _token};
            } else {
                config.data.token = _token;
            }
        }
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        if (config.method === 'post') {
            config.data = qs.stringify(config.data)
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
axios.interceptors.response.use(response => {
    let resultData = response.data;
    if (resultData.code == 200) {
        store.dispatch("common/onLoaded");
        return resultData.data;
    }else{
        return Promise.reject(resultData.msg)
    }
}, error => {
    store.dispatch("common/onLoaded");
    return Promise.reject(error)
});
export default new Object(modules);
