<template>
    <div>
        <div>
            <a-select defaultValue="1" style="width: 120px" @change="handleTimetypeChange">
              <a-select-option value="1">日结时间</a-select-option>
              <a-select-option value="2">自然时间</a-select-option>
            </a-select>
            <a-range-picker style="margin-right:20px" :defaultValue="[moment('2019/01/01', dateFormat), moment('2019/06/01', dateFormat)]" :format="dateFormat" @change="onTimeChange">
              <template slot="dateRender" slot-scope="current">
                <div class="ant-calendar-date" :style="getCurrentStyle(current)">
                  {{current.date()}}
                </div>
              </template>
            </a-range-picker>
            <a-button type="primary" style="margin:0 20px" @click="getData">确定</a-button>
            <a-button type="primary" @click="Download">导出</a-button>
        </div>
        <div style="background-color: #ececec; padding: 20px;margin:30px 0">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-card title="今日油品销售" :bordered=false>
                    <span style="padding:20px">销售金额：{{today_sale_oil}}元</span>
                    <a-divider type="vertical" />
                    <span style="padding:20px">优惠金额：{{today_discount_oil}}元</span>
                    <a-divider type="vertical" />
                    <span style="padding:20px">实付金额：{{today_pay_oil}}元</span>
                </a-card>
              </a-col>
              <a-col :span="8">
                <a-card title="今日非油销售" :bordered=false>
                    <span style="padding:20px">销售金额：{{today_sale_goods}}元</span>
                    <a-divider type="vertical" />
                    <span style="padding:20px">优惠金额：{{today_discount_goods}}元</span>
                    <a-divider type="vertical" />
                    <span style="padding:20px">实付金额：{{today_pay_goods}}元</span>
                </a-card> 
              </a-col>
              <a-col :span="8">
                <a-card title="今日销售总额" :bordered=false>
                    <span style="padding:20px">销售金额：{{today_sale_all}}元</span>
                    <a-divider type="vertical" />
                    <span style="padding:20px">优惠金额：{{today_discount_all}}元</span>
                    <a-divider type="vertical" />
                    <span style="padding:20px">实付金额：{{today_pay_all}}元</span>
                </a-card>   
              </a-col>
            </a-row>
        </div>
        <a-table :columns="columns" :dataSource="data" :pagination=false>
          <span slot="actions" slot-scope="text, record">
            <a-tooltip placement="top">
              <template slot="title">
                <span>查看</span>
              </template>
              <a-icon type="form"  @click="goCompany(record.companyCode)"/>
            </a-tooltip> 
          </span>
        </a-table>
        <template>
          <a-pagination :current="current" :total="total" :defaultPageSize='pagesize' @change="onChange"/>
        </template> 
    </div>
</template>
<script>
  import moment from 'moment';
    const companys = [
    { 
      value:1,
      name:'成品油公司'
    },{
      value:2,
      name:'成都公司'
    }];
    const columns = [
        {
          title: '公司编码',
          dataIndex: 'companyCode',
        },
        {
          title: '公司名称',
          dataIndex: 'companyName',
        },
        {
          title: '销售合计（元）',
          dataIndex: 'sale_all',
        },
        {
          title: '优惠合计（元）',
          dataIndex: 'discount_all',
        },
        {
          title: '实际支付（元）',
          dataIndex: 'pay_all',
        },
        {
          title: '油品销售（元）',
          dataIndex: 'sale_oil',
        },
        {
          title: '油品优惠（元）',
          dataIndex: 'discount_oil',
        },
        {
          title: '油品实付（元）',
          dataIndex: 'pay_oil',
        },
        {
          title: '非油销售（元）',
          dataIndex: 'sale_goods',
        },
        {
          title: '非油优惠（元）',
          dataIndex: 'discount_goods',
        },
        {
          title: '非油实付（元）',
          dataIndex: 'pay_goods',
        },
        {
          title: '操作',
          key: 'actions',
          dataIndex: 'actions',
          scopedSlots: { customRender: 'actions' },
    }];
    export default {
        data() {
            this.dateFormat = 'YYYY-MM-DD'
            return {
                companys,
                data:[],
                columns,
                pagesize:15,
                current:1,
                time_type:1,
                time_start:'',
                time_end:'',
                total:0,
                today_sale_oil:'',
                today_discount_oil:'',
                today_pay_oil:'',
                today_sale_goods:'',
                today_discount_goods:'',
                today_pay_goods:'',
                today_sale_all:'',
                today_discount_all:'',
                today_pay_all:''
            }
        },
        created() {
          const _this = this;
          _this.getData();
        },
        methods: {
          moment,
            handleTimetypeChange(value) {
              this.time_type = value;
            },            
            onTimeChange(date, dateString) {
              this.time_start = dateString[0];
              this.time_end = dateString[1];
            },
            getCurrentStyle (current, today) {
              const style = {}
              if (current.date() === 1) {
                style.border = '1px solid #1890ff'
                style.borderRadius = '50%'
              }
              return style
            },
            goCompany(id) {
              this.$router.push({name: 'ReportCompanty', params: {id: id}});
            }, 
            Download(type) {
              var _this = this;
              const time_type = _this.time_type;
              const time_start = _this.time_start;
              const time_end = _this.time_end;
              var token = this.$utils.cookie.get('token') ? this.$utils.cookie.get('token') : this.$utils.common.test.token;
              window.open('http://120.78.200.26/console/bill/countReportProvince?' + 'token=' + token +'&time_type=' + time_type + '&time_start=' + time_start + '&time_end=' + time_end + '&is_export=1');
            },
            onChange(current) {
              const _this = this;
              const time_type = _this.time_type;
              const time_start = _this.time_start;
              const time_end = _this.time_end;
              _this.current = current;
              this.$model.bill.getBillList({time_type:time_type,time_start:time_start,time_end:time_end,page:current}).then((response) => {
                  _this.data = response.data.company_list;
                  _this.data.forEach((item,index)=>{
                      item.key = index
                  });
              })
            },
            getData(){
              const _this = this;
              const time_type = _this.time_type;
              const time_start = _this.time_start;
              const time_end = _this.time_end;
              this.$model.bill.getBillList({time_type:time_type,time_start:time_start,time_end:time_end}).then((response) => {
                _this.today_sale_oil = response.data.today_sale_oil;
                _this.today_discount_oil = response.data.today_discount_oil;
                _this.today_pay_oil = response.data.today_pay_oil;
                _this.today_sale_goods = response.data.today_sale_goods;
                _this.today_discount_goods = response.data.today_discount_goods;
                _this.today_pay_goods = response.data.today_pay_goods;
                _this.today_sale_all = response.data.today_sale_all;
                _this.today_discount_all = response.data.today_discount_all;
                _this.today_pay_all = response.data.today_pay_all;
                _this.total = response.total;
                _this.data = response.data.company_list;
                _this.data.forEach((item,index)=>{
                  item.key = index
                });
              })
            }
        }
    }
</script>