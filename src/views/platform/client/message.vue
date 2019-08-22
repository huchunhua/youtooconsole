<template>
    <div class="message">
    <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="消息推送" key="1">
            <a-form
                :form="form"
              >
                <a-form-item
                  label="推送范围"
                  :label-col="{ span: 5 }"
                  :wrapper-col="{ span: 12 }"
                 >
                    <a-select
                        :defaultValue="range"
                        @change="setRange"
                      >
                        <a-select-option value="1">
                          发送给指定用户
                        </a-select-option>
                        <a-select-option value="2">
                          发送给所有用户
                        </a-select-option>
                    </a-select>
                    <p class="tips">指定消息或者广播的发送范围</p>
                    <a-input placeholder="  请输入接收消息的用户的手机号" v-model="phone" v-if="range == '1'"/>
                </a-form-item>
                <a-form-item
                  label="发送机型"
                  :label-col="{ span: 5 }"
                  :wrapper-col="{ span: 12 }"
                 >
                  <a-select
                    :defaultValue="phonemodel"
                    @change="setPhonemodel"
                  >
                    <a-select-option value="all">
                      所有
                    </a-select-option>
                    <a-select-option value="android">
                      安卓
                    </a-select-option>                    
                    <a-select-option value="ios">
                      IOS
                    </a-select-option>
                  </a-select>
                </a-form-item>                
                <a-form-item
                  label="消息标题"
                  :label-col="{ span: 5 }"
                  :wrapper-col="{ span: 12 }"
                 >
                  <a-input placeholder="请输入推送消息的标题" v-model="msgtitle"/>
                </a-form-item>                
                <a-form-item
                  label="消息内容"
                  :label-col="{ span: 5 }"
                  :wrapper-col="{ span: 12 }"
                 >
                  <a-input placeholder="请输入推送消息的文本内容" v-model="msgcontent"/>
                </a-form-item>
                <a-form-item
                  :wrapper-col="{ span: 12, offset: 5 }"
                >
                  <a-button
                    type="primary"
                    html-type="submit"
                    @click="handleSubmit"
                  >
                    发送
                  </a-button>
                </a-form-item>
            </a-form>
        </a-tab-pane>
        <a-tab-pane tab="推送记录" key="2" forceRender>
            <a-table :columns="columns" :dataSource="data" :pagination=false>
              <span slot="actions" slot-scope="text, record">
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>详情</span>
                  </template>
                  <a-icon type="form"  @click="showModal(record.key)"/>
                </a-tooltip>  
              </span>
            </a-table>
            <a-pagination :current="current" :total="total" :defaultPageSize="pagesize" @change="onChange"/>
            <a-modal
              title="消息详情"
              v-model="visible"
              okText="确认"
              cancelText="关闭"
              @ok="closeModal"
            >
              <p>消息标题:{{detail.title}}</p>
              <p>推送时间:{{detail.create_time}}</p>
              <p>接收电话：{{detail.phone}}</p>
              <p>推送内容：{{detail.content}}</p>
            </a-modal>  
        </a-tab-pane>
    </a-tabs>       
    </div>
