<template>
    <div class="WidgetSeriesB" :style="{
    marginTop:datas.setting ? datas.setting.marginTop+'px' : '5px',
    marginBottom:datas.setting ? datas.setting.marginBottom+'px' : '5px',
    paddingLeft: datas.setting ? datas.setting.marginLeft+'px' : '5px',
    paddingRight:datas.setting ? datas.setting.marginRight+'px' : '5px',
    backgroundColor:datas.setting ? datas.setting.columnBgColor : '#FFF'}">
        <div class="WidgetHeader">
            <span>{{datas.setting && datas.setting.columnTitle != '' ? datas.setting.columnTitle : '无标题'}}</span>
            <a :href="datas.setting && datas.setting.moreUrl != '' ? datas.setting.moreUrl : '#'">更多<a-icon type="right" /></a>
        </div>
        <div class="seriesb-banner">
            <img :src="require('@/assets/images/designer-widget/default-image.png')" v-if="!datas || datas.upload == undefined"/>
            <img :src="datas.upload[0].imageUrl" v-if="datas && datas.upload != undefined"/>
        </div>
        <ul class="seriesb-ul">
            <li class="seriesb-item" v-if="!datas || datas.upload == undefined" v-for="i in 3">
                <img :src="require('@/assets/images/designer-widget/default-image.png')"/>
            </li>
            <li class="seriesb-item" v-if="datas && datas.upload != undefined">
                <img :src="datas.upload[1].imageUrl"/>
            </li>
            <li class="seriesb-item" v-if="datas && datas.upload != undefined">
                <img :src="datas.upload[2].imageUrl"/>
            </li>
            <li class="seriesb-item" v-if="datas && datas.upload != undefined">
                <img :src="datas.upload[3].imageUrl"/>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        title: '专题',
        name: 'WidgetSeriesB',
        visible: true,
        category: 'Basic',
        preview: require('@/assets/images/designer-widget/preview-seriesb.png'),
        fields: [
            {
                type:'upload',
                config: {
                    colNum: 1,
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
