<template>
    <div>
      公司报表
      <div style="padding:20px 0">
        <a-button type="primary" @click="back">返回</a-button>        
      </div>
        <div>
            <a-select defaultValue="1" style="width: 120px" @change="handleTimetypeChange">
              <a-select-option value="1">日结时间</a-select-option>
              <a-select-option value="2">自然时间</a-select-option>
            </a-select>
            <a-range-picker style="margin-right:20px" :defaultValue="[moment('2019/01/01', 'YYYY-MM-DD'), moment('2019/06/01', 'YYYY-MM-DD')]" @change="onTimeChange">
              <template slot="dateRender" slot-scope="current">
                <div class="ant-calendar-date" :style="getCurrentStyle(current)">
                  {{current.date()}}
                </div>
              </template>
            </a-range-picker>
            选择片区：
            <a-select style="width: 120px" @change="handleAreaChange">
                <a-select-option v-for="area in areaData" :key="area.areaCode" :value="area.areaCode">{{area.areaName}}</a-select-option>
            </a-select>
            选择油站：
            <a-select style="width: 120px" @change="handleCompanyChange">
                <a-select-option v-for="(company,key) in companyData" :key="key" :value="company.stationCode">{{company.stationName}}</a-select-option>
            </a-select>
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
              <a-icon type="form"  @click="goStation(record.stationCode)"/>
            </a-tooltip> 
          </span>
        </a-table>
        <template>
          <a-pagination :current="current" :total="total" :defaultPageSize="pagesize" @change="onChange"/>
        </template> 
    </div>
</template>
<script>
    import moment from 'moment';
    const columns = [
        {
          title: '片区编码',
          dataIndex: 'areaCode',
          key: 'areaCode'
        },
        {
          title: '片区',
          dataIndex: 'areaName',
          key: 'areaName'
        },
        {
          title: '油站编码',
          dataIndex: 'stationCode',
          key: 'stationCode'
        },
        {
          title: '油站名称',
          dataIndex: 'stationName',
          key: 'stationName'
        },
        {
          title: '销售合计（元）',
          dataIndex: 'sale_all',
          key:'sale_all'
        },
        {
          title: '优惠合计（元）',
          dataIndex: 'discount_all',
          key:'discount_all'
        },
        {
          title: '实际支付（元）',
          dataIndex: 'pay_all',
          key:'pay_all'
        },
        {
          title: '油品销售（元）',
          dataIndex: 'sale_oil',
          key:'sale_oil'
        },
        {
          title: '油品优惠（元）',
          dataIndex: 'discount_oil',
          key:'discount_oil'
        },
        {
          title: '油品实付（元）',
          dataIndex: 'pay_oil',
          key:'pay_oil'
        },
        {
          title: '非油销售（元）',
          dataIndex: 'sale_goods',
          key:'sale_goods'
        },
        {
          title: '非油优惠（元）',
          dataIndex: 'discount_goods',
          key:'discount_goods'
        },
        {
          title: '非油实付（元）',
          dataIndex: 'pay_goods',
          key:'ay_goods'
        },
        {
          title: '操作',
          key: 'actions',
          dataIndex: 'actions',
          scopedSlots: { customRender: 'actions' },
    }];
    export default {
        data() {
            return {
                areaData:[],
                companyData:[],
                data:[],
                columns,
                pagenum:'',
                pagesize:15,
                current:1,
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
                today_pay_all:'',
                area_code:'',
                station_code:''
            }
        },
        created() {
          const _this = this;
          const id = _this.$route.params.id;
          _this.id = id;
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
            handleAreaChange(value) {
              this.area_code = value;
              this.station_code = '';
              this.$model.bill.getStationData({area_code:this.area_code}).then((response) => {
                this.companyData = response.data
              })
            },            
            handleCompanyChange(value) {
              this.station_code = value
            },
            goStation(id) {
              this.$router.push({name: 'ReportStation', params: {id: id}});
            }, 
            getCurrentStyle (current, today) {
              const style = {}
              if (current.date() === 1) {
                style.border = '1px solid #1890ff'
                style.borderRadius = '50%'
              }
              return style
            },
            Download(type) {
              var _this = this;
              const time_type = _this.time_type;
              const time_start = _this.time_start;
              const time_end = _this.time_end;
              const area_code = _this.area_code;
              const station_code = _this.station_code;
              var token = this.$utils.cookie.get('token') ? this.$utils.cookie.get('token') : this.$utils.common.test.token;
              window.open('http://120.78.200.26/console/bill/countReportBranch?' + 'token=' + token +'&time_type=' + time_type + '&time_start=' + time_start + '&time_end=' + time_end + '&company_code=' + _this.id + '&area_code=' + area_code + '&station_code=' + station_code + '&is_export=1');
            },
            onChange(current) {
              const _this = this;
              const time_type = _this.time_type;
              const time_start = _this.time_start;
              const time_end = _this.time_end;
              _this.current = current;
              this.$model.bill.getBillCompanyList({time_type:time_type,time_start:time_start,time_end:time_end,page:current,company_code:_this.id}).then((response) => {
                  _this.data = response.data.station_list;
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
              const area_code = _this.area_code;
              const station_code = _this.station_code;
              this.$model.bill.getBillCompanyList({time_type:time_type,time_start:time_start,time_end:time_end,company_code:_this.id,area_code:area_code,station_code:station_code}).then((response) => {
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
                _this.data = response.data.station_list;
                _this.data.forEach((item,index)=>{
                  item.key = index
                });
              })
              this.$model.bill.getAreaList({company_code:_this.id}).then((response) => {
                  this.areaData = response.data;
                })
            },
            back(){
              this.$router.go(-1);//返回上一层
            }
        }
    }
</script>