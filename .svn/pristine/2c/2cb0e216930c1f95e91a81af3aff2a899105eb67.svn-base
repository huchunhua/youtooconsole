import {routes} from '@/router/index'
const navigation = {
    get1stList() {
        let routeList = JSON.parse(JSON.stringify(routes)); //规避浅拷贝下的内存地址共享带来的数据错误
        if(!routeList || routeList.length == 0) return [];
        routeList.map(function (item) {
           delete item.children;
           delete item.component;
        });
        return routeList;
    },
    get2ndList(topKey = 0) {
        let routeList = JSON.parse(JSON.stringify(routes)); //规避浅拷贝下的内存地址共享带来的数据错误
        if(!routeList || routeList.length == 0) return [];
        if(!routeList[topKey] || !routeList[topKey].children || routeList[topKey].children.length == 0) return [];
        let children = routeList[topKey].children;
        children.map(function (item) {
            // delete item.children;
            delete item.component;
            Object.assign(item,{
                parent: topKey
            });
        });
        return children;
    },
    get3rdList(topKey,subKey) {
        let topList = JSON.parse(JSON.stringify(routes)); //规避浅拷贝下的内存地址共享带来的数据错误
        if(!topList || topList.length == 0) return [];
        if(!topList[topKey] || !topList[topKey].children || topList[topKey].children.length == 0) return [];
        let subList = topList[topKey].children;
        if(!subList[subKey] || !subList[subKey].children || subList[subKey].children.length == 0) return [];
        let threeList = subList[subKey].children;
        threeList.map(function (item) {
            delete item.children;
            delete item.component;
        });
        return threeList;

    }
}
export default navigation;