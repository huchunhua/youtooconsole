import common from "./common";

export default {
    set(name, value, expireHours) {
        var cookieString = name + "=" + escape(value) + "; path=/";
        //判断是否设置过期时间
        if (expireHours > 0) {
            var date = new Date();
            date.setTime(date.getTime() + expireHours * 3600 * 1000);
            cookieString = cookieString + ";expires=" + date.toGMTString();
        }
        document.cookie = cookieString;
    },
    get(name) {
        let strcookie = document.cookie;
        let arrcookie = strcookie.split("; ");
        for (let i = 0; i < arrcookie.length; i++) {
            let arr = arrcookie[i].split("=");
            let value = null;
            if (arr[0] == name) value = unescape(arr[1]);
            if (arr[0] == 'key' && name == 'token') value = unescape(arr[1]);
            return value;

        }
        return null;
    },
    del(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.get(name);
        if (cval != null) document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
        if (name == 'token') document.cookie = "key=" + cval + "; path=/;expires=" + exp.toGMTString();
    }
};