<!--     <div class="page-designer">
        <div class="designer-workspace">
            <div class="designer-col col-left" v-if="isDesignerMode">
                <div class="col-title">
                    <span>组件列表</span>
                </div>
                <div class="designer-widget">
                    <a-collapse defaultActiveKey="Basic" :bordered="false">
                        <a-collapse-panel :header="depositoryWidgetCategory[widgetGroupName]" :key="widgetGroupName"
                                          v-for="(widgetGroup,widgetGroupName) in depositoryWidgetList">
                            <div class="widget-item" :key="widgetItem.name" v-for="widgetItem in widgetGroup"
                                 @click="onAddWidgetToDesigner(widgetItem)">
                                <a-tooltip placement="right" title="点击可添加到设计器">
                                    <img :src="widgetItem.preview"/>
                                </a-tooltip>
                                <span>{{widgetItem.title}}</span>
                            </div>
                        </a-collapse-panel>
                    </a-collapse>
                </div>
            </div>
            <div class="designer-col col-middle">
                <div class="col-middle-content">
                    <div class="col-title">
                        <span>首页</span>
                        <span style="color:#999" v-if="!isDesignerMode">已锁定</span>
                        <span style="color:#FF6400;font-size:18px;margin-right: 0;padding-right: 0" v-if="isDesignerMode" @click="onPageConfigMode"><a-icon type="setting" /></span>
                    </div>
                    <div class="page-preview" ref="pagePreview" :style="{backgroundColor:pageConfig.bgColor,backgroundImage:'url('+pageConfig.bgImage+')'}">
                        <vuescroll :ops="vueScrollOps">
                            <draggable class="preview-widget-list" id="preview-widget-list" tag="div" :style="{paddingTop:pageConfig.marginTop + 'px',backgroundColor:pageConfig.bgColor,backgroundImage:'url('+pageConfig.bgImage+')'}"
                                       v-model="previewWidgetList" v-bind="dragOptions" :move="onPreviewWidgetMove"
                                       @start="isDragging=true" @end="isDragging=false">
                                <transition-group type="transition" :name="'flip-list'">
                                    <div :class="'preview-widget preview-widget-index'+pWidgetIndex+' '+((previewWidgetSelected == pWidgetIndex) ? 'preview-widget-selected' : '')"
                                         v-for="(pWidgetItem,pWidgetIndex) in previewWidgetList" :key="pWidgetIndex"
                                         @click="onPreviewWidgetSelect(pWidgetIndex)">
                                        <component :ref="pWidgetItem.name" :is="pWidgetItem.name" :datas="pWidgetItem.datas"/>
                                    </div>
                                </transition-group>
                            </draggable>
                        </vuescroll>
                    </div>
                </div>
                <div class="col-middle-footer">
                    <div class="designer-btns">
                        <a-tooltip v-if="!isDesignerMode" placement="bottom" title="点击进入设计模式以定义该页面">
                            <a-button v-if="!isDesignerMode" class="designer-btn designer-btn-edit" icon="edit"
                                      type="primary" shape="circle" @click="onDesignerMode(true)"/>
                        </a-tooltip>
                        <a-tooltip v-if="isDesignerMode" placement="bottom" title="系统将不会保存你做的任何更改">
                            <a-button v-if="isDesignerMode" class="designer-btn designer-btn-cancel" icon="close"
                                      @click="onDesignerMode(false)">取消
                            </a-button>
                        </a-tooltip>
                        <a-tooltip v-if="isDesignerMode" placement="bottom" title="保存并生成新的页面布局和数据">
                            <a-button v-if="isDesignerMode" class="designer-btn designer-btn-save" icon="check"
                                      type="primary" @click="onSavePageData">保存页面布局/数据
                            </a-button>
                        </a-tooltip>
                    </div>
                </div>
            </div>

            <div class="designer-col col-right" v-if="isDesignerMode">
                <div class="col-title">
                    <span>属性配置{{attributePanelTitle}}</span>
                    <img :src="previewScreenshot"/>
                </div>
                <div class="widget-attribute">
                    <div class="attribute-tips" v-if="!previewWidgetSectData && !pageConfigure">在预览区选中组件即可设置组件属性</div>
                    <div class="page-setting" v-if="pageConfigure" style="padding: 10px 20px">
                        <a-form-item label="页面标题">
                            <a-input v-model="pageConfig.pageTitle"/>
                        </a-form-item>
                        <a-form-item label="页面背景">
                            <a-upload name="imgFile" listType="picture-card" class="setting-uploader" :showUploadList="false" action="http://sichuan.95504.net/v4/common/upload/upload" :beforeUpload="beforeUpload" @change="onPageSettingUploaderChange">
                                <img v-if="pageConfig.bgImage" :src="pageConfig.bgImage" style="max-width: 260px" />
                                <div v-else>
                                    <a-icon :type="pageConfigLoading ? 'loading' : 'plus'" />
                                    <div class="ant-upload-text">上传图片</div>
                                </div>
                            </a-upload>
                        </a-form-item>
                        <a-form-item label="页面背景色">
                            <a-input v-model="pageConfig.bgColor">
                                <span slot="addonBefore" :style="{width:'26px',height:'26px',display:'block',background:pageConfig.bgColor}"/>
                            </a-input>
                        </a-form-item>
                        <a-form-item label="页面上边距(像素)">
                            <a-slider :max="1000" :step="5" v-model="pageConfig.marginTop"/>
                        </a-form-item>
                        <a-form-item label="页面备注(可选)">
                            <a-textarea placeholder="请填写页面备注" v-model="pageConfig.pageDesc" :autosize="{ minRows: 2, maxRows: 6 }" />
                        </a-form-item>
                    </div>
                    <vuescroll :ops="vueScrollOps" v-if="previewWidgetSectData && !pageConfigure">
                        <dynamic-form v-if="!pageConfigure" ref="dynamicForm" :fields="previewWidgetSectData ? previewWidgetSectData.info.fields : []" :datas="previewWidgetSectData.datas"/>
                    </vuescroll>
                </div>
                <div class="designer-action" v-if="previewWidgetSectData && previewWidgetSectData.info.fields.length > 0 && !pageConfigure">
                    <a-button type="primary" @click="onSaveWidgetData" ghost>保存组件数据</a-button>
                </div>
            </div>
        </div>
    </div> -->
