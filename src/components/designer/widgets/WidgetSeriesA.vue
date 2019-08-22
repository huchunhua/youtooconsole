<template>
    <div class="WidgetSeriesA" :style="{
    marginTop:datas.setting ? datas.setting.marginTop+'px' : '5px',
    marginBottom:datas.setting ? datas.setting.marginBottom+'px' : '5px',
    paddingLeft: datas.setting ? datas.setting.marginLeft+'px' : '5px',
    paddingRight:datas.setting ? datas.setting.marginRight+'px' : '5px',
    backgroundColor:datas.setting ? datas.setting.columnBgColor : '#FFF'}">
        <div class="WidgetHeader">
            <span>{{datas.setting && datas.setting.columnTitle != '' ? datas.setting.columnTitle : '无标题'}}</span>
            <a :href="datas.setting && datas.setting.moreUrl != '' ? datas.setting.moreUrl : '#'">更多<a-icon type="right" /></a>
        </div>
        <div class="seriesa-ul">
            <vuescroll :ops="vueScrollOps">
                <div class="seriesa-item" v-if="!datas || datas.upload == undefined" v-for="i in 4">
                    <img :src="require('@/assets/images/designer-widget/default-image.png')"/>
                </div>
                <div class="seriesa-item" v-if="datas && datas.upload != undefined" v-for="item in datas.upload">
                    <img :src="item.imageUrl"/>
                </div>
            </vuescroll>
        </div>
    </div>
</template>

<script>
    import vuescroll from 'vuescroll';

    export default {
        title: '系列',
        name: 'WidgetSeriesA',
        visible: true,
        category: 'Basic',
        preview: require('@/assets/images/designer-widget/preview-seriesa.png'),
        components: {
            vuescroll: vuescroll
        },
        data() {
            return {
                vueScrollOps: {
                    bar: {
                        background: '#999',
                        keepShow: true,
                        size: '5px',
                        minSize: 0.2
                    },
                }
            }
        },
        fields: [
            {
                type: 'upload',
                config: {
                    colNum: 3,
                    minNum: 4,
                    maxNum: 20
                }
            }
        ],
        props: {
            datas: Object
        }
    }
</script>
