import axios from 'axios'
export default {
	//统计省级报表
    getBillList(params = {}){
        return axios.post("bill/countReportProvince",params);
    },
    //支付方式省级报表
    getPayList(params = {}){
        return axios.post("bill/payReportProvince",params);
    }, 
    //统计公司报表   
    getBillCompanyList(params = {}){
        return axios.post("bill/countReportBranch",params);
    },
    //支付方式公司报表
    getCompanyList(params = {}){
        return axios.post("bill/payReportBranch",params);
    },    
    //统计站级报表
    getStationList(params = {}){
        return axios.post("bill/countReportStation",params);
    },    
    //支付方式站级报表
    getPayStationList(params = {}){
        return axios.post("bill/payReportStation",params);
    },
    //省级片区列表
    getAreaList(params = {}){
        return axios.post("bill/getAreaData",params);
    },
    //省级油站列表
    getStationData(params = {}){
        return axios.post("bill/getStationData",params);
    }  
};