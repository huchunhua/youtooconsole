<template>
    <div class="WidgetBasicSlider" :style="{
    marginTop:datas.setting ? datas.setting.marginTop+'px' : '5px',
    marginBottom:datas.setting ? datas.setting.marginBottom+'px' : '5px',
    paddingLeft: datas.setting ? datas.setting.marginLeft+'px' : '5px',
    paddingRight:datas.setting ? datas.setting.marginRight+'px' : '5px',
    backgroundColor:datas.setting ? datas.setting.columnBgColor : '#FFF'}">
        <a-carousel autoplay :autoplaySpeed="3000">
            <div v-if="datas && datas.upload != undefined" v-for="item in datas.upload">
                <img :src="item.imageUrl"/>
            </div>
            <div v-if="!datas || datas.upload == undefined" v-for="i in 3"><h3>Width:720px/Height:288px/Proportion:20:8</h3></div>
        </a-carousel>
    </div>
</template>

<script>
    export default {
        title: '基础轮播',
        name: 'WidgetBasicSlider',
        visible: true,
        category: 'Basic',
        preview: require('@/assets/images/designer-widget/preview-BasicSlider.png'),
        fields: [
            {
                type:'upload',
                config: {
                    colNum: 1,
                    minNum: 1,
                    maxNum: 5
                }
            }
        ],
        props: {
            datas: Object
        }
    }
</script>
