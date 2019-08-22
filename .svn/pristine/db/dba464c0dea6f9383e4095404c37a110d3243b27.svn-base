<template>
    <div class="WidgetBanner" :style="{
    marginTop:datas.setting ? datas.setting.marginTop+'px' : '5px',
    marginBottom:datas.setting ? datas.setting.marginBottom+'px' : '5px',
    paddingLeft: datas.setting ? datas.setting.marginLeft+'px' : '5px',
    paddingRight:datas.setting ? datas.setting.marginRight+'px' : '5px',
    backgroundColor:datas.setting ? datas.setting.columnBgColor : '#FFF'}">
        <div class="WidgetHeader">
            <span>{{datas.setting && datas.setting.columnTitle != '' ? datas.setting.columnTitle : '无标题'}}</span>
            <a :href="datas.setting && datas.setting.moreUrl != '' ? datas.setting.moreUrl : '#'">更多<a-icon type="right" /></a>
        </div>
        <img :src="(datas && datas.upload) ? datas.upload[0].imageUrl : require('@/assets/images/designer-widget/default-image.png')"/>
    </div>
</template>

<script>
    export default {
        title: '通栏广告',
        name: 'WidgetBanner',
        visible: true,
        category: 'Basic',
        preview: require('@/assets/images/designer-widget/preview-banner.png'),
        fields: [
            {
                type: 'upload',
                config: {
                    colNum: 1,
                    minNum: 1,
                    maxNum: 1
                }
            }
        ],
        props: {
            datas: Object
        }
    }
</script>
<style scoped>
    .WidgetBanner img {
        width: 100%;
        max-height: 150px;
    }
</style>
