<template>
    <a-layout id="side-layout">
        <a-layout-sider v-model="collapsed" class="layout-sideNavigation" :trigger="null" collapsible>
            <div class="layout-logo"/>
            <a-menu mode="inline" v-model="sideSelectedKeys" :defaultSelectedKeys="sideSelectedKeys"
                    :defaultOpenKeys="sideOpenKeys" :openKeys="sideOpenKeys" @openChange="onOpenChange">
                <a-sub-menu :key="key" v-for="(side,key) in sideMenu">
                    <div slot="title">
                        <a-icon type="user"/>
                        <span>{{side.meta.title}}</span>
                    </div>
                    <a-menu-item :key="key.toString() + index.toString()" v-for="(subItem,index) in side.children"
                                 @click="onLoadPage(subItem)">{{subItem.meta.title}}
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="layout-topNavigation">
                <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="()=> collapsed = !collapsed"/>
                <a-menu mode="horizontal" :defaultSelectedKeys="topSelectedKeys" v-model="topSelectedKeys">
                    <a-menu-item :key="item.name" v-for="(item,index) in topMenu" @click="onLoadSideMenu(index)">
                        {{item.meta.title}}
                    </a-menu-item>
                </a-menu>
            </a-layout-header>
            <a-layout-content class="layout-content" :style="{padding:$store.state.common.isFullScreen ? '0' : '20px'}">
                <div class="layout-pageTitle" v-if="!$store.state.common.isFullScreen">{{$store.state.common.currentPage.meta.title}}</div>
                <div class="layout-pageContainer" :style="{height: $store.state.common.isFullScreen ? '100%' : 'auto'}">
                    <router-view/>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
    export default {
        name: "layout",
        data() {
            return {
                collapsed: false,
                topSelectedKeys: ['Platform'],
                sideSelectedKeys: ['00'],
                sideOpenKeys: [0],
                topMenu: this.$utils.navigation.get1stList(),
                sideMenu: this.$utils.navigation.get2ndList(0)
            }
        },
        created() {
            if (this.sideMenu.length > 0) {
                this.$store.dispatch("common/setCurrentPage", this.sideMenu[0].children[0]);
            } else {
                this.$store.dispatch("common/setCurrentPage", {
                    meta: {
                        title: ''
                    }
                });
            }
        },
        methods: {
            onOpenChange(openKeys) {
                let latestOpenKey = openKeys.find(key => this.sideOpenKeys.indexOf(key) === -1);
                this.sideOpenKeys = latestOpenKey != undefined ? [latestOpenKey] : []
            },
            onLoadSideMenu(index) {
                let sideList = this.$utils.navigation.get2ndList(index);
                if (sideList.length <= 0) {
                    this.$message.warning('该模块下暂无可访问的页面', .5);
                    return;
                }
                this.sideMenu = sideList;
                let firstRoute = sideList[0].children[0];
                if (firstRoute) {
                    this.sideOpenKeys = [0];
                    this.topSelectedKeys = ['Platform'];
                    this.sideSelectedKeys = ['00'];
                    this.$store.dispatch("common/setCurrentPage", firstRoute);
                    this.$router.push({name: firstRoute.name});
                    return;
                }
            },
            onLoadPage(route) {
                this.$store.dispatch("common/setCurrentPage", route);
                this.$router.push({name: route.name});
            }
        }
    }
</script>
<style scoped>
    #side-layout {
        height: 100%;
    }

    #side-layout .layout-logo {
        height: 60px;
        background: #0075f2 url("../assets/images/console-logo.png");
    }

    #side-layout .trigger {
        font-size: 16px;
        line-height: 60px;
        padding: 0 15px;
        cursor: pointer;
        transition: color .3s;
        float: left;
        background: #007dff;
        color: #ddd;
    }

    #side-layout .trigger:hover {
        color: #fff;
    }

    #side-layout .layout-content {
        /*margin: 20px;*/
        /*padding: 15px;*/
        min-height: 280px;
        overflow-y: auto;
    }

    #side-layout .layout-pageTitle {
        width: 100%;
        font-size: 18px;
        font-weight: initial;
        line-height: 18px;
        color: #666;
        padding-bottom: 20px;
        display: inline-block;
        /*border-bottom: 1px dashed #ddd;*/
    }
    #side-layout .layout-pageContainer {
        height:100%;
    }

</style>
