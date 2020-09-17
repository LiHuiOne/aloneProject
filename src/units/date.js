//时间格式化1://dateconvert('2018-05-19T01:00:00Z')   --调用
export const dateconvert = (time) => {
    time=new Date(time)
    var datetimeFormat = "yyyy-MM-dd hh:mm:ss";
      var o = {
        "M+": time.getMonth() + 1, //月份 
        "d+": time.getDate(), //日 
        "h+": time.getHours(), //小时 
        "m+": time.getMinutes(), //分 
        "s+": time.getSeconds(), //秒 
        "q+": Math.floor((time.getMonth() + 3) / 3), //季度 
        "S": time.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(datetimeFormat)) {
      datetimeFormat = datetimeFormat.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o)
        if (new RegExp("(" + k + ")").test(datetimeFormat)) 
        datetimeFormat = datetimeFormat.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return datetimeFormat;
  }
//时间格式化2
 export const getTime = (timeStr) =>{
    let days = Math.floor(timeStr / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeStr % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeStr % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.round((timeStr % (1000 * 60)) / 1000);
    return days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
}
