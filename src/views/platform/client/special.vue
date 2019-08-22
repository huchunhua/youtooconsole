<template>
    <div class="special-list">
        <div class="table-toolbar">
            <a-button class="editable-add-btn" type="primary" @click="$router.push({name:'SpecialDesigner'})">添加单页
            </a-button>
        </div>
        <a-table :columns="columns" :dataSource="dataList" :loading="dataLoading" bordered>
            <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            <span slot="pageUrl" slot-scope="pageUrl">
                  <a :href="pageUrl">{{pageUrl}}</a>
            </span>
            <span slot="pageState" slot-scope="pageState">
                <a-switch checkedChildren="可视" unCheckedChildren="禁用" v-model="pageState" disabled/>
            </span>
            <span slot="action" slot-scope="text, record">
                  <a href="javascript:;">编辑</a>
                  <a-divider type="vertical"/>
                  <a href="javascript:;" @click="onRemovePage(record)">删除</a>
            </span>
        </a-table>
    </div>
</template>

<script>
    const columns = [{
        title: '名称',
        dataIndex: 'pageName',
        key: 'pageName',
    }, {
        title: '编号',
        dataIndex: 'pageSerial',
        key: 'pageSerial',
    }, {
        title: '地址',
        dataIndex: 'pageUrl',
        key: 'pageUrl',
        scopedSlots: {customRender: 'pageUrl'},
    }, {
        title: '备注',
        key: 'pageDesc',
        dataIndex: 'pageDesc',
    }, {
        title: '添加时间',
        key: 'pageCreated',
        dataIndex: 'pageCreated',
    }, {
        title: '状态',
        key: 'pageState',
        dataIndex: 'pageState',
        scopedSlots: {customRender: 'pageState'},
    }, {
        title: '操作',
        key: 'action',
        scopedSlots: {customRender: 'action'},
    }];
    export default {
        name: "special",
        data() {
            return {
                columns,
                dataLoading: true,
                dataList: []
            }
        },
        created() {
            let self = this;
            self.$model.designer.getList().then(function (res) {
                self.dataList = res;
                self.dataLoading = false;
            }).catch(function (err) {
                console.log(err)
            })
        },
        methods: {
            onRemovePage(record) {
                let self = this;
                self.$confirm({
                    title: '确认要删除吗?',
                    content: '删除后将不可恢复，请慎重选择',
                    cancelText: '取消',
                    okText: '删除',
                    onOk() {
                        self.$model.designer.delPage({pageId: record.pageId}).then(function (res) {
                            self.dataList.splice(record.key, 1);
                            console.log(self.dataList, record)
                            // self.dataLoading = false;
                        }).catch(function (err) {
                            console.log(err)
                        })
                    }
                });
            },
        }
    }
</script>

<style scoped>
</style>