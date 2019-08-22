<template>
    <div class="WidgetGoods" :style="{
    marginTop:datas.setting ? datas.setting.marginTop+'px' : '5px',
    marginBottom:datas.setting ? datas.setting.marginBottom+'px' : '5px',
    paddingLeft: datas.setting ? datas.setting.marginLeft+'px' : '5px',
    paddingRight:datas.setting ? datas.setting.marginRight+'px' : '5px',
    backgroundColor:datas.setting ? datas.setting.columnBgColor : '#FFF'}">
        <div class="WidgetHeader">
            <span>{{datas.setting && datas.setting.columnTitle != '' ? datas.setting.columnTitle : '无标题'}}</span>
            <a :href="datas.setting && datas.setting.moreUrl != '' ? datas.setting.moreUrl : '#'">更多<a-icon type="right" /></a>
        </div>
        <div class="WidgetGoods-goodsListX2 Widget-skeleton" v-if="(!datas || !datas.goods || datas.goods.length <= 0)">
            <a-card hoverable v-for="index in Array(4).keys()">
                <img slot="cover" :src="require('@/assets/images/designer-widget/widget-goods-default.png')"/>
                <a-card-meta title="商品名称">
                    <template slot="description"><span>商品广告语</span><span>￥0.00</span></template>
                </a-card-meta>
            </a-card>
        </div>
        <div class="WidgetGoods-goodsListX2" v-if="(datas && datas.goods && datas.goods.length > 0)">
            <a-tooltip placement="right" :title="item.goods_name" v-for="(item,index) in datas.goods" :key="index">
                <a-card hoverable>
                    <img slot="cover" :src="item.goods_image"/>
                    <a-card-meta :title="item.goods_name">
                        <template slot="description"><span>{{item.goods_jingle}}</span><span>￥{{item.goods_price}}</span></template>
                    </a-card-meta>
                </a-card>
            </a-tooltip>
        </div>
    </div>
</template>

<script>
    export default {
        title: '商品列表(2列)',
        name: 'WidgetGoodsX2',
        visible: true,
        category: 'Goods',
        preview: require('@/assets/images/designer-widget/preview-GoodsX2.png'),
        fields: [
            {
                type:'goods',
                config: {
                    minNum: 2,
                    colNum: 2,
                }
            }
        ],
        props: {
            datas: Object
        }
    }
</script>
