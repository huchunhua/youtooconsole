import axios from 'axios'
export default {
	//推送消息
    putMessage(params = {}){
        return axios.post("jpush/jpush",params);
    },
    //推送历史
    getHistory(params = {}){
        return axios.post("jpush/getPushLogLists",params);
    },  
};