</template>

<script>
    import {category, widgets} from '@/components/designer/widget'
    import dynamicForm from '@/components/designer/form'
    import draggable from "vuedraggable";
    import vuescroll from 'vuescroll';

    const columns = [{
      title: '消息标题',
      dataIndex: 'title',
    }, 
    {
      title: '推送时间',
      dataIndex: 'create_time',
    },
    {
      title: '会员电话',
      dataIndex: 'phone',
    },
    {
      title: '设备',
      dataIndex: 'equipment',
    },
    {
      title: '消息类型',
      dataIndex: 'type',
    },
    {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions',
      scopedSlots: { customRender: 'actions' },
    }];

    export default {
        name: "index",
        components: widgets,
        data() {
            return {
                phone:'',
                msgtitle:'',
                msgcontent:'',
                range:'2',
                phonemodel:'all',
                form: this.$form.createForm(this),
                columns,
                data:[],
                visible:false,
                detail:{},
                pagesize:15,
                total:1,
                current:1,
            }
        },
        created() {
            this.$store.dispatch("common/setFullScreen", true);
        },
        computed: {

        },
        watch: {

        },
        methods: {
            setRange(value) {
              const _this = this;
              _this.range = value;
            },
            setPhonemodel(value){
                const _this = this;
                _this.phonemodel = value;
            },
            callback (key) {
                if (key == 2){
                    const _this = this;
                    this.$model.message.getHistory({page:1}).then((response) => {
                        _this.data = response.data;
                        _this.total = response.total;
                    })
                }
            },
            handleSubmit(){
                const _this = this;
                const type = _this.range;
                const platType = _this.phonemodel;
                const phone = _this.phone;
                const title = _this.msgtitle;
                const content = _this.msgcontent;
                if(title == '' || content == ''){
                    this.$message.error('推送消息标题和内容不能为空！');
                }else if (type == 1 & phone == ''){
                    this.$message.warning('请填写接收信息用户的手机号');
                }else{
                    this.$model.message.putMessage({type:type,platType:platType,phone:phone,title:title,content:content}).then((response) => {
                            this.$message.info(response);
                    }).catch(function (error) {
                        _this.$message.error(error);
                    });
                }
            },
            showModal(key) {
                const _this = this;
               this.visible = true;
               _this.detail = _this.data[key]
            },
            closeModal(e){
                this.visible = false
            },
            onChange(current) {
              const _this = this;
              _this.current = current;
                this.$model.message.getHistory({page:current}).then((response) => {
                    console.log(response);
                    _this.data = response.data;
                    _this.total = response.total;
                })
            },
        }
    }
</script>

<style scoped>
.message{
    padding:100px;
}
.tips{
    font-size: 12px;
    line-height: 18px;
    color: #AAA;
    margin-top: 4px;
}
</style>