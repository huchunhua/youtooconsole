<template>
    <div>
        <a-button type="primary" class="margin-bottom" @click="back">返回</a-button>
        <div class='margin-bottom'>
            <a-select defaultValue="日结时间" style="width: 120px" @change="handleTimetypeChange">
              <a-select-option value="日结时间">日结时间</a-select-option>
              <a-select-option value="自然时间">自然时间</a-select-option>
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
                <a-select-option v-for="company in companyData" :key="company.stationCode" :value="company.stationCode">{{company.stationName}}</a-select-option>
            </a-select>
            <a-button type="primary" style="margin:0 20px" @click="getData">确定</a-button>
            <a-button type="primary" @click="Download">导出</a-button>
        </div>
        <a-table :columns="columns" :dataSource="data" bordered :pagination=false>
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
          title: '分公司支付方式',
          children:[{
            title:'片区',
            dataIndex:'areaName',
            key:'areaName'
          },
          {
            title:'片区编码',
            dataIndex:'areaCode',            
            key:'areaCode'            
          },
          {
            title:'加管编码',
            dataIndex:'stationCode',
            key:'stationCode'
          },
          {
            title:'站点',
            dataIndex:'stationName',
            key:'stationName'
          },
          {
            title:'总金额',
            dataIndex:'all_money',
            key:'all_money'
          },
          {
            title: '微信',
            children: [{
              title: '总金额',
              dataIndex: 'wx_pay_all',
              key: 'wx_pay_all',
            }, {
              title: '手续费',
              dataIndex: 'wx_service_money',
              key: 'wx_service_money',
            },{
              title: '净金额',
              dataIndex: 'wx_income_money',
              key: 'wx_income_money',            
            }],
          },
          {
            title: '支付宝',
            children: [{
              title: '总金额',
              dataIndex: 'alipay_pay_all',
              key: 'alipay_pay_all',
            }, {
              title: '手续费',
              dataIndex: 'alipay_service_money',
              key: 'alipay_service_money',
            },{
              title: '净金额',
              dataIndex: 'alipay_income_money',
              key: 'alipay_income_money',            
            }],
          },
          {
            title: '翼支付',
            children: [{
              title: '总金额',
              dataIndex: 'best_pay_all',
              key: 'best_pay_all',
            }, {
              title: '手续费',
              dataIndex: 'best_service_money',
              key: 'best_service_money',
            },{
              title: '净金额',
              dataIndex: 'best_income_money',
              key: 'best_income_money',            
            }],
          },
          {
            title:'电子券',
            dataIndex:'electronics_coupon',
            key:'electronics_coupon'
          },
          {
            title:'净金额',
            dataIndex:'all_pure_money',
            key:'all_pure_money'
          },
          {
              title: '操作',
              key: 'actions',
              dataIndex: 'actions',
              scopedSlots: { customRender: 'actions' },
          }]
        }];
    export default {
        data() {
          this.dateFormat = 'YYYY-MM-DD'
            return {
                areaData:[],
                companyData:[],
                data:[],
                columns,
                pagesize:15,
                current:1,
                total:0
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
            goStation(id) {
              this.$router.push({name: 'PaymentStation', params: {id: id}});
            },
            Download(type) {
              var _this = this;
              const time_type = _this.time_type;
              const time_start = _this.time_start;
              const time_end = _this.time_end;
              var token = this.$utils.cookie.get('token') ? this.$utils.cookie.get('token') : this.$utils.common.test.token;
              window.open('http://120.78.200.26/console/bill/payReportBranch?' + 'token=' + token +'&time_type=' + time_type + '&time_start=' + time_start + '&time_end=' + time_end + '&company_code=' + _this.id +'&is_export=1');
            },
            onChange(current) {
              const _this = this;
              const time_type = _this.time_type;
              const time_start = _this.time_start;
              const time_end = _this.time_end;
              _this.current = current;
              this.$model.bill.getCompanyList({time_type:time_type,time_start:time_start,time_end:time_end,page:current}).then((response) => {
                  _this.data = response.data;
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
              this.$model.bill.getCompanyList({time_type:time_type,time_start:time_start,time_end:time_end,company_code:_this.id}).then((response) => {
                _this.total = response.total;
                _this.data = response.data;
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
<style scoped>
.margin-bottom{
  margin-bottom: 30px;
}
</style>