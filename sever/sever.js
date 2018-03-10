
var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var axios = require('axios')
var data_base = require('./data_base/index.js')
var user = require('./router/user')
var app = express()



app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "content-type")
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', user)

// 热门话题
app.get('/api/getHotTopic', function (req, res) {
  var url = 'https://m.toutiao.com/baidu_top_words'
  axios.get(url, {
    headers: {
			referer: 'https://m.toutiao.com',
			host: 'm.toutiao.com',
			cookie: 'UM_distinctid=1620961ffe43e6-0310cd7dbe87e7-32637b05-13c680-1620961ffe5459; csrftoken=267d69c05bc38432da4b1252fec41b0a; W2atIF=1; _ga=GA1.2.1848643236.1520575847; _gid=GA1.2.2068808734.1520575847; _ba=BA0.2-20180309-51225-NAYLXFQCLe99p7IG2EfD; bottom-banner-hide-status=true; tt_track_id=4f59b415fb409dd71eb3dbf4d41b32d2; uuid="w:f534ffe0b07f46c48f9091b55dfd867c"; login_flag=5bd06e7274d3398faa5238142524fb6d; sessionid=f2a92441dba70ce34db829f8a84a4c58; uid_tt=aad26983e880885abcf73617ce40700d; sid_tt=f2a92441dba70ce34db829f8a84a4c58; sid_guard="f2a92441dba70ce34db829f8a84a4c58|1520577022|15552000|Wed\054 05-Sep-2018 06:30:22 GMT"; defaultSearchAction=toutiao; sso_login_status=0; __tasessionId=1dpncgqp71520580228312; tt_webid=75186185892; utm_source=toutiao'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

// 热门新闻
app.get('/api/getHotNews', function (req, res) {
  var url = 'https://m.weibo.cn/api/container/getIndex'
  axios.get(url, {
    headers: {
			referer: 'https://m.weibo.com/p/index',
			host: 'm.weibo.cn',
			cookie: '_T_WM=05aee32b927262b7816f2ac6da907c9c; SCF=Asv6JYXAiAFrxLf0sH9hImHypr_5ZEmF_86WuIDaPbAdXVIDu2BrKg327jIkUFlxmaCi3f_Fk-zyToB6VzRcMbM.; H5_INDEX_TITLE=%E7%94%A8%E6%88%B75709024285; H5_INDEX=2; SUB=_2A253pkeuDeRhGeNJ61sR8irOwzmIHXVVaWnmrDV6PUJbkdANLVjVkW1NS_KVBmbx3PQ8UW9c85HRDbB0NWs16C2t; SUHB=0XDl_FJ8VhdrMm; SSOLoginState=1520580598; WEIBOCN_FROM=1110006030; M_WEIBOCN_PARAMS=luicode%3D10000011%26lfid%3D100803%26fid%3D100803%26uicode%3D10000011'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

// 获取指定类型的列表
app.get('/api/getBlogList', function (req, res) {
  var url = 'https://m.toutiao.com/list/'
  axios.get(url, {
    headers: {
			referer: 'https://m.toutiao.com/?',
			host: 'm.toutiao.com',
			cookie: 'UM_distinctid=1620961ffe43e6-0310cd7dbe87e7-32637b05-13c680-1620961ffe5459; csrftoken=267d69c05bc38432da4b1252fec41b0a; W2atIF=1; _ga=GA1.2.1848643236.1520575847; _gid=GA1.2.2068808734.1520575847; _ba=BA0.2-20180309-51225-NAYLXFQCLe99p7IG2EfD; bottom-banner-hide-status=true; tt_track_id=4f59b415fb409dd71eb3dbf4d41b32d2; uuid="w:f534ffe0b07f46c48f9091b55dfd867c"; login_flag=5bd06e7274d3398faa5238142524fb6d; sessionid=f2a92441dba70ce34db829f8a84a4c58; uid_tt=aad26983e880885abcf73617ce40700d; sid_tt=f2a92441dba70ce34db829f8a84a4c58; sid_guard="f2a92441dba70ce34db829f8a84a4c58|1520577022|15552000|Wed\054 05-Sep-2018 06:30:22 GMT"; defaultSearchAction=toutiao; sso_login_status=0; tt_webid=75186185892; utm_source=toutiao'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

// 文章详情
app.get('/api/getBlogDetail', function (req, res) {
  var url = 'https://m.toutiao.com/i6530725185136361988/info/'
  axios.get(url, {
    headers: {
			referer: 'https://m.toutiao.com',
			host: 'm.toutiao.com',
			cookie: 'UM_distinctid=1620961ffe43e6-0310cd7dbe87e7-32637b05-13c680-1620961ffe5459; tt_webid=6530823498980787726; csrftoken=267d69c05bc38432da4b1252fec41b0a; W2atIF=1; _ga=GA1.2.1848643236.1520575847; _gid=GA1.2.2068808734.1520575847; __tasessionId=aiitcjctm1520575848860; _ba=BA0.2-20180309-51225-NAYLXFQCLe99p7IG2EfD; bottom-banner-hide-status=true; tt_track_id=4f59b415fb409dd71eb3dbf4d41b32d2; uuid="w:f534ffe0b07f46c48f9091b55dfd867c"; sso_login_status=1; login_flag=5bd06e7274d3398faa5238142524fb6d; sessionid=f2a92441dba70ce34db829f8a84a4c58; uid_tt=aad26983e880885abcf73617ce40700d; sid_tt=f2a92441dba70ce34db829f8a84a4c58; sid_guard="f2a92441dba70ce34db829f8a84a4c58|1520577022|15552000|Wed\054 05-Sep-2018 06:30:22 GMT"'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});