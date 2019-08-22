<template>
    <div class="form-container">
        <div class="form-config">
            <a-form-item label="模块标题">
                <a-input placeholder="请输入模块标题，无标题则不填写" v-model="setting.columnTitle"/>
            </a-form-item>
            <a-form-item label="扩展设置">
                <a-switch v-model="setting.isMargin"/>
                <a-row v-if="setting.isMargin" :style="{padding:'0 15px 10px 15px',margin:0,background:'#eee',borderRadius:'8px'}">
                    <a-form-item label="模块背景颜色">
                        <a-input v-model="setting.columnBgColor">
                            <span slot="addonBefore" :style="{width:'26px',height:'26px',display:'block',background:setting.columnBgColor}"/>
                        </a-input>
                    </a-form-item>
                    <a-form-item label="'更多'地址">
                        <a-input placeholder="点击模块右上角'更多'时跳转的地址" v-model="setting.moreUrl"/>
                    </a-form-item>
                    <a-col :span="12">
                        <a-form-item label="上边距(像素)">
                            <a-slider v-model="setting.marginTop" :max="300" :step="5"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="下边距(像素)">
                            <a-slider v-model="setting.marginBottom" :max="300" :step="5"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="左边距(像素)">
                            <a-slider v-model="setting.marginLeft" :max="300" :step="5"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="右边距(像素)">
                            <a-slider v-model="setting.marginRight" :max="300" :step="5"/>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form-item>
        </div>
        <div class="form-item" v-for="field in fields" v-if="fields.length > 0">
            <a-form-item label="模块数据">
                    <component v-if="field.type === 'upload'" :ref="field.type" :is="field.type"
                               :minNum="field.config.minNum" :maxNum="field.config.maxNum" :colNum="field.config.colNum"
                               :datas="datas"/>
                    <component v-if="field.type === 'goods'" :ref="field.type"  :is="field.type" :colNum="field.config.colNum" :minNum="field.config.minNum" :datas="datas"/>
            </a-form-item>
        </div>
        <a-alert class="form-tips" :showIcon="false" message="组件没有可配置信息" type="info" v-if="!fields.length" banner/>
    </div>
</template>

<script>
    import upload from '@/components/designer/form/upload';
    import goods from '@/components/designer/form/goods';

    export default {
        name: "dynamic-form",
        components: {
            upload: upload,
            goods: goods
        },
        data() {
            return {
                setting: {
                    columnTitle: '',
                    columnBgColor: '#FFF',
                    isMargin: false,
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 5,
                    marginRight: 5,
                    moreUrl: ''
                },
                componentData: {}
            }
        },
        watch: {
            datas(val,old) {
                this.setting = val.setting;
                this.$set(this,'componentData',val);
            },
        },
        props: {
            fields: {
                type: Array,
                required: true
            },
            datas: Object
        },
        methods: {
            makeData() {
                let self = this;
                let mineData = {};
                if (self.fields.length > 0) {
                    self.fields.map(function (field) {
                        let ref = self.$refs[field.type];
                        self.$set(mineData,field.type,ref[0].getFieldData());
                        self.$set(mineData,'setting',self.setting);
                    })
                }
                return mineData;
            },
            outDatas() {
                console.log(this.datas)
            }
        }
    }
</script>

<style scoped>
    .form-tips {
        margin: 20px;
        text-align: center;
    }

    .form-container {
        padding: 10px;
    }

    .form-container .form-config >>> .ant-form-item {
        margin: 0;
    }
</style>