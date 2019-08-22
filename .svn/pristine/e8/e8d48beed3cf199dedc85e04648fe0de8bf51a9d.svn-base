<template>
    <div class="designer-goods-container">
        <div class="goods-header">
            <a-button style="width: 100%" @click="onModalShow">
                <a-icon type="plus"/>
                添加商品
            </a-button>
        </div>
        <div class="goods-body">
            <div class="data-list">
                <a-row :gutter="5">
                    <a-col :span="24 / colNum" :style="{marginBottom: '5px'}" v-for="(item,index) in mineData" :key="index">
                        <a-card class="data-item" hoverable>
                            <img :src="item.goods_image" slot="cover"/>
                            <template class="ant-card-actions" slot="actions">
                                <a-tooltip placement="bottom" title="删除该商品">
                                    <span style="color: red" @click="onDataDel"><a-icon type="delete"/></span>
                                </a-tooltip>
                            </template>
                            <a-card-meta :title="item.goods_name" :description="'￥'+item.goods_price"/>
                        </a-card>
                    </a-col>
                </a-row>
            </div>
        </div>
        <a-modal class="designer-modal" v-model="modalIsVisible" :maskClosable="false" :destroyOnClose="true" okText="保存" cancelText="取消" :closable="false" @ok="onModalSubmit">
            <a-form :form="form">
            <a-form-item label="商品SKU" >
                <a-input-search v-decorator="['goodsId',{rules: [{ required: true, pattern: /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/ , message: '请输入数字组成的优途商品SKU(商品ID)并点击检索按钮' }]}]" placeholder="请输入优途商品SKU" @search="onModalSearch">
                    <a-button slot="enterButton">检索商品</a-button>
                </a-input-search>
            </a-form-item>
            </a-form>
            <div class="modal-goods" v-if="dataTemp">
                <div class="goods-image">
                    <img :src="dataTemp.goods_image"/>
                </div>
                <div class="goods-info">
                    <h4>{{dataTemp.goods_name}}</h4>
                    <p>{{dataTemp.goods_jingle}}</p>
                    <p>
                        <span>￥{{dataTemp.goods_price}}</span>
                        <span>￥{{dataTemp.goods_marketprice}}</span>
                        <span>库存:{{dataTemp.goods_storage}}</span>
                    </p>
                </div>
            </div>
        </a-modal>
    </div>
</template>
<script>
    export default {
        name: "goods",
        data() {
            return {
                isEditMode: false,
                form: this.$form.createForm(this),
                modalIsVisible:false,
                dataList: [],
                dataTemp: null
            }
        },
        props: {
            minNum: {
                type: Number | String,
                default: 1
            },
            colNum: {
                type: Number | String,
                default: 24
            },
            datas: Object
        },
        computed:{
            mineData:function () {
                let self = this;
                if(!self.isEditMode) {
                    self.dataList = [];
                }
                if(self.datas.goods && self.datas.goods.length > 0){
                    self.dataList = self.datas.goods;
                }
                return this.dataList;
            }
        },
        methods: {
            onModalShow() {
                this.modalIsVisible = true;
            },
            onModalSearch() {
                let self = this;
                self.form.validateFields(
                    (err) => {
                        if (!err) {
                            let fieldsValue = self.form.getFieldsValue();
                            self.$model.designer.goods({id:fieldsValue.goodsId}).then(function (res) {
                                self.dataTemp = res;
                            }).catch(function (err) {
                                self.$message.error(err);
                            });
                        }
                    },
                );
            },
            onModalSubmit(e) {
                let self = this;
                self.isEditMode = true;
                self.form.validateFields(
                    (err) => {
                        if (err) {
                            return;
                        }
                        if(!self.dataTemp) {
                            self.$message.error('请确保检索出了一个商品');
                            return;
                        }
                        self.modalIsVisible = false;
                        self.dataList.push(self.dataTemp);
                        self.dataTemp = null;
                        // console.log(self.dataTemp)
                    },
                );
            },
            onDataDel(index) {
                if (this.dataList.length <= this.minNum) {
                    this.$message.error('该组件至少需要' + this.minNum + '个项目');
                    throw new Error('组件数据不足');
                } else {
                    this.dataList.splice(index, 1);
                }
            },
            getFieldData() {
                let self = this,datas = [];
                if (self.dataList.length < this.minNum) {
                    self.$message.error('该组件至少需要' + this.minNum + '个项目');
                    throw new Error('组件数据不足');
                }
                if (self.dataList.length > 0) {
                    self.dataList.map(function (item) {
                        datas.push(item)
                    })
                }
                self.isEditMode = false;
                return datas;
            }
        }
    }
</script>

<style scoped>
    .designer-goods-container {
        /*padding: 10px;*/
        height: 100%;
        position: relative;
    }

    .designer-goods-container .goods-body {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 42px;
    }

    .designer-goods-container .goods-body .data-list {
        padding: 10px;
    }

    .designer-goods-container .goods-body .data-item {
        border: 1px dashed #ccc;
        width: 100%;
        padding: 4px;
        margin-bottom: 10px;
    }

    .designer-goods-container .goods-body .data-item:last-child {
        margin-bottom: 0;
    }
    .designer-goods-container .goods-body .data-item>>>.ant-card-body{
        padding:10px 5px;
    }
    .designer-goods-container .goods-body .data-item>>>.ant-card-body .ant-card-meta-title{
        font-size: 12px;
        margin: 0;
    }

    .designer-goods-container .goods-body .data-item>>>.ant-card-body .ant-card-meta-description {
        color: #ff6700;
    }
    .designer-goods-container .goods-body .data-item>>>.ant-card-actions li{
        margin: 5px 0;
    }
    .designer-modal .modal-goods {
        display: flex;
        padding: 10px;
        margin-top: 10px;
        border:1px dashed #1890ff;
    }
    .designer-modal .modal-goods .goods-image img{
        width: 100px;
        height: 100px;
    }
    .designer-modal .modal-goods .goods-info {
        padding: 0 10px;
    }
    .designer-modal .modal-goods .goods-info h4,.designer-modal .modal-goods .goods-info p {
        margin: 0;
    }
    .designer-modal .modal-goods .goods-info h4 {
        font-size: 16px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        line-height: 24px;
        height: 48px;
        margin-bottom: 10px;
    }
    .designer-modal .modal-goods .goods-info p {
        font-size: 12px;
    }
    .designer-modal .modal-goods .goods-info p span{
        font-size: 16px;
        font-weight: bold;
        color: #FF6700;
    }
    .designer-modal .modal-goods .goods-info p span:nth-child(2){
        color: #666;
        font-size: 14px;
        font-weight: normal;
        text-decoration: line-through;
    }
    .designer-modal .modal-goods .goods-info p span:last-child{
        color: #666;
        font-size: 14px;
        font-weight: normal;
        float: right;
    }
</style>