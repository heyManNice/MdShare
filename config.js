config = {
    //流量控制
    rateLimit:{
        //在规定的时间内，单位分钟
        time:1,
        //同一个IP访问在规定时间内访问次数达到以下值将阻止访问
        limit:60
    }
}