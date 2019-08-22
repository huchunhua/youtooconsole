export default {
    namespaced: true,
    state: {
        addedWidgetName: ''

    },
    mutations: {
        setAddedWidgetName(state,value) {
            state.addedWidgetName = value;
        }
    },
    actions: {
        setAddedWidgetName({commit},value) {
            commit("setAddedWidgetName",value);
        },
    }
};