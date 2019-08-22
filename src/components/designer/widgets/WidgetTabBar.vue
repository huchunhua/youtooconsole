<template>
    <div class="WidgetTabBar" :style="{
    marginTop:datas.setting ? datas.setting.marginTop+'px' : '5px',
    marginBottom:datas.setting ? datas.setting.marginBottom+'px' : '5px',
    paddingLeft: datas.setting ? datas.setting.marginLeft+'px' : '5px',
    paddingRight:datas.setting ? datas.setting.marginRight+'px' : '5px',
    backgroundColor:datas.setting ? datas.setting.columnBgColor : '#FFF'}">
        <a-tabs defaultActiveKey="1" size="small">
            <a-tab-pane tab="Tab" key="1">{{msg}}</a-tab-pane>
            <a-tab-pane tab="······" key="2"/>
        </a-tabs>
    </div>
</template>

<script>
    export default {
        title: '标签栏',
        name: 'WidgetTabBar',
        visible: false,
        category: 'Basic',
        preview: require('@/assets/images/designer-widget/preview-TabBar.png'),
        props: {
            msg: String
        }
    }
</script>
