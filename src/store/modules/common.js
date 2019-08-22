export default {
    namespaced: true,
    state: {
        isFullScreen: false,
        requestLoaded: false,
        currentPage: {},

    },
    mutations: {
        onLoading(state) {
            state.requestLoaded = false;
        },
        onLoaded(state) {
            state.requestLoaded = true;
        },
        setCurrentPage(state,page) {
            state.currentPage = page;
        },
        setFullScreen(state,value) {
            state.isFullScreen = value;
        }
    },
    actions: { //异步方法->外部使用的方法
        onLoading({commit}, code) {
            commit("onLoading");//间接调用mutations
        },
        onLoaded({commit}, code) {
            commit("onLoaded");
        },
        setCurrentPage({commit}, page) {
            commit("setCurrentPage",page);
        },
        setFullScreen({commit},value) {
            commit("setFullScreen",value);
        }
    }
};