import Vue from 'vue'
import App from './App.vue'
import utils from '@/utils/index'
import model from '@/model/index'
import store from '@/store/index'
import {router} from '@/router/index'
import axios from 'axios'
import Antd from 'ant-design-vue'
import FastClick from 'fastclick';
import 'ant-design-vue/dist/antd.css'
import '@/assets/styles/base.css'
import '@/assets/styles/widget.css'
import '@/assets/styles/theme.css'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
Vue.config.productionTip = false;

Vue.use(Antd);

Vue.prototype.$http = axios;
Vue.prototype.$model = model;
Vue.prototype.$utils = utils;
FastClick.attach(document.body);

var VM = new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    }
}).$mount('#utoo')
