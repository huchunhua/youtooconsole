<template>
    <div class="WidgetNavigation" :style="{
    marginTop:datas.setting ? datas.setting.marginTop+'px' : '5px',
    marginBottom:datas.setting ? datas.setting.marginBottom+'px' : '5px',
    paddingLeft: datas.setting ? datas.setting.marginLeft+'px' : '5px',
    paddingRight:datas.setting ? datas.setting.marginRight+'px' : '5px',
    backgroundColor:datas.setting ? datas.setting.columnBgColor : '#FFF'}">
        <ul class="navigation-ul">
            <li class="navigation-item" v-if="datas && datas.upload != undefined" v-for="item in datas.upload">
                <img :src="item.imageUrl"/>
                <span>{{item.urlTitle}}</span>
            </li>
            <li class="navigation-item" v-if="!datas || datas.upload == undefined || datas.upload.length <= 0" v-for="i in 8">
                <a-icon type="picture" />
                <span class="sample"/>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        title: '导航(金刚区)',
        name: 'WidgetNavigation',
        visible: true,
        category: 'Basic',
        preview: require('@/assets/images/designer-widget/preview-navigation.png'),
        fields: [
            {
                type:'upload',
                config: {
                    colNum: 3,
                    minNum: 4,
                    maxNum: 16
                }
            }
        ],
        props: {
            datas: Object
        }
    }
</script>
