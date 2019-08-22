import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let stores = [];
const storesContext = require.context('./modules', true, /\.js$/);
storesContext.keys().forEach(module => {
    let moduleName = module.replace('./','').replace('.js','');
    stores[moduleName] = (storesContext(module).default || storesContext(module));
});
export default new Vuex.Store({
    modules: stores
})
