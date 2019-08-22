<template>
    <div class="WidgetGrid4" :style="{
    marginTop:datas.setting ? datas.setting.marginTop+'px' : '5px',
    marginBottom:datas.setting ? datas.setting.marginBottom+'px' : '5px',
    paddingLeft: datas.setting ? datas.setting.marginLeft+'px' : '5px',
    paddingRight:datas.setting ? datas.setting.marginRight+'px' : '5px',
    backgroundColor:datas.setting ? datas.setting.columnBgColor : '#FFF'}">
        <div class="WidgetHeader">
            <span>{{datas.setting && datas.setting.columnTitle != '' ? datas.setting.columnTitle : '无标题'}}</span>
            <a :href="datas.setting && datas.setting.moreUrl != '' ? datas.setting.moreUrl : '#'">更多
                <a-icon type="right"/>
            </a>
        </div>
        <div class="grid4-content">
            <div class="grid4-col">
                <img :src="(datas && datas.upload) ? datas.upload[0].imageUrl : require('@/assets/images/designer-widget/default-image.png')"
                     width="173"/>
                <img :src="(datas && datas.upload) ? datas.upload[1].imageUrl : require('@/assets/images/designer-widget/default-image.png')"
                     width="173"/>
            </div>
            <div class="grid4-col">
                <img :src="(datas && datas.upload) ? datas.upload[2].imageUrl : require('@/assets/images/designer-widget/default-image.png')"
                     width="173"/>
                <img :src="(datas && datas.upload) ? datas.upload[3].imageUrl : require('@/assets/images/designer-widget/default-image.png')"
                     width="173"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        title: '四宫格',
        name: 'WidgetGrid4',
        visible: true,
        category: 'Basic',
        preview: require('@/assets/images/designer-widget/preview-4x.png'),
        fields: [
            {
                type: 'upload',
                config: {
                    colNum: 2,
                    minNum: 4,
                    maxNum: 4
                }
            }
        ],
        props: {
            datas: Object
        }
    }
</script>
